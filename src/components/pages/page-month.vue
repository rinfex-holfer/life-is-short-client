<script lang="ts" setup>
import Month from "../month.vue";
import {useRouter} from "vue-router";
import {lifeInMonths} from "../../store";
import {LifeMonth} from "../../domain";
import {computed} from "vue";

const router = useRouter()

const monthNumFromQuery = router.currentRoute.value.query.monthNum
const monthNumInLife = monthNumFromQuery ? +monthNumFromQuery : 0

const month = computed<LifeMonth>(() => {
  const yearOfLife = Math.floor(monthNumInLife / 12)
  const selectedMonth = lifeInMonths.value[yearOfLife].months.find(m => m.numInLife === monthNumInLife)

  if (!selectedMonth) {
    console.error("wrong month url")
    const lastYear = lifeInMonths.value[lifeInMonths.value.length - 1]
    return lastYear.months[lastYear.months.length - 1]
  }

  return selectedMonth
})

</script>

<template>
<Month :month="month" />
</template>

<style scoped>

</style>