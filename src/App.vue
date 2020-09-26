<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>

@import "~ag-grid-community/dist/styles/ag-grid.css";
@import "~ag-grid-community/dist/styles/ag-theme-alpine.css";
@import '~codemirror/lib/codemirror.css';
@import '~@toast-ui/editor/dist/toastui-editor.css';

html, body {
  height: 100%;
  margin: 0px;
}
#app {
 height: 100%;
}
</style>
