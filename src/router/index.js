import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import Login from '@/views/auth/Login.vue'
import Signup from '@/views/auth/Signup.vue'
import Layout from '@/components/Layout.vue'
import Profil from '@/views/auth/Profil.vue'
import otpVerification from '@/views/auth/otpVerification.vue'
import Create from '@/views/Create.vue'
import Home_travaux from '@/views/app_travaux/Home_travaux.vue'
import Piece1_app_travaux from '@/views/app_travaux/Piece1.vue'
import Piece2_app_travaux from '@/views/app_travaux/Piece2.vue'
import Piece3_app_travaux from '@/views/app_travaux/Piece3.vue'

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
        path: '/edit/marche-travaux/:project_id',
        name: 'home_travaux',
        component: Home_travaux,  
      }, 
      {
        path: '/edit/marche-travaux/:project_id/piece1',
        name: 'piece1_travaux',
        component: Piece1_app_travaux,
      },
      {
        path: '/edit/marche-travaux/:project_id/piece2',
        name: 'piece2_travaux',
        component: Piece2_app_travaux,
      },
      {
        path: '/edit/marche-travaux/:project_id/piece3',
        name: 'piece3_travaux',
        component: Piece3_app_travaux,
      }
    ]
  }, 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
