<template>
  <section>
    <b-table :mobile-cards="false" :data="calculateDataForTable" :columns="columns"></b-table>
  </section>
</template>

<script>
export default {
  name: 'GameTable',
  props: {
    boxScoreData: Array
  },
  data () {
    return {
      columns : [
        {
          field: 'player',
          label: 'Player',
          searchable: true
        },
        {
          field: 'minutes',
          label: 'Min'
        },
        {
          field: 'field_goal',
          label: 'FGM-A'
        },
        {
          field: '3_point',
          label: '3PM-A'
        },
        {
          field: 'free_throw',
          label: 'FTM-A'
        },
        {
          field: 'off_reb',
          label: 'ORB'
        },
        {
          field: 'def_reb',
          label: 'DRB'
        },
        {
          field: 'rebound',
          label: 'REB'
        },
        {
          field: 'assist',
          label: 'AST'
        },
        {
          field: 'steal',
          label: 'STL'
        },
        {
          field: 'block',
          label: 'BLK'
        },
        {
          field: 'turnover',
          label: 'TO'
        },
        {
          field: 'foul',
          label: 'PF'
        },
        {
          field: 'plus_minus',
          label: '+/-'
        },
        {
          field: 'point',
          label: 'PTS'
        }
      ]
    }
  },
  computed: {
    calculateDataForTable () {
      let listToReturn = []
      const minuteRegex = /PT(\d+)M(\d*)(.?\d*)S/
      for (let i = 0; i<this.boxScoreData.length; i++) {
        const playerMinStat = this.boxScoreData[i].statistics.minutes.match(minuteRegex)
        let tableRow = {
          'player': this.boxScoreData[i].name,
          'minutes': `${playerMinStat[1]}:${playerMinStat[2]}`,
          'field_goal': `${this.boxScoreData[i].statistics.fieldGoalsMade}-${this.boxScoreData[i].statistics.fieldGoalsAttempted}`,
          '3_point': `${this.boxScoreData[i].statistics.threePointersMade}-${this.boxScoreData[i].statistics.threePointersAttempted}`,
          'free_throw': `${this.boxScoreData[i].statistics.freeThrowsMade}-${this.boxScoreData[i].statistics.freeThrowsAttempted}`,
          'off_reb': this.boxScoreData[i].statistics.reboundsOffensive,
          'def_reb': this.boxScoreData[i].statistics.reboundsDefensive,
          'rebound': this.boxScoreData[i].statistics.reboundsTotal,
          'assist': this.boxScoreData[i].statistics.assists,
          'steal': this.boxScoreData[i].statistics.steals,
          'block': this.boxScoreData[i].statistics.blocks,
          'turnover': this.boxScoreData[i].statistics.turnovers,
          'foul': this.boxScoreData[i].statistics.foulsPersonal,
          'plus_minus': this.boxScoreData[i].statistics.plusMinusPoints,
          'point': this.boxScoreData[i].statistics.points
        }
        listToReturn.push(tableRow)
      }
      return listToReturn
    }
  }
}
</script>