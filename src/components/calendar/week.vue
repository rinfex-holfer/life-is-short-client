<script lang="ts">
export default { name: "WeekCalendar" }
</script>

<script setup lang="ts">
import {getDay} from "date-fns";

let day: number = getDay(Date.now())
if (day === 0) day = 7 // because Sun is 0 in date-fns, and we want it to be 7

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