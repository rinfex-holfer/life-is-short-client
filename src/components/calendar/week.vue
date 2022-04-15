<script setup lang="ts">

import {currentTime, lifeInWeeks} from "../../store";
import {getDays} from "../../domain/api/days";
import {computed, ref, watchEffect} from "vue";
import {LifeDay} from "../../domain";
import {addDays, format, isAfter, isBefore, isSameDay} from "date-fns";
import {useRoute} from "vue-router";
import {getLocale} from "../../utils/locale";

type DaysExtended = LifeDay & {
  state: DayState
  label: string
}

enum DayState {
  SPENT,
  UNSPENT,
  CURRENT
}

function getDayState(day: Date, today: Date): DayState {
  if (isSameDay(today, day)) return DayState.CURRENT
  else if (isBefore(day, today)) return DayState.SPENT
  return DayState.UNSPENT
}

const route = useRoute()
const weekNum = +route.params.weekNum

const yearOfSelectedWeek = computed(() => lifeInWeeks.value.find(year =>
    year.weeks[0].numInLife <= weekNum
    && year.weeks[year.weeks.length - 1].numInLife >= weekNum
))

const selectedWeek = computed(() => yearOfSelectedWeek.value?.weeks.find(w => w.numInLife === weekNum))

const daysExtended = ref<DaysExtended[]>([])

watchEffect(async function loadDays () {
  if (!selectedWeek.value) {
    daysExtended.value = []
    return;
  }

  const weekValue = selectedWeek.value;

  let apiDays: LifeDay[] = []
  try {
    apiDays = await getDays(weekValue.starts.toISOString(), weekValue.ends.toISOString())
  } catch (e) {
    daysExtended.value = []
    return;
  }

  const loadedDaysMap = apiDays.reduce((map, nextDay) => {
    map.set(nextDay.timestamp, nextDay)
    return map;
  }, new Map<string, LifeDay>())

  const daysArr = [] as DaysExtended[]

  let nextDay = weekValue.starts

  while (!isAfter(nextDay, weekValue.ends)) {
    const timestamp = format(nextDay, "dd-MM-yyyy")
    const loadedDay = loadedDaysMap.get(timestamp) || {}
    const day: DaysExtended = {
      ...loadedDay,
      timestamp: format(nextDay, "dd-MM-yyyy"),
      state: getDayState(nextDay, currentTime.value),
      label: format(nextDay, "eeeeee", {locale: getLocale()}).toUpperCase()
    }
    daysArr.push(day)
    nextDay = addDays(nextDay, 1)
  }

  daysExtended.value = daysArr
})

</script>

<template>
  <div>{{$route.params.weekNum}}</div>
  <div class="container">
    <span
        class="item"
        :class="{
          itemActive: day.state === DayState.CURRENT,
          itemSpent: day.state === DayState.SPENT
        }"
        v-for="day in daysExtended"
    >
        {{ day.label }}
    </span>
  </div>
</template>

<style src="./calendar.css" />