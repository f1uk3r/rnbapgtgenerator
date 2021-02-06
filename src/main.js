import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import axios from 'axios'
import { store } from './store/store.js'
import router from './router'
import VueGtag from 'vue-gtag'

Vue.config.productionTip = false
Vue.use(Buefy)
Vue.use(axios)
Vue.use(Vuex)
Vue.use(VueGtag, {
  config: { id: 'UA-186976504-1' }
}, router)

new Vue({
  render: h => h(App),
  router,
  store: store
}).$mount('#app')
