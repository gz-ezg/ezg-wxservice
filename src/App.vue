<template>
  <div id="app">
    <van-row style="overflow-x: hidden;" :class="{table_style:istable}" :style="{height:height+'px',width:width+'px',top:top+'px'}">
      <router-view/>
    </van-row>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted(){

  },
  data(){
    return{
      istable:false,
      height:"",
      width:"",
      top:""
    }
  },
  created(){

    let _self = this
    this.$bus.on("UPDATE_TABLE",(e)=>{
      // console.log(window.screen.availHeight)
      // console.log(window.screen.availWidth)
      // console.log("111111")
      _self.height = window.screen.availWidth
      _self.width = window.screen.availHeight
      _self.top = "-" + window.screen.availWidth
      _self.istable = true
    })
    this.$bus.on("CANCEL_TABLE",(e)=>{
      _self.height = window.screen.availHeight
      _self.width = window.screen.availWidth
      _self.top = ""
      _self.istable = false
    })
  },
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

.van-cell__left-icon{
  line-height: 16px!important;
}
.van-nav-bar .van-icon{
  color:white!important;
}

.table_style{
  /* padding:10px; */
  transform: rotate(90deg);
  position: absolute;
  transform-origin: left bottom;
  left: 0;
  /* width: 603px;
  height: 375px;
  top: -375px; */
}
</style>
