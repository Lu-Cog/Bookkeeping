<template>
    <!--pages/views/particulars.wxml-->
    <view class="particulars">
        <van-sticky>
            <view class="head">
                <view class="top">
                    <text class="title">记账排行</text>
                    <view class="type">
                        选择类型
                        <van-icon class="icon" name="apps-o" />
                    </view>
                </view>

                <view class="date">
                    <view class="a1">
                        2019年8月
                        <image class="aw" src="/static/images/icon/arrow.png"></image>
                    </view>
                </view>
            </view>
        </van-sticky>

        <view class="list">
            <view class="item">
                <view class="box" v-for="(item, index) in 10" :key="index">
                    <view class="sort" v-if="index == 0">
                        <image src="/static/images/icon/sort1.png"></image>
                    </view>

                    <view class="sort" v-if="index == 1">
                        <image src="/static/images/icon/sort2.png"></image>
                    </view>

                    <view class="sort" v-if="index == 2">
                        <image src="/static/images/icon/sort3.png"></image>
                    </view>

                    <view class="sort" v-if="index > 2">2{{ index + 1 }}</view>

                    <view class="cover"></view>

                    <view class="info">
                        <view class="sub-title">昵称昵称</view>
                        <view class="time">IT狗</view>

                        <view class="pay">+888.00</view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import vanSticky from '@/wxcomponents/@vant/weapp/sticky/index';
import vanIcon from '@/wxcomponents/@vant/weapp/icon/index';
import vanEmpty from '@/wxcomponents/@vant/weapp/empty/index';
// pages/views/achievement.js
export default {
    components: {
        vanSticky,
		vanIcon,
		vanEmpty
    },
    data() {
        return {};
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {},
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {},
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {},
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {},
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {},
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {},
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {},
    methods: {}
};
</script>
<style>
/* pages/views/particulars.wxss */
.particulars {
}

.head {
    background: #ffffff;
    padding-top: 36rpx;
    padding-bottom: 80rpx;
    border-radius: 0 0 0 40rpx;
    box-shadow: 0px 15px 12px 0px rgba(100, 100, 100, 0.1);
}
.head .top {
    padding: 0 36rpx;
    display: flex;
    justify-content: space-between;
}
.head .type {
    padding: 12rpx 24rpx;
    border-right: 16rpx;
    background: #f8f8f8;
    margin-right: 20rpx;
    font-size: 28rpx;
    color: #adaeae;
    display: flex;
    align-items: center;
    font-weight: bold;
    color: #33b793;
    background: rgba(34, 173, 135, 0.1);
}
.head .type .icon {
    font-size: 32rpx;
    margin-left: 8rpx;
}
.head .date {
    padding: 0 36rpx;
    padding-top: 30rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 24rpx;
    font-weight: bold;
    color: #4e604e;
}
.head .date .a1 {
    font-weight: bold;
    font-size: 28rpx;
    position: relative;
    color: #232a24;
    padding-right: 20rpx;
}
.head .date .a1 .aw {
    position: absolute;
    width: 16rpx;
    height: 16rpx;
    bottom: 0;
    right: 0;
}

.head .title {
    font-size: 42rpx;
    font-weight: bold;
    color: #232a24;
}
.list {
    padding-top: 50rpx;
}
.list .item {
    padding: 0 36rpx;
    margin-bottom: 40rpx;
}
.list .item .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 28rpx;
    color: #232a24;
    padding-bottom: 30rpx;
}
.list .item .top .a1 {
    font-size: 36rpx;
    font-weight: bold;
}
.list .item .top .a2 {
    color: #666666;
}
.list .item .box {
    padding: 30rpx 0;
    border-bottom: 1px solid #f8f8f8;
    display: flex;
    align-items: center;
}
.list .item .box .sort {
    width: 100rpx;
    font-size: 36rpx;
    font-weight: bold;
    text-align: left;
    color: #000000;
}
.list .item .box .sort image {
    width: 72rpx;
    height: 72rpx;
}
.list .item .box .cover {
    width: 98rpx;
    height: 98rpx;
    border-radius: 50%;
    background: #f8f8f8;
}
.list .item .box .info {
    flex: 1;
    padding-left: 30rpx;
    position: relative;
}
.list .item .box .info .sub-title {
    font-size: 32rpx;
    font-weight: bold;
    color: #232a24;
}
.list .item .box .info .time {
    font-size: 28rpx;
    padding-top: 10rpx;
    color: #adaeae;
}
.list .item .box .info .pay {
    font-weight: bold;
    font-size: 36rpx;
    color: #f57430;
    position: absolute;
    right: 0;
    top: 20rpx;
}
</style>
