<template>
  <van-row>
    <van-nav-bar
      style="background-color: #952f2a;color:white"
      :title="detail.product"
      left-arrow
      @click-left="$backTo()"
    />
    <van-row style="background-color: #CCCCCC;padding:10px">
      <center>
        {{companyName}}
      </center>
    </van-row>

    <van-row style="background-color: rgba(255, 240, 245,0.5);padding:10px;margin:20px;font-size:14px">
      <van-row style="border-bottom:1px solid #999;padding-bottom:5px">
        <van-col span="18">
          <van-row>
            服务会计：{{detail.realname}}
          </van-row>
          <van-row>
            联系方式：{{tel}}
          </van-row>
          <van-row>
            服务税期：{{detail.begin_period}}至{{detail.end_period}}
          </van-row>
        </van-col>
        <van-col span="6">
          <center><a :href="href"><van-icon name="phone" style="line-height:23px;color:red;padding:15px;font-size:20px" /></a></center>
        </van-col>
      </van-row>
      <van-row style="margin-top:5px">
        <van-col span="14">服务不满意？<a style="color:rgb(0, 0, 238)" @click="open_complain">我要投诉</a></van-col>
      </van-row>
    </van-row>

    <van-row>
      <center class="demo_line_02"><span @click="open_month_pick">报税税期</span></center>
    </van-row>
    <van-row style="margin-top:20px;margin-bottom:10px">
      <center>
        <span @click="open_month_pick" class="date">{{currentMonth}}</span>
      </center>
    </van-row>
  <van-cell-group >
    <van-cell icon="gold-coin" title="增值税" :value="accountTotal.shuijin" style="font-size:18px"/>
    <van-cell icon="gold-coin" title="企业所得税" :value="accountTotal.qiyesuodeshui" style="font-size:18px"/>
    <van-cell icon="gold-coin" title="个税" :value="accountTotal.gerensuodeshui" style="font-size:18px"/>
    <van-cell icon="gold-coin" title="附加税" :value="accountTotal.qitashuifei" style="font-size:18px" />
  </van-cell-group>

  <!-- <van-swipe>
    <van-swipe-item>1</van-swipe-item>
    <van-swipe-item>2</van-swipe-item>
    <van-swipe-item>3</van-swipe-item>
    <van-swipe-item>4</van-swipe-item>
  </van-swipe> -->
  <van-popup v-model="isOpen" position="bottom">
    <van-datetime-picker
      v-model="currentDate"
      :min-date="minDate"
      type="year-month"
      :formatter="formatter"
      @confirm="confirm_month"
    />
  </van-popup>
  </van-row>
</template>

<script>
export default {
  data(){
    return{
      currentMonth:"",
      minDate: new Date(2018, 0, 1),
      isOpen:false,
      currentDate: "",
      detail:{
        begin_period:"",
        companyname:"",
        cycle_work_order_id:"",
        end_period:"",
        mobilePhone:"",
        product:"无",
        realname:"",
        service_record_id:"",
        skuname:""
      },
      tel:"",
      companyName: "无",
      accountTotal:{
        shuijin:"0元",
        qiyesuodeshui:"0元",
        gerensuodeshui:"0元",
        qitashuifei:"0元"
      }
    }
  },
  computed:{
    href:function(){
      return "tel:" + this.tel
    }
  },
  methods:{
    open_month_pick(){
      this.isOpen = true
    },

    open_complain(){
      let _self = this
      this.$router.push({
        name:'complain',
        params:{
          id: _self.detail.cycle_work_order_id,
          product: _self.detail.product
        }
      })
    },

    confirm_month(e){
      let temp = e.getMonth()+1
      if(temp<10){
        temp = '0'+temp
      }
      this.currentMonth = e.getFullYear() +'-' + temp
      this.isOpen = false
      this.get_account()
    },

    get_base_info(){
      let _self = this
      let url = `api/store/customer/company/companyServiceInfo`
      let config = {
        params:{
          companyId:_self.$route.params.companyid
          // companyId:33927
        }
      }

      function success(res){
        _self.tel = res.data.data[0].mobilePhone
        _self.detail = res.data.data[0]
      }

      function fail(err){
        // console.log(err)
      }

      this.$Get(url, config, success, fail)
    },
    get_account(){
      let _self = this
      let url = `api/store/customer/company/account/report`
      let temp = _self.currentMonth.split("-").join("")
      let config = {
        params:{
          companyId: _self.$route.params.companyid,
          period: temp
        }
      }

      function success(res){
        _self.accountTotal = res.data.data
        _self.accountTotal.shuijin = _self.accountTotal.shuijin + " 元"
        _self.accountTotal.qiyesuodeshui = _self.accountTotal.qiyesuodeshui + " 元"
        _self.accountTotal.gerensuodeshui = _self.accountTotal.gerensuodeshui + " 元"
        _self.accountTotal.qitashuifei = _self.accountTotal.qitashuifei + " 元"

      }

      function fail(err){
        _self.accountTotal.shuijin = "0元"
        _self.accountTotal.qiyesuodeshui = "0元"
        _self.accountTotal.gerensuodeshui = "0元"
        _self.accountTotal.qitashuifei = "0元"
        _self.$toast.fail(err.data.msg)
      }

      this.$Get(url, config, success, fail)
    },
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`
      }
      return value;
    }
  },
  mounted(){
    this.companyName = localStorage.getItem("companyName")
    let temp = this.$route.params.period.toString()
    // this.currentMonth = this.$route.params.period.slice(0,4)+"-" + this.$route.params.period.slice(4)
    this.currentMonth = temp.slice(0,4) + "-" + temp.slice(4)
    this.get_base_info()
    this.get_account()
  },
  created(){

  }
}
</script>

<style scoped>
.van-step--finish{
  color:red
}
.date::before{
  content: "< "
}
.date::after{
  content: " >";
}



.demo_line_02{
    height: 1px;
    border-top: 1px solid black;
    text-align: center;
    margin-left: 5px;
    margin-right: 5px;
}
.demo_line_02 span{
    position: relative;
    top: -13px;
    background: whitesmoke;
    padding: 0 20px;
}


/* .van-step--finish .van-step__line{
  background-color: red
} */
</style>
