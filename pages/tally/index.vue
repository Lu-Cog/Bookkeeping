<template>
	<view>
		<!--pages/tally/index.wxml-->
		<view class="head"
			:style="'padding-top:' + menuRect.top + 'px;padding-left:' + menuRect.borderWidth + 'px;padding-right:' + menuRect.borderWidth + 'px'">
			<image class="icon" mode="widthFix" :src="url + '/static/imgs/' + weather"></image>
			<!-- <view style="width:36rpx"></view> -->
			<view class="info">
				<view class="title color2">Hi, {{ hi }}</view>
				<view class="desc color3">{{ yud }} {{ hint }}</view>
			</view>
		</view>

		<!-- 账单滚动 -->
		<view class="container bills">
			<scroll-view :scroll-x="true" style="width: 100%">
				<view class="main" :style="'width:' + bmw + 'rpx'">
					<view :class="'item ' + (!book_id ? 'active' : '')" @tap="setTab('全部账本',$event)" :data-id="0"
						:style="'background-image:url(' + url + '/static/imgs/' + (!book_id ? 'book-active1' : 'book') + '.png)'">
						<view class="name">全部账本</view>
					</view>

					<view :class="'item ' + (book_id == item.id ? 'active' : '')" @tap="setTab(item.name,$event)"
						:data-id="item.id"
						:style="'background-image:url(' + url + '/static/imgs/' + (book_id == item.id ? 'book-active1' : 'book') + '.png)'"
						v-for="(item, index) in books" :key="index">
						<view class="name">{{ item.name }}</view>
					</view>

					<view class="item add" @tap="setUrlAddBooks">
						<view class="name">添加账本</view>
						<view class="jia">
							<van-icon name="plus" />
						</view>
					</view>
				</view>
			</scroll-view>
		</view>

		<!-- 账单统计 -->
		<view class="container statistical">
			<van-icon name="play" color="#00a578" class="play" />
			<view class="main" :style="'background-image:url(' + url + '/static/imgs/bg1.png)'">
				<view class="ll">
					<view class="num">{{ tallyTotal.income }}</view>
					<view class="desc color4">当月收入/元</view>
				</view>
				<view style="padding-right: 42rpx">
					<view class="desc color4" style="line-height: 58rpx; margin-top: 0">
						卡消/元
						<text class="sub-num color6">{{ tallyTotal.disregard }}</text>
					</view>
					<view class="desc color4">
						支出/元
						<text class="sub-num color6">{{ tallyTotal.expend }}</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 通用列表 -->
		<block v-if="list1.length > 0">
			<view class="container app-list">
				<view class="top">
					<view class="name color2">
						<view class="app-ii"></view>
						今天
					</view>
					<view class="hint">
						<text>收 {{ statis.jins }}</text>
						，
						<text>卡 {{ statis.jinc }}</text>
						，
						<text>支 {{ statis.jinz }}</text>
					</view>
				</view>
				<view class="main">
					<uni-swipe-action>
						<uni-swipe-action-item v-for="(item, index) in list1" :key="index" :right-options="options"
							@click="bindClick($event,item.id)">
							<view class="item">
								<image :src="item.category_info.icon_url" class="icon"></image>
								<view class="info van-hairline--bottom">
									<view class="title color2">
										{{ item.category_info.name }}{{ item.name?' ~ '+item.name:'' }}</view>
									<view class="date color3 imgView">
										<view class="userK" v-if="item.customer_info">
											<image src="../../static/images/icon/boss.png" mode="widthFix"></image>
											<text>{{item.customer_info.name || '未知'}}</text>
										</view>
										<view class="userK" v-if="item.staff_info">
											<image src="../../static/images/icon/yuangong.png" mode="widthFix"></image>
											<text>{{item.staff_info.name || '未知'}}</text>
										</view>
									</view>
									<view class="date color3">{{ item.str_time }}</view>
									<view class="money newMoney">
										<text v-if="item.type == 1" class="color-zcr">-{{ item.money }}</text>
										<text v-if="item.type == 2" class="color-sr">+{{ item.money }}</text>
										<text v-if="item.type == 3" class="color-zc">{{ item.money }}</text>
										<text class="gMoney">{{ item.staff_account_info?item.staff_account_info.money:'' }}</text>
									</view>
								</view>
							</view>
						</uni-swipe-action-item>
					</uni-swipe-action>
				</view>
			</view>
		</block>
		<block v-if="list2.length > 0">
			<view class="container app-list">
				<view class="top">
					<view class="name color2">
						<view class="app-ii"></view>
						昨天
					</view>
					<view class="hint">
						<text>收 {{ statis.zuos }}</text>
						，
						<text>卡 {{ statis.zuoc }}</text>
						，
						<text>支 {{ statis.zuoz }}</text>
					</view>
				</view>
				<view class="main">
					<uni-swipe-action>
						<uni-swipe-action-item v-for="(item, index) in list2" :key="index" :right-options="options"
							@click="bindClick($event,item.id)">
							<view class="item">
								<image :src="item.category_info.icon_url" class="icon"></image>
								<view class="info van-hairline--bottom">
									<view class="title color2">
										{{ item.category_info.name }}{{ item.name?' ~ '+item.name:'' }}</view>
									<view class="date color3 imgView">
										<view class="userK" v-if="item.customer_info">
											<image src="../../static/images/icon/boss.png" mode="widthFix"></image>
											<text>{{item.customer_info.name || '未知'}}</text>
										</view>
										<view class="userK" v-if="item.staff_info">
											<image src="../../static/images/icon/yuangong.png" mode="widthFix"></image>
											<text>{{item.staff_info.name || '未知'}}</text>
										</view>
									</view>
									<view class="date color3">{{ item.str_time }}</view>
									<view class="money newMoney" >
										<text v-if="item.type == 1" class="color-zcr">-{{ item.money }}</text>
										<text v-if="item.type == 2" class="color-sr">+{{ item.money }}</text>
										<text v-if="item.type == 3" class="color-zc">{{ item.money }}</text>
										<text class="gMoney">{{ item.staff_account_info?item.staff_account_info.money:'' }}</text>
									</view>
								</view>
							</view>
						</uni-swipe-action-item>
					</uni-swipe-action>
				</view>
			</view>
		</block>

		<!-- 空 -->
		<block v-if="list1.length <= 0 && list2.length <= 0">
			<van-empty description="没有记账数据">
				<van-button round color="#00a578" @tap.native="setJiZhang" type="danger" class="bottom-button">立即记账
				</van-button>
			</van-empty>
		</block>

		<!-- <view style="height: 40rpx;"></view> -->
		<!-- 占位 -->
		<view class="app-zw-bc"></view>
		<view class="app-zw"></view>
		<tabbar :selected='0'></tabbar>
	</view>
