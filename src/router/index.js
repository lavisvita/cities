import Vue from 'vue'
import Router from 'vue-router'
import ViewVidgets from '@/components/ViewVidgets'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'start',
      component: ViewVidgets
    }
  ]
})
