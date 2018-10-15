<template>
  <div>
    <van-nav-bar
      style="background-color: #952f2a;color:white"
      title="企业评估报告"
      left-arrow
      @click-left="$backTo()"
    />
    <van-loading v-if="loading" style="top:10vh;left:45vw"></van-loading>
    <div v-if="!loading">
      <h4 style="padding-left:20px">{{companyname}}：</h4>
      <van-row style="padding:20px;padding-top:0px;margin-bottom:30px">
        <p>东家您好,您的{{year}}年{{month}}账期的评估报告如下：</p>
        <p v-for="(item, index) in report" :key="index" style="text-indent:30px;line-height:200%">{{index+1}}.{{item.base_message}}</p>
      </van-row>
    </div>
    <van-button type="primary" bottom-action style="font-size:20px;border-radius:5px;position:fixed;bottom:0px;background-color:#952f2a" @click="submit">联系管家获得完整解决方案</van-button>
    <van-dialog
      title=""
      v-model="show"
      message="您的专属顾问会尽快与您联系！"
      show-confirm-button
    >
    </van-dialog>
  </div>
</template>

<script>
export default {
  data(){
    return{
      loading: false,
      show:false,
      report:[],
      companyname:""
    }
  },
  methods:{
    init(){
      console.log(this.$route)
      let _self = this
      _self.loading = true
      let url = `api/store/customer/company/analysis/result`
      let config = {
        params:{
          companyId: _self.$route.params.companyid,
          period: _self.$route.params.period
        }
      }

      function success(res){
        _self.report = res.data.data
        _self.loading = false
      }

      function fail(err){
        _self.loading = false
      }

      this.$Get(url, config, success, fail)
    },
    submit(){
      let _self = this
      let url = `api/store/customer/ask/help`

      let config = {
        companyId: _self.$route.params.companyid,
      }

      function success(res){
        _self.show = true
      }

      function fail(err){
        console.log(err)
      }

      this.$Post(url, config, success, fail)
    },
  },
  created(){
    let _self = this
    this.init()
    this.companyname = localStorage.getItem("companyName")
    this.year = this.$route.params.period.slice(0,4)
    this.month = this.$route.params.period.slice(4)
  }
}
</script>

