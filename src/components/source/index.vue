<template>
  <div>
    <van-nav-bar
      title="我的文件"
      left-arrow
      @click-left="$backTo()"
      class="navBarCommonStyle"
    />
    <router-view></router-view>
    <van-tabbar v-model="active" fixed>
      <!-- <van-tabbar-item icon="home" url="http://m.zgcfo.com/">首页</van-tabbar-item>
      <van-tabbar-item icon="chat" url="http://www16.53kf.com/m.php?cid=72151061">在线咨询</van-tabbar-item> -->
      <van-tabbar-item icon="info-o" to="unFinishedList">交接记录</van-tabbar-item>
      <van-tabbar-item icon="contact" to="list">全部资料</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data(){
    return {
      active: 0,
    }
  }
}
</script>

