<script lang="ts">
// import {routes} from "./routes";

import AppNav from "./app-nav.vue";
import {getUser} from "./domain/api/user";
import {currentUser} from "./store";
export default {
  components: {AppNav},
  mounted() {
    getUser("default").then(user => {
      currentUser.value = user
    })
  }
}

</script>

<template>
<!--  <h1>{{ appName }}</h1>-->
  <app-nav/>
  <router-view></router-view>
</template>