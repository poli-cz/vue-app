<template>
  <div id="app">
    <div class = 'heading'>
      <h1 id='logo'>Vue demonstration</h1>
      <img alt="Vue logo" src="./assets/logo.png" id='vue_icon'>
    </div>
      <mainPage/>
  </div>
</template>

<script>
import mainPage from './components/main_page.vue'

export default {
  name: 'App',
  components: {
    mainPage
  }
}
</script>

<style>
body{
  background-color: rgb(144,144,144);
  background: linear-gradient(90deg, rgba(144,144,144,0.7595413165266106) 0%, rgba(173,173,173,0.7679446778711485) 46%, rgba(217,217,217,0.5830707282913166) 100%);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #1b2731;
  
  font-size: 18px;
  max-width: 1200px;
  margin: auto;
  margin-top: 20px;
}

#vue_icon{
  width: 60px;
  height: 60px;
  padding-top: 12px;
  padding-left: 10px
}

.heading{
  display: inline-flex;
  text-align: center;
}

#logo{
  margin-bottom: -12px;
}


</style>
