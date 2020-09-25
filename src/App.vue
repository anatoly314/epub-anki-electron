<template>
  <div id="app">
    <Epub/>
  </div>
</template>

<script>
import Epub from './components/Epub.vue'

export default {
  name: 'App',
  components: {
    Epub
  }
}
</script>

<style>
html, body {
  height: 100%;
  margin: 0px;
}
#app {
 height: 100%;
}
</style>
