<script>
import {getDate, getDaysInMonth} from "date-fns";

export default {
  name: "MonthCalendar",
  data: () => ({
    now: Date.now()
  }),
  computed: {
    daysInMonth() {
      return getDaysInMonth(this.now)
    },
    dayOfMonth() {
      return getDate(this.now)
    },
  }
}
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