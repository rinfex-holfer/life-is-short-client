<script lang="ts">
export default { name: "WeekCalendar" }
</script>

<script setup lang="ts">


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
        v-for="i in 7"
    >
        {{ i }}
    </span>
  </div>
</template>

<style src="./calendar.css" />