import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import axios from 'axios'

Vue.config.productionTip = false
Vue.use(Buefy)
Vue.use({
  install (Vue) {
    Vue.prototype.$api = axios.create({
      baseURL: 'http://data.nba.net/prod/v1/'
    })
  }
})

new Vue({
  render: h => h(App),
}).$mount('#app')
