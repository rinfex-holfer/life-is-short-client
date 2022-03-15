<script setup lang="ts">
import {getDate, getDaysInMonth} from "date-fns";

const now = Date.now()
const daysInMonth = getDaysInMonth(now)
const dayOfMonth = getDate(now)
</script>

<template>

<div class="container">
  <span
      class="item"
      :class="{
        itemSpent: i < dayOfMonth,
        itemActive: i === dayOfMonth
      }"
      v-for="i in daysInMonth"
  >
    {{ i }}
  </span>
</div>

</template>

<style src="./calendar.css" />