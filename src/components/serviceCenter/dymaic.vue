<template>
    <van-row>
        <van-nav-bar
            style="background-color: #CC3300;color:white"
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
        <van-steps direction="vertical" :active="activeIndex" active-color="#f60" style="margin-top:20px;margin-bottom:60px">
            <van-step v-for="item in workOrderList" :key="item.id">
                <van-row >
                <van-col span="10" >{{item.PROCESS}}</van-col>
                <van-col span="10" ><span>{{item.enddate}}</span></van-col>
                </van-row>
            </van-step>
        </van-steps>
        <van-button type="primary" bottom-action style="font-size:20px;border-radius:5px;position:fixed;bottom:0px;background-color:#cc3300;z-index:3" @click="submit">我要催单</van-button>
    </van-row>
</template>

<script>
export default {
  data(){
    return {
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
        for(let i = 0;i<_self.workOrderList.length;i++){

          if(_self.workOrderList[i].enddate){
            _self.workOrderList[i].enddate = _self.workOrderList[i].enddate.slice(0,10)
          }
          if(_self.workOrderList[i].status == "1"){
            _self.activeIndex = i
            _self.workOrderList[i].enddate = "服务中"
          }
        }
      }

      function fail(err){
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

