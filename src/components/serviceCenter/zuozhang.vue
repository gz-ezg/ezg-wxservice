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

    <van-row style="background-color: rgba(255, 240, 245,0.5);padding:10px;margin:20px;font-size:14px;box-shadow: 5px 5px 13px #E6E8FA">
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
      <center class="demo_line_02"><span @click="open_month_pick">做账账期</span></center>
    </van-row>
    <van-row style="margin-top:20px;margin-bottom:10px">
      <center>
        <span @click="open_month_pick" class="date">{{currentMonth}}</span>
      </center>
    </van-row>

    <van-cell-group>
      <van-cell>
        <van-icon name="pending-orders" slot="title" style="font-size:40px;margin-left:20px;margin-bottom:10px" />
        <div style="line-height:59px" @click="open_table('balance')">资产负债表</div>
      </van-cell>
      <van-cell>
        <van-icon name="pending-orders" slot="title" style="font-size:40px;margin-left:20px;margin-bottom:10px" />
        <div style="line-height:59px" @click="open_table('income')">利润表</div>
      </van-cell>
      <van-cell>
        <van-icon name="pending-orders" slot="title" style="font-size:40px;margin-left:20px;margin-bottom:10px" />
        <div style="line-height:59px" @click="open_table('cash')">现金流量表</div>
      </van-cell>
    </van-cell-group>

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
      currentMonth:"2018-05",
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
        shuijin:"0",
        qiyesuodeshui:"0",
        gerensuodeshui:"0",
        qitashuifei:"0"
      }
    }
  },
  computed:{
    href:function(){
      return "tel:" + this.tel
    }
  },
  methods:{
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
    open_month_pick(){
      this.isOpen = true
    },
    confirm_month(e){
      let temp = e.getMonth()+1
      if(temp<10){
        temp = '0'+temp
      }
      this.currentMonth = e.getFullYear() +'-' + temp
      this.isOpen = false
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
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`
      }
      return value;
    },
    open_table(e){
      // console.log(e)
      let _self = this
      let temp = _self.currentMonth.split("-").join("")
      this.$router.push({
        name:'table',
        params:{
          type:e,
          period:temp,
          companyId:_self.$route.params.companyid
        }
      })
    }
  },
  mounted(){

  },
  created(){
    this.companyName = localStorage.getItem("companyName")
    this.get_base_info()
    let temp = this.$route.params.period.toString()
    // this.currentMonth = this.$route.params.period.slice(0,4)+"-" + this.$route.params.period.slice(4)
    this.currentMonth = temp.slice(0,4) + "-" + temp.slice(4)
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
