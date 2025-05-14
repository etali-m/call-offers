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
import Piece1 from '@/views/app_travaux/Piece1.vue'
import Piece2 from '@/views/app_travaux/Piece2.vue'
import Piece3 from '@/views/app_travaux/Piece3.vue'
import Piece4 from '@/views/app_travaux/Piece4.vue'
import Piece5 from '@/views/app_travaux/Piece5.vue'
import Piece6 from '@/views/app_travaux/Piece6.vue'
import Piece7 from '@/views/app_travaux/Piece7.vue'
import Piece8 from '@/views/app_travaux/Piece8.vue'

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
        component: Piece1,
      },
      {
        path: '/edit/marche-travaux/:project_id/piece2',
        name: 'piece2_travaux',
        component: Piece2,
      },
      {
        path: '/edit/marche-travaux/:project_id/piece3',
        name: 'piece3_travaux',
        component: Piece3,
      },
      {
        path: '/edit/marche-travaux/:project_id/piece4',
        name: 'piece4_travaux',
        component: Piece4,
      },
      {
        path: '/edit/marche-travaux/:project_id/piece5',
        name: 'piece5_travaux',
        component: Piece5,
      },
      {
        path: '/edit/marche-travaux/:project_id/piece6',
        name: 'piece6_travaux',
        component: Piece6,
      },
      {
        path: '/edit/marche-travaux/:project_id/piece7',
        name: 'piece7_travaux',
        component: Piece7,
      },
      {
        path: '/edit/marche-travaux/:project_id/piece8',
        name: 'piece8_travaux',
        component: Piece8,
      }
    ]
  }, 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
