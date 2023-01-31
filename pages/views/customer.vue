<template>
    <!--pages/views/particulars.wxml-->
    <view class="particulars">
        <van-sticky>
            <view class="head">
                <view class="top">
                    <text class="title">客户</text>
					<input type="text" placeholder="输入姓名/手机号搜索" v-model="search" @confirm="getUserList()" @blur="getUserList()">
                    <image @click="addUser" src="../../static/images/icon/adduser.png" mode="widthFix"></image>
                </view>
            </view>
        </van-sticky>

        <view class="list">
            <view class="item"  v-if="userList.length">
                <view class="box" v-for="(item, index) in userList" :key="index" @click="selectF(item)">
					<image class="cover" :src="item.avatar_url" mode="aspectFill"></image>
                    <view class="info">
                        <view class="sub-title">{{item.name}}<text style="color: red;" v-if="item.status==0">（关闭）</text></view>
                        <view class="time">{{item.phone||'未知'}}</view>
                        <view class="time">{{ item.sex>0?item.sex==1?'男':'女':'保密' }}/{{item.job||'未知'}}，生日：{{item.birthday||'未知'}}</view>
                        <view class="pay" @click.stop="goInfo(item)">{{item.money}}</view>
                    </view>
                </view>
            </view>
			<van-empty v-else description="没有数据" />
        </view>
    </view>
</template>

<script>
import vanSticky from '@/wxcomponents/@vant/weapp/sticky/index';
import vanIcon from '@/wxcomponents/@vant/weapp/icon/index';
import vanEmpty from '@/wxcomponents/@vant/weapp/empty/index';
import { formatTime, toThousands, formatTimeTwo } from '../../utils/util';
let app = getApp()
// pages/views/achievement.js
export default {
    components: {
        vanSticky,
		vanIcon,
		vanEmpty
    },
    data() {
        return {
			userList:[],
			search:'',
			select:0,
			page:1
		};
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
		this.select = options.select || 0
	},
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
		this.getUserList()
	},
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
    onReachBottom: function () {
		this.getUserList(false)
	},
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {},
    methods: {
		addUser(){
			uni.navigateTo({
				url:'/pages/views/updateUserInfo?type=1'
			})
		},
		selectF(item){
			if(!this.select){
				uni.navigateTo({
					url:'/pages/views/updateUserInfo?type=1&id='+item.id
				})
			}else{
				const pages = getCurrentPages();
				const pre = pages[pages.length - 2]; 
				pre.$vm.customer = item
				uni.navigateBack({
					delta:1
				})
			}
			
		},
		getUserList(flag=true){
			if(flag){
				this.page = 1
			}
			app.globalData.ajaxPost('/api/get-customer-list', {keyword:this.search,page:this.page}, (res) => {
			    if (res.code === 200) {
					if(flag){
						res.data.list.forEach((item)=>{
							item.money = toThousands(item.money)
						})
						this.setData({
						    userList: res.data.list
						});
						this.page++
					}else{
						if(res.data.list.length>0){
							res.data.list.forEach((item)=>{
								item.money = toThousands(item.money)
							})
							this.userList.push(...res.data.list)
							this.page++
						}
					}
			    }
			});
		},
		goInfo(item){
			if(!this.select){
				uni.navigateTo({
					url:'/pages/views/clerkInfo?type=1&id='+item.id
				})
			}else{
				const pages = getCurrentPages();
				const pre = pages[pages.length - 2]; 
				pre.$vm.customer = item
				uni.navigateBack({
					delta:1
				})
			}
			
		}
	}
};
</script>
<style lang="less">
/* pages/views/particulars.wxss */
.particulars {
}

.head {
    background: #ffffff;
    padding-top: 36rpx;
    padding-bottom: 36rpx;
    border-radius: 0 0 40rpx 40rpx;
    box-shadow: 0px 15px 12px 0px rgba(100, 100, 100, 0.1);
}
.head .top {
    padding: 0 36rpx;
    display: flex;
    justify-content: space-between;
	align-items: center;
	input{
		flex: 1;
		margin:0 30rpx;
		box-shadow: 0 0 8rpx 5rpx rgba(0, 0, 0, 0.1);
		border-radius: 50rpx;
		padding: 10rpx 30rpx;
	}
	image{
		width: 60rpx;
		height: 60rpx;
	}
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
	padding: 40rpx 20rpx;
}
</style>
