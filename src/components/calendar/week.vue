<script lang="ts">
import {getDay} from "date-fns";

export default {
  name: "WeekCalendar",
  data: () => ({
    day: getDay(Date.now())
  })
}
</script>

<template>
  <div class="container">
    <span
        class="item"
        :class="{
          itemActive: i === day,
          itemSpent: i < day
        }"
        v-for="i in 7"
    >
        {{ i }}
    </span>
  </div>
</template>

<style src="./calendar.css" />