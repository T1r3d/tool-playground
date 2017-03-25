import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Json from '@/components/Json'
import Hashed from '@/components/Hashed'
import Misc from '@/components/Misc'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'tools',
      component: Index
    },
    {
      path: '/hashed',
      name: 'hashed',
      component: Hashed
    },
    {
      path: '/json',
      name: 'json',
      component: Json
    },
    {
      path: '/misc',
      name: 'misc',
      component: Misc
    }
  ]
})
