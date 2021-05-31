import Vue from 'vue'
import VueShowdown from 'vue-showdown'
import App from './App.vue'
import store from './store'
import InstantSearch from 'vue-instantsearch';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.prototype.$algoliaAppId = process.env.VUE_APP_ALGOLIA_APP_ID
Vue.prototype.$algoliaApiKey = process.env.VUE_APP_ALGOLIA_API_KEY

Vue.use(InstantSearch);
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueShowdown, {
  flavor: 'github',
  options: {
    emoji: false,
  },
})

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
