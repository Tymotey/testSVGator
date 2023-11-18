<script lang="ts">

export default {
  name: 'PageHeader',
  inject: ['browserInfo']
}
</script>

<template>
  <div v-show="!this.browserInfo?.online || false" id="offline-warning">Device is offline</div>
  <header>
    <img class="logo" src="https://cdn.svgator.com/images/2019/10/1200x1200-symbol---background.png" title="SVGator" />
  </header>
</template>

<style scoped lang="scss">
#offline-warning {
  position: absolute;
  left: 0px;
  width: 100%;
  background-color: red;
  color: #FFFFFF;
  text-align: center;
}

header {
  margin: 0px auto;
  padding: 10px;
  flex-grow: 0;
  width: 100%;
  background-color: $theme-pallete-main;

  .logo {
    width: 50px;
    margin: 0px auto;
  }
}
</style>
