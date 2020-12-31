import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Index.vue'
import Game from '../views/Game.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Index',
    component: Home
  },
  {
    path: '/games/:date/:id',
    name: 'Games',
    component: Game
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
