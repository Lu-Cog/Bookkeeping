<template>
    <!--pages/views/particulars.wxml-->
    <view class="particulars">
        <van-sticky>
            <view class="head">
                <view class="top">
                    <text class="title">{{userType==1?'客户':'店员'}}账单明细</text>
					<image @click="goAddmoney" src="../../static/images/icon/addmoney.png" mode="widthFix"></image>
                </view>
                <view class="date">
                    <picker @change="bindPickerChangeDate" mode="date" fields="month">
                        <view class="a1">
                            {{ form.date_lebal || '请选择' }}
                            <image class="aw" src="/static/images/icon/arrow.png"></image>
                        </view>
                    </picker>
                </view>
            </view>
        </van-sticky>

        <view class="list app-list">
            <view class="item">
                <block v-if="list.length">
					<uni-swipe-action v-if="userType==2">
						<uni-swipe-action-item v-for="(item, index) in list" :key="index" :right-options="options" @click="bindClick($event,item.id)" :disabled='item.status==1'>
							<view class="box" :class="{'boxBg':item.status==1}">
								<view class="cover" :style="'background-image: url(' + item.category_info.icon_url + ');'"></view>
								<view class="info">
								    <view class="sub-title">{{ item.category_info.name }} ~ {{ item.name }}</view>
								    <view class="time">{{ item.str_time }}</view>
								    <view class="pay">
								        <text v-if="item.type == 1" class="color-zcr">-{{ item.money }}</text>
								        <text v-if="item.type == 2" class="color-sr">+{{ item.money }}</text>
								        <text v-if="item.type == 3" class="color-zc">{{ item.money }}</text>
								    </view>
								</view>
							</view>
						</uni-swipe-action-item>
					</uni-swipe-action>
					<view class="box" v-for="(item, index) in list" :key="index" v-else>
						<view class="cover" :style="'background-image: url(' + item.category_info.icon_url + ');'"></view>
						<view class="info">
						    <view class="sub-title">{{ item.category_info.name }} ~ {{ item.name }}</view>
						    <view class="time">{{ item.str_time }}</view>
						    <view class="pay">
						        <text v-if="item.type == 1" class="color-zcr">-{{ item.money }}</text>
						        <text v-if="item.type == 2" class="color-sr">+{{ item.money }}</text>
						        <text v-if="item.type == 3" class="color-zc">{{ item.money }}</text>
						    </view>
						</view>
					</view>
                </block>
                <van-empty v-else description="没有数据" />
            </view>
        </view>
    </view>
</template>

<script>
import vanSticky from '@/wxcomponents/@vant/weapp/sticky/index';
import vanEmpty from '@/wxcomponents/@vant/weapp/empty/index';
import vanIcon from '@/wxcomponents/@vant/weapp/icon/index';
// pages/views/particulars.js
const app = getApp();
import { getfirstDateAndlastDate, formatTimeTwo, toThousands, getDateDiff } from '../../utils/util';
export default {
    components: {
        vanSticky,
		vanEmpty,
		vanIcon
    },
    data() {
        return {
			options: [{
				text: '结算',
				style: {
					backgroundColor: '#dd524d'
				}
			}],
            form: {
                start_time: '',
                end_time: '',
                date_lebal: '',
				page:1
            },
            list: [],
			userType:1,
			userId:0
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let datt = getfirstDateAndlastDate(new Date());
        this.setData({
			userType : options.type,
			userId : options.id,
            ['form.start_time']: datt[0],
            ['form.end_time']: datt[1],
            ['form.date_lebal']: formatTimeTwo(datt[0], 'Y年M月')
        });
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
		this.getList();
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
		this.getList(false);
	},
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {},
    methods: {
		goAddmoney(){
			uni.navigateTo({
				url:'/pages/views/addMoney?type='+this.userType+'&id='+this.userId
			})
		},
        bindPickerChangeDate(e) {
            let datt = getfirstDateAndlastDate(e.detail.value);
            this.setData({
                ['form.start_time']: datt[0],
                ['form.end_time']: datt[1],
                ['form.date_lebal']: formatTimeTwo(datt[0], 'Y年M月')
            });
            this.getList();
        },
		bindClick(e,id) {
			let that = this
			let url = ''
			if(this.userType==1){
				url = '/api/set-customer-account'
			}else{
				url = '/api/set-staff-account'
			}
			uni.showModal({
				content:'是否结算？',
				success(res) {
					if(res.confirm){
						app.globalData.ajaxPost(url, {id}, (res) => {
						    if (res.code === 200) {
								uni.showToast({
									title:'结算成功',
								})
						        that.getList();
						    }
						});
					}
				}
			})
			
		},
        getList(flag=true) {
			if(flag){
				this.form.page = 1
			}
            const obj = this.form;
			let url = ''
			if(this.userType==1){
				url = '/api/get-customer-account'
			}else{
				url = '/api/get-staff-account'
			}
			obj.book_id = this.userId
            if (obj.start_time && obj.end_time) {
                app.globalData.ajaxPost(url, obj, (res) => {
                    if (res.code === 200) {
						if(flag){
							res.data.list.forEach((v) => {
							    v.money = toThousands(v.money);
							    v.str_time = v.create_time;
							});
							this.setData({
							    list: res.data.list
							});
							this.form.page++
						}else{
							if(res.data.list.length>0){
								res.data.list.forEach((v) => {
								    v.money = toThousands(v.money);
								    v.str_time = v.create_time;
								});
								this.list.push(...res.data.list)
								this.form.page++
							}
						}
                    }
                });
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
    padding-bottom: 80rpx;
    border-radius: 0 0 0 40rpx;
    box-shadow: 0px 15px 12px 0px rgba(100, 100, 100, 0.1);
}
.head .top {
    padding: 0 36rpx;
    display: flex;
    justify-content: space-between;
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
    padding-top: 40rpx;
}
.list .item {
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
    padding: 30rpx;
    border-bottom: 1px solid #f8f8f8;
    display: flex;
    align-items: center;
}
.list .item .boxBg{
	background-color: #eee;
}
.list .item .box .cover {
    width: 98rpx;
    height: 98rpx;
    border-radius: 50%;
    background: #f8f8f8;
    background-size: cover;
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
