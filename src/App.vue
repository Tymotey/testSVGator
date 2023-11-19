<script lang="ts">
import { computed, reactive } from 'vue'
import type * as types from '@/types'
import { svgRequestId } from './components/functions/index'
import { nanoid } from 'nanoid'

// Set unique id for this session
const requestId = sessionStorage.getItem(svgRequestId);
if (requestId === null) {
  sessionStorage.setItem(svgRequestId, nanoid())
}

let mobileWidth = 600

const browserInfo = reactive({
  online: true,
  isMobile: window.innerWidth < mobileWidth ? true : false,
} as types.BrowserInfoType)

window.addEventListener("offline", () => {
  browserInfo.online = false
})

window.addEventListener("online", () => {
  browserInfo.online = true
})

window.addEventListener("resize", () => {
  browserInfo.isMobile = (window.innerWidth < mobileWidth ? true : false)
})

export default {
  data: () => ({
    browserInfo: browserInfo,
  }),
  provide() {
    return {
      // TODO: add type
      browserInfo: computed(() => this.browserInfo as types.BrowserInfoType)
    }
  }
}
</script>

<script setup lang="ts">
import PageHeader from './components/page/PageHeader.vue'
import PageMain from './components/page/PageMain.vue'
</script>

<template>
  <div id="pageWrapper">
    <PageHeader />
    <PageMain />
  </div>
</template>

<style scoped lang="scss">
#pageWrapper {
  width: 100%;
  margin: 0px auto;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}
</style>
