import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import Login from '@/views/auth/Login.vue'
import Signup from '@/views/auth/Signup.vue'
import Layout from '@/components/Layout.vue'

const routes = [
  {
    path: '/', 
    redirect: '/home',
    component: Layout,
    children: [
      {
        path: 'home',
        name: 'home', 
        component: HomeView
      },
      {
        path: '/about',
        name: 'about', 
        component: AboutView
      },
    ]
  },
  {
    path: '/login',
    name: 'login', 
    component: Login
  },
  {
    path: '/signup',
    name: 'signup', 
    component: Signup
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
