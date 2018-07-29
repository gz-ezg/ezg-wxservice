<template>
  <van-row>
    <van-nav-bar
      style="background-color: #CC3300;color:white"
      title="客服中心"
      left-arrow
      @click-left="$backTo()"
    />
    <van-row type="flex" justify="center" style="margin-top:40px">
        服务：一般纳税人代理记账
    </van-row>

    <van-cell-group style="width:90%;margin:auto;margin-top:70px">
      <van-field
        v-model="content"
        type="textarea"
        rows="7"
        placeholder="请输入内容"
      />
    </van-cell-group>
      <van-button type="primary" bottom-action style="font-size:20px;border-radius:5px;position:fixed;bottom:0px;background-color:#cc3300" @click="submit">提交</van-button>
  </van-row>
</template>

<script>
export default {
  data(){
    return{
      content:""
    }
  },
  methods:{
    submit(){

    }
  }
}
</script>
