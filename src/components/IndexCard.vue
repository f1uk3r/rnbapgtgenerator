<template>
  <div class="card">
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-5by5" :id="hTeamLogo"></figure>
          <p class="is-7">({{ gameData.homeTeam.wins }}-{{ gameData.homeTeam.losses }})</p>
        </div>
        <div class="media-content has-text-centered">
          <p class="title is-6"> {{ gameData.homeTeam.score }} - {{ gameData.awayTeam.score }}</p>
          <p class="subtitle is-6" v-if="gameData.period>1 & gameData.gameClock!==''">{{  gameData.gameClock  }} {{  gameData.period  }}Q</p>
          <p class="subtitle is-6" v-else-if="gameData.period===1 && gameData.gameClock!==''">{{  gameData.gameClock  }} {{  gameData.period  }}Q</p>
          <p class="subtitle is-6" v-else-if="gameData.period===1 && gameData.gameClock===''">{{  gameData.startTimeEastern  }}</p>
        </div>
        <div class="media-right">
          <figure class="image is-5by5" :id="vTeamLogo"></figure>
          <p class="is-7">({{ gameData.awayTeam.wins }}-{{ gameData.awayTeam.losses }})</p>
        </div>
      </div>
      <!-- <div class="content">
        <p v-if="gameData.attendance===0" class="is-6">{{ gameData.arena.name }}, {{ gameData.arena.city }}</p>
        <p v-else-if="gameData.attendance" class="is-6">{{ gameData.arena.name }}, {{ gameData.arena.city }} ({{ gameData.attendance}})</p>
        <p v-else>{{ gameData.arena.name }}, {{ gameData.arena.city }}</p>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexCard',
  props: {
    gameData: Object
  },
  computed: {
    hTeamLogo () {
      return this.$store.getters.teamsData[this.gameData.homeTeam.teamTricode][5]
    },
    vTeamLogo () {
      return this.$store.getters.teamsData[this.gameData.awayTeam.teamTricode][5]
    }
  }
}
</script>