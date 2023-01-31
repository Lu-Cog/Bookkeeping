<template>
	<!--pages/views/user_setting.wxml-->
	<view class="info container">
		<view class="form">
			<view class="head boxshow3">
				<image mode="aspectFill" :src="info.avatar_url?info.avatar_url:'/static/images/icon/head.png'"></image>

				<image class="icon" @tap="upimg" src="/static/images/icon/paiz.png"></image>
			</view>

			<view class="item">
				<view class="hint">昵称</view>
				<view class="value">
					<input type="text" placeholder="请输入昵称" @input="setInpt" data-key="nick_name" :value="info.nick_name"
						placeholder-class="plac" />
				</view>
			</view>
			<view class="item">
				<view class="hint">职位</view>
				<view class="value">
					<input type="text" placeholder="请输入职位" @input="setInpt" data-key="job" :value="info.job"
						placeholder-class="plac" />
				</view>
			</view>
			<view class="item">
				<view class="hint">性别</view>
				<view class="value">
					<!-- <input type="text" placeholder="请输入性别" @input="setInpt" data-key="sex" :value="info.sex" placeholder-class="plac" /> -->
					<picker mode="selector" :range="sexList" range-key='label' :value='sexIndex' @change="changeP">
						<view v-if="sexIndex==0" class="hint">{{sexList[sexIndex].label}}</view>
						<view v-else>{{sexList[sexIndex].label}}</view>
					</picker>
					<van-icon name="arrow" class="arrow" />
				</view>
			</view>
			<view class="item">
				<view class="hint">手机号</view>
				<view class="value">
					<input type="tel" placeholder="请输入手机号" @input="setInpt" data-key="phone" disabled="true" :value="info.phone"
						placeholder-class="plac" />
				</view>
			</view>

			<view class="item">
				<view class="hint">安全密码</view>
				<view class="value">
					<input type="password" placeholder="请输入安全密码" @input="setInpt" data-key="pwd" :value="info.pwd"
						placeholder-class="plac" />
				</view>
			</view>

			<view class="confirm">
				<van-button round color="#33b793" type="primary" block @tap.native="setUpdateInfo" custom-style='margin-bottom: 20rpx;'>确 定</van-button>
				<van-button round color="#E93323" type="primary" block @tap.native="outLogin">退 出</van-button>
			</view>
		</view>
	</view>
</template>

<script>
	import vanButton from '@/wxcomponents/@vant/weapp/button/index';
	import vanIcon from '@/wxcomponents/@vant/weapp/icon/index';
	import vanEmpty from '@/wxcomponents/@vant/weapp/empty/index';
	// pages/views/user_setting.js
	const app = getApp();
	export default {
		components: {
			vanButton,
			vanIcon,
			vanEmpty
		},
		data() {
			return {
				info: {
					avatar_url: '',
					nick_name: '',
					sex: 0,
					job: '',
					phone: '',
					pwd: ''
				},
				sexList: [{
					label: '未知',
					value: 0
				}, {
					label: '男',
					value: 1
				}, {
					label: '女',
					value: 2
				}],
				sexIndex: 0
			};
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			this.getInfo();
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
			outLogin(){
				uni.removeStorageSync('token');
				uni.removeStorageSync('userId');
				uni.reLaunch({
					url:'/pages/login/login'
				})
			},
			changeP(e) {
				this.info.sex = e.detail.value;
				this.sexIndex = e.detail.value
			},
			setInpt(e) {
				let key = e.currentTarget.dataset.key;
				let value = e.detail.value;
				let str = `info.${key}`;
				this.info[key] = value;
				console.log(e);
			},

			setUpdateInfo() {
				app.globalData.ajaxPost('/api/set-user-info', this.info, (res) => {
					if (res.code === 200) {
						uni.showToast({
							title: '更新成功'
						});
						setTimeout(() => {
							this.getInfo();
							uni.navigateBack({
								delta:1
							})
						}, 500);
					}
				});
			},

			getInfo() {
				app.globalData.ajaxPost('/api/get-user-info', {}, (res) => {
					if (res.code === 200) {
						this.setData({
							info: res.data,
							sexIndex: res.data.sex || 0
						});
					}
				});
			},

			upimg() {
				const _this = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album', 'camera'],

					success(res) {
						uni.showLoading({
							title: '图片压缩中...'
						})
						// tempFilePath可以作为img标签的src属性显示图片
						const tempFilePaths = res.tempFilePaths[0];
						uni.compressImage({
							src: tempFilePaths,
							quality: 70,
							success: res1 => {
								uni.showLoading({
									title: '图片上传中...'
								})
								uni.uploadFile({
									url: getApp().globalData.api_base_url + '/api/upload-file',
									//接受图片的接口地址
									header: {
										chartset: 'utf-8',
										'content-type': 'multipart/form-data'
									},
									filePath: res1.tempFilePath,
									name: 'file',
									success(res) {
										const data = JSON.parse(res.data);
										_this.setData({
											['info.avatar_url']: data.data
										}); // //do something
									},
									complete(){
										uni.hideLoading()
									}
								});
							},
							complete(){
								uni.hideLoading()
							}
						})

					}
				});
			}
		}
	};
</script>
<style>
	/* pages/views/user_setting.wxss */
	.form {
		padding-top: 100rpx;
	}

	.form .head {
		width: 200rpx;
		height: 200rpx;
		border-radius: 50%;
		margin: auto;
		border: 6rpx solid #ffffff;
		margin-bottom: 100rpx;
		position: relative;
	}

	.form .head image {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}

	.form .head .icon {
		width: 60rpx;
		height: 60rpx;
		position: absolute;
		bottom: 0;
		right: 0;
	}

	.form .item {
		padding: 30rpx 0;
		display: flex;
		align-items: center;
		border-bottom: 1px solid #f8f8f8;
	}

	.form .item .hint {
		font-size: 28rpx;
		color: #adaeae;
	}

	.form .item .value {
		flex: 1;
		display: flex;
		align-items: center;
		font-size: 28rpx;
		color: #232a24;
		font-weight: bold;
		padding: 0 30rpx;
		padding-right: 0;
		text-align: right;
	}

	.form .item .value input {
		text-align: right;
		width: 100%;
		margin-right: 10rpx;
	}

	.form .item .value picker {
		text-align: right;
		width: 100%;
		margin-right: 10rpx;
	}

	.form .item .value .plac,
	.form .item .value .arrow {
		font-size: 28rpx;
		color: #adaeae;
	}

	.confirm {
		padding-top: 62rpx;
	}
</style>
