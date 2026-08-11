import axios from 'axios'

const REFRESH_URL = 'http://localhost:8000/api/token/refresh/'

// Endpoints qui ne doivent jamais déclencher une tentative de refresh
// (pas encore de session, ou c'est l'appel de refresh lui-même)
const AUTH_EXCLUDED_PATHS = ['/login/', '/signup/', '/token/refresh/']

const api = axios.create()

let isRefreshing = false
let refreshQueue = []

function onRefreshed(newAccessToken) {
  refreshQueue.forEach((callback) => callback(newAccessToken))
  refreshQueue = []
}

async function logoutAndRedirect() {
  localStorage.removeItem('user')
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  // import dynamique pour éviter une dépendance circulaire avec le router
  // (qui charge les vues, qui chargent les composables, qui chargent ce fichier)
  const { default: router } = await import('@/router')
  router.push({ name: 'login' })
}

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error

    const isExcluded = config && AUTH_EXCLUDED_PATHS.some((path) => config.url && config.url.includes(path))

    if (!response || response.status !== 401 || !config || config._retry || isExcluded) {
      return Promise.reject(error)
    }

    const refreshToken = localStorage.getItem('refresh_token')
    if (!refreshToken) {
      await logoutAndRedirect()
      return Promise.reject(error)
    }

    config._retry = true

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        refreshQueue.push((newAccessToken) => {
          if (!newAccessToken) {
            reject(error)
            return
          }
          config.headers.Authorization = `Bearer ${newAccessToken}`
          resolve(api(config))
        })
      })
    }

    isRefreshing = true
    try {
      const { data } = await axios.post(REFRESH_URL, { refresh: refreshToken })
      localStorage.setItem('access_token', data.access)
      onRefreshed(data.access)
      config.headers.Authorization = `Bearer ${data.access}`
      return api(config)
    } catch (refreshError) {
      onRefreshed(null)
      await logoutAndRedirect()
      return Promise.reject(refreshError)
    } finally {
      isRefreshing = false
    }
  }
)

export default api
