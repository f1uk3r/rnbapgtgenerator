<template>
  <div>
    <b-tabs v-model="activeTab">
      <b-tab-item label="Card">
        <IndexCard />
      </b-tab-item>
      <b-tab-item label="Table">
        <IndexTable />
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script>
import axios from 'axios'
import IndexCard from './IndexCard'
import IndexTable from './IndexTable'

export default {
  name: 'Index',
  components: {
    IndexCard,
    IndexTable
  },
  data () {
    return  {
      scoreboardData: {}
    }
  },
  computed: {
    dateToday () {
      let date = Date()
      let formattedDate = date.getDate() + (date.getMonth() + 1) + date.getFullYear()
      return formattedDate
    }
  },
  mounted () {
    this.scoreboardDataFetch(url)
  },
  methods: {
    requestApi (url) {
      axios.get(url)
      .then(data => {
        return data
      })
    },
    apendPlusMinus (someStat) {
      if (/^\d+$/.test(someStat)) {
        if (parseInt(someStat) > 0) {
          return "+" + someStat
        } return someStat
      } return someStat
    },
    checkYesterdayLastGame () {
      
    },
    scoreboardDataFetch (url) {
      this.scoreboardData = this.requestApi(url)
      return this.scoreboardData
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
