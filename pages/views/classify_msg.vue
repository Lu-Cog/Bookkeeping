<template>
	<!--pages/views/classify_msg.wxml-->
	<view class="list">
		<view class="title">类型管理</view>
		<view class="hint">轻触类型即可编辑，点击添加即可添加类型</view>

		<view class="navs">
			<view @tap="setTab" :data-key="3" :class="'item ' + (type == 3 ? 'active' : '')">项目管理</view>
			<view @tap="setTab" :data-key="2" :class="'item ' + (type == 2 ? 'active' : '')">充值类型</view>
			<view @tap="setTab" :data-key="1" :class="'item ' + (type == 1 ? 'active' : '')">支出类型</view>
		</view>

		<view class="classify">
			<view class="item" @tap="editItem" :data-item="item" v-for="(item, index) in categorys" :key="index">
				<view class="cover" :style="'background-image: url(' + item.icon_url + ');'"></view>

				<view class="name">{{ item.name }}</view>
			</view>

			<view class="item" @tap="addCf">
				<view class="cover">
					<van-icon name="add" style="font-size: 82rpx; color: #adaeae" />
				</view>
				<view class="name">添加</view>
			</view>

			<view class="item zw" v-for="(item, index) in 5" :key="index">
				<view class="abc"></view>
			</view>
		</view>

		<van-popup :show="isShow" position="bottom" round @close="onClose">
			<view class="main-bb">
				<view class="form">
					<view class="lebal">名称</view>
					<view class="value">
						<input v-model="form.name" placeholder-class="plac" placeholder="请输入分类名称" />
					</view>
				</view>
				<view class="form">
					<view class="lebal">金额</view>
					<view class="value">
						<input v-model="form.money" placeholder-class="plac" placeholder="请输入项目金额" />
					</view>
				</view>
				<!-- <view class="form">
					<view class="lebal">提成</view>
					<view class="value">
						<input v-model="form.tc_money" placeholder-class="plac" placeholder="请输入员工提成" />
					</view>
				</view> -->
				<view class="form" style="margin-bottom: 36rpx">
					<view class="lebal">排序</view>
					<view class="value">
						<input v-model="form.sort" placeholder-class="plac" placeholder="请输入排序(越小越靠前)" />
					</view>
				</view>
				<van-button type="primary" @tap.native="saveForm" custom-style='margin-bottom: 20rpx;width:100%;'>保存分类
				</van-button>
				<van-button color="#d91313" type="danger" @tap.native="delForm" custom-style='margin-bottom: 20rpx;width:100%;' v-if="form.id">删除分类
				</van-button>
			</view>
		</van-popup>
	</view>
</template>

