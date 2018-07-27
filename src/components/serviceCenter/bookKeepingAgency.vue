<template>
  <van-row>
    <van-nav-bar
      style="background-color: #CC3300;color:white"
      :title="title"
      left-arrow
      @click-left="$backTo()"
    />
    <van-row style="background-color: #CCCCCC;padding:10px">
      <center>
        {{companyName}}
      </center>
    </van-row>

    <van-row style="background-color: #FF8C69;padding:10px;margin:20px;font-size:14px">
      <van-row style="border-bottom:1px solid #999;padding-bottom:5px">
        <van-col span="18">
          <van-row>
            服务会计：{{serviceName}}
          </van-row>
          <van-row>
            联系方式：{{tel}}
          </van-row>
          <van-row>
            服务税期：{{serviceRange}}
          </van-row>
        </van-col>
        <van-col span="6">
          <center><a :href="href"><van-icon name="phone" style="line-height:23px;color:red;padding:15px;font-size:20px" /></a></center>
        </van-col>
      </van-row>
      <van-row style="margin-top:5px">
        <van-col span="14">服务不满意？<a href="/#/complain">我要投诉</a></van-col>
        <van-col span="10" style="font-size:10px;text-align:right;line-height:19px"><van-icon name="info-o" style="line-height:17px"/> 做账资料注意事项</van-col>
      </van-row>
    </van-row>

    <van-steps direction="vertical" :active="activeIndex" active-color="#f60">
      <van-step v-for="item in workOrderList" :key="item.id">
        <van-row>
          <van-col span="6" >{{item.month}}</van-col>
          <van-col span="5" ><span style="line-height:18px" @click="open_baoshui(item)">报税 <van-icon name="passed" v-if="item.baoshui" style="font-size:14px;color:#00EE00;line-height:16px"/><van-icon name="clock" v-if="!item.baoshui" style="font-size:14px;line-height:16px"/></span></van-col>
          <van-col span="5" ><span style="line-height:18px" @click="open_zuozhang(item)">做账 <van-icon name="passed" v-if="item.zuozhang" style="font-size:14px;color:#00EE00;line-height:16px"/><van-icon name="clock" v-if="!item.zuozhang" style="font-size:14px;line-height:16px"/></span></van-col>
          <van-col span="8" ><span @click="open_report(item)" size="small" style="line-height:18px">风险评估报告</span></van-col>
        </van-row>
      </van-step>
    </van-steps>
  </van-row>
</template>

<script>
export default {
  data(){
    return{
      workOrderList:[
        {
          id:1,
          month:201807,
          zuozhang:"",
          baoshui:"2018-07-22"
        },
        {
          id:2,
          month:201808,
          zuozhang:"2018-07-22",
          baoshui:""
        },
        {
          id:3,
          month:201809,
          zuozhang:"2018-07-22",
          baoshui:"2018-07-22"
        },
        {
          id:4,
          month:201807,
          zuozhang:"",
          baoshui:"2018-07-22"
        },
        {
          id:5,
          month:201808,
          zuozhang:"2018-07-22",
          baoshui:""
        },
        {
          id:6,
          month:201809,
          zuozhang:"2018-07-22",
          baoshui:"2018-07-22"
        },
        {
          id:7,
          month:201807,
          zuozhang:"",
          baoshui:"2018-07-22"
        },
        {
          id:8,
          month:201808,
          zuozhang:"2018-07-22",
          baoshui:""
        },
        {
          id:9,
          month:201809,
          zuozhang:"2018-07-22",
          baoshui:"2018-07-22"
        },
      ],
      finish:true,
      activeIndex: 0,
      tel: 13580328323,
      title: "一般纳税人代理记账",
      companyName: "广州则为信息科技有限公司",
      serviceName: "胡小红",
      serviceRange: "2018-05至2019-05"
    }
  },
  computed:{
    href:function(){
      return "tel:" + this.tel
    }
  },
  methods:{
    open_report(e){
      console.log(e)
    },
    open_baoshui(e){
      console.log(e)
    },
    open_zuozhang(e){
      console.log(e)
    }
  },
  mounted(){
    for(let i=0;i<2;i++){
      this.activeIndex++
    }
  }
}
</script>

