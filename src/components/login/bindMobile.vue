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
              <van-button slot="button" size="small" type="primary">发送验证码</van-button>
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
      isLogin:true,
      mobile: "",
      yzm: ""
    }
  }
}
</script>

