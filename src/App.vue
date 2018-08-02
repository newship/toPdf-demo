<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <ToPdf msg="Welcome to PDF tools App"/>
    <!-- <h3>{{msg}}</h3> -->
  </div>
</template>

<script>
import ToPdf from './components/ToPdf.vue'

export default {
  name: 'app',
  components: {
    ToPdf
  },
  data(){return {msg:"dsd"}}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
