<script lang="ts" setup>
import {numF} from "../../utils/date";
import {lifeInWeeks, currLifeYear, currentLifeWeekNumber} from "../../store";
import {ref} from "vue";
import {LifeStage, LifeWeek} from "../../domain";

const stages: LifeStage[] = [
  {fromTo: [0, 12], color: "#f6d5b1"},
  {fromTo: [13, 19], color: "#dcb3b8"},
  {fromTo: [20, 34], color: "#eba7ce"},
  {fromTo: [35, 49], color: "#e590d1"},
  {fromTo: [50, 69], color: "#6bcced"},
  {fromTo: [70, 9999], color: "#7bf088"},
]
function getYearColor(year: number) {
  return stages.find(s => s.fromTo[0] <= year && s.fromTo[1] >= year)?.color || "black"
}

let hoveredDate = ref<null | string>(null)

function showWeek(week: LifeWeek) {
  hoveredDate.value = `${numF(week.starts)} - ${numF(week.ends)} | № в году:${week.numInYear} | № в жизни:${week.numInLife}`
}

function hideYear() {
  hoveredDate.value = null
}

</script>

<template>
  <div class="selectedWeek">{{hoveredDate ? hoveredDate : '-'}}</div>
  <div v-on:mouseleave="hideYear" class="life">
    <div
        class="lifeRow"
        :style="{background: getYearColor(year.numInLife)}"
        v-for="year in lifeInWeeks"
    >
        <span class="lifeRowYear" :class="{lifeRowYearSpent: year.numInLife < currLifeYear}">{{
            year.numInLife
          }}</span>
        <router-link
          :to="`/calendar/week/${week.numInLife}`"
          v-for="week in year.weeks"
          class="item itemSmall"
          :class="{
            itemActive: week.numInLife === currentLifeWeekNumber,
            itemSpent: week.numInLife < currentLifeWeekNumber,
          }"
          v-on:mouseover="showWeek(week)"
        >
        </router-link>
    </div>
  </div>
</template>

<style scoped>
.life {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.lifeRow {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}

.lifeRowYear {
  width: 20px
}

.lifeRowYearSpent {
  color: grey;
}

.selectedWeek {
  position: fixed;
  left: 20px;
  bottom: 20px;
  background: white;
  padding: 5px;
}
</style>