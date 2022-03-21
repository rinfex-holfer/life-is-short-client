<script lang="ts" setup>
import {
  createCalendarYearsWithWeeks,
  createLifeYearsWithWeeks,
  getCurrentLifeWeek,
  getLifeInWeeks, getYearsSpent, getYearsSpentNum, numF
} from "../../utils/date";
import {currentUser} from "../../store";
import {computed, ref} from "vue";
import {LifeStage, Week, WeekCalendar} from "../../domain";
import {compareAsc, compareDesc, getYear} from "date-fns";

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

const lifeInWeeks = computed((): WeekCalendar => {
  const user = currentUser.value
  if (!user) return []
  return createLifeYearsWithWeeks(user.dateOfBirth, user.expectedLifespan)
})

const currLifeYear = computed(() => {
  const user = currentUser.value
  if (!user) return 0
  return getYearsSpentNum(user.dateOfBirth) + 1
})

const currentLifeWeek = computed(() => {
  const user = currentUser.value
  if (!user) return 0
  const now = new Date()

  const week = lifeInWeeks.value[currLifeYear.value-1]
      .weeks
      .find(week => compareAsc(week.starts, now) !== 1 && compareAsc(week.ends, now) !== -1)

  if (!week) return 0
  return week.numInLife
})

let hoveredDate = ref<null | string>(null)

function showWeek(week: Week) {
  hoveredDate.value = `${numF(week.starts)} - ${numF(week.ends)} ${week.numInYear} ${week.numInLife}`
}

function hideYear() {
  hoveredDate.value = null
}

</script>

<template>
  <div>{{hoveredDate ? hoveredDate : '-'}}</div>
  <div v-on:mouseleave="hideYear" class="life">
    <div
        class="lifeRow"
        :style="{background: getYearColor(year.year)}"
        v-for="year in lifeInWeeks"
    >
        <span class="lifeRowYear" :class="{lifeRowYearSpent: year.year < currLifeYear}">{{year.year}}</span>
        <span
          v-for="week in year.weeks"
          class="item itemSmall"
          :class="{
            itemActive: week.numInLife === currentLifeWeek,
            itemSpent: week.numInLife < currentLifeWeek,
          }"
          v-on:mouseover="showWeek(week)"
        >
        </span>
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
</style>