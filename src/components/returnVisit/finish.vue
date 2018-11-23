<template>
  <van-row style="overflow-x: hidden">
    <van-nav-bar title="e账柜" class="navBarCommonStyle"/>
    <van-row style="margin-top:20vh">
      <center>
        <img src="./thank.png" width="80%" style="border-radius:8px"/>
      </center>
      <center style="margin-top:20px">
        <p style="margin:0;padding-bottom:5px;">感谢您对本次服务的评价!</p>
        <p >我们会为您提供更加优质的服务！</p>
      </center>
      <center @click="focus_wx" style="margin-top:10vh">
        <van-row style="margin-bottom:10px">
          <img src="./wx.png" width="60">
        </van-row>
        <center style="font-size:12px;">关注"亿账柜"服务号，获取更多服务及资讯</center>
      </center>
    </van-row>
    <van-tabbar style="margin-top:30px;">
      <van-button type="primary" bottom-action style="font-size:20px" @click="close">关闭</van-button>
    </van-tabbar>
  </van-row>
</template>


<script>
export default {
  data(){
    return {

    }
  },
  methods:{
    close(){
      localStorage.clear()
      sessionStorage.clear()
      window.close()
      WeixinJSBridge.call('closeWindow')
    },
    focus_wx(){
      window.open("https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzAxMjMyNjA0Mg==&scene=126#wechat_redirect")
    }
  }
}
</script>
