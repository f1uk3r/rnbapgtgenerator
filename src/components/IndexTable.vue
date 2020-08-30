<template>
  <section>
    <b-table :data="calculateDataToDisplay" :columns="columns" sticky-header></b-table>
  </section>
</template>

<script>
export default {
  name: 'IndexTable',
  props: {
    gamesData: Array
  },
  data () {
    return {
      columns: [
        {
          field: 'start_time',
          label: 'Start Time (ET)'
        },
        {
          field: 'home_team',
          label: 'Home Team',
          searchable: true
        },
        {
          field: 'away_team',
          label: 'Away Team',
          searchable: true
        },
        {
          field: 'score',
          label: 'Score'
        },
        {
          field: 'clock',
          label: 'Clock'
        }
      ]
    }
  },
  computed: {
    calculateDataToDisplay () {
      let listToReturn = []
      for (let i = 0; i<this.gamesData.length; i++) {
        let dataToReturn = {
          'start_time': this.gamesData[i].startTimeEastern,
          'home_team': this.$store.getters.teamsData[this.gamesData[i].hTeam.triCode][0],
          'away_team': this.$store.getters.teamsData[this.gamesData[i].vTeam.triCode][0],
          'score': this.gamesData[i].hTeam.score + " - " + this.gamesData[i].vTeam.score,
          'clock': (this.gamesData[i].period.current===0)
            ? "PRE-GAME"
            : (this.gamesData[i].period.current>=4 && (this.gamesData[i].clock===''||this.gamesData[i].clock==='0.0') && (this.gamesData[i].hTeam.score !== this.gamesData[i].vTeam.score))
            ? "FINAL"
            : this.gamesData[i].clock + " " + this.gamesData[i].period.current + "Q"
        }
        listToReturn.push(dataToReturn)
      }
      return listToReturn
    }
  }
}
</script>