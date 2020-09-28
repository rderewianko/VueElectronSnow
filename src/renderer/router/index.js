import Vue from 'vue'
import Router from 'vue-router'
import FormPage from '@/views/FormPage'
import selectConnectionRequest from '@/views/selectConnectionRequest'
import LogOut from '@/views/LogOut'
import welcome from '@/views/welcome'
import store from '../store/modules/index'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/itam',
      name: 'form-page',
      component: FormPage
    },
    {
      path: '/app',
      name: 'ritm-capturer',
      component: selectConnectionRequest
    },
    {
      path: '/logout',
      name: 'log-out',
      component: LogOut
    },
    {
      path: '/',
      name: 'welcome',
      component: welcome
    },
    {
      path: '/*',
      redirect: '/'
    }
  ]
})

export default router
