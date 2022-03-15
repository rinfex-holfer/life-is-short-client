<script lang="ts">
export default { name: "WeekCalendar" }
</script>

<script setup lang="ts">
import {getDay} from "date-fns";

const day = getDay(Date.now())
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