<template>
    <!--pages/views/particulars.wxml-->
    <view class="particulars">
        <van-sticky>
            <view class="head">
                <view class="top">
                    <text class="title">记账明细</text>

                    <picker @change="bindPickerChange" range-key="name" :value="index" :range="types">
                        <view class="type">
                            {{ typeInfo.name || '选择类型' }}
                            <van-icon class="icon" name="apps-o" />
                        </view>
                    </picker>
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
                    <view class="box" v-for="(item, index) in list" :key="index">
                        <view class="cover" :style="'background-image: url(' + item.category_info.icon_url + ');'"></view>

                        <view class="info">
                            <view class="sub-title">{{ item.category_info.name }}{{ item.name?' ~ '+item.name:'' }}</view>
							<view class="time imgView">
								<view class="userK" v-if="item.customer_info">
									<image src="../../static/images/icon/boss.png" mode="widthFix"></image> 
									<text>{{item.customer_info.name || '未知'}}</text>
								</view>
								<view class="userK" v-if="item.staff_info">
									<image src="../../static/images/icon/yuangong.png" mode="widthFix"></image> 
									<text>{{item.staff_info.name || '未知'}}</text>
								</view>
							</view>
                            <view class="time">{{ item.str_time }}</view>
                            <view class="pay newMoney">
                                <text v-if="item.type == 1" class="color-zcr">-{{ item.money }}</text>
                                <text v-if="item.type == 2" class="color-sr">+{{ item.money }}</text>
                                <text v-if="item.type == 3" class="color-zc">{{ item.money }}</text>
								<text class="gMoney">{{ item.staff_account_info?item.staff_account_info.money:'' }}</text>
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
            types: [
				{
				    name: '全部',
				    value: 0
				},
                {
                    name: '支出',
                    value: 1
                },
                {
                    name: '收入',
                    value: 2
                },
                {
                    name: '卡消',
                    value: 3
                }
            ],
            form: {
                type: 0,
                start_time: '',
                end_time: '',
                date_lebal: '',
				page:1
            },
            typeInfo: {
                name: '全部',
                value: 0
            },
            list: []
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let datt = getfirstDateAndlastDate(new Date());
        this.setData({
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
		this.getList(false)
	},
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {},
    methods: {
        bindPickerChange(e) {
            const types = this.types;
            const index = e.detail.value;
            this.setData({
                typeInfo: types[index],
                ['form.type']: types[index]['value']
            });
            this.getList();
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

        getList(flag=true) {
			if(flag){
				this.form.page = 1
			}
            const obj = this.form;
			obj.book_id = app.globalData.book_id
            if (obj.start_time && obj.end_time) {
                app.globalData.ajaxPost('/api/get-tally-main-list', obj, (res) => {
                    if (res.code === 200) {
						if(flag){
							res.data.list.forEach((v) => {
							    v.money = toThousands(v.money);
								if (v.staff_account_info) {
									v.staff_account_info.money = toThousands(v.staff_account_info.money)
								}
							    v.str_time = v.create_time
							});
							this.list = res.data.list
							this.form.page++
						}else{
							if(res.data.list.length>0){
								res.data.list.forEach((v) => {
								    v.money = toThousands(v.money);
									if (v.staff_account_info) {
										v.staff_account_info.money = toThousands(v.staff_account_info.money)
									}
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
.newMoney{
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		.gMoney{
			margin-top: 10rpx;
			color: #8d8d8d;
			font-size: 28rpx;
			font-weight: 400;
		}
	}
.particulars {
}
.imgView{
	display: flex;
	align-items: center;
	margin: 6rpx 0;
	.userK{
		width: 30%;
		display: flex;
		align-items: center;
		margin-right: 20rpx;
		&:first-child{
			width: 40%;
		}
		image{
			flex-shrink: 0
		}
		text{
			flex: 1;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
		}
	}
	image{
		width: 40rpx;
		height: 40rpx;
		margin-right: 4rpx;
		border-radius: 50%;
	}
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
    padding-top: 40rpx;
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
