<script lang="ts">
import { computed, reactive } from 'vue'
import type * as types from '@/types'
import { svgRequestId, debounce } from './components/functions/index'
import { nanoid } from 'nanoid'

// Set unique id for this session
const requestId = sessionStorage.getItem(svgRequestId);
if (requestId === null) {
  sessionStorage.setItem(svgRequestId, nanoid())
}

let mobileWidth = 600
let tabletWidth = 900

const browserInfo: types.BrowserInfoType = reactive({
  online: true,
  isMobile: window.innerWidth < mobileWidth ? true : false,
  isMaxTablet: window.innerWidth < tabletWidth ? true : false,
  isTablet: (window.innerWidth < tabletWidth && window.innerWidth > mobileWidth) ? true : false,
} as types.BrowserInfoType)

window.addEventListener("offline", () => {
  browserInfo.online = false
})

window.addEventListener("online", () => {
  browserInfo.online = true
})

window.addEventListener("resize",
  debounce((ev: Event) => {
    browserInfo.isMobile = (window.innerWidth < mobileWidth ? true : false)
    browserInfo.isMaxTablet = (window.innerWidth < tabletWidth ? true : false)
    browserInfo.isTablet = ((window.innerWidth < tabletWidth && window.innerWidth > mobileWidth) ? true : false)
  }, 10))

export default {
  provide() {
    return {
      browserInfo: computed(() => { return browserInfo as types.BrowserInfoType })
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
