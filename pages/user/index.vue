<template>
    <view>
        <!--pages/user/index.wxml-->
        <view class="head" :style="'padding-top:' + menuRect.top + 'px;background-image:url(' + url + '/static/imgs/bg-user.png)'">
            <view class="top" :style="'height:' + menuRect.height + 'px'"></view>
            <view class="portrait">
                <view class="cover boxshow1" @click="getUserInfo()"><image mode="aspectFill" :src="info.avatar_url"></image></view>
                <view class="info">
                    <view class="title">
                        <text :class="{'textRed':spec==1}">{{ info.nick_name }}</text>
                        <navigator class="abc" url="/pages/views/user_setting" hover-class="none">
                            <van-icon name="setting-o" class="icon-o" />
                        </navigator>
                    </view>
                    <view class="drm" @touchend="maskTouchend">{{ info.sex>0?info.sex==1?'男':'女':'未知' }}/{{ info.job }}</view>
                </view>
            </view>

            <view class="tji">
                <view class="item">
                    <view class="title">{{ tallyTotal.income }}</view>
                    <view class="desc">收入金额/元</view>
                </view>
				<view class="item">
				    <view class="title">{{ tallyTotal.disregard }}</view>
				    <view class="desc">卡消/元</view>
				</view>
                <view class="item">
                    <view class="title">{{ tallyTotal.expend }}</view>
                    <view class="desc">支出金额/元</view>
                </view>
                
            </view>
        </view>
        <!-- 菜单导航 -->
        <view class="navs container">
            <view class="main boxshow3 flexL">
                <navigator url="/pages/views/particulars" hover-class="none">
                    <view class="item">
                        <image src="/static/images/icon/1.png"></image>
                        <view class="title color2">明细</view>
                    </view>
                </navigator>

                <navigator url="" class="item" @tap="setUrlAddBooks" hover-class="none">
                    <image src="/static/images/icon/2.png"></image>
                    <view class="title color2">账本</view>
                </navigator>

                <navigator url="/pages/views/classify_msg" hover-class="none">
                    <view class="item">
                        <image src="/static/images/icon/3.png"></image>
                        <view class="title color2">类型</view>
                    </view>
                </navigator>
                <!-- <navigator url="/pages/views/achievement" hover-class="none">
                    <view class="item">
                        <image src="/static/images/icon/4.png"></image>
                        <view class="title color2">排行</view>
                    </view>
                </navigator> -->
				<navigator url="/pages/views/customer" hover-class="none">
				    <view class="item">
				        <image src="/static/images/icon/4.png"></image>
				        <view class="title color2">客户</view>
				    </view>
				</navigator>
				<navigator url="/pages/views/clerk" hover-class="none">
				    <view class="item">
				        <image src="/static/images/icon/4.png"></image>
				        <view class="title color2">店员</view>
				    </view>
				</navigator>
            </view>
        </view>

        <!-- 内容部分 -->
        <view class="center">
            <!-- <view class="tabs">
    <view class="item color5 active">普通账本</view>
    <view class="item color5">账本2</view>
    <view class="item color5">账本3</view>
  </view> -->

            <view class="book">
				<view class="value imgqb">
					<image class="imgqbs" src="../../static/images/icon/qb.png" mode="widthFix"></image>
				    {{ bookInfo.name}}
				</view>
                <!-- <picker @change="bindPickerChange" range-key="name" :value="index" :range="books">
                    <view class="value">
                        {{ bookInfo.name || '选择账本' }}
                        <image class="aw" src="/static/images/icon/arrow.png"></image>
                    </view>
                </picker> -->
            </view>

            <view class="ntj">
                <view class="main boxshow3">
                    <van-icon name="play" class="arrow" />

                    <view class="item a1">
                        <view class="name">{{ formTj.date_year_lebal || '请选择' }}</view>
                        <picker @change="bindPickerChangeDate" mode="date" fields="month">
                            <view class="value">
                                {{ formTj.date_lebal || '请选择' }}
                                <image class="aw" src="/static/images/icon/arrow.png"></image>
                            </view>
                        </picker>
                    </view>

                    <view class="item">
                        <view class="name">收入/元</view>
                        <view class="value">{{ tongji.income || '--' }}</view>
                    </view>

                    <view class="item">
                        <view class="name">卡消/元</view>
                        <view class="value">{{ tongji.disregard || '--' }}</view>
                    </view>
					<view class="item">
					    <view class="name">支出/元</view>
					    <view class="value">{{ tongji.expend || '--' }}</view>
					</view>
                </view>
            </view>

            <!-- <view class="container app-list">
    <view class="top">
      <view class="name color2"> <view class="app-ii"></view> 12月预算 </view>
      <view class="hint"> <van-icon class="r-icon ll" name="play-circle" /> <van-icon class="r-icon" name="play-circle" /> </view>
    </view>
    <view class="main">
      <view class="item a1">
        <view class="bnt-yuan">本月预算/元</view>
        <view class="value">230</view>
      </view>
      <view class="item a2">
        <view class="dd">
          <view class="line"></view>

          <van-icon class="icon" name="gold-coin" />
        </view>
        <view class="value"> <text class="hint">已支出：</text>  3680</view>
      </view>
      <view class="item a3">
        <view class="bnt-yuan">剩余预算/元</view>
        <view class="value">230</view>
      </view>
    </view>

  </view> -->

            <view class="navs container app-list" style="margin-top: 0" v-if="false">
                <view class="top">
                    <view class="name color2">
                        <view class="app-ii"></view>
                        福利工具
                    </view>
                </view>
                <view class="main">
                    <view class="item">
                        <image src="/static/images/icon/icon1.png"></image>
                        <view class="title color2">房贷计算</view>
                    </view>

                    <view class="item">
                        <image src="/static/images/icon/icon1.png"></image>
                        <view class="title color2">工资计算</view>
                    </view>

                    <view class="item">
                        <image src="/static/images/icon/icon1.png"></image>
                        <view class="title color2">汇率转换</view>
                    </view>

                    <view class="item">
                        <image src="/static/images/icon/icon1.png"></image>
                        <view class="title color2">去水印</view>
                    </view>
                </view>
            </view>
        </view>

        <!-- 占位 -->
        <view class="app-zw-bc"></view>
        <view class="app-zw"></view>
		<tabbar :selected='2'></tabbar>
    </view>
