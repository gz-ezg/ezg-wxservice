<template>
  <div>
    <van-row>
      <van-loading style="top:5vh;left:45vw" v-if="loading"></van-loading>
      <van-row v-else style="padding-bottom:60px">
        <van-cell-group>
          <van-list v-for="(item, index) in list" :key="index">
            <div @click="open_deal(item)">
                <van-cell :title="item.applicant_name" :value="item.createdate.slice(0,10)" :label="item.connect_plan_name" />
            </div>
          </van-list>
        </van-cell-group>
      </van-row>
    </van-row>
  </div>
</template>

<script>
export default {
  data(){
    return{
      loading: false,
      list: [],
      connect_plan: [],
      customer_file_s: [],
      customer_file_s_map: new Map(),
      connect_plan_map: new Map(),

    }
  },
  methods: {
    get_data(){
      let _self = this
      _self.loading = true
      let url = `api/store/customer/file/connect/request/list`

      let config = {
        params: {
          page: 1,
          pageSize: 1000,
          application_status: ""
        }
      }

      function success(res){
        _self.loading = false
        _self.list = res.data.data.rows
        for(let i = 0;i<_self.list.length; i++){
          _self.list[i].application_status_name = _self.customer_file_s_map.get(_self.list[i].application_status)
          _self.list[i].connect_plan_name = _self.connect_plan_map.get(_self.list[i].connect_plan)
        }
        console.log(_self.list)
      }

      this.$Get(url, config, success)
    },
    get_data_center(){
      let _self = this
      _self.loading = true
      let params = "connect_plan,customer_file_s"

      function success(res){
        _self.customer_file_s = res.data.data.customer_file_s
        _self.connect_plan = res.data.data.connect_plan
        _self.customer_file_s_map = _self.$array2map(_self.customer_file_s)
        _self.connect_plan_map = _self.$array2map(_self.connect_plan)
        _self.get_data()
      }

      this.$GetDataCenter(params, success)
    },
    open_deal(e){
      let _self = this
      console.log(e)
      if(e.application_status == "finish"){
        _self.$toast.fail("已处理！请重新选择！")
        return ;
      }

      this.$router.push({
          name:'customer_comfirm',
          params:{
            id: e.id
          }
        })
    }
  },
  created(){
    let _self = this
    _self.get_data_center()
  }
}
</script>

