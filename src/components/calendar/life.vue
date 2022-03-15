<script lang="ts">
import {getCurrentLifeWeek, getLifeInWeeks} from "../../utils/date";
import {currentUser} from "../../store";
import {defineComponent} from "vue";

export default defineComponent({
  name: "LifeCalendar",
  data: () => ({
    user: currentUser
  }),
  computed: {
    lifeInWeeks() {
      console.log(this.user);
      if (!this.user) return 0
      return getLifeInWeeks(this.user.dateOfBirth, this.user.expectedLifespan)
    },
    currentWeek() {
      if (!this.user) return 0
      return getCurrentLifeWeek(this.user.dateOfBirth)
    }
  }
})
</script>

<template>
  <div class="container">
    <span
        v-for="i in lifeInWeeks"
        class="item itemSmall"
        :class="{
          itemActive: i === currentWeek,
          itemSpent: i < currentWeek,
        }"
    >

    </span>
  </div>
</template>

<style scoped>

</style>