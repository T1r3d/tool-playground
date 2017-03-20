import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Json from '@/components/Json'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'tools',
      component: Index
    },
    {
      path: '/json',
      name: 'json',
      component: Json
    }
  ]
})
