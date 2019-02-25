import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'
import User from '@/pages/User'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/user/:userId',
      name: 'User',
      component: User
    }
  ]
})
