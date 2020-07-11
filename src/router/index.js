import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../components/Index'
import Game from '../components/Game'


Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      component: Index,
      meta: {
        title: 'Post Game Thread generator for r/nba'
      }
    },
    {
      path: 'game/:id',
      component: Game,
      meta: {
        title: 'Post Game Thread'
      }
    }
  ]
})

export default router