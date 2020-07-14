<template>
  <b-sidebar
    position="static"
    mobile="hide"
    type="is-light"
    open
  >
    <div class="p-1">
      <router-link :to="{ name: 'Games', params: { id: game.gameId }}" v-for="game in gamesData" :key="game.gameId" >
        <IndexCard :gameData="game" />
      </router-link>
    </div>
  </b-sidebar>
</template>

<script>
import IndexCard from './IndexCard.vue'
export default {
  name: 'GameBar',
  props: {
    gamesData: Array
  },
  components: {
    IndexCard
  }
}
</script>