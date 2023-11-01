import Vue from 'vue'

import axios from 'axios'
import VueAxios from 'vue-axios'

import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'
import './assets/main.css'

import {BootstrapVue, IconsPlugin} from "bootstrap-vue";

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueAxios, axios)
Vue.use(VueCookies, { expires: '7d'})

Vue.prototype.$showResult = false
Vue.prototype.$url = "https://5aa1de2d317cefa7.ngrok.app"

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
