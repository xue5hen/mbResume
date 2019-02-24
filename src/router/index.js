import Vue from 'vue'
import Router from 'vue-router'
import mySwiper from '@/components/mySwiper'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'mySwiper',
      component: mySwiper
    }
  ]
})
