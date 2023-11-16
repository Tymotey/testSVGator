<script lang="ts">
import type { PropType } from 'vue'
import type * as types from '../../types';

export default {
  name: 'PageHeader',
  props: {
    browserInfo: {
      type: Object as PropType<types.BrowserInfoType>
    }
  }
}
</script>

<template>
  <div v-show="!browserInfo?.online || false" id="offline-warning">Device is offline</div>
  <header>
    <img class="logo" src="https://cdn.svgator.com/images/2019/10/1200x1200-symbol---background.png" title="SVGator" />
  </header>
</template>

<style scoped lang="scss">
#offline-warning {
  background-color: red;
  color: #FFFFFF;
  text-align: center;
}

header {
  text-align: center;
  margin: 10px auto 30px;

  .logo {
    width: 50px;
    margin: 0px auto;
  }
}
</style>
