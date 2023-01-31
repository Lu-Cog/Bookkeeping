<template>
    <!--pages/views/add_books.wxml-->
    <view class="books">
        <view class="h-title">添加/修改账本</view>
        <!-- 账单滚动 -->
        <view class="container bills">
            <scroll-view :scroll-x="true" style="width: 100%">
                <view class="main" :style="'width:' + bmw + 'rpx'">
                    <view @tap="setTab" :data-id="0" :class="'item add ' + (book_id ? '' : 'active')">
                        <view class="name">添加</view>
                        <view class="jia"><van-icon name="plus" /></view>
                    </view>

                    <view
                        @tap="setTab"
                        :data-id="item.id"
                        :class="'item ' + (book_id == item.id ? 'active' : '')"
                        :style="'background-image:url(' + url + '/static/imgs/' + (book_id == item.id ? 'book-active1' : 'book') + '.png)'"
                        v-for="(item, index) in books"
                        :key="index"
                    >
                        <view class="name">{{ item.name }}</view>
                    </view>
                </view>
            </scroll-view>
        </view>

        <!-- 添加 编辑账单 -->
        <view class="container app-list">
            <view class="top">
                <view class="name color2 imgqb">
                    <image class="imgqbs" src="../../static/images/icon/qb.png" mode="widthFix"></image>
                    设置账本信息
                </view>
                <view class="hint"></view>
            </view>

            <view class="form">
                <view class="item">
                    <input maxlength="52" @input="setInput" data-key="name" :value="form.name" placeholder="请输入账本名称" />
                </view>
                <view class="item">
                    <input maxlength="52" @input="setInput" data-key="sort" type="number" :value="form.sort" placeholder="请输入排序（数字越小越靠前）" />
                </view>
            </view>
            <view class="confirm">
                <van-button color="#33b793" type="primary" block @tap.native="saveBook" custom-style='margin-bottom: 20rpx;'>确 定</van-button>
				<van-button color="#d91313" v-if="book_id" type="danger" block @tap.native="delBook">删 除</van-button>
            </view>
        </view>
    </view>
</template>

<script>
import vanButton from '@/wxcomponents/@vant/weapp/button/index';
import vanIcon from '@/wxcomponents/@vant/weapp/icon/index';
import vanEmpty from '@/wxcomponents/@vant/weapp/empty/index';
// pages/views/add_books.js
const app = getApp();
export default {
    components: {
        vanButton,
		vanIcon,
		vanEmpty
    },
    data() {
        return {
            book_id: '',
            bmw: 0,
            url: app.globalData.api_base_url,
            books: [],
            form: {
                name: '',
                sort: 100
            }
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (options.book_id) {
            this.setData({
                book_id: options.book_id
            });
        }

        this.booksFun();
        this.bookInfo();
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {},
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
    onReachBottom: function () {},
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {},
    methods: {
        booksFun() {
            app.globalData.ajaxPost('/api/get-user-book', {}, (res) => {
                if (res.code === 200) {
                    let w = res.data.length * 193 + 228;
                    this.setData({
                        bmw: w,
                        books: res.data
                    });
                }
            });
        },

        setTab(e) {
            let id = e.currentTarget.dataset.id;
            this.setData({
                book_id: id
            });
			console.log(id);
			if(id){
				this.bookInfo();
			}else{
				this.setData({
				    form: {
				        name: '',
				        sort: 100
				    }
				});
			}
        },

        // 获取账本详情
        bookInfo() {
            const id = this.book_id;

            if (id) {
                app.globalData.ajaxPost(
                    '/api/get-book-info',
                    {
                        id: this.book_id
                    },
                    (res) => {
                        if (res.code === 200) {
                            this.setData({
                                form: {
                                    name: res.data.name,
                                    sort: res.data.sort
                                }
                            });
                        }
                    }
                );
            } else {
                this.setData({
                    form: {
                        name: '',
                        sort: 100
                    }
                });
            }
        },

        setInput(e) {
            let key = e.currentTarget.dataset.key;
            let str = `form.${key}`;
            this.form[key] = e.detail.value;
        },

        // 保存账本
        saveBook() {
            const form = this.form;
            form.id = this.book_id;

            if (!form.name) {
                uni.showToast({
                    icon: 'none',
                    title: '请输入账本名称'
                });
                return false;
            }

            app.globalData.ajaxPost('/api/set-book-edit', form, (res) => {
                if (res.code === 200) {
                    uni.showToast({
                        icon: 'none',
                        title: '提交成功',
                        duration: 1000,
                        success: () => {}
                    });
                    this.booksFun();
                    this.bookInfo();
                }
            });
        },
		delBook(){
			let that = this
			const form = {id:this.book_id,user_id:uni.getStorageSync('userId')};
			uni.showModal({
				content:'确定删除此账本吗，无法找回？',
				success(res) {
					if(res.confirm){
						app.globalData.ajaxPost('/api/set-book-del', form, (res) => {
						    if (res.code === 200) {
								if(that.book_id == app.globalData.book_id){
									app.globalData.ajaxPost('/api/get-user-book', {}, (res) => {
									    if (res.code === 200) {
									        app.globalData.book_id = res.data[0].id
											app.globalData.book_name = res.data[0].name
									    }
									});
								}
								that.setData({
								    book_id: ''
								});
						        uni.showToast({
						            icon: 'none',
						            title: '删除成功',
						            duration: 1000,
						            success: () => {}
						        });
						        that.booksFun();
						        that.bookInfo();
						    }
						});
					}
				}
			})
		}
    }
};
</script>
<style>
/* pages/views/add_books.wxss */
.h-title {
    font-size: 42rpx;
    font-weight: bold;
    color: #232a24;
    padding-left: 36rpx;
    padding-top: 30rpx;
}
.bills {
    padding-right: 21rpx;
    padding-left: 21rpx;
    padding-top: 40rpx;
}
.bills .main {
    /* width: 994rpx; */
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
.bills .item.add.active {
    border: 1px dotted #00a578;
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

.form {
    padding-top: 30rpx;
}
.form .item {
    padding: 30rpx 0;
    border-bottom: 1px solid #f8f8f8;
}
.form .item input {
    font-size: 28rpx;
    color: #232a24;
}
.confirm {
    padding-top: 68rpx;
}
</style>
