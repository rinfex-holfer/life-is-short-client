<script lang="ts">
export default { name: "WeekCalendar" }
</script>

<script setup lang="ts">

import {currentLifeWeek} from "../../store";
import {getDays} from "../../domain/api/days";
import {ref} from "vue";
import {LifeDay} from "../../domain";

const currentWeek = currentLifeWeek

const days = ref([] as LifeDay[])
getDays(currentWeek.value.starts.toISOString(), currentWeek.value.ends.toISOString()).then(d => {
  days.value = d
})

</script>

<template>
  <div>{{$route.params.weekNum}}</div>
  <div class="container">
    <span
        class="item"
        :class="{
          itemActive: i === day,
          itemSpent: i < day
        }"
        v-for="i in days"
    >
        {{ i }}
    </span>
  </div>
</template>

<style src="./calendar.css" />