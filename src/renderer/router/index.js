import Vue from 'vue'
import Router from 'vue-router'
import FormPage from '@/views/FormPage'
import RitmCaputurer from '@/views/RitmCapturer'
import LogOut from '@/views/LogOut'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/itam',
      name: 'form-page',
      component: FormPage
    },
    {
      path: '/',
      name: 'ritm-capturer',
      component: RitmCaputurer
    },
    {
      path: '/logout',
      name: 'log-out',
      component: LogOut
    },
    {
      path: '/*',
      redirect: '/'
    }
  ]
})
