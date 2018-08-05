<template>
  <div>
    <van-nav-bar
        style="background-color: #CC3300;color:white"
        title="企业评估报告"
        left-arrow
        @click-left="$backTo()"
      />
    <van-row style="padding:10px">
      <van-row v-for="item in tableData" :key="item.id">
        <van-col span="20" style="font-size:16px;border:1px solid #636363;padding-left:12px;line-height:16px">{{item.name}}</van-col>
        <van-col span="4" style="font-size:16px;border:1px solid #636363;padding-left:12px;line-height:16px">100</van-col>
      </van-row>
    </van-row>
  </div>
</template>

<script>
export default {
  data(){
    return{
      tableData:[]
    }
  },
  methods:{
    get_table_data(){
      let _self = this
      let url = `http://192.168.0.220:8888/Mock/simple?projectID=1&uri=/store/findCompanyReportInfo`

      let config = {
        params:{
          // companyId:_self.$route.params.companyid,
          // period: _self.$route.params.period,
          // type: _self.$route.params.type
        }
      }

      function success(res){
        console.log(res.data.data)
        _self.tableData = res.data.data
      }

      function fail(err){
        console.log(err)
      }

      this.$Get(url, config, success, fail)
    }
  },
  created(){
    this.get_table_data()
  }
}
</script>

<style scoped>
.title{
  font-size:14px;
  padding: 0px;
}
</style>
