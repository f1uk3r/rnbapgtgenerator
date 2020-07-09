<template>
  <div class="hello">

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Index',
  props: {
  },
  computed: {
    dateToday () {
      let date = Date()
      let formattedDate = date.getDate() + (date.getMonth() + 1) + date.getFullYear()
      return formattedDate
    }
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
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
