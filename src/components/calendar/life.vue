<script lang="ts" setup>
import {
  createCalendarYearsWithWeeks,
  createLifeYearsWithWeeks,
  getCurrentLifeWeek,
  getLifeInWeeks, getYearsSpent, getYearsSpentNum, numF
} from "../../utils/date";
import {currentUser} from "../../store";
import {computed, ref} from "vue";
import {Week, WeekCalendar} from "../../domain";
import {compareAsc, compareDesc, getYear} from "date-fns";

const lifeInWeeks = computed((): WeekCalendar => {
  const user = currentUser.value
  if (!user) return []
  return createLifeYearsWithWeeks(user.dateOfBirth, user.expectedLifespan)
})

const currentWeek = computed(() => {
  const user = currentUser.value
  if (!user) return 0
  const now = new Date()
  const currYearOfLife = getYearsSpentNum(user.dateOfBirth) + 1

  console.log("currYearOfLife", currYearOfLife)
  console.log("lifeInWeeks.value", lifeInWeeks.value, lifeInWeeks.value[currYearOfLife-1])
  const currentLifeWeek = lifeInWeeks.value[currYearOfLife-1]
      .weeks
      .find(week => compareAsc(week.starts, now) !== 1 && compareAsc(week.ends, now) !== -1)

  console.log("currentLifeWeek", currentLifeWeek)

  if (!currentLifeWeek) return 0
  return currentLifeWeek.numInLife
})

let hoveredDate = ref<null | string>(null)

function showYear(year: number) {
  hoveredDate.value = '' + year
}

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
        v-for="year in lifeInWeeks"
    >
        <span class="lifeRowYear">{{year.year}}</span>
        <span
          v-for="week in year.weeks"
          class="item itemSmall"
          :class="{
            itemActive: week.numInLife === currentWeek,
            itemSpent: week.numInLife < currentWeek,
          }"
          v-on:mouseover="showWeek(week)"
        >
        </span>
    </div>
  </div>
</template>

<style scoped>

</style>