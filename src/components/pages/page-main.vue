<script>
import LifeCounter from "../life-counter.vue";

export default {
  name: "main-page",
  components: {
    LifeCounter
  }
}

</script>

<template>
  <h1>Life is short</h1>
  <LifeCounter/>
  <router-link to="/calendar">Календарь</router-link>
</template>

<style scoped>

</style>