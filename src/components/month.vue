<script setup lang="ts">
import {getDate, getDaysInMonth} from "date-fns";
import {LifeMonth} from "../domain";
import {computed} from "vue";
import {currentTime} from "../store";

const props = defineProps<{
  month: LifeMonth
}>()


const dayOfMonth = computed(() => getDate(currentTime.value))
const daysInMonth = computed(() => getDaysInMonth(new Date(props.month.year, props.month.month)))
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

<style src="calendar/calendar.css" />