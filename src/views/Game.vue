<template>
  <div class="sidebar-page">
    <section class="sidebar-layout">
      <GameBar :gamesData="scoreboardData.games"></GameBar>
      <div v-if="currentGameData!=={}" class="container">
        <b-field grouped position="is-centered">
          <figure class="image is5by5" :id="hTeamLogo"></figure>
          <p class="is-7">{{ currentGameData.homeTeam.score }}-{{ currentGameData.awayTeam.score }}</p>
          <figure class="image is5by5" :id="vTeamLogo"></figure>
        </b-field>
        <b-field position="is-centered">
          <p v-if="currentGameData.period>1 & currentGameData.gameClock!==''">{{  currentGameData.gameClock  }} {{  currentGameData.period  }}Q</p>
          <p v-else-if="currentGameData.period===1 && currentGameData.gameClock!==''">{{  currentGameData.gameClock  }} {{  currentGameData.period  }}Q</p>
          <p v-else-if="currentGameData.period===1 && currentGameData.gameClock===''">{{  currentGameData.gameEt  }}</p>
        </b-field>

        <div class="card game-box-score-h-team">
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <b-field>
                  <figure class="image is-5by5" :id="hTeamLogo"></figure>
                  <p class="is-7">{{ hTeam }}</p>
                </b-field>
              </div>
            </div>
            <div class="content">
              <GameTable :boxScoreData="hTeamBoxScore"></GameTable>
            </div>
          </div>
        </div>
        
        <div class="card game-box-score-v-team">
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <b-field>
                  <figure class="image is-5by5" :id="vTeamLogo"></figure>
                  <p class="is-7">{{ vTeam }}</p>
                </b-field>
              </div>
            </div>
            <div class="content">
              <GameTable :boxScoreData="vTeamBoxScore"></GameTable>
            </div>
          </div>
        </div>

        <GameTableReddit :gameData="currentGameData"></GameTableReddit>
      </div>
      
      <!--
        -->
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import GameBar from '../components/GameBar.vue'
import GameTable from '../components/GameTable.vue'
import GameTableReddit from '../components/GameTableReddit.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Game',
  components: {
    GameBar,
    GameTable,
    GameTableReddit
  },
  data () {
    return {
      currentGameData: {},
      scoreboardData: {},
      currentGameInterval: null,
      scoreboardInterval: null
    }
  },
  metaInfo () {
    return {
      title: `${this.hTeam} ${this.vTeam} box score for reddit: PGT Generator`,
      meta: [
        { name: 'description', content: 'Generate complete NBA boxscore and post PGT on reddit with proper format' },
        { property: 'og:title', content: 'r/nba PGT generator - NBA Boxscore for Reddit' },
        { property: 'og:site-name', content: 'r/nba PGT generator' },
        { property: 'og:type', content: 'website'}
      ]
    }
  },
  computed: {
    ...mapGetters([
      'dateToday',
      // 'dateYesterday',
      'teamsData',
      'baseUrl',
      'scoreboardSuffix'
    ]),
    hTeamLogo () {
      return this.$store.getters.teamsData[this.currentGameData.homeTeam.teamTricode][5]
    },
    vTeamLogo () {
      return this.$store.getters.teamsData[this.currentGameData.awayTeam.teamTricode][5]
    },
    hTeam () {
      return this.$store.getters.teamsData[this.currentGameData.homeTeam.teamTricode][0]
    },
    vTeam () {
      return this.$store.getters.teamsData[this.currentGameData.awayTeam.teamTricode][0]
    },
    getUrl () {
      return this.$store.getters.baseUrl + this.$store.getters.scoreboardSuffix
    },
    getGameUrl () {
      return this.$store.getters.baseUrl + `${encodeURIComponent('boxscore/boxscore_' + this.$route.params.id + '.json')}`
    },
    hTeamBoxScore () {
      return this.currentGameData.homeTeam.players
    },
    vTeamBoxScore () {
      return this.currentGameData.awayTeam.players
    }
  },
  mounted () {
    this.$store.dispatch('initialiseDates')

    // this.$store.dispatch('checkYesterdayLastGameEnd')

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
        this.scoreboardData = response.data.scoreboard
      })
    },
    getCurrentGameData () {
      axios.get(this.getGameUrl).then((response) => {
        this.currentGameData = response.data.game
      })
    }
  },
  created () {
    this.currentGameInterval = setInterval(() => {
      this.getCurrentGameData()
    }, 50000),
    this.scoreboardInterval = setInterval(() => {
      this.getScoreboardData()
    }, 50000)
  },
  destroyed () {
    clearInterval(this.currentGameInterval)
    clearInterval(this.scoreboardInterval)
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