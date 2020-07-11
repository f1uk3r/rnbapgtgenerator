<template>
  <div>
    <b-tabs v-model="activeTab">
      <b-tab-item label="Card">
        <template v-for="game in scoreboardData.games">
          <IndexCard :key="game.gameId" :gameData="game" @click="goToGenerator(game)" />
        </template>
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
      activeTab: 0,
      url: this.$store.getters.baseUrl + this.$store.getters.dateToday + this.$store.getters.scoreboardSuffix
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
    goToGenerator (gameData) {
      this.$router.push({ path: '/games', name: 'games', params: { id: gameData.gameId } })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
