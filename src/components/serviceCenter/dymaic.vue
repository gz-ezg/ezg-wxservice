<template>
    <van-row>
        <van-nav-bar
            style="background-color: #CC3300;color:white"
            title="公司名称"
            left-arrow
            @click-left="$backTo()"
        />
        <van-row>
            <van-swipe>
                <van-swipe-item>1</van-swipe-item>
            </van-swipe>
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
