import Vue from 'vue'
import Router from 'vue-router'
import Cities from '@/components/Cities'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'start',
      component: Cities
    }
  ]
})