<script>
	import vanPopup from '@/wxcomponents/@vant/weapp/popup/index';
	import vanButton from '@/wxcomponents/@vant/weapp/button/index';
	import vanIcon from '@/wxcomponents/@vant/weapp/icon/index';
	import vanEmpty from '@/wxcomponents/@vant/weapp/empty/index';
	// pages/views/classify_msg.js
	const app = getApp();
	export default {
		components: {
			vanPopup,
			vanButton,
			vanIcon,
			vanEmpty
		},
		data() {
			return {
				type: 3,
				categorys: [],
				isShow: false,
				form: {
					id: '',
					name: '',
					money:'',
					tc_money:'',
					sort:100
				}
			};
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			this.categorysFun();
		},
		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {},
		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {},
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
		onPullDownRefresh: function() {},
		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {},
		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {},
		methods: {
			// 获取分类
			categorysFun() {
				app.globalData.ajaxPost(
					'/api/get-category-list', {
						type: this.type
					},
					(res) => {
						if (res.code === 200) {
							this.setData({
								categorys: res.data
							});
						}
					}
				);
			},

			setTab(e) {
				this.setData({
					type: e.currentTarget.dataset.key
				});
				this.categorysFun();
			},

			editItem(e) {
				console.log(e.currentTarget.dataset.item);
				let item = e.currentTarget.dataset.item;

				if (item.user_id) {
					this.setData({
						form:item,
						isShow: true
					});
				}
			},

			addCf() {
				this.setData({
					form:{
						id: '',
						name: '',
						money:'',
						tc_money:'',
						sort:100
					},
					isShow: true
				});
			},

			saveForm() {
				const obj = this.form;
				obj.type = this.type;

				if (!obj.name) {
					uni.showToast({
						title: '你不输入标题，保存什么？'
					});
					return false;
				}

				app.globalData.ajaxPost('/api/set-category-edit', obj, (res) => {
					if (res.code === 200) {
						this.categorysFun();
						this.setData({
							isShow: false
						});
					}
				});
				console.log(this.form);
			},
			delForm() {
				let that = this
				const form = {
					id: this.form.id,
					user_id: uni.getStorageSync('userId')
				};
				uni.showModal({
					content: '确定删除此分类？',
					success(res) {
						if (res.confirm) {
							app.globalData.ajaxPost('/api/set-category-del', form, (res) => {
								if (res.code === 200) {
									uni.showToast({
										icon: 'none',
										title: '删除成功',
										duration: 1000,
						   	success: () => {}
						 		});
									that.categorysFun();
									that.setData({
										isShow: false
									});
								}
							});
						}
					}
				})
			},
			sbnn(e) {
				this.setData({
					['form.name']: e.detail.value
				});
			},

			onClose() {
				this.setData({
					isShow: false
				});
			}
		}
	};
</script>
<style>
	/* pages/views/classify_msg.wxss */
	.list {
		padding: 30rpx;
	}

	.title {
		font-size: 42rpx;
		font-weight: bold;
		color: #232a24;
	}

	.hint {
		font-size: 28rpx;
		padding: 40rpx 0rpx;
		color: #666666;
	}

	.navs {
		display: flex;
		align-items: center;
		padding-top: 30rpx;
		padding-bottom: 40rpx;
	}

	.navs .item {
		padding: 12rpx 24rpx;
		border-right: 16rpx;
		background: #f8f8f8;
		margin-right: 40rpx;
		font-size: 28rpx;

		color: #adaeae;
		display: flex;
		align-items: center;
	}

	.navs .item.active {
		font-weight: bold;
		color: #33b793;
		background: rgba(34, 173, 135, 0.1);
	}

	.navs .date {
		position: absolute;
		right: 30rpx;
	}

	.navs .arrow {
		color: #adaeae;
		transform: rotate(90deg);
		font-size: 28rpx;
		margin-left: 10rpx;
	}

	.classify {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	.classify .item {
		padding: 16rpx;
		text-align: center;
		float: left;
	}

	.classify .item.zw {
		padding: 0 16rpx;
	}

	.classify .item.zw .abc {
		width: 82rpx;
	}

	.classify .item .cover {
		width: 82rpx;
		height: 82rpx;
		margin: auto;
		border-radius: 50%;
		background: #f5f5f5;
		background-size: cover;
		background-position: center;
	}

	.classify .item .name {
		font-size: 24rpx;
		color: #adaeae;
		margin-top: 12rpx;
	}

	.main-bb {
		padding-top: 40rpx;
		padding-left: 36rpx;
		padding-right: 36rpx;
	}

	.form {
		display: flex;
		align-items: center;
		padding: 26rpx 0;
		/* padding-top: 42rpx; */
		border-bottom: 1px solid #f8f8f8;
	}

	.form .lebal {
		font-size: 30rpx;
		font-weight: bold;
		color: #232a24;
		width: 15%;
	}

	.form .value {
		padding-left: 30rpx;
		font-size: 38rpx;
		color: #232a24;

		font-weight: bold;
	}

	.form .value input {
		height: 48rpx;
		margin: 20rpx 0;
	}

	.form .value .plac {
		font-size: 28rpx;
		color: #adaeae;
		font-weight: 400;
	}
</style>
