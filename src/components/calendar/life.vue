<script lang="ts" setup>
import {numF} from "../../utils/date";
import {lifeInWeeks, currLifeYear, currentLifeWeekNumber} from "../../store";
import {reactive, ref} from "vue";
import {LifeStage, LifeWeek, YearInLifeWeeks} from "../../domain";
import {useRouter} from "vue-router";
import Week from "./week.vue";
import Popup from "../popup/popup.vue"

const stages: LifeStage[] = [
  {fromTo: [0, 12], color: "#f6d5b1"},
  {fromTo: [13, 19], color: "#dcb3b8"},
  {fromTo: [20, 34], color: "#eba7ce"},
  {fromTo: [35, 49], color: "#e590d1"},
  {fromTo: [50, 69], color: "#6bcced"},
  {fromTo: [70, 9999], color: "#7bf088"},
]
function getYearColor(year: number) {
  return stages.find(s => s.fromTo[0] <= year && s.fromTo[1] >= year)?.color || "black"
}

const router = useRouter()
const hoveredDate = ref<null | string>(null)
const hoveredYear = ref<null | number>(null)

function showWeek(week: LifeWeek) {
  hoveredDate.value = `${numF(week.starts)} - ${numF(week.ends)} | № в году:${week.numInYear} | № в жизни:${week.numInLife}`
}

function hideYear() {
  hoveredDate.value = null
}

function onYearHovered(year: YearInLifeWeeks) {
  hoveredYear.value = year.numInLife
}

const selectedWeek = ref<number | null>(null)
const weekCoord = reactive<{x: number, y: number}>({x: 0, y: 0})
function onWeekClick(week: LifeWeek, e: MouseEvent) {
  weekCoord.x = (e.target as HTMLElement)?.offsetLeft || 0
  weekCoord.y = ((e.target as HTMLElement)?.offsetTop - 10) || 0
  selectedWeek.value = week.numInLife
  // router.push(`/calendar/week/${week.numInLife}`)
}

</script>

<template>
  <div class="selectedWeek">{{hoveredDate ? hoveredDate : '-'}}</div>
  <div v-on:mouseleave="hideYear" class="life">

    <Popup v-if="selectedWeek !== null" :x="weekCoord.x" :y="weekCoord.y">
      <Week :week-num="selectedWeek" />
    </Popup>

    <div
        class="lifeRow"
        :class="{lifeRowHovered: hoveredYear === year.numInLife}"
        :style="{background: getYearColor(year.numInLife)}"
        v-for="year in lifeInWeeks"
        :[data-year-num]="year.numInLife"
        @mouseover="onYearHovered(year)"
    >

        <span
            class="lifeRowYear"
            :class="{lifeRowYearSpent: year.numInLife < currLifeYear}"
        >
          {{year.numInLife}}
        </span>

        <span
          v-for="week in year.weeks"
          class="item itemSmall"
          :class="{
            itemActive: week.numInLife === currentLifeWeekNumber,
            itemSpent: week.numInLife < currentLifeWeekNumber,
          }"
          @mouseover="showWeek(week)"
          @click="onWeekClick(week, $event)"
        >
        </span>

<!--      <router-link-->
<!--          :to="`/calendar/week/${week.numInLife}`"-->
<!--          v-for="week in year.weeks"-->
<!--          class="item itemSmall"-->
<!--          :class="{-->
<!--            itemActive: week.numInLife === currentLifeWeekNumber,-->
<!--            itemSpent: week.numInLife < currentLifeWeekNumber,-->
<!--          }"-->
<!--          v-on:mouseover="showWeek(week)"-->
<!--      >-->
<!--      </router-link>-->
    </div>
  </div>
</template>

<style scoped>
.life {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  margin: 0 auto;
}

.lifeRow {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  transition: all 0.3s;
}

.lifeRow .item {
  cursor: pointer;
  transition: all 0.15s;
}
.lifeRowHovered .item {
  transform: scale(2);
}

.lifeRowYear {
  width: 20px
}

.lifeRowYearSpent {
  color: grey;
}

.selectedWeek {
  position: fixed;
  left: 20px;
  bottom: 20px;
  background: white;
  padding: 5px;
}
</style>