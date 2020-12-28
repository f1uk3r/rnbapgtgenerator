<template>
  <div>
    <b-tabs v-model="activeTab">
      <b-tab-item label="Card">
        <router-link :to="{ name: 'Games', params: { id: game.gameId }}" v-for="game in scoreboardData.games" :key="game.gameId" >
          <IndexCard :gameData="game" />
        </router-link>
      </b-tab-item>
      <b-tab-item label="Table">
        <IndexTable :gamesData="scoreboardData.games"/>
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script>
import axios from 'axios'
import IndexCard from '../components/IndexCard.vue'
import IndexTable from '../components/IndexTable.vue'
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
      activeTab: 0
    }
  },
  computed: {
    ...mapGetters([
      'dateToday',
      'teamsData',
      'dateYesterday',
      'yesterdayLastGameEnd'
    ]),
    getUrl () {
      return this.$store.getters.baseUrl + this.$store.getters.dateToday + this.$store.getters.scoreboardSuffix
    }
  },
  mounted () {
    this.$store.dispatch('initialiseDates')

    this.$store.dispatch('checkYesterdayLastGameEnd')

    this.getScoreboardData()
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
    }
  },
  created () {
    setInterval(() => {
      this.getScoreboardData()
    }, 5000)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