</template>

<script>
import vanIcon from '@/wxcomponents/@vant/weapp/icon/index';
import vanEmpty from '@/wxcomponents/@vant/weapp/empty/index';
import tabbar from '@/components/tabbar/index.vue';
// pages/user/index.js
const app = getApp();
import { formatTime, toThousands, formatTimeTwo } from '../../utils/util';
export default {
	components:{
		vanIcon,
		vanEmpty,
		tabbar
	},
    data() {
        return {
            menuRect: app.globalData.menuRect,
            url: app.globalData.api_base_url,

            info: {
                avatar_url: '',
                sex: '',
                job: ''
            },

            tallyTotal: {
                income: '',
                expend: '',
                disregard: ''
            },

            books: [],
            bookInfo: {},

            formTj: {
                book_id: '',
                date: '',
                date_lebal: '',
                date_year_lebal: ''
            },

            tongji: {
                income: '',
                expend: '',
                disregard: ''
            },
			touchNum:0,
            selected: 0,
			spec:0,
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        this.setData({
            ['formTj.date']: formatTimeTwo(formatTime(new Date()), 'Y-M'),
            ['formTj.date_year_lebal']: formatTimeTwo(formatTime(new Date()), 'Y'),
            ['formTj.date_lebal']: formatTimeTwo(formatTime(new Date()), 'M月份')
        });
        // this.booksFun();
        // this.getInfo();
        // this.getTallyTotal();
        // this.getTallyTotalTime();
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
		this.setData({
		    ['formTj.book_id']: app.globalData.book_id,
			['bookInfo.name']: app.globalData.book_name
		});
		// this.booksFun();
		this.getInfo();
		this.getTallyTotal();
		this.getTallyTotalTime();
        if (typeof this.getTabBar === 'function' && this.getTabBar()) {
            this.getTabBar().setData({
                // 唯一标识（其它设置不同的整数）
                selected: 2
            });
        }
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
    onPullDownRefresh: function () {
        this.setData({
            ['formTj.date']: formatTimeTwo(formatTime(new Date()), 'Y-M'),
            ['formTj.date_year_lebal']: formatTimeTwo(formatTime(new Date()), 'Y'),
            ['formTj.date_lebal']: formatTimeTwo(formatTime(new Date()), 'M月份')
        });
        // this.booksFun();
        this.getInfo();
        this.getTallyTotal();
		this.getTallyTotalTime();
        setTimeout(() => {
            uni.stopPullDownRefresh();
        }, 1000);
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {},
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {},
    methods: {
		maskTouchend(e){
			let that = this
			this.touchNum ++
			setTimeout(()=>{
				if(this.touchNum == 3){
					app.globalData.ajaxPost('/api/set-user-spec', {}, (res) => {
						if (res.code === 200) {
							that.spec = res.data.spec
							that.getTallyTotal();
							that.getTallyTotalTime();
						}
					});
				}
				this.touchNum = 0
			},600)
		},
		getUserInfo(){
			let that = this
			uni.getUserProfile({
			  desc: '获取头像昵称',
			  success: function (infoRes) {
			    that.setData({
					['info.avatar_url']:infoRes.userInfo.avatarUrl,
					['info.nick_name']:infoRes.userInfo.nickName,
				})
				app.globalData.ajaxPost('/api/set-user-info', that.info, (res) => {
					if (res.code === 200) {
						uni.showToast({
							title: '更新成功'
						});
						// setTimeout(() => {
						// 	that.getInfo();
						// }, 500);
					}
				});
			  }
			});
		},
        booksFun() {
            app.globalData.ajaxPost('/api/get-user-book', {}, (res) => {
                if (res.code === 200) {
                    this.setData({
                        books: res.data
                    });
                }
            });
        },

        bindPickerChange(e) {
            const books = this.books;
            const index = e.detail.value;
            this.setData({
                bookInfo: books[index],
                ['formTj.book_id']: books[index]['id']
            });
            this.getTallyTotalTime();
        },

        bindPickerChangeDate(e) {
            this.setData({
                ['formTj.date_lebal']: formatTimeTwo(e.detail.value, 'M月份'),
                ['formTj.date_year_lebal']: formatTimeTwo(e.detail.value, 'Y'),
                ['formTj.date']: e.detail.value
            });
            this.getTallyTotalTime();
        },

        getTallyTotal() {
            app.globalData.ajaxPost('/api/get-tally-main-total', {book_id:this.formTj.book_id}, (res) => {
                if (res.code === 200) {
                    res.data.disregard = toThousands(res.data.disregard);
                    res.data.expend = toThousands(res.data.expend);
                    res.data.income = toThousands(res.data.income);
                    console.log(res.data, 89);
                    this.setData({
                        tallyTotal: res.data
                    });
                }
            });
        },

        // 指定时间账本查询
        getTallyTotalTime() {
            const obj = this.formTj;
            console.log(obj, 990);
            let query = {};

            if (obj.date) {
                query.book_id = obj.book_id;
                query.date = obj.date;
                app.globalData.ajaxPost('/api/get-tally-main-total', obj, (res) => {
                    if (res.code === 200) {
                        this.setData({
                            tongji: {
                                disregard: toThousands(res.data.disregard),
                                expend: toThousands(res.data.expend),
                                income: toThousands(res.data.income)
                            }
                        });
                    }
                });
            }
        },

        getInfo() {
            app.globalData.ajaxPost('/api/get-user-info', {}, (res) => {
                if (res.code === 200) {
                    this.setData({
                        info: res.data,
						spec:res.data.spec
                    });
                }
            });
        },

        // 添加账本
        setUrlAddBooks() {
            uni.navigateTo({
                url: '/pages/views/add_books'
            });
        }
    }
};
</script>
<style lang="less">
/* pages/user/index.wxss */
page {
    background: #f9f9f9;
}
.head {
    width: 100%;
    height: 670rpx;
    background-size: cover;
    /* background-position: center; */
    background-position: right;
    border-radius: 0 0 0rpx 160rpx;
}
.head .top {
    /* padding-left: 36rpx; */
    font-weight: 400;
    font-size: 42rpx;
    display: flex;
    align-items: center;
    color: #ffffff;
    justify-content: center;
    /* padding-right: 250rpx; */
}
.head .portrait {
    padding-left: 36rpx;
    display: flex;
    margin-top: 40rpx;
}
.head .portrait .cover {
    width: 140rpx;
    height: 140rpx;
    border-radius: 50%;
    border: 6rpx solid #70c7b7;
    overflow: hidden;
}
.head .portrait .cover image {
    width: 100%;
    height: 100%;
}
.head .info {
    padding-left: 34rpx;
    padding-top: 15rpx;
    flex: 1;
	.textRed{
		color: #ca2727 !important;
	}
}
.head .info .title {
    font-size: 44rpx;
    padding-right: 36rpx;
    color: #ffffff;
    font-weight: bold;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.head .info .title .abc {
    display: flex;
    align-items: center;
    justify-content: center;
	padding: 20rpx;
}
.head .info .title .icon-o {
    font-size: 44rpx;
}
.head .info .drm {
    padding-top: 16rpx;
    font-size: 28rpx;
    color: #ffffff;
}
.head .info .tag {
    margin-top: 10rpx;
    position: relative;
    margin-left: 10rpx;
    width: 130rpx;
    height: 36rpx;
    font-size: 20rpx;
    color: #ffffff;
    font-weight: bold;
    border-radius: 36rpx;
    text-align: right;
    padding-right: 20rpx;
    box-sizing: border-box;
    line-height: 36rpx;
    display: none;
}
.head .info .tag.active {
    display: block;
}
.head .info .tag.v1 {
    background: linear-gradient(97deg, #d7dcdf 0%, #cfd4da 29%, #889198 100%);
}
.head .info .tag.v2 {
    background: linear-gradient(97deg, #c4d7e0 0%, #c2cddf 29%, #829bb3 100%);
}
.head .info .tag.v3 {
    background: linear-gradient(97deg, #fee0a4 0%, #fdc438 29%, #c88c34 100%);
}
.head .info .tag.v4 {
    background: linear-gradient(97deg, #eeead7 0%, #c3b59a 29%, #a48f6e 100%);
}
.head .info .tag image {
    width: 50rpx;
    height: 50rpx;
    position: absolute;
    left: -20rpx;
    top: -7rpx;
}
.head .tji {
    padding: 60rpx 60rpx 0 60rpx;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.head .tji .item {
    text-align: center;
}
.head .tji .item .title {
    font-size: 46rpx;
    font-weight: bold;
    text-shadow: 2px 3px 1px #00a578;
}
.head .tji .item .desc {
    font-size: 24rpx;
    margin-top: 20rpx;
}

.navs {
    margin-top: -172rpx;
}
.navs .main {
    background: #ffffff;
    height: 220rpx;
    position: relative;
    z-index: 100;
    border-radius: 30rpx;
    display: flex;
    /* padding: 0 50rpx; */
    align-items: center;
    justify-content: space-between;
}
.navs .main .item {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
}
.navs .main .item image {
    width: 92rpx;
    height: 92rpx;
}
.navs .main .item .title {
    font-size: 28rpx;
    margin-top: 16rpx;
}

.center {
    /* background: #ffffff; */
    border-radius: 120rpx 120rpx 0 0;
    position: relative;
    z-index: 99;
    margin-top: -155rpx;
    padding-top: 190rpx;
}

.tabs {
    padding: 36rpx;
    padding-top: 20rpx;
    display: flex;
    align-items: center;
}
.tabs .item {
    font-size: 30rpx;
    margin-right: 30rpx;
}
.tabs .item.active {
    font-size: 32rpx;
    font-weight: bold;
    color: #232a24;
}

.ntj {
    padding: 36rpx;
    padding-top: 20rpx;
    padding-bottom: 0;
}
.ntj .main {
    height: 200rpx;
    background-color: #ffffff;
    border-radius: 30rpx;
    position: relative;
    display: flex;
    align-items: center;
}
.ntj .main .arrow {
    font-size: 50rpx;
    color: #ffffff;
    position: absolute;
    transform: rotate(270deg);
    left: 50rpx;
    top: -30rpx;
}
.ntj .main .item {
    flex: 1;
    text-align: center;
}
.ntj .main .item.a1 {
    padding-right: 30rpx;
    border-right: 2rpx solid #f2f6fc;
}
.ntj .main .item .name {
    color: #adaeae;
    font-size: 26rpx;
}
.ntj .main .item .value .aw {
    position: absolute;
    width: 16rpx;
    height: 16rpx;
    bottom: 0;
    right: 0;
}
.ntj .main .item .value {
    color: #232a24;
    font-weight: bold;
    font-size: 36rpx;
    margin-top: 20rpx;
    position: relative;
}
.app-list .hint {
    display: flex;
    align-items: center;
}
.app-list .r-icon {
    font-size: 38rpx;
}
.app-list .r-icon.ll {
    margin-right: 20rpx;
    transform: rotate(180deg);
}
.app-list .main {
    height: 200rpx;
    background-color: #ffffff;
    border-radius: 30rpx;
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 36rpx;
}
.app-list .main .item {
    flex: 0 auto;
    padding: 0;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
}
.app-list .main .item.a2 {
    flex: 1;
}
.app-list .main .item .bnt-yuan {
    width: 160rpx;
    height: 48rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24rpx;
    color: #232a24;
    background: #ffffff;
    border: 2rpx solid #ebeef5;
    border-radius: 40rpx;
}
.app-list .main .item .dd {
    height: 48rpx;
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}
.app-list .main .item .dd .line {
    width: 100%;
    position: absolute;
    border-top: 2rpx dotted #ebeef5;
    left: 0;
    top: 23rpx;
}
.app-list .main .item .dd .icon {
    font-size: 52rpx;
    color: #00a578;
}
.app-list .main .item .value {
    color: #232a24;
    font-weight: bold;
    font-size: 36rpx;
    margin-top: 30rpx;
    position: relative;
    display: flex;
}
.app-list .main .item .value .hint {
    font-size: 24rpx;
    font-weight: 400;
}
.app-list .main .item.a3 .bnt-yuan {
    border-color: #00a578;
    color: #00a578;
}

.book {
    padding: 0 0 20rpx 36rpx;
}
.book .value {
    color: #232a24;
    font-weight: bold;
    font-size: 36rpx;
    margin-top: 20rpx;
    position: relative;
    display: inline-block;
    padding-right: 30rpx;
}
.book .value .aw {
    position: absolute;
    width: 16rpx;
    height: 16rpx;
    bottom: 0;
    right: 0;
}
.flexL{
	overflow: auto;
}
.flexL::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
.flexL navigator{
	width: 25% ;
	flex-shrink: 0;
}
</style>
