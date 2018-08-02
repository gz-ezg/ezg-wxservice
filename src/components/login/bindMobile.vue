<template>
  <van-row style="overflow-x: hidden">
    <van-row>
      <div style="height: 150px;margin-top: 7rem">
        <center>
          <img style="height: 80px" src="./logo.png"/>
        </center>
      </div>
        <div style="width:80%;margin:auto">
          <van-cell-group>
            <van-field
              v-model="mobile"
              label="手机号"
              placeholder="请输入手机号"
            />
            <van-field
              v-model="yzm"
              type="number"
              label="短信验证码"
              placeholder="请输入验证码"
            >
              <van-button slot="button" size="small" type="primary" @click="require_code" v-if="!yzmDisable" >获取验证码</van-button>
              <van-button slot="button" size="small" type="default" @click="require_code" v-if="yzmDisable" disabled >{{time}}秒后重新获取</van-button>
            </van-field>
          </van-cell-group>
        </div>
        <van-row style="width:80%;margin:auto;margin-top:60px">
          <van-button size="large" type="primary" @click="login" :disabled="isLogin">绑 定</van-button>
        </van-row>
      </van-row>
  </van-row>
</template>

<script>
export default {
  data(){
    return{
      isLogin: true,
      mobile: "",
      yzm: "",
      yzmDisable:false,
      time:0,
      openId:""
    }
  },
  methods:{
    is_mobile_number(){
      let _self = this
      let reg = /^[1][0-9]{10}$/
      if(!reg.test(_self.mobile)){
        _self.$toast.fail("请输入正确的手机号！")
        return false
      }else{
        return true
      }
    },
    login(){
      let _self = this
      let url = `api/store/mobile/user/login`
      let config = {
        mobile: _self.mobile,
        code: _self.yzm,
        openId: _self.openId
      }

      function success(res){
        console.log(res)
        localStorage.setItem("customerId",res.data.data.customer_id)
        _self.$router.push({
          name:'serviceCenterIndex',
          params:{
            id: res.data.data.customer_id
          }
        })
      }

      function fail(err){
        console.error(err)
        _self.$toast.fail("登录失败！")
      }

      this.$Post(url, config, success, fail)
    },
    require_code(){
      let _self = this
      if(this.is_mobile_number()){
        console.log("手机号正确！")
        let url = `api/store/mobile/user/sendMsg`
        let config = {
          params:{
            mobile: _self.mobile
          }
        }

        function success(res){
          _self.$toast.success(res.data.msg)
          _self.isLogin = false
          _self.yzmDisable = true
          _self.time = 5
          _self.change_time()
        }

        function fail(err){
          _self.$toast.fail(err.data.msg)
        }

        this.$Get(url, config, success, fail)
      }else{
          console.log("手机号错误！")
      }
    },
    change_time(){
      let _self = this
      let time1 = setInterval(function(){
        _self.time--;
        console.log(_self.time)
        if(_self.time <= 0){
          clearInterval(time1)
          _self.yzmDisable = false
        }
      },1000)
    },
    change_button(){
      if(this.time <= 0){
        this.yzmDisable = false
      }else{
        this.yzmDisable = true
      }
    },
    get_token(){
      let _self = this
      let str = location.href
      if(str.indexOf("?token=")!="-1"){
        let temp = str.split("?")
        let temp2 = temp[1].split("=")
        let token = temp2[1]
        console.log(token)
      }
    }
  },
  watch:{
    // "time":"change_button"
  },
  created(){
    this.get_token()
  }
}
</script>

