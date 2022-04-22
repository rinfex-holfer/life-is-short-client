<script lang="ts" setup>
import {getProductiveYearsLeft, getYearsLeft, getYearsSpent} from "../utils/date";
import {currentUser} from "../store";
import {computed} from "vue";

const lifeYearsLeft = computed(() => {
  const user = currentUser.value
  return getYearsLeft(new Date(user.dateOfBirth), user.expectedLifespan)
})

const productiveYearsLeft = computed(() => {
  const user = currentUser.value
  return getProductiveYearsLeft(new Date(user.dateOfBirth), user.expectedLifespan)
})

const yearsSpent = computed(() => {
  const user = currentUser.value
  return getYearsSpent(new Date(user.dateOfBirth))
})
</script>

<template>
  <div class="container">
    Прожито: {{ yearsSpent }}
    <br/>
    Продуктивной жизни осталось: {{ productiveYearsLeft }}
    <br/>
    Жить осталось: {{ lifeYearsLeft }}
  </div>
</template>

<style scoped>

</style>