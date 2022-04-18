<script lang="ts">
import Popup from "./components/popup/popup.vue"
import AppNav from "./app-nav.vue";
import {getUser} from "./domain/api/user";
import {currentUser} from "./store";
export default {
  components: {AppNav, Popup},
  mounted() {
    getUser("default").then(user => {
      currentUser.value = user
    })
  }
}

</script>

<template>
<!--  <app-nav/>-->
  <Popup/>
  <router-view></router-view>
</template>