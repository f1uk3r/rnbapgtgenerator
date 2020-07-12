<template>
  <section class="sidebar-layout">
    <b-sidebar
      position="static"
      mobile="hide"
      type="is-light"
      open
    >
      <div class="p-1">
        <template v-for="game in gamesData">
          <IndexCard :key="game.gameId" :gameData="game" @click="goToGenerator(game)" />
        </template>
      </div>
    </b-sidebar>
  </section>
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