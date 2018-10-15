<template>
    <van-row>
        <van-nav-bar
            style="background-color: #952f2a;color:white"
            :title="companyName"
            left-arrow
            @click-left="$backTo()"
        />
        <van-row>
            <van-swipe>
                <van-swipe-item>
                  <img src="./dymaic.png" width="100%" height="150px" />
                </van-swipe-item>
            </van-swipe>
        </van-row>
        <center>
          <van-loading v-if="loading" style="top:5vh"></van-loading>
        </center>
        <van-steps direction="vertical" :active="activeIndex" active-color="#f60" style="margin-top:20px;margin-bottom:60px" v-if="!loading">
            <van-step v-for="item in workOrderList" :key="item.id">
                <van-row >
                <van-col span="10" >{{item.PROCESS}}</van-col>
                <van-col span="10" ><span>{{item.enddate}}</span></van-col>
                </van-row>
                <!-- 此处放置服务总结 -->
                <van-row v-if="item.backup" style="margin-top:5px;font-size:12px">
                <van-col span="22" ><div style="width:100%;word-wrap:break-word; word-break: normal; ">{{item.backup}}</div></van-col>
                </van-row>
            </van-step>
        </van-steps>
        <van-button type="primary" bottom-action style="font-size:20px;border-radius:5px;position:fixed;bottom:0px;background-color:#952f2a;z-index:3" @click="submit">我要催单</van-button>
    </van-row>
</template>

<script>
export default {
  data(){
    return {
      loading: false,
      companyName:"",
      activeIndex:0,
      workOrderList:[

      ]
    }
  },
  methods:{
    //  我要催单
    submit(){
      let _self = this
      let id = this.$route.params.workOrderId

      let url = `api/store/customer/complaint/create`
      let config = {
        workOrderId:id,
        record:"客户催单"
      }

      function success(res){
        console.log(res)
        _self.$toast.success("已通知服务人员！")
      }

      function fail(err){
        console.log(err)
        _self.$toast.fail(err.data.data.msg)
      }

      this.$Post(url, config, success, fail)
    },
    init(){
      let _self = this
      _self.loading = true
      let id = this.$route.params.workOrderId

      let url = `api/store/customer/company/work/order/detail`

      let config = {
        params:{
          workOrderId: id
        }
      }

      function success(res){
        // console.log(res.data.data)
        _self.activeIndex = ""
        _self.workOrderList = []
        _self.workOrderList = res.data.data
        _self.companyName = res.data.data[0].companyname
        for(let i = 0;i<_self.workOrderList.length;i++){

          if(_self.workOrderList[i].enddate){
            _self.workOrderList[i].enddate = _self.workOrderList[i].enddate.slice(0,10)
          }
          if(_self.workOrderList[i].status == "1"){
            _self.activeIndex = i
            _self.workOrderList[i].enddate = "服务中"
          }
        }
        _self.loading = false
      }

      function fail(err){
        _self.loading = false
        console.log(err)
      }

      this.$Get(url, config, success, fail)
    }
  },
  created(){
    this.init()
    this.companyName = localStorage.getItem("companyName")
  }
}
</script>

<style>
.van-step--finish .van-step__circle{
  background-color:green
}
.van-step--finish{
  color:green
}
/* .van-step__circle-container>i{
  z-index: 0!important
} */
</style>

