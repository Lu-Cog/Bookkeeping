<script>
// app.js
export default {
    data() {
        return {};
    },
	onShow: function() {
		const updateManager = uni.getUpdateManager();
		updateManager.onCheckForUpdate(function(res) {
			// 请求完新版本信息的回调
		});
		updateManager.onUpdateReady(function(res) {
			uni.showModal({
				title: '更新提示',
				content: '新版本已经准备好，是否重启应用？',
				success(res) {
					if (res.confirm) {
						// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
						updateManager.applyUpdate();
					}
				}
			});
		
		});
	},
    onLaunch() {
        this.globalData.getMenuRect();
    },
    globalData: {
		book_id:0,
		book_name:'全部账本',
        // api_base_url: 'http://dev.tally.com', // 开发环境
        api_base_url: 'https://xzb.iqweb.net',

        // 生产环境
        menuRect: {},

        // 获取导航信息
        getMenuRect() {
            const info = uni.getMenuButtonBoundingClientRect();
            const winodwConfig = uni.getWindowInfo();
            info.borderWidth = winodwConfig.windowWidth - info.right;
            this.menuRect = info;
        },

        // 显示失败提示框
        appShowError(msg, callback) {
            uni.showModal({
                title: '提示',
                content: msg,
                showCancel: false,

                success(res) {
                    if (callback) {
                        callback();
                    }
                }
            });
        },
		appGetCode(success) {
		    const _this = this;
			uni.login({
			    success(res) {
			        if (res.code) {
			           uni.setStorageSync('code', res.code);
					   success(res.code)
			        } else {
			            console.log('登录失败！' + res.errMsg);
			        }
			    }
			});
			// uni.checkSession({
			//   success () {
			//     //session_key 未过期，并且在本生命周期一直有效
			// 	console.log('session_key 未过期');
			// 	success(uni.getStorageSync('code'))
			//   },
			//   fail () {
			//     // session_key 已经失效，需要重新执行登录流程
			//     uni.login({
			//         success(res) {
			//             if (res.code) {
			//                uni.setStorageSync('code', res.code);
			// 			   success(res.code)
			//             } else {
			//                 console.log('登录失败！' + res.errMsg);
			//             }
			//         }
			//     });
			//   }
			// })
		    
		},
        // app 静默登陆
        appSetLogin() {
            const _this = this;
			_this.appGetCode(res=>{
				_this.ajaxPost(
				    '/api/auth-login',
				    {
				        code: res
				    },
				    (res) => {
				        if (res.code === 200) {
				            uni.setStorageSync('token', res.data.token);
							uni.setStorageSync('userId', res.data.user_id);
				            uni.reLaunch({
				                url: '/pages/tally/index'
				            });
				        }
				    }
				);
			})
           
        },

        // post请求
        ajaxPost(url, data, success, fail, complete) {
            const _this = this; // 请求动画

            uni.showNavigationBarLoading();
            uni.showLoading({
                mask: true,
                title: '正在请求...'
            });
            uni.request({
                url: getApp().globalData.api_base_url + url,
                header: {
                    'content-type': 'application/x-www-form-urlencoded',
                    token: uni.getStorageSync('token') || ''
                },
                method: 'POST',
                data: data,

                success(res) {
					uni.hideLoading();
                    if (res.statusCode !== 200) {
                        _this.appShowError('网络错误，请重试!');

                        return false;
                    } else {
                        if (res.data.code === -200) {
                            // 登录失效
                            uni.showModal({
								content:'请先登录或登录已过期',
                            	success(res) {
                            		if(res.confirm){
										uni.reLaunch({
										    url: '/pages/login/login'
										});
									}
                            	}
                            })
                            return false;
                        } else {
                            if (res.data.code !== 200 && res.data.code !== -200) {
                                _this.appShowError(res.data.message, () => {
                                    if (fail) {
                                        fail(res);
                                    }
                                });

                                return false;
                            }
                        }
                    }

                    if (success) {
                        success(res.data);
                    }
                },

                fail(res) {
					uni.hideLoading();
                    _this.appShowError(res.errMsg, () => {
                        if (fail) {
                            fail(res);
                        }
                    });
                },

                complete(res) {
                    uni.hideNavigationBarLoading();
					// uni.hideLoading();
                    if (complete) {
                        complete(res);
                    }
                }
            });
        }
    }
};
</script>
<style>
/**app.wxss**/

