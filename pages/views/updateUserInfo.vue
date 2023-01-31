<template>
	<!--pages/views/user_setting.wxml-->
	<view class="info container">
		<view class="form">
			<view class="head boxshow3">
				<image mode="aspectFill" :src="info.avatar_url?info.avatar_url:'/static/images/icon/head.png'"></image>

				<image class="icon" @tap="upimg" src="/static/images/icon/paiz.png"></image>
			</view>
			<view class="item" v-if="userType==2">
				<view class="hint">工号</view>
				<view class="value">
					<input type="text" placeholder="请输入工号" @input="setInpt" data-key="work_no" :value="info.work_no"
						placeholder-class="plac" />
				</view>
			</view>
			<view class="item">
				<view class="hint">姓名</view>
				<view class="value">
					<input type="text" placeholder="请输入姓名" @input="setInpt" data-key="name" :value="info.name"
						placeholder-class="plac" />
				</view>
			</view>
			<view class="item" v-if="userType==2">
				<view class="hint">初始提成</view>
				<view class="value">
					<input type="number" placeholder="请输入初始提成(1-100)" @input="setInpt" data-key="tichen" :value="info.tichen"
						placeholder-class="plac" />
				</view>
			</view>
			<view class="item">
				<view class="hint">手机号</view>
				<view class="value">
					<input type="number" placeholder="请输入手机号" @input="setInpt" data-key="phone" :value="info.phone"
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
				<view class="hint">出生日期</view>
				<view class="value">
					<picker mode="date" :value="info.birthday" @change="changeDate">
						<view v-if="info.birthday">{{info.birthday}}</view>
						<view v-else class="hint">请选择出生日期</view>
					</picker>
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
				<view class="hint">备注</view>
				<view class="value">
					<input type="text" placeholder="请输入备注" @input="setInpt" data-key="note" :value="info.note"
						placeholder-class="plac" />
				</view>
			</view>
			<view class="item">
				<view class="hint">状态</view>
				<view class="value">
					<text :class="{'hint':!switchChecked}">{{switchText}}</text>
					<switch :checked="switchChecked" @change="changeSwitch" style="transform:scale(0.7)"/>
				</view>
			</view>
			<view class="confirm">
				<van-button round color="#33b793" type="primary" block @tap.native="setUpdateInfo">确 定</van-button>
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
					work_no:'',
					avatar_url: '',
					name: '',
					sex: 0,
					job: '',
					phone: '',
					note: '',
					tichen: '',
					birthday:'',
					status:1,
					book_id:0
				},
				switchChecked:true,
				switchText:'开启',
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
				sexIndex: 0,
				userType:1
			};
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			this.userType = options.type
			let title = ''
			if(options.type==1){
				if(options.id){
					title = '客户信息修改'
				}else{
					title = '添加客户'
				}
			}else{
				if(options.id){
					title = '店员信息修改'
				}else{
					title = '添加店员'
				}
			}
			if(options.id){
				this.userId = options.id
				this.getInfo();
				uni.setNavigationBarTitle({
					title
				})
			}else{
				uni.setNavigationBarTitle({
					title
				})
			}
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
			changeDate(e){
				console.log(e.detail.value);
				this.info.birthday = e.detail.value
			},
			changeSwitch(e){
				this.switchChecked = e.detail.value
				if(this.switchChecked){
					this.info.status = 1
					this.switchText = '开启'
				}else{
					this.info.status = 0
					this.switchText = '关闭'
				}
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
				this.info.book_id = app.globalData.book_id
				if(this.userType==2 && !this.info.work_no){
					return uni.showToast({
						title:'请填写工号',
						icon:'none'
					})
				}
				if(!this.info.name){
					return uni.showToast({
						title:'请填写姓名',
						icon:'none'
					})
				}
				if(!this.info.tichen && this.userType==2){
					return uni.showToast({
						title:'请填写员工初始提成',
						icon:'none'
					})
				}
				let url = ''
				if(this.userType==1){
					url = '/api/set-customer-info'
				}else{
					url = '/api/set-staff-info'
				}
				app.globalData.ajaxPost(url, this.info, (res) => {
					if (res.code === 200) {
						uni.showToast({
							title: '操作成功'
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
				let url = ''
				if(this.userType==1){
					url = '/api/get-customer-info'
				}else{
					url = '/api/get-staff-info'
				}
				app.globalData.ajaxPost(url, {id:this.userId}, (res) => {
					if (res.code === 200) {
						this.setData({
							info: res.data,
							sexIndex: res.data.sex || 0,
							switchChecked :res.data.status==1?true:false,
							switchText:res.data.status==1?'开启':'关闭'
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
		justify-content: flex-end;
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
		padding: 62rpx 0 100rpx;
	}
</style>
