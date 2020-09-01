<template>
  <section>
    <b-table mobile-cards="false" :data="calculateDataForTable" :columns="columns"></b-table>
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
      for (let i = 0; i<this.boxScoreData.length; i++) {
        let tableRow = {
          'player': this.boxScoreData[i].firstName + " " + this.boxScoreData[i].lastName,
          'minutes': this.boxScoreData[i].min,
          'field_goal': `${this.boxScoreData[i].fgm}-${this.boxScoreData[i].fga}`,
          '3_point': `${this.boxScoreData[i].tpm}-${this.boxScoreData[i].tpa}`,
          'free_throw': `${this.boxScoreData[i].ftm}-${this.boxScoreData[i].fta}`,
          'off_reb': this.boxScoreData[i].offReb,
          'def_reb': this.boxScoreData[i].defReb,
          'rebound': this.boxScoreData[i].totReb,
          'assist': this.boxScoreData[i].assists,
          'steal': this.boxScoreData[i].steals,
          'block': this.boxScoreData[i].blocks,
          'turnover': this.boxScoreData[i].turnovers,
          'foul': this.boxScoreData[i].pFouls,
          'plus_minus': this.boxScoreData[i].plusMinus,
          'point': this.boxScoreData[i].points
        }
        listToReturn.push(tableRow)
      }
      return listToReturn
    }
  }
}
</script>