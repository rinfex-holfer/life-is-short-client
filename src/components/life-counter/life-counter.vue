<script lang="ts">
import {getProductiveYearsLeft, getYearsLeft, getYearsSpent} from "../../utils/date";
import {store} from "../../store";
import {defineComponent} from "vue";

export default defineComponent({
  name: "LifeCounter",
  data: () => ({
    user: store.user
  }),
  computed: {
    lifeYearsLeft() {
      const user = this.user
      if (!user) return "-"
      return getYearsLeft(user.dateOfBirth, user.expectedLifespan)
    },
    productiveYearsLeft() {
      const user = this.user
      if (!user) return "-"
      return getProductiveYearsLeft(user.dateOfBirth, user.expectedLifespan)
    },
    yearsSpent() {
      const user = this.user
      if (!user) return "-"
      return getYearsSpent(user.dateOfBirth)
    },

  }
})
</script>

<template>
  <div class="container">
    Прожито: {{ yearsSpent }}
    <br/>
    Продуктивной жизни осталось: {{ productiveYearsLeft }}
    <br/>
    Жить осталось: {{ lifeYearsLeft }}
  </div>
</template>

<style scoped>

</style>