<script lang="ts" setup>
import {currentLifeWeek} from "../../store";

const currentWeekNum = currentLifeWeek.value?.numInLife || 0
</script>

<template>
  <h1>Calendar</h1>
<!--  <ul>-->
<!--    <li><router-link to="/calendar">life</router-link></li>-->
<!--    <li><router-link :to="`/calendar/week/${currentWeekNum}`">week</router-link></li>-->
<!--    <li><router-link to="/calendar/month">month</router-link></li>-->
<!--    <li><router-link to="/calendar/year">year</router-link></li>-->
<!--  </ul>-->
  <router-view></router-view>
</template>

<style src="./calendar.css" />