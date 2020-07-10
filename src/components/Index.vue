<template>
  <div>
    <b-tabs v-model="activeTab">
      <b-tab-item label="Card">
        <a href="" v-for="game in scoreboardData.games" :key="game.gameId">
          <IndexCard :gameData="game"/>
        </a>
      </b-tab-item>
      <b-tab-item label="Table">
        <IndexTable :gamesData="scoreboardData.games"/>
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script>
import axios from 'axios'
import IndexCard from './IndexCard.vue'
import IndexTable from './IndexTable.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Index',
  components: {
    IndexCard,
    IndexTable
  },
  data () {
    return  {
      scoreboardData: null,
      activeTab: 0,
      numberOfGames: null,
      url: "http://data.nba.net/prod/v1/" + this.$store.getters.dateToday + '/scoreboard.json'
    }
  },
  computed: {
    ...mapGetters([
      'dateToday',
      'teamsData',
      'dateYesterday',
    ])
  },
  mounted () {
    this.$store.dispatch('initialiseDates')
    axios.get(this.url).then((response) => {
      this.scoreboardData = response.data
    })
  },
  methods: {
    apendPlusMinus (someStat) {
      if (/^\d+$/.test(someStat)) {
        if (parseInt(someStat) > 0) {
          return "+" + someStat
        } return someStat
      } return someStat
    },
    scoreboardDataFetch (url) {
      this.scoreboardData = this.requestApi(url)
      this.numberOfGames = this.scoreboardData.numGames
      return this.scoreboardData
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
