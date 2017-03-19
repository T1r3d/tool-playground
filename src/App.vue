<template>
  <div id="app">
    <vMenu></vMenu>
    <router-view></router-view>
  </div>
</template>

<script>
import vMenu from "./components/Menu.vue"

export default {
  components: {vMenu},
  name: 'app'
}
</script>

<style>
body {
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 80px;
}
</style>
