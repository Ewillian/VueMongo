import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/HelloWorld.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },

  {
    path: '/getone/',
    name: 'GetOne',
    component: () => import('../components/GetOne.vue')
  },

  {
    path: '/getall',
    name: 'GetAll',
    component: () => import('../components/GetAll.vue')
  },

  {
    path: '/dellone',
    name: 'DelOne',
    component: () => import('../components/DelOne.vue')
  },

  {
    path: '/getcols',
    name: 'GetCols',
    component: () => import('../components/GetCol.vue')
  },

  {
    path: '/patchone',
    name: 'PatchOne',
    component: () => import('../components/PatchOne.vue')
  },

  {
    path: '/upload',
    name: 'Upload',
    component: () => import('../components/UploadVue.vue')
  },

  {
    path: '/sendData',
    name: 'sendData',
    component: () => import('../components/SendDataVue.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
