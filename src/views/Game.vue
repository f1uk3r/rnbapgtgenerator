<template>
  <div class="sidebar-page">
    <section class="sidebar-layout">
      <GameBar :gamesData="scoreboardData.games"></GameBar>
      <div v-if="currentGameData.basicGameData.vTeam.score!==''" class="container">
        <b-field grouped position="is-centered">
          <figure class="image is5by5" :id="hTeamLogo"></figure>
          <p class="is-7">{{ currentGameData.basicGameData.hTeam.score }}-{{ currentGameData.basicGameData.vTeam.score }}</p>
          <figure class="image is5by5" :id="vTeamLogo"></figure>
        </b-field>
        <b-field position="is-centered">
          <p v-if="currentGameData.basicGameData.period.current>1 & currentGameData.basicGameData.clock!==''">{{  currentGameData.basicGameData.clock  }} {{  currentGameData.basicGameData.period.current  }}Q</p>
          <p v-else-if="currentGameData.basicGameData.period.current===1 && currentGameData.basicGameData.clock!==''">{{  currentGameData.basicGameData.clock  }} {{  currentGameData.basicGameData.period.current  }}Q</p>
          <p v-else-if="currentGameData.basicGameData.period.current===1 && currentGameData.basicGameData.clock===''">{{  currentGameData.basicGameData.startTimeEastern  }}</p>
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
  computed: {
    ...mapGetters([
      'dateToday',
      'dateYesterday',
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
    hTeam () {
      return this.$store.getters.teamsData[this.currentGameData.basicGameData.hTeam.triCode][0]
    },
    vTeam () {
      return this.$store.getters.teamsData[this.currentGameData.basicGameData.vTeam.triCode][0]
    },
    getUrl () {
      return this.$store.getters.baseUrl + this.$store.getters.dateToday + this.$store.getters.scoreboardSuffix
    },
    getGameUrl () {
      return this.$store.getters.baseUrl + this.$store.getters.dateToday + '/' + this.$route.params.id + '_boxscore.json/'
    },
    hTeamBoxScore () {
      return this.currentGameData.stats.activePlayers.filter((player) => {
        return player.teamId === this.currentGameData.basicGameData.hTeam.teamId
      })
    },
    vTeamBoxScore () {
      return this.currentGameData.stats.activePlayers.filter((player) => {
        return player.teamId === this.currentGameData.basicGameData.vTeam.teamId
      })
    }
  },
  mounted () {
    this.$store.dispatch('initialiseDates')

    this.$store.dispatch('checkYesterdayLastGameEnd')

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
      axios.get(this.getUrl, {crossDomain: true}).then((response) => {
        this.scoreboardData = response.data
      })
    },
    getCurrentGameData () {
      axios.get(this.getGameUrl, {crossDomain: true}).then((response) => {
        this.currentGameData = response.data
      })
    }
  },
  created () {
    this.currentGameInterval = setInterval(() => {
      this.getCurrentGameData()
    }, 5000),
    this.scoreboardInterval = setInterval(() => {
      this.getScoreboardData()
    }, 5000)
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