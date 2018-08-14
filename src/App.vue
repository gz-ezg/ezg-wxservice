<template>
  <div id="app" :style="{height:height+'px',width:width+'px',top:top+'px'}" style="overflow-x: scroll;" :class="{table_style:istable}">
    <van-row  >  
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
    localStorage.setItem("width",document.documentElement.clientWidth || document.body.clientWidth)
    // alert(document.documentElement.clientWidth || document.body.clientWidth)
    localStorage.setItem("height",document.documentElement.clientHeight || document.body.clientHeight)
    // alert(document.documentElement.clientHeight || document.body.clientHeight)

    this.$bus.on("UPDATE_TABLE",(e)=>{
      // console.log(window.screen.availHeight)
      // console.log(window.screen.availWidth)
      // console.log("111111")
      // _self.height = window.screen.availWidth
      // _self.height = document.body.clientWidth
      _self.height = localStorage.getItem("width")
      _self.width = localStorage.getItem("height")

      _self.top = "-" + localStorage.getItem("width")

      // _self.width = window.screen.availHeight
      // _self.width = document.body.clientHeight
      // _self.top = "-" + window.screen.availWidth
      // _self.top = "-" + document.body.clientWidth
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
