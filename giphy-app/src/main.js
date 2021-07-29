import Vue from 'vue'
import { BootstrapVue, BootstrapVueIcons  } from 'bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/style/style.scss';

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
