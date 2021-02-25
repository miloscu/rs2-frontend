import Vue from 'vue'
import Router from 'vue-router'
import Store from '@/components/Store'
import Signup from '@/components/auth/Signup'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/store',
      name: 'Store',
      component: Store,
      props: true,
      beforeEnter:(to,from,next) => {
        if (to.params.alias) {
          next()
        } else {
          next({name: 'Signup'})
        }
      }
    }
  ]
})
