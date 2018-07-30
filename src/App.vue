<template>
  <div id="app">
    <van-row style="overflow-x: hidden">
      <router-view/>
    </van-row>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted(){

  }
}
</script>

<style>
#app {
  font-family: '-apple-system', "Helvetica Neue", "Roboto", "Segoe UI", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}
.van-nav-bar .van-icon {
  color: white;
}
.van-icon::before {
  vertical-align: middle
}
</style>
