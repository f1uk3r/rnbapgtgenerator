<template>
  <div class="sidebar-page">
    <section class="sidebar-layout">
      <GameBar :gamesData="scoreboardData.games"></GameBar>
      <div class="container">
        <b-field grouped position="is-centered">
          <figure class="image is5by5" :id="hTeamLogo"></figure>
          <p class="is-7">{{ currentGameData.basicGameData.hTeam.score }}-{{ currentGameData.basicGameData.vTeam.score }}</p>
          <figure class="image is5by5" :id="vTeamLogo"></figure>
        </b-field>
      </div>
      <!--<GameTable :gameData="currentGameData"></GameTable>
        <GameTableReddit :gameData="currentGameData"></GameTableReddit>-->
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import GameBar from '../components/GameBar.vue'
/*import GameTable from '../components/GameTable.vue'
import GameTableReddit from '../components/GameTableReddit.vue'*/
import { mapGetters } from 'vuex'

export default {
  name: 'Game',
  components: {
    GameBar,
    /*GameTable,
    GameTableReddit*/
  },
  data () {
    return {
      currentGameData: null,
      scoreboardData: null
    }
  },
  computed: {
    ...mapGetters([
      'dateToday',
      'teamsData',
      'baseUrl',
      'scoreboardSuffix'
    ]),
    hTeamLogo () {
      return this.$store.getters.teamsData[this.currentGameData.basicGameData.hTeam.triCode][5]
    },
    vTeamLogo () {
      return this.$store.getters.teamsData[this.currentGameData.basicGameData.vTeam.triCode][5]
    },
    getUrl () {
      return this.$store.getters.baseUrl + this.$store.getters.dateToday + this.$store.getters.scoreboardSuffix
    },
    getGameUrl () {
      return this.$store.getters.baseUrl + this.$store.getters.dateToday + '/' + this.$route.params.id + '_boxscore.json'
    }
  },
  mounted () {
    this.$store.dispatch('initialiseDates')

    this.getScoreboardData()

    this.getCurrentGameData()
  },
  methods: {
    apendPlusMinus (someStat) {
      if (/^\d+$/.test(someStat)) {
        if (parseInt(someStat) > 0) {
          return "+" + someStat
        } return someStat
      } return someStat
    },
    getScoreboardData () {
      axios.get(this.getUrl).then((response) => {
        this.scoreboardData = response.data
      })
    },
    getCurrentGameData () {
      axios.get(this.getGameUrl).then((response) => {
        this.currentGameData = response.data
      })
    }
  },
  created () {
    setInterval(() => {
      this.getCurrentGameData()
    }, 5000)
  }

}
</script>

<style scoped>
  .sidebar-page {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100%;
  }
  .sidebar-layout {
    display: flex;
    flex-direction: row;
    min-height: 100%;
  }
</style>