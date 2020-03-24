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
    path: '/test',
    name: 'Test',
    component: () => import('../components/ImportVue.vue')
  },

  {
    path: '/export',
    name: 'Export',
    component: () => import('../components/ExportVue.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
