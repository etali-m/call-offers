import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue' 
import Projects from "@/views/Projects.vue"
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

import CRPiece1 from '@/views/app_conception_realisation/Piece1.vue'
import CRPiece2 from '@/views/app_conception_realisation/Piece2.vue'
import CRPiece3 from '@/views/app_conception_realisation/Piece3.vue'
import CRPiece4 from '@/views/app_conception_realisation/Piece4.vue'
import CRPiece5 from '@/views/app_conception_realisation/Piece5.vue'
import CRPiece6 from '@/views/app_conception_realisation/Piece6.vue'
import CRPiece7 from '@/views/app_conception_realisation/Piece7.vue'
import CRPiece8 from '@/views/app_conception_realisation/Piece8.vue'
import CRPiece9 from '@/views/app_conception_realisation/Piece9.vue'
import CRPiece10 from '@/views/app_conception_realisation/Piece10.vue'
import CRPiece11 from '@/views/app_conception_realisation/Piece11.vue'
import CRPiece12 from '@/views/app_conception_realisation/Piece12.vue'
import CRPiece13 from '@/views/app_conception_realisation/Piece13.vue'
import CRPiece14 from '@/views/app_conception_realisation/Piece14.vue'
import CRPiece15 from '@/views/app_conception_realisation/Piece15.vue'
import CRPiece16 from '@/views/app_conception_realisation/Piece16.vue'
import CRPiece17 from '@/views/app_conception_realisation/Piece17.vue'
import CRPiece18 from '@/views/app_conception_realisation/Piece18.vue'
import CRPiece19 from '@/views/app_conception_realisation/Piece19.vue'


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
        path: 'projects',
        name: 'projects', 
        component: Projects
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
      //Marche de conception et réalisation
      {
        path: 'edit/conception-realisation/:project_id/piece1',
        name: 'piece1_cr',
        component: CRPiece1,
      },
      {
        path: 'edit/conception-realisation/:project_id/piece2',
        name: 'piece2_cr',
        component: CRPiece2,
      },
      {
        path: 'edit/conception-realisation/:project_id/piece3',
        name: 'piece3_cr',
        component: CRPiece3,
      },
      {
        path: 'edit/conception-realisation/:project_id/piece4',
        name: 'piece4_cr',
        component: CRPiece4,
      },
      {
        path: 'edit/conception-realisation/:project_id/piece5',
        name: 'piece5_cr',
        component: CRPiece5,
      },
      {
        path: 'edit/conception-realisation/:project_id/piece6',
        name: 'piece6_cr',
        component: CRPiece6,
      },
      {
        path: 'edit/conception-realisation/:project_id/piece7',
        name: 'piece7_cr',
        component: CRPiece7,
      },
      {
        path: 'edit/conception-realisation/:project_id/piece8',
        name: 'piece8_cr',
        component: CRPiece8,
      },
      {
        path: 'edit/conception-realisation/:project_id/piece9',
        name: 'piece9_cr',
        component: CRPiece9,
      },
      {
        path: 'edit/conception-realisation/:project_id/piece10',
        name: 'piece10_cr',
        component: CRPiece10,
      },
      {
        path: 'edit/conception-realisation/:project_id/piece11',
        name: 'piece11_cr',
        component: CRPiece11,
      },
      {
        path: 'edit/conception-realisation/:project_id/piece12',
        name: 'piece12_cr',
        component: CRPiece12,
      },
      {
        path: 'edit/conception-realisation/:project_id/piece13',
        name: 'piece13_cr',
        component: CRPiece13,
      },
      {
        path: 'edit/conception-realisation/:project_id/piece14',
        name: 'piece14_cr',
        component: CRPiece14,
      },
      {
        path: 'edit/conception-realisation/:project_id/piece15',
        name: 'piece15_cr',
        component: CRPiece15,
      },
      {
        path: 'edit/conception-realisation/:project_id/piece16',
        name: 'piece16_cr',
        component: CRPiece16,
      },
      {
        path: 'edit/conception-realisation/:project_id/piece17',
        name: 'piece17_cr',
        component: CRPiece17,
      },
      {
        path: 'edit/conception-realisation/:project_id/piece18',
        name: 'piece18_cr',
        component: CRPiece18,
      },
      {
        path: 'edit/conception-realisation/:project_id/piece19',
        name: 'piece19_cr',
        component: CRPiece19,
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
