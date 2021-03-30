import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const App = () => import('../popup/App.vue')
const UserInfo = () => import('../components/UserInfo.vue')
const Denied = () => import('../components/Denied.vue')

const routes = [{
  path: '/',
  component: App,
  children: [
    {
      path: '',
      redirect: '/user'
    },
    {
      path: '/user',
      component: UserInfo
    },
    {
      path: '/error',
      component: Denied
    }
  ]
}]

const router = new VueRouter({
  routes
})

export default router