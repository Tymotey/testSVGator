<script setup lang="ts">
import type * as types from '@/types';
import { reactive } from 'vue';
import PageHeader from './components/page/PageHeader.vue'
import PageMain from './components/page/PageMain.vue'

const browserInfo = reactive({
  online: true,
} as types.BrowserInfoType)

window.addEventListener("offline", (e) => {
  browserInfo.online = false
})

window.addEventListener("online", (e) => {
  browserInfo.online = true
})
</script>

<template>
  <div id="pageWrapper">
    <PageHeader :browserInfo="browserInfo" />
    <PageMain />
  </div>
</template>

<style scoped lang="scss">
#pageWrapper {
  width: 95%;
  margin: 0px auto;

  @media all and (min-width: $query-tablet) {
    width: 95%;
  }

  &>* {
    width: 100%;
  }
}
</style>
