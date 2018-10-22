<template>
  <div>
    <van-nav-bar
      title="个人信息"
      left-arrow
      @click-left="$backTo()"
      right-text="保存"
      @click-right="update_info"
      class="navBarCommonStyle"
    />
    <van-cell-group style="margin-bottom:5px">
      <div style="height:30vh;background-color: #ccc">
        <center style="padding-top:5vh;">
            <img :src="'/api/assets/'+ userInfo.head_img_url" style="width:100px;height:100px;border-radius:100px"/>
              <div style="padding:20px">
                <van-uploader accept="*" :before-read="update_icon">
                  <span>点击修改头像</span>
                </van-uploader>
              </div>
        </center>
      </div>
    </van-cell-group>
    <van-cell-group>
      <van-field label="用户名" v-model="userInfo.nickname" title="" required/>
      <div style="display:flex;justify-content:center;" class="van-cell">
          <span style="max-width:24vw;flex:1" class="van-cell--required">性别</span>
          <span style="flex:1" >
            <van-radio-group v-model="userInfo.sex" style="line-height:2em">
              <van-row :gutter="20">
                <van-col span="12">
                  <van-radio name="1" style="font-size:12px;line-height:1em">男</van-radio>
                </van-col>
                <van-col span="12">
                  <van-radio name="0" style="font-size:12px;line-height:1em">女</van-radio>
                </van-col>
              </van-row>
            </van-radio-group>
          </span>
        </div>
        <van-field label="手机号码" v-model="userInfo.tel" title="" required disabled>
          <van-button slot="button" size="small" type="primary" @click="show = true" >修改手机号码</van-button>
        </van-field>
    </van-cell-group>
    <van-dialog
      v-model="show"
      :close-on-click-overlay="true"
    >
      <van-field
        v-model="tel"
        label="手机号码"
        placeholder="请输入新的手机号码"
        @confirm="update_tel"
        
      />
      <van-field
        v-model="yzm"
        label="验证码"
        placeholder="请输入验证码"
      >
        <van-button slot="button" size="small" type="primary" @click="require_code" v-if="!yzmDisable" >获取验证码</van-button>
        <van-button slot="button" size="small" type="default" @click="require_code" v-if="yzmDisable" disabled >{{time}}秒后重新获取</van-button>
      </van-field>
    </van-dialog>
  </div>
</template>

<script>
export default {
  data(){
    return{
      yzmDisable: false,
      time: 0,
      show: false,
      userInfo:{
        head_img_url: "",
        nickname: "",
        sex: "",
        tel: "",
      },
      sex: "",
      yzm: "",
      tel: ""
    }
  },
  methods: {
    get_user_info(){
      let _self = this
      let url = `api/store/customer/user/detail`

      let config = {

      }

      function success(res){
        _self.userInfo = res.data.data
        _self.userInfo.sex = _self.userInfo.sex.toString()
      }

      this.$Get(url, config, success)
    },
    update_icon(file){
      let _self = this
      let formdata = new FormData()

      let url = `api/store/customer/user/update`
      formdata.append("nickname", _self.userInfo.nickname)
      formdata.append("sex", _self.userInfo.sex)
      formdata.append("file", file)


      function success(res){
        _self.get_user_info()
      }

      function fail(err){

      }
      this.$Post(url, formdata, success, fail)
    },
    update_tel(){
      console.log("1111")
    },
    is_mobile_number(){
      let _self = this
      let reg = /^[1][0-9]{10}$/
      if(!reg.test(_self.tel)){
        _self.$toast.fail("请输入正确的手机号！")
        return false
      }else{
        return true
      }
    },
    require_code(){
      let _self = this
      if(this.is_mobile_number()){
        console.log("手机号正确！")
        let url = `api/store/customer/user/update/tel/msg/send`
        let config = {
          tel: _self.tel	
        }

        function success(res){
          _self.$toast.success(res.data.msg)
          _self.isLogin = false
          _self.yzmDisable = true
          _self.time = 60
          _self.change_time()
        }

        function fail(err){
          _self.$toast.fail(err.data.msg)
        }

        this.$Post(url, config, success, fail)
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
        _self.$once('hook:beforeDestroy', () => {            
          clearInterval(time1);                                    
        })
      },1000)
    },
    update_info(){
      console.log("1111")
    }
  },
  created(){
    let _self = this
    _self.get_user_info()
  }
}
</script>

<style>
.van-icon::before {
    vertical-align: top;
}
</style>
