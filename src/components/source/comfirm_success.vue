<template>
  <van-row style="overflow-x: hidden">
    <!-- <van-nav-bar title="确认成功"/> -->
    <van-row style="margin-top:20vh">
      <center>
        <van-icon name="checked" style="font-size:15vh;color:red"/>
      </center>
      <center style="font-weight:400;font-size:4vw;margin-top:20px">
        资料已交接完成，请您妥善保管资料。
      </center>
      <center @click="back_to_index" style="margin-top:10px">
        <a style="font-size:12px">点击此处返回首页</a>
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
    },
    back_to_index(){
      this.$router.push({
        name: "serviceCenterIndex"
      })
    },
    focus_wx(){
      window.open("https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzAxMjMyNjA0Mg==&scene=126#wechat_redirect")
    }
  }
}
</script>
