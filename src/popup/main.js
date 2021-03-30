import Vue from 'vue'
import AsyncComputed from 'vue-async-computed'
import VueRouter from 'vue-router'
import App from './App.vue'
import router from '../router'

Vue.use(AsyncComputed)
Vue.use(VueRouter)

Vue.config.productionTip = false

new Vue({
  el: "#app",
  router,
  render: h => h(App),
})