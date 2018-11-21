<template>
  <div>
    <van-row>
      <van-loading style="top:5vh;left:45vw" v-if="loading"></van-loading>
      <van-row v-else style="padding-bottom:60px">
        <van-cell-group>
        <van-list v-for="(item, index) in FilesList" :key="index">
          <div>
              <van-cell :title="item.customer_file_name" :value="item.file_num" :label="item.CompanyName" />
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
      FilesList: []
    }
  },
  methods: {
    get_data(){
      let _self = this
      _self.loading = true
      let url = `api/store/customer/file/list`

      let config = {
        params: {
          page: 1,
          pageSize: 1000,
          application_status: ""
        }
      }

      function success(res){
        _self.loading = false
        _self.FilesList = res.data.data.rows
        console.log(_self.list)
      }

      this.$Get(url, config, success)
    }
  },
  created(){
    let _self = this
    _self.get_data()
  }
}
</script>

