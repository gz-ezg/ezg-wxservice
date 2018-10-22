<template>
  <div>
    <van-nav-bar
      title="个人信息"
      left-arrow
      @click-left="$backTo()"
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
          <van-button slot="button" size="small" type="primary" @click="update_tel" >修改手机号码</van-button>
        </van-field>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  data(){
    return{
      userInfo:{
        head_img_url: "",
        nickname: "",
        sex: "",
        tel: ""
      },
      sex: ""
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
