<template>
  <div>
    <b-field label="Reddit BoxScore">
      <b-input type="textarea" v-model="computeRedditBoxscore">

      </b-input>
    </b-field>
    <b-button tag="a" :href="redditSubmissionUrl" type="is-info" target="_blank">
      Submit Post Game Thread
    </b-button>
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
      const basicData = this.gameData.basicGameData
      const gameStats = this.gameData.stats
      const boxscoreData = gameStats.activePlayers
      let body = `
||		
|:-:|		
|[](/${basicData.vTeam.triCode}) **${basicData.vTeam.score} -  ${basicData.hTeam.score}** [](/${basicData.hTeam.triCode})|
|**Box Scores: [NBA](http://www.nba.com/games/${this.$store.getters.dateToday}/${basicData.vTeam.triCode}${basicData.hTeam.triCode}#/boxscore) & [Yahoo](http://sports.yahoo.com/nba/${this.$store.getters.teamsData[basicData.vTeam.triCode][2]}${this.$store.getters.teamsData[basicData.hTeam.triCode][2]}${this.$store.getters.dateToday}${this.$store.getters.teamsData[basicData.hTeam.triCode][1]})**|


||
|:-:|											
|&nbsp;|		
|**GAME SUMMARY**|
|**Location:** ${basicData.arena.name}(${basicData.attendance}), **Clock:** ${basicData.clock}|
|**Officials:** ${basicData.officials.formatted[0].firstNameLastName}, ${basicData.officials.formatted[1].firstNameLastName} and ${basicData.officials.formatted[2].firstNameLastName}|

|**Team**|**Q1**|**Q2**|**Q3**|**Q4**|**`
      if (basicData.vTeam.linescore.length === 4) {
        body = body + `Total**|
|:---|:--|:--|:--|:--|:--|
|${this.$store.getters.teamsData[basicData.vTeam.triCode][0]}|${basicData.vTeam.linescore[0].score}|${basicData.vTeam.linescore[1].score}|${basicData.vTeam.linescore[2].score}|${basicData.vTeam.linescore[3].score}|${basicData.vTeam.score}|
|${this.$store.getters.teamsData[basicData.hTeam.triCode][0]}|${basicData.hTeam.linescore[0].score}|${basicData.hTeam.linescore[1].score}|${basicData.hTeam.linescore[2].score}|${basicData.hTeam.linescore[3].score}|${basicData.hTeam.score}|`
      } else if (basicData.vTeam.linescore.length === 5) {
        body = body + `OT**|**Total**|
|:---|:--|:--|:--|:--|:--|
|${this.$store.getters.teamsData[basicData.vTeam.triCode][0]}|${basicData.vTeam.linescore[0].score}|${basicData.vTeam.linescore[1].score}|${basicData.vTeam.linescore[2].score}|${basicData.vTeam.linescore[3].score}|${basicData.vTeam.linescore[4].score}|${basicData.vTeam.score}|
|${this.$store.getters.teamsData[basicData.hTeam.triCode][0]}|${basicData.hTeam.linescore[0].score}|${basicData.hTeam.linescore[1].score}|${basicData.hTeam.linescore[2].score}|${basicData.hTeam.linescore[3].score}|${basicData.hTeam.linescore[4].score}|${basicData.hTeam.score}|`
      } else if (basicData.vTeam.linescore.length > 5) {
        for (let i = 4; i < basicData.vTeam.linescore.length; i++) {
          body = body + `OT${i-3}**|**`
        }
        body = body + `Total**|
|:---|:--|:--|:--|:--|:--|`
        for (let i = 4; i < basicData.vTeam.linescore.length; i++) {
          body = body + ':--|'
        }
        body = body + `\n|${this.$store.getters.teamsData[basicData.vTeam.triCode][0]}|`
        for (let i = 0; basicData.vTeam.linescore.length; i++) {
          body = body + `${basicData.vTeam.linescore[i].score}|`
        }
        body = body + `${basicData.vTeam.score}|
|${this.$store.getters.teamsData[basicData.hTeam.triCode][0]}|`
        for (let i = 0; basicData.hTeam.linescore.length; i++) {
          body = body + `${basicData.hTeam.linescore[i].score}|`
        }
        body = body + `${basicData.hTeam.score}|`
      }
      body = body + `
      
||		
|:-:|		
|&nbsp;|		
|**TEAM STATS**|

|**Team**|**PTS**|**FG**|**FG%**|**3P**|**3P%**|**FT**|**FT%**|**OREB**|**TREB**|**AST**|**PF**|**STL**|**TO**|**BLK**|
|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|
|${this.$store.getters.teamsData[basicData.vTeam.triCode][0]}|${gameStats.vTeam.totals.points}|${gameStats.vTeam.totals.fgm}-${gameStats.vTeam.totals.fga}|${gameStats.vTeam.totals.fgp}%|${gameStats.vTeam.totals.tpm}-${gameStats.vTeam.totals.tpa}|${gameStats.vTeam.totals.tpp}%|${gameStats.vTeam.totals.ftm}-${gameStats.vTeam.totals.fta}|${gameStats.vTeam.totals.ftp}%|${gameStats.vTeam.totals.offReb}|${gameStats.vTeam.totals.totReb}|${gameStats.vTeam.totals.assists}|${gameStats.vTeam.totals.pFouls}|${gameStats.vTeam.totals.steals}|${gameStats.vTeam.totals.turnovers}|${gameStats.vTeam.totals.blocks}|
|${this.$store.getters.teamsData[basicData.hTeam.triCode][0]}|${gameStats.hTeam.totals.points}|${gameStats.hTeam.totals.fgm}-${gameStats.hTeam.totals.fga}|${gameStats.hTeam.totals.fgp}%|${gameStats.hTeam.totals.tpm}-${gameStats.hTeam.totals.tpa}|${gameStats.hTeam.totals.tpp}%|${gameStats.hTeam.totals.ftm}-${gameStats.hTeam.totals.fta}|${gameStats.hTeam.totals.ftp}%|${gameStats.hTeam.totals.offReb}|${gameStats.hTeam.totals.totReb}|${gameStats.hTeam.totals.assists}|${gameStats.hTeam.totals.pFouls}|${gameStats.hTeam.totals.steals}|${gameStats.hTeam.totals.turnovers}|${gameStats.hTeam.totals.blocks}|

||
|:-:|
|&nbsp;|
|**TEAM LEADERS**|

|**Team**|**Points**|**Rebounds**|**Assists**|
|:--|:--|:--|:--|
|${this.$store.getters.teamsData[basicData.vTeam.triCode][0]}|**${gameStats.vTeam.leaders.points.value}** ${gameStats.vTeam.leaders.points.players[0].firstName} ${gameStats.vTeam.leaders.points.players[0].lastName}|**${gameStats.vTeam.leaders.rebounds.value}** ${gameStats.vTeam.leaders.rebounds.players[0].firstName} ${gameStats.vTeam.leaders.rebounds.players[0].lastName}|**${gameStats.vTeam.leaders.assists.value}** ${gameStats.vTeam.leaders.assists.players[0].firstName} ${gameStats.vTeam.leaders.assists.players[0].lastName}|
|${this.$store.getters.teamsData[basicData.hTeam.triCode][0]}|**${gameStats.hTeam.leaders.points.value}** ${gameStats.hTeam.leaders.points.players[0].firstName} ${gameStats.hTeam.leaders.points.players[0].lastName}|**${gameStats.hTeam.leaders.rebounds.value}** ${gameStats.hTeam.leaders.rebounds.players[0].firstName} ${gameStats.hTeam.leaders.rebounds.players[0].lastName}|**${gameStats.hTeam.leaders.assists.value}** ${gameStats.hTeam.leaders.assists.players[0].firstName} ${gameStats.hTeam.leaders.assists.players[0].lastName}|

||
|:-:|
|&nbsp;|
|**PLAYER STATS**|

||||||||||||||||
|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|
**[](/${basicData.vTeam.triCode}) ${this.$store.getters.teamsData[basicData.vTeam.triCode][0]}**|**MIN**|**FGM-A**|**3PM-A**|**FTM-A**|**ORB**|**DRB**|**REB**|**AST**|**STL**|**BLK**|**TO**|**PF**|**+/-**|**PTS**|\n`
      for (let i = 0; i < boxscoreData.length; i++) {
        const playerStat = boxscoreData[i]
        if (playerStat.teamId === basicData.vTeam.teamId && playerStat.pos !== "") {
          body = body + `|${playerStat.firstName} ${playerStat.lastName}^${playerStat.pos}|${playerStat.min}|${playerStat.fgm}-${playerStat.fga}|${playerStat.tpm}-${playerStat.tpa}|${playerStat.ftm}-${playerStat.fta}|${playerStat.offReb}|${playerStat.defReb}|${playerStat.totReb}|${playerStat.assists}|${playerStat.steals}|${playerStat.blocks}|${playerStat.turnovers}|${playerStat.pFouls}|${this.apendPlusMinus(playerStat.plusMinus)}|${playerStat.points}|\n`
        } else if (playerStat.teamId === basicData.vTeam.teamId && playerStat.pos === "") {
          body = body + `|${playerStat.firstName} ${playerStat.lastName}|${playerStat.min}|${playerStat.fgm}-${playerStat.fga}|${playerStat.tpm}-${playerStat.tpa}|${playerStat.ftm}-${playerStat.fta}|${playerStat.offReb}|${playerStat.defReb}|${playerStat.totReb}|${playerStat.assists}|${playerStat.steals}|${playerStat.blocks}|${playerStat.turnovers}|${playerStat.pFouls}|${this.apendPlusMinus(playerStat.plusMinus)}|${playerStat.points}|\n`
        }
      }
      body = body + `**[](/${basicData.hTeam.triCode}) ${this.$store.getters.teamsData[basicData.hTeam.triCode][0]}**|**MIN**|**FGM-A**|**3PM-A**|**FTM-A**|**ORB**|**DRB**|**REB**|**AST**|**STL**|**BLK**|**TO**|**PF**|**+/-**|**PTS**|\n`
      for (let i = 0; i < boxscoreData.length; i++) {
        const playerStat = boxscoreData[i]
        if (playerStat.teamId !== basicData.vTeam.teamId && playerStat.pos !== "") {
          body = body + `|${playerStat.firstName} ${playerStat.lastName}^${playerStat.pos}|${playerStat.min}|${playerStat.fgm}-${playerStat.fga}|${playerStat.tpm}-${playerStat.tpa}|${playerStat.ftm}-${playerStat.fta}|${playerStat.offReb}|${playerStat.defReb}|${playerStat.totReb}|${playerStat.assists}|${playerStat.steals}|${playerStat.blocks}|${playerStat.turnovers}|${playerStat.pFouls}|${this.apendPlusMinus(playerStat.plusMinus)}|${playerStat.points}|\n`
        } else if (playerStat.teamId !== basicData.vTeam.teamId && playerStat.pos === "") {
          body = body + `|${playerStat.firstName} ${playerStat.lastName}|${playerStat.min}|${playerStat.fgm}-${playerStat.fga}|${playerStat.tpm}-${playerStat.tpa}|${playerStat.ftm}-${playerStat.fta}|${playerStat.offReb}|${playerStat.defReb}|${playerStat.totReb}|${playerStat.assists}|${playerStat.steals}|${playerStat.blocks}|${playerStat.turnovers}|${playerStat.pFouls}|${this.apendPlusMinus(playerStat.plusMinus)}|${playerStat.points}|\n`
        }
      }
      body = body + `
      
||
|:-:|
|^[bot-script](https://github.com/f1uk3r/Some-Python-Scripts/blob/master/reddit-nba-bot/reddit-boxscore-bot.py) ^by ^/u/f1uk3r|`
      /* |**Team**|**Biggest Lead**|**Longest Run**|**PTS: In Paint**|**PTS: Off TOs**|**PTS: Fastbreak**|
|:--|:--|:--|:--|:--|:--|
|${this.$store.getters.teamsData[basicData.vTeam.triCode][0]}|${gameStats.vTeam.biggestLead}|${gameStats.vTeam.longestRun}|${gameStats.vTeam.pointsInPaint}|${gameStats.vTeam.pointsOffTurnovers}|${gameStats.vTeam.fastBreakPoints}|
|${this.$store.getters.teamsData[basicData.hTeam.triCode][0]}|${gameStats.hTeam.biggestLead}|${gameStats.hTeam.longestRun}|${gameStats.hTeam.pointsInPaint}|${gameStats.hTeam.pointsOffTurnovers}|${gameStats.hTeam.fastBreakPoints}| */
      return body
    },
    computeRedditTitle () {
      const basicData = this.gameData.basicGameData
      const vTeamScore = basicData.vTeam.score
      const hTeamScore = basicData.hTeam.score
      let visitorTeam = 'not defined'
      let homeTeam = 'not defined'
      let title = '[Post Game Thread] The '
      if (basicData.isGameActivated === false) {
        visitorTeam = `${this.$store.getters.teamsData[basicData.vTeam.triCode][0]} (${basicData.vTeam.seriesWin}-${basicData.vTeam.seriesLoss})`
        homeTeam = `${this.$store.getters.teamsData[basicData.hTeam.triCode][0]} (${basicData.hTeam.seriesWin}-${basicData.hTeam.seriesLoss})`
      } else if ((basicData.isGameActivated == true) && (vTeamScore > hTeamScore) && (basicData.vTeam.linescore.length >= 4)) {
        visitorTeam = `${this.$store.getters.teamsData[basicData.vTeam.triCode][0]} (${basicData.vTeam.seriesWin + 1}-${basicData.vTeam.seriesLoss})`
        homeTeam = `${this.$store.getters.teamsData[basicData.hTeam.triCode][0]} (${basicData.hTeam.seriesWin}-${basicData.hTeam.seriesLoss + 1})`
      } else if ((basicData.isGameActivated == true) && (vTeamScore < hTeamScore) && (basicData.vTeam.linescore.length >= 4)) {
        visitorTeam = `${this.$store.getters.teamsData[basicData.vTeam.triCode][0]} (${basicData.vTeam.seriesWin}-${basicData.vTeam.seriesLoss + 1})`
        homeTeam = `${this.$store.getters.teamsData[basicData.hTeam.triCode][0]} (${basicData.hTeam.seriesWin + 1}-${basicData.hTeam.seriesLoss})`
      }

      if ((vTeamScore > hTeamScore) && (basicData.vTeam.linescore.length === 4)) {
        title = title + `${visitorTeam} defeat the ${homeTeam}, ${vTeamScore} - ${hTeamScore}`
      } else if ((vTeamScore > hTeamScore) && (basicData.vTeam.linescore.length === 5)) {
        title = title + `${visitorTeam} defeat the ${homeTeam} in OT, ${vTeamScore} - ${hTeamScore}`
      } else if ((vTeamScore > hTeamScore) && (basicData.vTeam.linescore.length > 5)) {
        title = title + `${visitorTeam} defeat the ${homeTeam} in ${basicData.vTeam.linescore.length - 4} OT, ${vTeamScore} - ${hTeamScore}`
      } else if ((vTeamScore < hTeamScore) && (basicData.vTeam.linescore.length === 4)) {
        title = title + `${homeTeam} defeat the ${visitorTeam}, ${hTeamScore} - ${vTeamScore}`
      } else if ((vTeamScore < hTeamScore) && (basicData.vTeam.linescore.length === 5)) {
        title = title + `${homeTeam} defeat the ${visitorTeam} in OT, ${hTeamScore} - ${vTeamScore}`
      } else if ((vTeamScore < hTeamScore) && (basicData.vTeam.linescore.length > 5)) {
        title = title + `${homeTeam} defeat the ${visitorTeam} in ${basicData.vTeam.linescore.length - 4} OT, ${hTeamScore} - ${vTeamScore}`
      }
      return title
    },
    redditSubmissionUrl () {
      return `https://www.reddit.com/r/nba_mods/submit?title=${encodeURIComponent(this.computeRedditTitle)}&text=${encodeURIComponent(this.computeRedditBoxscore)}`
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

