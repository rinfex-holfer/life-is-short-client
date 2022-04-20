<script setup lang="ts">

import {lifeInWeeks} from "../../store";
import {computed, ref, watch} from "vue";
import {openModal} from "../modal/open-modal";
import {ModalKey} from "../modal/modal-key";
import {DayState, LifeDayExtended, loadDays} from "../../domain/services/days";

const props = defineProps<{
  weekNum: number
}>()

const yearOfSelectedWeek = computed(() => {
  return lifeInWeeks.value.find(year =>
      year.weeks[0].numInLife <= props.weekNum
      && year.weeks[year.weeks.length - 1].numInLife >= props.weekNum
  )
})

const selectedWeek = computed(() => {
  return yearOfSelectedWeek.value?.weeks.find(w => w.numInLife === props.weekNum)
})

const daysExtended = ref<LifeDayExtended[]>([])

async function reloadDays() {
  daysExtended.value = selectedWeek.value
      ? await loadDays(selectedWeek.value)
      : []
}

watch(selectedWeek, reloadDays, {immediate: true})

function onDayClick(day: LifeDayExtended) {
  openModal(ModalKey.JOURNAL)
}

</script>

<template>
  <div>Неделя номер: {{selectedWeek?.numInLife}}</div>
  <div></div>
  <div class="container">
    <span
        class="item"
        :class="{
          itemActive: day.state === DayState.CURRENT,
          itemSpent: day.state === DayState.SPENT
        }"
        v-for="day in daysExtended"
        @click="onDayClick(day)"
    >
        {{ day.label }}
    </span>
  </div>
</template>

<style src="./calendar.css" />