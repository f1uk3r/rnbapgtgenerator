<template>
  <div>
    <GameBar></GameBar>
    <GameTable></GameTable>
    <GameTableReddit></GameTableReddit>
  </div>
</template>

<script>
import GameBar from './GameBar.vue'
import GameTable from './GameTable.vue'
import GameTableReddit from './GameTableReddit.vue'

export default {
  name: 'Game',
  components: {
    GameBar,
    GameTable,
    GameTableReddit
  },
  data () {
    return {
      currentGameData: null,
      scoreboardData: null,

      url: "http://data.nba.net/prod/v1/" + this.$store.getters.dateToday + '/scoreboard.json'
    }
  }

}
</script>