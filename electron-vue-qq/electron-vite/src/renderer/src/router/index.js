import { createRouter, createWebHashHistory } from 'vue-router'
import MainIndex from '../views/home/MainIndex.vue'
import LoginIndex from '../views/login/loginIndex.vue'
import SearchIndex from '../views/search/searchindex.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      component: MainIndex
    },
    {
      path: '/login',
      component: LoginIndex
    },
    {
      path: '/search',
      component: SearchIndex
    }
  ]
})

export default router
