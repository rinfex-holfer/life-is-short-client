<script lang="ts" setup>
import {currentLifeWeek} from "../../store";

const currentWeekNum = currentLifeWeek.value?.numInLife || 0
</script>

<template>
  <h1>Calendar</h1>
  <router-view></router-view>
</template>

<style src="./calendar.css" />