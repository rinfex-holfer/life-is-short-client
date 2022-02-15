<script lang="ts">
import {getISOWeek, getISOWeeksInYear} from "date-fns";
import {defineComponent} from "vue";

export default defineComponent({
  name: "YearCalendar",
  data: () => ({
    now: Date.now(),
  }),
  computed: {
    weeksInYear() {
      return getISOWeeksInYear(this.now);
    },
    week() {
      return getISOWeek(this.now)
    }
  }
})
</script>

<template>
  <div class="container">
    <span
        v-for="i in weeksInYear"
        class="item"
        :class="{
          itemActive: i === week,
          itemSpent: i < week,
        }"
    >
      {{ i }}
    </span>
  </div>
</template>

<style src="./calendar.css" />