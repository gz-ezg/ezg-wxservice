<template>
  <div>
    <van-row v-for="item in tableData" :key="item.id">
      <van-col span="20" style="font-size:10px;border:1px solid #636363;padding-left:12px">{{item.name}}</van-col>
      <van-col span="4" style="font-size:12px;border:1px solid #636363;padding-left:12px">100</van-col>
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