</template>

<script>
	import vanButton from '@/wxcomponents/@vant/weapp/button/index';
	import vanIcon from '@/wxcomponents/@vant/weapp/icon/index';
	import vanEmpty from '@/wxcomponents/@vant/weapp/empty/index';
	import tabbar from '@/components/tabbar/index.vue';
	// pages/tally/index.js
	const app = getApp();
	import {
		toThousands,
		getDateDiff,
		getTimeState
	} from '../../utils/util';
	import moment from '@/wxcomponents/moment';
	export default {
		components: {
			vanButton,
			vanIcon,
			vanEmpty,
			tabbar
		},
		data() {
			return {
				options: [{
					text: '撤销',
					style: {
						backgroundColor: '#dd524d'
					}
				}],
				menuRect: app.globalData.menuRect,
				url: app.globalData.api_base_url,
				hi: getTimeState(),
				yud: `${new Date().getMonth() + 1}月${new Date().getDate()}号`,
				books: [],
				bmw: 750,
				book_id: 0,

				tallyTotal: {
					expend: '',
					income: '',
					disregard: ''
				},

				list1: [],
				list2: [],

				statis: {
					jins: '',
					jinz: '',
					zuos: '',
					zuoz: '',
					zuoc: '',
				},

				hint: '',
				weather: '',
				selected: 0,
				null: ''
			};
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {},
		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {},
		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			this.setData({
				book_id: app.globalData.book_id
			});
			this.initFun();

		},
		/**
		 * 生命周期函数--监听页面隐藏
		 */
		onHide: function() {},
		/**
		 * 生命周期函数--监听页面卸载
		 */
		onUnload: function() {},
		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {
			this.initFun();
			setTimeout(() => {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {},
		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {},
		methods: {
			initFun() {
				this.getWeather();
				this.wish();
				this.booksFun();
				this.getTallyTotal();
				this.getList();
			},
			bindClick(e, id) {
				let that = this
				uni.showModal({
					content: '是否撤销？',
					success(res) {
						if (res.confirm) {
							app.globalData.ajaxPost('/api/set-tally-cancel', {
								id
							}, (res) => {
								if (res.code === 200) {
									uni.showToast({
										title: '撤销成功',
									})
									that.getList();
									that.getTallyTotal();
								}
							});
						}
					}
				})

			},
			getWeather() {
				app.globalData.ajaxPost('/api/get-weather', {}, (res) => {
					if (res.code === 200) {
						this.setData({
							weather: res.data
						});
					}
				});
			},

			// 跳转记账
			setJiZhang() {
				uni.navigateTo({
					url: '/pages/add/index'
				});
			},

			wish() {
				app.globalData.ajaxPost('/api/benediction', {}, (res) => {
					if (res.code === 200) {
						this.setData({
							hint: res.data.phrase
						});
					}
				});
			},

			setTab(name, e) {
				let id = e.currentTarget.dataset.id;
				this.setData({
					book_id: id
				});
				app.globalData.book_id = e.currentTarget.dataset.id
				app.globalData.book_name = name
				this.getTallyTotal();
				this.getList();
			},

			booksFun() {
				app.globalData.ajaxPost('/api/get-user-book', {}, (res) => {
					if (res.code === 200) {
						let w = res.data.length * 193 + 228 + 193;
						this.setData({
							bmw: w,
							books: res.data // book_id: res.data[0]?res.data[0]['id']:null
						});
					}
				});
			},

			// 获取今天 昨天的 明细列表
			getList() {
				const time = moment().format('YYYY-MM-DD');
				const timezuo = moment().add(-1, 'days').format('YYYY-MM-DD');
				let statis = {
					jins: 0,
					jinz: 0,
					jinc: 0,
					zuos: 0,
					zuoz: 0,
					zuoc: 0
				};
				app.globalData.ajaxPost(
					'/api/get-tally-main-list', {
						start_time: time,
						end_time: time,
						book_id: this.book_id || '',
						page: 1
					},
					(res) => {
						if (res.code === 200) {
							res.data.list.forEach((v) => {
								if (v.type == 1) {
									statis.jinz = statis.jinz + Number(v.money);
								}

								if (v.type == 2) {
									statis.jins = statis.jins + Number(v.money);
								}

								if (v.type == 3) {
									statis.jinc = statis.jinc + Number(v.money);
								}
								if (v.staff_account_info) {
									statis.jinz += Number(v.staff_account_info.money)
									v.staff_account_info.money = toThousands(v.staff_account_info.money)
								}
								v.money = toThousands(v.money);
								v.str_time = v.create_time;
							});
							this.setData({
								list1: res.data.list,
								['statis.jins']: toThousands(statis.jins),
								['statis.jinz']: toThousands(statis.jinz),
								['statis.jinc']: toThousands(statis.jinc),
							});
						}
					}
				);
				app.globalData.ajaxPost(
					'/api/get-tally-main-list', {
						start_time: timezuo,
						end_time: timezuo,
						book_id: this.book_id || '',
						page: 1
					},
					(res) => {
						if (res.code === 200) {
							res.data.list.forEach((v) => {
								if (v.type == 1) {
									statis.zuoz = statis.zuoz + Number(v.money);
								}

								if (v.type == 2) {
									statis.zuos = statis.zuos + Number(v.money);
								}

								if (v.type == 3) {
									statis.zuoc = statis.zuoc + Number(v.money);
								}
								if (v.staff_account_info) {
									statis.zuoz += Number(v.staff_account_info.money)
									v.staff_account_info.money = toThousands(v.staff_account_info.money)
								}
								v.money = toThousands(v.money);
								v.str_time = v.create_time;
							});
							this.setData({
								list2: res.data.list,
								['statis.zuos']: toThousands(statis.zuos),
								['statis.zuoz']: toThousands(statis.zuoz),
								['statis.zuoc']: toThousands(statis.zuoc)
							});
						}
					}
				);
			},

			// 获取本月统计
			getTallyTotal() {
				const start_time = moment().startOf('month').format('YYYY-MM-DD');
				const end_time = moment().endOf('month').format('YYYY-MM-DD');
				app.globalData.ajaxPost(
					'/api/get-tally-main-total', {
						start_time: start_time,
						end_time: end_time,
						book_id: this.book_id || ''
					},
					(res) => {
						if (res.code === 200) {
							res.data.disregard = toThousands(res.data.disregard);
							res.data.expend = toThousands(res.data.expend);
							res.data.income = toThousands(res.data.income);
							this.setData({
								tallyTotal: res.data
							});
						}
					}
				);
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
	/* pages/tally/index.wxss */
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
	.imgView {
		display: flex;
		align-items: center;
		margin: 6rpx 0;

		.userK {
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

		image {
			width: 40rpx;
			height: 40rpx;
			margin-right: 4rpx;
			border-radius: 50%;
		}
	}

	.head {
		display: flex;
		align-items: center;
	}

	.head .icon {
		width: 140rpx;
		height: 140rpx;
	}

	.head .info {}

	.head .info .title {
		font-size: 42rpx;
		font-weight: bold;
	}

	.head .info .desc {
		font-size: 24rpx;
		line-height: 48rpx;
	}

	.bills {
		padding-right: 21rpx;
		padding-left: 21rpx;
	}

	.bills .main {
		width: 994rpx;
		padding: 30rpx 0;
		display: inline-block;
		/* height: 274rpx; */
		/* display: flex;
  align-items: baseline; */
	}

	.bills .item {
		width: 166rpx;
		height: 197rpx;
		float: left;
		margin-right: 15rpx;
		margin-left: 15rpx;
		background-size: cover;
		border-radius: 16rpx;
		background-position: center;
		/* overflow: hidden; */
		box-shadow: 0rpx 0rpx 14rpx #f0f1f3;
		position: relative;
		margin-top: 17.5rpx;
	}

	.bills .item.active {
		width: 190rpx;
		height: 232rpx;
		margin-top: 0;
		border-radius: 24rpx;
		box-shadow: 8px 4px 18px 0px rgba(0, 165, 120, 0.19);
	}

	.bills .item.active .name {
		margin-top: 55rpx;
		background-image: linear-gradient(to right, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1));
	}

	.bills .item .name {
		font-size: 22rpx;
		color: #ffffff;
		height: 36rpx;
		line-height: 36rpx;
		width: 70%;
		background: rgba(0, 0, 0, 0.1);
		margin-left: 15%;
		margin-top: 40rpx;
		border-radius: 32rpx;
		text-align: center;
	}

	.bills .item.add {
		border: 1px dotted #d9d9d9;
		box-sizing: border-box;
		background: #f8f8f8;
	}

	.bills .item.add .name {
		background: none;
		font-size: 28rpx;
		color: #adaeae;
		font-weight: bold;
	}

	.bills .item.add .jia {
		width: 58rpx;
		height: 58rpx;
		border-radius: 50%;
		margin: auto;
		margin-top: 24rpx;
		border: 2px solid #ffffff;
		background: #a5acab;
		color: #ffffff;
		font-weight: bold;
		font-size: 36rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.statistical {
		/* padding-top: 20rpx; */
		margin-top: 20rpx;
		position: relative;
	}

	.statistical .play {
		position: absolute;
		font-size: 32rpx;
		left: 120rpx;
		top: -20rpx;
		transform: rotate(270deg);
	}

	.statistical .main {
		width: 100%;
		height: 192rpx;
		background-size: cover;
		border-radius: 12rpx 40rpx 12rpx 40rpx;
		display: flex;
		justify-content: space-between;
		overflow: hidden;
		padding-top: 32rpx;
		box-sizing: border-box;
		box-shadow: 8px 4px 18px 0px rgba(0, 165, 120, 0.19);
	}

	.statistical .main .ll {
		padding-left: 35rpx;
	}

	.statistical .main .ll .num {
		font-weight: bold;
		font-size: 48rpx;
		line-height: 58rpx;
		color: #ffffff;
		font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
	}

	.statistical .main .desc {
		font-size: 28rpx;
		margin-top: 22rpx;
	}

	.statistical .main .desc .sub-num {
		font-weight: bold;
		margin-left: 20rpx;
	}
</style>
