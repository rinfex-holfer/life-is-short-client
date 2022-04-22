<script lang="ts">
import AppNav from "./app-nav.vue";
import {getUser} from "./domain/api/user";
import {currentUser} from "./store";
import Modal from "./components/modal/modal.vue";
export default {
  components: {Modal, AppNav},
  mounted() {
    getUser("default").then(user => {
      currentUser.value = user
    })
  }
}

</script>

<template>
<!--  <app-nav/>-->
  <Modal/>
  <router-view></router-view>
</template>

<style>
* {
  box-sizing: border-box;
}

body {
  padding: 0;
  margin: 0;
}
</style>