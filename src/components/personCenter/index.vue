<template>
  <div>
    <van-cell-group style="margin-bottom:5px">
      <div style="height:30vh;background-color: #952f2a" @click="update_info">
        <center style="padding-top:5vh;">
            <img alt="暂无图片" :src="userInfo.head_img_url" style="width:100px;height:100px;border-radius:100px"/>
            <p style="color:#ccc;padding-top:10px;font-size:20px">{{userInfo.nickname ? userInfo.nickname : "用户名未设置"}}</p>
        </center>
      </div>
    </van-cell-group>
    <van-cell-group>
      <!-- <van-cell title="我的购物车" is-link /> -->
      <!-- <van-cell title="我的订单" is-link /> -->
      <!-- <van-cell title="我的代金券" is-link /> -->
      <!-- <van-cell title="我的推荐" is-link /> -->
      <van-cell title="我的发票" is-link to="/invoice" icon="exchange"/>
      <van-cell title="我的文件" is-link to="/source" icon="idcard"/>
      <!-- <van-cell title="我的工单" is-link to="/source" icon="idcard"/> -->
      <van-cell title="关于我们" is-link to="/about" icon="info-o"/>
    </van-cell-group>
    <van-tabbar v-model="active" fixed>
      <!-- <van-tabbar-item icon="home" url="http://m.zgcfo.com/">首页</van-tabbar-item>
      <van-tabbar-item icon="chat" url="http://www16.53kf.com/m.php?cid=72151061">在线咨询</van-tabbar-item> -->
      <van-tabbar-item icon="wap-home" to="/servicecenterindex">我的服务</van-tabbar-item>
      <van-tabbar-item icon="contact" to="/myCenter">个人中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data(){
    return {
      active: 1,
      userInfo: {
        head_img_url: "",
        nickname: "",
        sex: "",
        tel: ""
      }
    }
  },
  methods:{
    get_user_info(){
      let _self = this
      let url = `api/store/customer/user/detail`

      let config = {

      }

      function success(res){
        _self.userInfo = res.data.data
        if(_self.userInfo.head_img_url.indexOf("upload") == 0){
          _self.userInfo.head_img_url = '/api/assets/'+ _self.userInfo.head_img_url
        }
      }

      this.$Get(url, config, success)
    },
    update_info(){
      this.$router.push({
        name: "updateUserInfo"
      })
    }
  },
  created(){
    let _self = this
    _self.get_user_info()
  }
}
</script>

