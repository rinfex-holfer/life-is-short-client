<script lang="ts" setup>
import {
  createCalendarYearsWithWeeks,
  createLifeYearsWithWeeks,
  getCurrentLifeWeek,
  getLifeInWeeks
} from "../../utils/date";
import {currentUser} from "../../store";
import {computed, ref} from "vue";
import {Week, WeekCalendar} from "../../domain";

const lifeInWeeks = computed((): WeekCalendar => {
  const user = currentUser.value
  if (!user) return []
  const c = createLifeYearsWithWeeks(user.dateOfBirth, user.expectedLifespan)
  console.log(c);
  return createLifeYearsWithWeeks(user.dateOfBirth, user.expectedLifespan)
})

const currentWeek = computed(() => {
  const user = currentUser.value
  if (!user) return 0
  return getCurrentLifeWeek(user.dateOfBirth)
})

let hoveredDate = ref<null | string>(null)

function showYear(year: number) {
  hoveredDate.value = '' + year
}

function showWeek(week: Week) {
  hoveredDate.value = `${week.starts} - ${week.ends} ${week.numInYear} ${week.numInLife}`
}

function hideYear() {
  hoveredDate.value = null
}

</script>

<template>
  <div>{{hoveredDate ? hoveredDate : '-'}}</div>
  <div class="container" v-on:mouseleave="hideYear">
    <template
        v-for="year in lifeInWeeks"
    >
        <span>{{year.year}}</span>
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
    </template>
  </div>
</template>

<style scoped>

</style>