<template>
  <div>
    <van-nav-bar
      title="服务评价"
      class="navBarCommonStyle"
    />
    <!-- <van-loading v-if="loading" style="top:45vh;left:50vw;font-size:10vw"></van-loading> -->
    <div>
      <center>
        <img src="./banner.png" width="100%"/>
      </center>
    </div>
    <van-row style="background-color: rgba(255, 240, 245,1);padding:10px;margin:20px;font-size:14px;box-shadow: 5px 5px 13px #E6E8FA" v-if="errorStatus">
      <!-- <van-row style="border-bottom:1px solid #999;padding-bottom:5px"> -->
        <div>
          <van-col span="24">
            <van-row style="margin-left:10px">
              <van-col>服务人员：<span>{{wordOrderDetail[0].server_name}}</span></van-col>
            </van-row>
            <van-row style="margin-top:2px;margin-left:10px">
              <van-col>联系方式：{{wordOrderDetail[0].server_tel}}</van-col>
            </van-row>
            <van-row style="margin-top:2px;margin-left:10px">
              <van-col>业务名称：{{wordOrderDetail[0].product_name}}</van-col>
            </van-row>
            <van-row style="margin-top:2px" v-if="wordOrderDetail.length>1 && showMore == false" @click.native="open_more"><center>点击查看服务公司</center></van-row>
            <van-row v-if="showMore">
              <van-col span="24" v-for="(item, index) in wordOrderDetail" :key="index"><center>{{item.company_name}}</center></van-col>
              <van-col span="24" @click.native="showMore = false"><center style='font-size:12px'>关闭</center></van-col>
            </van-row>

          </van-col>
        </div>
        <!-- <van-col span="6">
          <center><a :href="href"><van-icon name="phone" style="line-height:23px;color:red;padding:15px;font-size:20px" /></a></center>
        </van-col> -->
      </van-row>
    <!-- </van-row> -->
      <van-row style="margin:20px;padding:20px;padding-bottom:60px;">
        <van-row type="flex" align="center" style="margin-top:5px">
          <van-col span="8"><span class="rate-text">服务效率：</span></van-col>
          <van-col span="16"><van-rate v-model="serviceRanks" :size="24" :readonly="onlyShow"/></van-col>
        </van-row>
        <van-row type="flex" align="center" style="margin-top:5px">
          <van-col span="8"><span class="rate-text">服务态度：</span></van-col>
          <van-col span="16"><van-rate v-model="attitudeRanks" :size="24" :readonly="onlyShow"/></van-col>
        </van-row>
        <van-row type="flex" align="center" style="margin-top:5px">
          <van-col span="8"><span class="rate-text">服务能力：</span></van-col>
          <van-col span="16"><van-rate v-model="abilityRanks" :size="24" :readonly="onlyShow"/></van-col>
        </van-row>
        <van-row style="margin-top:30px" v-if="show_memo">
          <van-field rows="6" type="textarea" placeholder="吐个槽！" v-model="customerMemo" :readonly="onlyShow"></van-field>
        </van-row>
        <van-row style="margin-top:30px" v-show="show_share">
          <center>
            <van-button type="warning">好服务记得要分享</van-button>
          </center>
        </van-row>
      </van-row>
      <van-button v-if="errorStatus && !onlyShow" type="primary" bottom-action style="font-size:20px;border-radius:2px;position:fixed;bottom:0px;background-color:#952f2a;z-index:3" @click="submit" :loading="submitLoading">提交</van-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      errorStatus: true,
      loading: false,
      serviceRanks: 5,
      abilityRanks: 5,
      attitudeRanks: 5,
      customerMemo: "",
      submitLoading: false,
      onlyShow: false,
      wordOrderDetail:[
        {
          server_name: "",
          server_tel: "",
          product_name: "",
          company_name: ""
        }
      ],
      showMore: false
    }
  },
  computed: {
    show_share() {
      if(this.serviceRanks > 2 || this.abilityRanks > 2 || this.attitudeRanks > 2){
        return true
      }else{
        return false
      }
    },
    show_memo(){
      if(this.serviceRanks <= 2 || this.abilityRanks <= 2 || this.attitudeRanks <= 2){
        return true
      }else{
        return false
      }
    },
  },
  methods: {
    open_more(){
      this.showMore = true
    },
    submit() {
      let _self = this
      let url = `api/store/customer/work/order/callback/update`
      _self.submitLoading = true

      let config = {
        id: _self.$route.params.id,
        serviceRanks: _self.serviceRanks *2,
        abilityRanks: _self.abilityRanks *2,
        attitudeRanks: _self.attitudeRanks *2,
        customerMemo: _self.customerMemo
      }

      function success(res){
        _self.submitLoading = false
        _self.$router.push({
          name: "returnVisitFinish"
        })
      }

      function fail(err){
        _self.submitLoading = false
      }

      this.$Post(url, config, success, fail)
    },
    get_wordorder_detail(e){
      let _self = this
      // _self.loading = true
      let url = `api/store/customer/work/order/callback/detail`

      let config = {
        params: {
          id: e
        }
      }

      function success(res){
      // _self.loading = false
        console.log(res.data.data)
        if(res.data.data.callback_status == "Y"){
          _self.onlyShow = true
          _self.serviceRanks = res.data.data.service_ranks/2
          _self.abilityRanks = res.data.data.ability_ranks/2
          _self.attitudeRanks = res.data.data.attitude_ranks/2
          _self.customerMemo = res.data.data.customer_memo
        }else{
          _self.onlyShow = false
        }
        if(res.data.data.items){
          let temp = JSON.parse(res.data.data.items)
          _self.wordOrderDetail = temp
          console.log(_self.wordOrderDetail)
        }
      }

      function fail(err){
        _self.$toast.fail("查无相关工单信息！")
        _self.errorStatus = false
      }

      this.$Get(url, config, success, fail)
    }
  },
  created(){
    let _self = this
    if(_self.$route.params.id){
      this.errorStatus = true
      this.get_wordorder_detail(_self.$route.params.id)
    }else{
      this.errorStatus = false
      this.$toast.fail("非法请求！")
    }
  }
}
</script>

<style scoped>
.rate-text{
  font-size:16px;
  line-height: 16px;
}
</style>
