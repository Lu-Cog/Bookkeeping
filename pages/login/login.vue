<template>
	<view>
		<view class="wechat_login">
			<view class="img">
				<image src="/static/images/icon/wechat_login.png" mode="widthFix"></image>
			</view>
			<view class="btn-wrapper">
				<button hover-class="none" @tap="getUserProfile" class="bg-green btn1">微信一键登录</button>
				<button hover-class="none" open-type="getPhoneNumber" @getphonenumber="getphonenumber" class="btn2">授权手机号登录</button>
				<view @click="isUpReg">
					我要注册
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				phone: '',
				authKey: '',
				userInfo: {},
			};
		},
		onLoad(options) {
		},
		methods: {
			isUpReg(){
				uni.navigateTo({
					url: '/pages/login/userReg'
				})
			},
			// #ifdef MP
			// 小程序获取手机号码
			getphonenumber(e) {
				let that = this
				uni.showLoading({
					title: '正在登录中'
				});
				if(e.detail.errMsg == "getPhoneNumber:ok"){
					app.globalData.appGetCode((res)=>{
						that.getUserPhoneNumber(e.detail.encryptedData, e.detail.iv, res);
					})
					// uni.login({
					// 	provider: 'weixin',
					// 	success(res) {
					// 	}
					// })
				}else{
					uni.hideLoading()
				}
			},
			// 小程序获取手机号码回调
			getUserPhoneNumber(encryptedData, iv, code) {
				app.globalData.ajaxPost('/api/auth-phone', {encryptedData,iv,code}, (res) => {
					if (res.code === 200) {
						app.globalData.ajaxPost('/api/auth-phone-login', {phone:res.data.phoneNumber}, (res) => {
							if (res.code === 200) {
								uni.showToast({
									title:'登录成功'
								})
								uni.setStorageSync('token', res.data.token);
								uni.setStorageSync('userId', res.data.user_id);
								setTimeout(()=>{
									uni.reLaunch({
										url:'/pages/tally/index'
									})
								},500)
								
							}
						});
					}
				});
			},
			
			//小程序授权api替换 getUserInfo
			getUserProfile() {
				app.globalData.appSetLogin();		
			},
			
			// #endif
		}
	};
</script>

<style lang="scss">
	page {
		background: #fff;
	}

	.wechat_login {
		padding: 72rpx 34rpx;

		.img image {
			width: 100%;
		}

		.btn-wrapper {
			margin-top: 86rpx;
			padding: 0 66rpx;
			display: flex;
			flex-direction: column;
			align-items: flex-end;

			button {
				width: 100%;
				height: 86rpx;
				line-height: 86rpx;
				margin-bottom: 40rpx;
				border-radius: 120rpx;
				font-size: 30rpx;

				&.btn1 {
					color: #fff;
					background-color: #00a578;
				}

				&.btn2 {
					color: #666666;
					border: 1px solid #666666;
				}
			}
			view{
				font-size: 30rpx;
				color: #00a578;
				text-decoration: underline;
			}
		}
	}

	.title-bar {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 36rpx;
	}

	.icon {
		position: absolute;
		left: 30rpx;
		top: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 86rpx;
		height: 86rpx;

		image {
			width: 50rpx;
			height: 50rpx;
		}
	}
</style>