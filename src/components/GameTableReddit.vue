<template>
  <div>
    <b-field label="Reddit BoxScore">
      <b-input type="textarea" v-model="computeRedditBoxscore">

      </b-input>
    </b-field>
    <div class="buttons">
      <b-button tag="a" :href="redditSubmissionUrl" type="is-info" target="_blank">
        Submit r/nba Post Game Thread
      </b-button>
      <b-button tag="a" :href="vTeamSubmissionUrl" type="is-primary" target="_blank">
        Submit r/{{ this.$store.getters.teamsData[this.gameData.awayTeam.teamTricode][6] }}Post Game Thread
      </b-button>
      <b-button tag="a" :href="hTeamSubmissionUrl" type="is-primary" target="_blank">
        Submit r/{{ this.$store.getters.teamsData[this.gameData.homeTeam.teamTricode][6] }} Post Game Thread
      </b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameTableReddit',
  props: {
    gameData: Object
  },
  computed: {
    computeRedditBoxscore () {
      let body = `
||		
|:-:|		
|[](/${this.gameData.awayTeam.teamTricode}) **${this.gameData.awayTeam.score} -  ${this.gameData.homeTeam.score}** [](/${this.gameData.homeTeam.teamTricode})|
|**Box Scores: [NBA](http://www.nba.com/games/${this.$store.getters.dateToday}/${this.gameData.awayTeam.teamTricode}${this.gameData.homeTeam.teamTricode}#/boxscore) & [Yahoo](http://sports.yahoo.com/nba/${this.$store.getters.teamsData[this.gameData.awayTeam.teamTricode][2]}${this.$store.getters.teamsData[this.gameData.homeTeam.teamTricode][2]}${this.$store.getters.dateToday}${this.$store.getters.teamsData[this.gameData.homeTeam.teamTricode][1]})**|


||
|:-:|											
|&nbsp;|		
|**GAME SUMMARY**|
|**Location:** ${this.gameData.arena.arenaName}(${this.gameData.attendance})|
|**Officials:** ${this.gameData.officials[0].name}, ${this.gameData.officials[1].name} and ${this.gameData.officials[2].name}|

|**Team**|**Q1**|**Q2**|**Q3**|**Q4**|**`
      if (this.gameData.awayTeam.periods.length === 4) {
        body = body + `Total**|
|:---|:--|:--|:--|:--|:--|
|${this.$store.getters.teamsData[this.gameData.awayTeam.teamTricode][0]}|${this.gameData.awayTeam.periods[0].score}|${this.gameData.awayTeam.periods[1].score}|${this.gameData.awayTeam.periods[2].score}|${this.gameData.awayTeam.periods[3].score}|${this.gameData.awayTeam.score}|
|${this.$store.getters.teamsData[this.gameData.homeTeam.teamTricode][0]}|${this.gameData.homeTeam.periods[0].score}|${this.gameData.homeTeam.periods[1].score}|${this.gameData.homeTeam.periods[2].score}|${this.gameData.homeTeam.periods[3].score}|${this.gameData.homeTeam.score}|`
      } else if (this.gameData.awayTeam.periods.length === 5) {
        body = body + `OT**|**Total**|
|:---|:--|:--|:--|:--|:--|
|${this.$store.getters.teamsData[this.gameData.awayTeam.teamTricode][0]}|${this.gameData.awayTeam.periods[0].score}|${this.gameData.awayTeam.periods[1].score}|${this.gameData.awayTeam.periods[2].score}|${this.gameData.awayTeam.periods[3].score}|${this.gameData.awayTeam.periods[4].score}|${this.gameData.awayTeam.score}|
|${this.$store.getters.teamsData[this.gameData.homeTeam.teamTricode][0]}|${this.gameData.homeTeam.periods[0].score}|${this.gameData.homeTeam.periods[1].score}|${this.gameData.homeTeam.periods[2].score}|${this.gameData.homeTeam.periods[3].score}|${this.gameData.homeTeam.periods[4].score}|${this.gameData.homeTeam.score}|`
      } else if (this.gameData.awayTeam.periods.length > 5) {
        for (let i = 4; i < this.gameData.awayTeam.periods.length; i++) {
          body = body + `OT${i-3}**|**`
        }
        body = body + `Total**|
|:---|:--|:--|:--|:--|:--|`
        for (let i = 4; i < this.gameData.awayTeam.periods.length; i++) {
          body = body + ':--|'
        }
        body = body + `\n|${this.$store.getters.teamsData[this.gameData.awayTeam.teamTricode][0]}|`
        for (let i = 0; this.gameData.awayTeam.periods.length; i++) {
          body = body + `${this.gameData.awayTeam.periods[i].score}|`
        }
        body = body + `${this.gameData.awayTeam.score}|
|${this.$store.getters.teamsData[this.gameData.homeTeam.teamTricode][0]}|`
        for (let i = 0; this.gameData.homeTeam.periods.length; i++) {
          body = body + `${this.gameData.homeTeam.periods[i].score}|`
        }
        body = body + `${this.gameData.homeTeam.score}|`
      }
      body = body + `
      
||		
|:-:|		
|&nbsp;|		
|**TEAM STATS**|

|**Team**|**PTS**|**FG**|**FG%**|**3P**|**3P%**|**FT**|**FT%**|**OREB**|**TREB**|**AST**|**PF**|**STL**|**TO**|**BLK**|
|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|
|${this.$store.getters.teamsData[this.gameData.awayTeam.teamTricode][0]}|${this.gameData.awayTeam.statistics.points}|${this.gameData.awayTeam.statistics.fieldGoalsMade}-${this.gameData.awayTeam.statistics.fieldGoalsAttempted}|${this.gameData.awayTeam.statistics.fieldGoalsPercentage}%|${this.gameData.awayTeam.statistics.threePointersMade}-${this.gameData.awayTeam.statistics.threePointersAttempted}|${this.gameData.awayTeam.statistics.threePointersPercentage}%|${this.gameData.awayTeam.statistics.freeThrowsMade}-${this.gameData.awayTeam.statistics.freeThrowsAttempted}|${this.gameData.awayTeam.statistics.freeThrowsPercentage}%|${this.gameData.awayTeam.statistics.reboundsOffensive}|${this.gameData.awayTeam.statistics.reboundsTotal}|${this.gameData.awayTeam.statistics.assists}|${this.gameData.awayTeam.statistics.foulsPersonal}|${this.gameData.awayTeam.statistics.steals}|${this.gameData.awayTeam.statistics.turnovers}|${this.gameData.awayTeam.statistics.blocks}|
|${this.$store.getters.teamsData[this.gameData.homeTeam.teamTricode][0]}|${this.gameData.homeTeam.statistics.points}|${this.gameData.homeTeam.statistics.fieldGoalsMade}-${this.gameData.homeTeam.statistics.fieldGoalsAttempted}|${this.gameData.homeTeam.statistics.fieldGoalsPercentage}%|${this.gameData.homeTeam.statistics.threePointersMade}-${this.gameData.homeTeam.statistics.threePointersAttempted}|${this.gameData.homeTeam.statistics.threePointersPercentage}%|${this.gameData.homeTeam.statistics.freeThrowsMade}-${this.gameData.homeTeam.statistics.freeThrowsAttempted}|${this.gameData.homeTeam.statistics.freeThrowsPercentage}%|${this.gameData.homeTeam.statistics.reboundsOffensive}|${this.gameData.homeTeam.statistics.reboundsTotal}|${this.gameData.homeTeam.statistics.assists}|${this.gameData.homeTeam.statistics.foulsPersonal}|${this.gameData.homeTeam.statistics.steals}|${this.gameData.homeTeam.statistics.turnovers}|${this.gameData.homeTeam.statistics.blocks}|

||
|:-:|
|&nbsp;|
|**PLAYER STATS**|

||||||||||||||||
|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|
**[](/${this.gameData.awayTeam.teamTricode}) ${this.$store.getters.teamsData[this.gameData.awayTeam.teamTricode][0]}**|**MIN**|**PTS**|**FGM-A**|**3PM-A**|**FTM-A**|**ORB**|**DRB**|**REB**|**AST**|**STL**|**BLK**|**TO**|**PF**|**+/-**|\n`
      for (let i = 0; i < this.gameData.awayTeam.players.length; i++) {
        const playerStat = this.gameData.awayTeam.players[i]
        if (playerStat.position !== "") {
          body = body + `|${playerStat.name}^${playerStat.position}|${playerStat.statistics.minutesCalculated}|${playerStat.statistics.points}|${playerStat.statistics.fieldGoalsMade}-${playerStat.statistics.fieldGoalsAttempted}|${playerStat.statistics.threePointersMade}-${playerStat.statistics.threePointersAttempted}|${playerStat.statistics.freeThrowsMade}-${playerStat.statistics.freeThrowsAttempted}|${playerStat.statistics.reboundsOffensive}|${playerStat.statistics.reboundsDefensive}|${playerStat.statistics.reboundsTotal}|${playerStat.statistics.assists}|${playerStat.statistics.steals}|${playerStat.statistics.blocks}|${playerStat.statistics.turnovers}|${playerStat.statistics.foulsPersonal}|${this.apendPlusMinus(playerStat.statistics.plusMinusPoints)}|\n`
        } else if (playerStat.position === "") {
          body = body + `|${playerStat.name}|${playerStat.statistics.minutesCalculated}|${playerStat.statistics.points}|${playerStat.statistics.fieldGoalsMade}-${playerStat.statistics.fieldGoalsAttempted}|${playerStat.statistics.threePointersMade}-${playerStat.statistics.threePointersAttempted}|${playerStat.statistics.freeThrowsMade}-${playerStat.statistics.freeThrowsAttempted}|${playerStat.statistics.reboundsOffensive}|${playerStat.statistics.reboundsDefensive}|${playerStat.statistics.reboundsTotal}|${playerStat.statistics.assists}|${playerStat.statistics.steals}|${playerStat.statistics.blocks}|${playerStat.statistics.turnovers}|${playerStat.statistics.foulsPersonal}|${this.apendPlusMinus(playerStat.statistics.plusMinusPoints)}|\n`
        }
      }
      body = body + `**[](/${this.gameData.homeTeam.teamTricode}) ${this.$store.getters.teamsData[this.gameData.homeTeam.teamTricode][0]}**|**MIN**|**PTS**|**FGM-A**|**3PM-A**|**FTM-A**|**ORB**|**DRB**|**REB**|**AST**|**STL**|**BLK**|**TO**|**PF**|**+/-**|\n`
      for (let i = 0; i <  this.gameData.homeTeam.players.length; i++) {
        const playerStat =  this.gameData.homeTeam.players[i]
        if (playerStat.position !== "") {
          body = body + `|${playerStat.name}^${playerStat.position}|${playerStat.statistics.minutesCalculated}|${playerStat.statistics.points}|${playerStat.statistics.fieldGoalsMade}-${playerStat.statistics.fieldGoalsAttempted}|${playerStat.statistics.threePointersMade}-${playerStat.statistics.threePointersAttempted}|${playerStat.statistics.freeThrowsMade}-${playerStat.statistics.freeThrowsAttempted}|${playerStat.statistics.reboundsOffensive}|${playerStat.statistics.reboundsDefensive}|${playerStat.statistics.reboundsTotal}|${playerStat.statistics.assists}|${playerStat.statistics.steals}|${playerStat.statistics.blocks}|${playerStat.statistics.turnovers}|${playerStat.statistics.foulsPersonal}|${this.apendPlusMinus(playerStat.statistics.plusMinusPoints)}|\n`
        } else if (playerStat.position === "") {
          body = body + `|${playerStat.name}|${playerStat.statistics.minutesCalculated}|${playerStat.statistics.points}|${playerStat.statistics.fieldGoalsMade}-${playerStat.statistics.fieldGoalsAttempted}|${playerStat.statistics.threePointersMade}-${playerStat.statistics.threePointersAttempted}|${playerStat.statistics.freeThrowsMade}-${playerStat.statistics.freeThrowsAttempted}|${playerStat.statistics.reboundsOffensive}|${playerStat.statistics.reboundsDefensive}|${playerStat.statistics.reboundsTotal}|${playerStat.statistics.assists}|${playerStat.statistics.steals}|${playerStat.statistics.blocks}|${playerStat.statistics.turnovers}|${playerStat.statistics.foulsPersonal}|${this.apendPlusMinus(playerStat.statistics.plusMinusPoints)}|\n`
        }
      }
      body = body + `
      
||
|:-:|
|^[rnbapgtgenerator](https://f1uk3r.github.io/rnbapgtgenerator/) ^by ^/u/f1uk3r|`
return body
    },
    computeRedditTitle () {
      const vTeamScore = parseInt(this.gameData.awayTeam.score)
      const hTeamScore = parseInt(this.gameData.homeTeam.score)
      let visitorTeam = 'not defined'
      let homeTeam = 'not defined'
      let title = '[Post Game Thread] The '
      if (this.gameData.gameStatusText === "Final") {
        visitorTeam = `${this.$store.getters.teamsData[this.gameData.awayTeam.teamTricode][0]} (${this.gameData.awayTeam.wins}-${this.gameData.awayTeam.losses})`
        homeTeam = `${this.$store.getters.teamsData[this.gameData.homeTeam.teamTricode][0]} (${this.gameData.homeTeam.wins}-${this.gameData.homeTeam.losses})`
      } else if ((vTeamScore > hTeamScore) && (parseInt(this.gameData.awayTeam.periods.length) >= 4)) {
        visitorTeam = `${this.$store.getters.teamsData[this.gameData.awayTeam.teamTricode][0]} (${parseInt(this.gameData.awayTeam.wins) + 1}-${this.gameData.awayTeam.losses})`
        homeTeam = `${this.$store.getters.teamsData[this.gameData.homeTeam.teamTricode][0]} (${this.gameData.homeTeam.wins}-${parseInt(this.gameData.homeTeam.losses) + 1})`
      } else if ((vTeamScore < hTeamScore) && (parseInt(this.gameData.awayTeam.periods.length) >= 4)) {
        visitorTeam = `${this.$store.getters.teamsData[this.gameData.awayTeam.teamTricode][0]} (${this.gameData.awayTeam.wins}-${parseInt(this.gameData.awayTeam.losses) + 1})`
        homeTeam = `${this.$store.getters.teamsData[this.gameData.homeTeam.teamTricode][0]} (${parseInt(this.gameData.homeTeam.wins) + 1}-${this.gameData.homeTeam.losses})`
      }

      if ((vTeamScore > hTeamScore) && (parseInt(this.gameData.awayTeam.periods.length) === 4)) {
        title = title + `${visitorTeam} defeat the ${homeTeam}, ${vTeamScore} - ${hTeamScore}`
      } else if ((vTeamScore > hTeamScore) && (parseInt(this.gameData.awayTeam.periods.length) === 5)) {
        title = title + `${visitorTeam} defeat the ${homeTeam} in OT, ${vTeamScore} - ${hTeamScore}`
      } else if ((vTeamScore > hTeamScore) && (this.gameData.awayTeam.periods.length > 5)) {
        title = title + `${visitorTeam} defeat the ${homeTeam} in ${this.gameData.awayTeam.periods.length - 4}OT, ${vTeamScore} - ${hTeamScore}`
      } else if ((vTeamScore < hTeamScore) && (parseInt(this.gameData.awayTeam.periods.length) === 4)) {
        title = title + `${homeTeam} defeat the ${visitorTeam}, ${hTeamScore} - ${vTeamScore}`
      } else if ((vTeamScore < hTeamScore) && (parseInt(this.gameData.awayTeam.periods.length) === 5)) {
        title = title + `${homeTeam} defeat the ${visitorTeam} in OT, ${hTeamScore} - ${vTeamScore}`
      } else if ((vTeamScore < hTeamScore) && (parseInt(this.gameData.awayTeam.periods.length) > 5)) {
        title = title + `${homeTeam} defeat the ${visitorTeam} in ${this.gameData.awayTeam.periods.length - 4}OT, ${hTeamScore} - ${vTeamScore}`
      }
      return title
    },
    redditSubmissionUrl () {
      return `https://www.reddit.com/r/nba/submit?title=${encodeURIComponent(this.computeRedditTitle)}&text=${encodeURIComponent(this.computeRedditBoxscore)}`
    },
    vTeamSubmissionUrl () {
      return `https://www.reddit.com/r/${this.$store.getters.teamsData[this.gameData.awayTeam.teamTricode][6]}/submit?title=${encodeURIComponent(this.computeRedditTitle)}&text=${encodeURIComponent(this.computeRedditBoxscore)}`
    },
    hTeamSubmissionUrl () {
      return `https://www.reddit.com/r/${this.$store.getters.teamsData[this.gameData.homeTeam.teamTricode][6]}/submit?title=${encodeURIComponent(this.computeRedditTitle)}&text=${encodeURIComponent(this.computeRedditBoxscore)}`
    }

  },
  methods: {
    apendPlusMinus (someStat) {
      if (/^\d+$/.test(someStat)) {
        if (parseInt(someStat) > 0) {
          return "+" + someStat
        } return someStat
      } return someStat
    }
  }
}
</script>

