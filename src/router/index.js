import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import Login from '@/views/auth/Login.vue'
import Signup from '@/views/auth/Signup.vue'
import Layout from '@/components/Layout.vue'
import Profil from '@/views/auth/Profil.vue'
import NotFound from '@/views/NotFound.vue'
import otpVerification from '@/views/auth/otpVerification.vue'
import Create from '@/views/Create.vue'
import Edit from '@/views/Edit.vue'
import Piece1 from '@/views/app_travaux/Piece1.vue'
import Piece2 from '@/views/app_travaux/Piece2.vue'
import Piece3 from '@/views/app_travaux/Piece3.vue'
import Piece4 from '@/views/app_travaux/Piece4.vue'
import Piece5 from '@/views/app_travaux/Piece5.vue'
import Piece6 from '@/views/app_travaux/Piece6.vue'
import Piece7 from '@/views/app_travaux/Piece7.vue'
import Piece8 from '@/views/app_travaux/Piece8.vue'
import Piece9 from '@/views/app_travaux/Piece9.vue'
import Piece10 from '@/views/app_travaux/Piece10.vue'
import Piece11 from '@/views/app_travaux/Piece11.vue'
import Piece12 from '@/views/app_travaux/Piece12.vue'
import Piece13 from '@/views/app_travaux/Piece13.vue'
import Piece14 from '@/views/app_travaux/Piece14.vue'


const routes = [
  {
    path: '/login',
    name: 'login', 
    component: Login
  },
  {
    path: '/signup',
    name: 'signup', 
    component: Signup
  },
  {
    path: '/verify-email',
    name: 'otp-verification', 
    component: otpVerification
  },
  {
    path: '/', 
    redirect: '/home',
    component: Layout,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'home',
        name: 'home', 
        component: HomeView
      },
      {
        path: 'about',
        name: 'about', 
        component: AboutView
      },
      {
        path: '/profil',
        name: 'profil',
        component: Profil
      },
      {
        path: '/create/:slug',
        name: 'create',
        component: Create
      },
      //ON va organiser en fonction du type de maché
      //Marche de travaux
      {
        path: 'edit/:project_id',
        name: 'edit',
        component: Edit,  
      }, 
      {
        path: 'edit/marche-de-travaux/:project_id/piece1',
        name: 'piece1_travaux',
        component: Piece1,
      },
      {
        path: 'edit/marche-de-travaux/:project_id/piece2',
        name: 'piece2_travaux',
        component: Piece2,
      },
      {
        path: 'edit/marche-de-travaux/:project_id/piece3',
        name: 'piece3_travaux',
        component: Piece3,
      },
      {
        path: 'edit/marche-de-travaux/:project_id/piece4',
        name: 'piece4_travaux',
        component: Piece4,
      },
      {
        path: 'edit/marche-de-travaux/:project_id/piece5',
        name: 'piece5_travaux',
        component: Piece5,
      },
      {
        path: 'edit/marche-de-travaux/:project_id/piece6',
        name: 'piece6_travaux',
        component: Piece6,
      },
      {
        path: 'edit/marche-de-travaux/:project_id/piece7',
        name: 'piece7_travaux',
        component: Piece7,
      },
      {
        path: 'edit/marche-de-travaux/:project_id/piece8',
        name: 'piece8_travaux',
        component: Piece8,
      },
      {
        path: 'edit/marche-de-travaux/:project_id/piece9',
        name: 'piece9_travaux',
        component: Piece9,
      },
      {
        path: 'edit/marche-de-travaux/:project_id/piece10',
        name: 'piece10_travaux',
        component: Piece10,
      },
      {
        path: 'edit/marche-de-travaux/:project_id/piece11',
        name: 'piece11_travaux',
        component: Piece11,
      },
      {
        path: 'edit/marche-de-travaux/:project_id/piece12',
        name: 'piece12_travaux',
        component: Piece12,
      },
      {
        path: 'edit/marche-de-travaux/:project_id/piece13',
        name: 'piece13_travaux',
        component: Piece13,
      },
      {
        path: 'edit/marche-de-travaux/:project_id/piece14',
        name: 'piece14_travaux',
        component: Piece14,
      },
    ]
  }, 
  //Page d'erreur
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('user') // ou store.state.auth.loggedIn

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'login' }) // Rediriger vers la page de login
  } else {
    next() // Autoriser l'accès
  }
})

export default router
