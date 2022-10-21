<template>
  <div>
    <b-tabs v-model="activeTab">
      <b-tab-item label="Today's Games">
        <router-link :to="{ name: 'Games', params: { id: '0022200016', date: $store.getters.dateToday }}" v-for="game in scoreboardData.games" :key="game.gameId" >
          <IndexCard :gameData="game" />
        </router-link>
      </b-tab-item>
      <!-- <b-tab-item label="Yesterday's Games">
        <router-link :to="{ name: 'Games', params: { id: game.gameId, date: $store.getters.dateYesterday }}" v-for="game in yesterdayScoreboardData.games" :key="game.gameId" >
          <IndexCard :gameData="game" />
        </router-link>
      </b-tab-item> -->
      <b-tab-item label="About Project">
        <div class="content">
          <h1>Box score generator</h1>
          <p>Box score generator to be used to submit post-game thread on r/nba and other NBA subreddits.</p>
          <p>Just click the buttons at the bottom of the respective game and get redirected to r/nba and team subreddits respectively</p>
          <p>Found some bugs in the website? Report it on <a href="https://github.com/f1uk3r/rnbapgtgenerator">Github</a>, send me a PM on <a href="https://www.reddit.com/user/f1uk3r/">Reddit</a></p>
        </div>
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script>
import axios from 'axios'
import IndexCard from '../components/IndexCard.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Index',
  components: {
    IndexCard
  },
  data () {
    return  {
      scoreboardData: null,
      // yesterdayScoreboardData: null,
      activeTab: 0,
      scoreboardInterval: null
    }
  },
  computed: {
    ...mapGetters([
      'dateToday',
      'teamsData',
      // 'dateYesterday'
      // 'yesterdayLastGameEnd'
    ]),
    getUrl () {
      return this.$store.getters.baseUrl + this.$store.getters.scoreboardSuffix
    }
    // getYesterdayUrl () {
    //   return this.$store.getters.baseUrl + this.$store.getters.scoreboardSuffix
    // }
  },
  mounted () {
    this.$store.dispatch('initialiseDates')

    // this.$store.dispatch('checkYesterdayLastGameEnd')

    this.getScoreboardData()

    // this.getYesterdayScoreboardData()
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
    }
    // getYesterdayScoreboardData () {
    //   axios.get(this.getYesterdayUrl, {crossDomain: true}).then((response) => {
    //     this.yesterdayScoreboardData = response.data
    //   })
    // }
  },
  created () {
    this.scoreboardInterval = setInterval(() => {
      this.getScoreboardData()
    }, 50000)
    // this.yesterdayScoreboardInterval = setInterval(() => {
    //   this.getYesterdayScoreboardData()
    // }, 5000)
  },
  destroyed () {
    clearInterval(this.scoreboardInterval)
    // clearInterval(this.yesterdayScoreboardInterval)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
