<script lang="ts" setup>
import {RouteLocationNormalized, useRouter} from "vue-router";
import {PopupKey} from "./popup-key";
import {removeRouterQueries} from "../../router/remove-router-queries";
import {VueElement} from "vue";
import Journal from "../journal/journal.vue";

const popupMap: Record<PopupKey, VueElement> = {
  [PopupKey.JOURNAL]: Journal,
};

function getPopup(key: string): VueElement | null {
  return popupMap[key as PopupKey] || null
}

function closePopup() {
  router.replace(removeRouterQueries(router.currentRoute.value, ['popup']))
}

function filterInvalidPopupRoutes(to: RouteLocationNormalized): RouteLocationNormalized | undefined {
  const popupKey = to.query.popup
  const isPopupKeyInvalid = typeof to.query.popup !== "string"
      || !getPopup(to.query.popup)

  if (popupKey && isPopupKeyInvalid) {
    return removeRouterQueries(to, ['popup'])
  }
}

const router = useRouter()
router.beforeEach(filterInvalidPopupRoutes)

</script>

<template>
  <div class="popup" v-if="getPopup($router.currentRoute.value.query.popup)">
    <button @click="closePopup">Close popup</button>
    <component :is="getPopup($router.currentRoute.value.query.popup)" />
  </div>
</template>

<style scoped>
.popup {
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.5);
}
</style>