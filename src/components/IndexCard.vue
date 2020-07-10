<template>
  <div class="card">
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-5by5" :id="hTeamLogo"></figure>
          <p class="is-7">({{ gameData.hTeam.win }}-{{ gameData.hTeam.loss }})</p>
        </div>
        <div class="media-content">
          <p class="title is-5">{{ gameData.hTeam.score }} - {{ gameData.vTeam.score }}</p>
          <p class="subtitle is-6" v-if="gameData.period.current>1 & gameData.clock!==''">{{  gameData.clock  }}</p>
          <p class="subtitle is-6" v-else-if="gameData.period.current===1 && gameData.clock!==''">{{  gameData.clock  }}</p>
          <p class="subtitle is-6" v-else-if="gameData.period.current===1 && gameData.clock===''">{{  gameData.startTimeEastern  }}</p>
        </div>
        <div class="media-right">
          <figure class="image is-5by5" :id="vTeamLogo"></figure>
          <p class="is-7">({{ gameData.vTeam.win }}-{{ gameData.vTeam.loss }})</p>
        </div>
      </div>
      <div class="content">
        <p class="is-6">{{ gameData.arena.name }}, {{ gameData.arena.city }} ({{ gameData.attendance}})</p>
      </div>
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
      return this.$store.getters.teamsData[this.gameData.hTeam.triCode][5]
    },
    vTeamLogo () {
      return this.$store.getters.teamsData[this.gameData.vTeam.triCode][5]
    }
  }
}
</script>