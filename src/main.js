import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuelidate from 'vuelidate'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import vmodal from 'vue-js-modal'


Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueAxios, axios)
Vue.use(Vuelidate)
Vue.use(vmodal)

window.$ = window.jQuery = require('jquery');
//axios.defaults.baseURL = 'https://proyectocalidad9.herokuapp.com/';
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
