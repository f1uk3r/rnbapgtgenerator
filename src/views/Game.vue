<template>
  <div>
    <GameBar :gamesData="scoreboardData.games"></GameBar>

    <GameTable :gameData="currentGameData"></GameTable>
    <!--<GameTableReddit :gameData="currentGameData"></GameTableReddit>-->
  </div>
</template>

<script>
import axios from 'axios'
import GameBar from '../components/GameBar.vue'
import GameTable from '../components/GameTable.vue'
/*import GameTableReddit from '../components/GameTableReddit.vue'*/
import { mapGetters } from 'vuex'

export default {
  name: 'Game',
  components: {
    GameBar,
    GameTable,
    /*GameTableReddit*/
  },
  data () {
    return {
      currentGameData: null,
      scoreboardData: null,
      url: this.$store.getters.baseUrl + this.$store.getters.dateToday + this.$store.getters.scoreboardSuffix,
      gameUrl: this.$store.getters.baseUrl + this.$store.getters.dateToday + '/' + this.$route.params.id + "_boxscore.json"
    }
  },
  computed: {
    ...mapGetters([
      'dateToday',
      'teamsData',
      'baseUrl',
      'scoreboardSuffix'
    ])
  },
  mounted () {
    //this.$store.dispatch('initialiseDates')
    axios.get(this.url).then((response) => {
      this.scoreboardData = response.data
    })
    axios.get(this.gameUrl).then((response) => {
      this.currentGameData = response.data
    })
  },
  methods: {
    apendPlusMinus (someStat) {
      if (/^\d+$/.test(someStat)) {
        if (parseInt(someStat) > 0) {
          return "+" + someStat
        } return someStat
      } return someStat
    }
  }

}
</script>