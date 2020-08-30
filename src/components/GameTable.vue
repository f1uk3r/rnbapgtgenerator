<template>
  <section>
    <b-table :data="calculateDataToDisplay" :columns="columns" sticky-header></b-table>
  </section>
</template>

<script>
export default {
  name: 'GameTable',
  props: {
    gameData: Array
  },
}
</script>