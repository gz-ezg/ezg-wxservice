<template>
  <div>
    <van-row v-if="!allInvoice.length" style="margin-top:35vh">
      <center @click="create_invoice">
        <van-icon name="add-o" style="color:#952f2a;font-size:30px"/>
        <p style="padding-top:10px">新增发票申请</p>
      </center>
    </van-row>
    <van-row v-else>
      <van-loading style="top:5vh;left:45vw" v-if="loading"></van-loading>
      <van-row v-else></van-row>
    </van-row>
  </div>
</template>

<script>
export default {
  data(){
    return{
      allInvoice: [

      ],
      loading: false
    }
  },
  methods: {
    get_data(){

    },
    create_invoice(){
      this.$router.push({
        name: "invoiceCreate"
      })
    }
  },
  created(){
    console.log(document.title)
  }
}
</script>
