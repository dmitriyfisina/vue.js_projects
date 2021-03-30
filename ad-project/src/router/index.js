import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthGuard from './auth-guard'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    name: 'Home',
    component: () => import('@/views/Home')
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: () => import('@/views/Auth/Login')
  },
  {
    path: '/registration',
    name: 'RegistrationPage',
    component: () => import('@/views/Auth/Registration')
  },
  {
    path: '/ad-list',
    name: 'AdListPage',
    component: () => import('@/views/AdList'),
    beforeEnter: AuthGuard
  },
  {
    path: '/new-ad',
    name: 'NewAdPage',
    component: () => import('@/views/NewAd'),
    beforeEnter: AuthGuard
  },
  {
    path: '/ad/:id',
    props: true,
    name: 'AdPage',
    component: () => import('@/views/Ad'),
    beforeEnter: AuthGuard
  },
  {
    path: '/orders',
    name: 'OrdersPage',
    component: () => import('@/views/Orders'),
    beforeEnter: AuthGuard
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
