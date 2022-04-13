<script setup lang="ts">

import {currentLifeWeek, lifeInWeeks} from "../../store";
import {getDays} from "../../domain/api/days";
import {ref} from "vue";
import {LifeDay} from "../../domain";
import {addDays, format, isAfter, isBefore, isSameDay} from "date-fns";
import {useRoute} from "vue-router";

type DayView = LifeDay & {
  isSpent: boolean,
  isCurrent: boolean,
}

const route = useRoute()

const weekNum = +route.params.weekNum
const yearOfSelectedWeek = lifeInWeeks.value.find(year => {
  const isYearOfSelectedWeek = year.weeks[0].numInLife <= weekNum
      && year.weeks[year.weeks.length - 1].numInLife >= weekNum
  return isYearOfSelectedWeek
})
const week = yearOfSelectedWeek?.weeks.find(w => w.numInLife === weekNum)

const days = ref([] as DayView[])

const today = new Date()

if (week) {
  getDays(week.starts.toISOString(), week.ends.toISOString()).then(d => {
    const loadedDaysMap = d.reduce((map, nextDay) => {
      map.set(nextDay.timestamp, nextDay)
      return map;
    }, new Map<string, LifeDay>())

    const daysArr = [] as DayView[]

    let nextDay = week.starts

    while (!isAfter(nextDay, week.ends)) {
      const timestamp = format(nextDay, "dd-MM-yyyy")
      const loadedDay = loadedDaysMap.get(timestamp) || {}
      const day: DayView = {
        ...loadedDay,
        timestamp: format(nextDay, "dd-MM-yyyy"),
        isCurrent: isSameDay(today, nextDay) ,
        isSpent: isBefore(nextDay, today)
      }
      daysArr.push(day)
      nextDay =  addDays(nextDay, 1)
    }

    days.value = daysArr
  })
}

</script>

<template>
  <div>{{$route.params.weekNum}}</div>
  <div class="container">
    <span
        class="item"
        :class="{
          itemActive: day.isCurrent,
          itemSpent: day.isSpent
        }"
        v-for="day in days"
    >
        {{ day.timestamp }}
    </span>
  </div>
</template>

<style src="./calendar.css" />