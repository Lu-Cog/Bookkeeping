<template>
	<div class="login-wrapper">
		<div class="shading">
			<view class="head boxshow3">
				<image mode="aspectFill" :src="avatar_url?avatar_url:'/static/images/icon/head.png'"></image>
			
				<image class="icon" @tap="upimg" src="/static/images/icon/paiz.png"></image>
			</view>
		</div>
		<div class="whiteBg">
			<div class="list">
				<form>
					<div class="item">
						<div class="acea-row row-middle">
							<input type="text" placeholder="请输入昵称" v-model="nick_name" required />
						</div>
					</div>
					<div class="item flex">
						<div class="acea-row row-middle">
							<input type="text" placeholder="获取安全手机号" v-model="phone" disabled="true" required />
						</div>
						<button class="flex-aj-center bg-color btnColor" open-type="getPhoneNumber" lang="zh_CN" @getphonenumber="setUserInfo">授权手机号</button>
					</div>
				</form>
			</div>
			<div class="logon" @click="subform">注册</div>
		</div>
		<div class="bottom"></div>
	</div>
</template>

<script>
	const app = getApp();
	export default {
		
		data() {
			return {
				phone:'',
				nick_name:'',
				avatar_url:''
			};
		},
		onLoad(options) {
			
		},
		methods: {
			
			setUserInfo(e) {
				let that = this
				uni.showLoading({ title: '正在获取中' });
				if(e.detail.errMsg == "getPhoneNumber:ok"){
					app.globalData.appGetCode((res)=>{
						that.getUserPhoneNumber(e.detail.encryptedData, e.detail.iv, res);
					})
					
					// uni.login({
					// 	provider: 'weixin',
					// 	success(res) {
					// 		that.getUserPhoneNumber(e.detail.encryptedData, e.detail.iv, res.code);
					// 	}
					// })
				}else{
					uni.hideLoading()
				}
				
			},
			getUserPhoneNumber(encryptedData, iv, code) {
				app.globalData.ajaxPost('/api/auth-phone', {encryptedData,iv,code}, (res) => {
					if (res.code === 200) {
						this.phone = res.data.phoneNumber
					}
				});
			},
			
			subform: function() {
				let that = this;
				if (!that.nick_name) return uni.showToast({
					title: '请填写昵称！',
					icon:'none'
				});
				if (!that.phone) return uni.showToast({
					title: '请先授权获取安全手机！',
					icon:'none'
				});
				let date = {
					nick_name:this.nick_name,
					phone:this.phone,
					avatar_url:this.avatar_url
				}
				app.globalData.ajaxPost('/api/auth-phone-reg', date, (res) => {
					if (res.code === 200) {
						uni.showToast({
							title:'注册成功'
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
										_this.avatar_url = data.data
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
	}
</script>

<style lang="scss">
	page{
		background-color: #eee;
	}
	.code img {
		width: 100%;
		height: 100%;
	}
	
	.acea-row.row-middle {
		input {
			margin-left: 20rpx;
			display: block;
		}
	}
	
	.login-wrapper {
		padding: 30rpx;
	
		.shading {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 200rpx;
			margin-top: 70rpx;
	
			.head {
				width: 200rpx;
				height: 200rpx;
				border-radius: 50%;
				margin: auto;
				border: 6rpx solid #ffffff;
				margin-bottom: 100rpx;
				position: relative;
			}
			
			.head image {
				width: 100%;
				height: 100%;
				border-radius: 50%;
			}
			
			.head .icon {
				width: 60rpx;
				height: 60rpx;
				position: absolute;
				bottom: 0;
				right: 0;
			}
		}
	
		.whiteBg {
			margin-top: 100rpx;
	
			.list {
				border-radius: 16rpx;
				overflow: hidden;
				.flex{
					display: flex;
					justify-content: space-between;
					align-items: center;
				}
				.item {
					border-bottom: 1px solid #F0F0F0;
					background: #fff;
					.btnColor{
						color: #fff;
						font-size: 28rpx;
						height: 80rpx;
						line-height: 80rpx;
						margin-right: 20rpx;
						background-color: #00a578;
					}
					.row-middle {
						position: relative;
						padding: 16rpx;
	
						input {
							flex: 1;
							font-size: 28rpx;
							height: 80rpx;
						}
	
						.code {
							position: absolute;
							right: 30rpx;
							top: 50%;
							color: #00a578;
							font-size: 26rpx;
							transform: translateY(-50%);
						}
					}
				}
			}
	
			.logon {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 100%;
				height: 86rpx;
				margin-top: 80rpx;
				background-color: #00a578;
				border-radius: 120rpx;
				color: #FFFFFF;
				font-size: 30rpx;
			}
	
			.tips {
				margin: 30rpx;
				text-align: center;
				color: #999;
			}
		}
	}
</style>