.color1 {
    color: #00a578;
}
.color2 {
    color: #232a24;
}
.color3 {
    color: #8d8d8d;
}
.color4 {
    color: #e7e7e7;
}
.color5 {
    color: #666666;
}
.color6 {
    color: #ffffff;
}
.color-sr {
    color: #008d55;
}
.color-zc {
    color: #000000;
}
.color-zcr{
	color: #f03131;
}
.bg1 {
    background-color: #00a578;
}
.container {
    padding: 0 36rpx;
}
.flex-cc {
    display: flex;
    align-items: center;
}
.topFilx {
    width: 100%;
    position: fixed;
    top: 0;
    background-color: #ffffff;
    z-index: 10;
    left: 0;
}
.boxshow {
    box-shadow: 0rpx 0rpx 14rpx #f0f1f3;
}
.boxshow1 {
    box-shadow: 0rpx 0rpx 14rpx #00a578;
}
.boxshow2 {
    box-shadow: 0rpx 0rpx 28rpx #f0f1f3;
}
.boxshowbot {
    box-shadow: 0rpx 16rpx 28rpx #f0f1f3;
}
.boxshow3 {
    box-shadow: 8px 4px 18px 0px rgba(100, 100, 100, 0.1);
}
.box-padding {
    padding: 0 30rpx;
}
.text-no1 {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.text-no2 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}
.version {
    padding: 30rpx 36rpx;
    font-size: 24rpx;
    color: #d0d0da;
    text-align: center;
    margin-top: 30rpx;
}
.no-kfzx {
    background: none;
    border: 1px solid #ffffff;
    display: block;
    padding: 0;
    margin: 0;
    line-height: 0;
    background-color: #ffffff;
}
.no-kfzx::after {
    display: none;
}
.mr-f {
    margin: 0 -36rpx;
}
.plr15 {
    padding: 0 30rpx;
}
.ptb15 {
    padding: 30rpx 0rpx;
}
.ptblr15 {
    padding: 30rpx;
}

page {
    /* background: #f8f8f9; */
    background: #ffffff;
}
.app-ii {
    position: relative;
    height: 20rpx;
    width: 35rpx;
}
.app-ii::after {
    content: ' ';
    display: block;
    position: absolute;
    width: 20rpx;
    height: 20rpx;
    border-radius: 50%;
    background-color: #33b793;
}
.app-ii::before {
    content: ' ';
    display: block;
    position: absolute;
    width: 20rpx;
    height: 20rpx;
    left: 15rpx;
    top: 0;
    border-radius: 50%;
    background-color: #99dbc9;
}
.app-zw-bc {
    padding-bottom: env(safe-area-inset-bottom);
    height: 180rpx;
}
.app-zw {
    position: fixed;
    bottom: 0;
    height: 100rpx;
    width: 100vw;
    z-index: 100;
    background: #ffffff;
}

/*  */
.app-list {
    padding-top: 42rpx;
}
.app-list .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.app-list .top .name {
    display: flex;
    align-items: center;
    font-size: 32rpx;
    font-weight: bold;
}
.app-list .top .name .app-ii {
    margin-right: 16rpx;
}
.app-list .top .hint {
    color: #4e604e;
    font-size: 22rpx;
}
.app-list .main {
    margin-top: 32rpx;
    border-radius: 24rpx;
    box-shadow: 8px 4px 18px 0px rgba(94, 94, 94, 0.19);
}
.app-list .main .item {
    padding: 0 30rpx;
    padding-bottom: 0;
    display: flex;
    align-items: center;
}
.app-list .main .item .icon {
    width: 64rpx;
    height: 64rpx;
    /* background: red; */
}
.app-list .main .item .info {
    flex: 1;
    margin-left: 20rpx;
    position: relative;
    padding-top: 30rpx;
    padding-bottom: 30rpx;
}
.app-list .main .item .info .title {
    font-size: 28rpx;
    font-weight: bold;
}
.app-list .main .item .info .date {
    font-size: 24rpx;
}
.app-list .main .item .info .money {
    position: absolute;
    right: 0;
    font-size: 32rpx;
    line-height: 32rpx;
    top: 45rpx;
    font-weight: bold;
    color: #0e261f;
}
.imgqb{
	display: flex !important;
	align-items: center;
}
.imgqbs{
	width: 35rpx;
	height: 35rpx;
	margin-right: 16rpx;
}
</style>
