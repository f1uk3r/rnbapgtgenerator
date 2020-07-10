import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import axios from 'axios'
import { store } from './store/store.js'

Vue.config.productionTip = false
Vue.use(Buefy)
Vue.use(axios)
Vue.use(Vuex)

new Vue({
  render: h => h(App),
  store: store,
}).$mount('#app')
