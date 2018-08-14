<template>
    <van-row>
        <van-nav-bar
            style="background-color: #952f2a;color:white"
            title="做账资料说明"
            left-arrow
            @click-left="$backTo()"
        />
        <van-row>
          <span>
            <iframe src="https://mp.weixin.qq.com/s/W25DatAlyJIchb7-O74Myw" height="1000px" width="100%">

            </iframe>
          </span>
        </van-row>
    </van-row>
</template>

<script>
export default {
  data(){
    return{

    }
  },
  created(){
    // window.location.href="https://mp.weixin.qq.com/s/W25DatAlyJIchb7-O74Myw"
  }
}
</script>

