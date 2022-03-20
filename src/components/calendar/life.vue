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
  return createLifeYearsWithWeeks(user.dateOfBirth, user.expectedLifespan)
})

const currentWeek = computed(() => {
  const user = currentUser.value
  if (!user) return 0
  // TODO fix this shit - doesn't work with createLifeYearsWithWeeks
  console.log(getCurrentLifeWeek(user.dateOfBirth))
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