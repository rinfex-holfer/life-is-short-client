<script lang="ts" setup>
import {dateFormatMonthYear, dateFormatNum} from "../../utils/date";
import {lifeInMonths, currLifeYear, currentLifeMonthNumber} from "../../store";
import {reactive, ref} from "vue";
import {LifeMonth, LifeStage, YearInLifeMonths, YearInLifeWeeks} from "../../domain";
import Popup from "../popup.vue"
import {useRouter} from "vue-router";

const stages: LifeStage[] = [
  {fromTo: [0, 12], color: "#f6d5b1"},
  {fromTo: [13, 20], color: "#dcb3b8"},
  {fromTo: [21, 34], color: "#eba7ce"},
  {fromTo: [35, 50], color: "#e590d1"},
  {fromTo: [51, 70], color: "#6bcced"},
  {fromTo: [71, 9999], color: "#7bf088"},
]
function getYearColor(year: number) {
  return stages.find(s => s.fromTo[0] <= year && s.fromTo[1] >= year)?.color || "black"
}

const hoveredMonth = ref<null | string>(null)
const hoveredYear = ref<null | number>(null)
const selectedMonth = ref<number | null>(null)
const monthCoord = reactive<{x: number, y: number}>({x: 0, y: 0})

const showHoveredMonth = (month: LifeMonth) =>
  hoveredMonth.value = `${dateFormatMonthYear(new Date(month.year, month.month))} | № в жизни:${month.numInLife}`
const hideYear = () => {
  hoveredYear.value = null
  hoveredMonth.value = null
}
const onYearHovered = (year: YearInLifeMonths) => hoveredYear.value = year.numInLife

const router = useRouter()
const selectMonth = (month: LifeMonth, year: YearInLifeMonths, e: MouseEvent) => {
  router.push("/calendar/month/"+month.numInLife)
  // const row: HTMLElement | null = document.querySelector(`[data-year-num="${year.numInLife}"]`)
  // monthCoord.x = e.target ? (e.target as HTMLElement).offsetLeft + 3 : 0
  // monthCoord.y = row ? (row.offsetTop - 20) : 0
  // selectedMonth.value = month.numInLife
}
const deselectMonth = () => selectedMonth.value = null

</script>

<template>
<!--  <div class="selectedMonth">{{hoveredDate ? hoveredDate : '-'}}</div>-->
  <div v-on:mouseleave="hideYear" class="life">
    <Popup
        v-if="selectedMonth !== null"
        :x="monthCoord.x"
        :y="monthCoord.y"
        :on-close="deselectMonth"
    >
<!--      <Week :week-num="selectedMonth" />-->
    </Popup>

    <div
        class="lifeRow"
        :class="{lifeRowHovered: hoveredYear === year.numInLife}"
        :style="{background: getYearColor(year.numInLife)}"
        v-for="year in lifeInMonths"
        :data-year-num="year.numInLife"
        @mouseover="onYearHovered(year)"
    >

        <span
            class="lifeRowYear"
            :class="{lifeRowYearSpent: year.numInLife < currLifeYear}"
        >
          {{year.numInLife}}
        </span>

        <span
          v-for="month in year.months"
          class="item itemMedium"
          :class="{
            itemActive: month.numInLife === currentLifeMonthNumber,
            itemSpent: month.numInLife < currentLifeMonthNumber,
            itemSelected: month.numInLife === selectedMonth
          }"
          @mouseover="showHoveredMonth(month)"
          @click="selectMonth(month, year, $event)"
        >
        </span>
    </div>
  </div>
</template>

<style scoped>
.life {
  position: relative;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: auto;

  width: fit-content;
  margin: 0 auto;
}

.lifeRow {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  transition: all 0.3s;
  padding: 0 10px;
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
</style>