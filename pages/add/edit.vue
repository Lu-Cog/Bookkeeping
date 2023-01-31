<template>
    <view>
        <!--pages/add/index.wxml-->
        <view style="padding-top: 40rpx">
            <view class="h-title">修改记账</view>
            <!-- 记账全局弹框 -->
            <view class="tally">
                <view class="book">
					<view class="value imgqb">
						<image class="imgqbs" src="../../static/images/icon/qb.png" mode="widthFix"></image>
					    {{ bookInfo.name }}
					</view>
                    <!-- <picker @change="bindPickerChange" range-key="name" :value="index" :range="books">
                        <view class="value">
                            {{ bookInfo.name || '选择账本' }}
                            <image class="aw" src="/static/images/icon/arrow.png"></image>
                        </view>
                    </picker> -->
                </view>
                <view class="navs">
                    <view :class="'item ' + (form.type == 1 ? 'active' : '')" @tap="setNav" :data-value="1">支出</view>
                    <view :class="'item ' + (form.type == 2 ? 'active' : '')" @tap="setNav" :data-value="2">收入</view>
                    <view :class="'item ' + (form.type == 3 ? 'active' : '')" @tap="setNav" :data-value="3">卡消</view>

                    <view class="item date">
                        <picker @change="bindPickerChangeDate" mode="date">
                            {{ form.date_lebal || '请选择' }}
                            <van-icon class="arrow" name="play" />
                        </picker>
                    </view>
                </view>
                <view class="form">
                    <view class="lebal">￥</view>
                    <view class="value">
                        <input type="number" :value="form.money" @input="setMoney" placeholder-class="plac" placeholder="请输入金额" />
                    </view>
                </view>

                <view class="classify">
                    <view :class="'item ' + (item.id === form.category_id ? 'active' : '')" @tap="setcategory" :data-id="item.id" v-for="(item, index) in categorys" :key="index">
                        <view class="cover"></view>

                        <view class="name">{{ item.name }}</view>
                    </view>

                    <view class="item zw" v-for="(item, index) in 5" :key="index">
                        <view class="abc"></view>
                    </view>
                </view>
                <view class="remark">
                    <text class="add">添加名称</text>
                    <view class="iput">
                        <input :value="form.name" @input="setName" placeholder-class="plac" placeholder="请输入名称" />
                    </view>
                </view>
                <view class="remark">
                    <text class="add">添加备注</text>
                    <view class="iput">
                        <textarea :value="form.desc" @input="setDesc" auto-height placeholder-class="plac" placeholder="请输入备注" />
                    </view>
                </view>

                <view class="confirm">
                    <van-button color="#33b793" type="primary" @tap.native="tijiao" block>确 定</van-button>
                </view>
            </view>
        </view>
        <view class="app-zw-bc"></view>
        <view class="app-zw"></view>
    </view>
</template>

<script>
import vanPopup from '@/wxcomponents/@vant/weapp/popup/index';
import vanButton from '@/wxcomponents/@vant/weapp/button/index';
import vanField from '@/wxcomponents/@vant/weapp/field/index';
import vanIcon from '@/wxcomponents/@vant/weapp/icon/index';
import vanEmpty from '@/wxcomponents/@vant/weapp/empty/index';
// pages/add/index.js
const app = getApp();
import { formatTimeTwo } from '../../utils/util';
export default {
    components: {
        vanPopup,
        vanButton,
        vanField,
		vanIcon,
		vanEmpty
    },
    data() {
        return {
            isTally: true,
            isRemark: false,
            books: [],
            categorys: [],
            bookInfo: {},
            index: 0,

            form: {
                id: '',
                book_id: '',
                category_id: '',
                type: 1,
                money: '',
                name: '',
                desc: '',
                date: '',
                date_lebal: ''
            },

            selected: 0
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            ['form.id']: options.id
        });
        this.booksFun();
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        if (typeof this.getTabBar === 'function' && this.getTabBar()) {
            this.getTabBar().setData({
                //唯一标识（其它设置不同的整数）
                selected: 1
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
        // 获取账单详情
        getInfo() {
            app.globalData.ajaxPost(
                '/api/get-tally-info',
                {
                    id: this.form.id
                },
                (res) => {
                    if (res.code === 200) {
                        let item = this.books.find((v) => (v.id = res.data.book_id));
                        let index = this.books.findIndex((v) => (v.id = res.data.book_id));
                        res.data.date_lebal = formatTimeTwo(res.data.date, 'M月D日');
                        this.setData({
                            form: res.data,
                            bookInfo: item,
                            index: index
                        });
						this.categorysFun();
                    }
                }
            );
        },

        booksFun() {
            app.globalData.ajaxPost('/api/get-user-book', {}, (res) => {
                if (res.code === 200) {
                    this.setData({
                        books: res.data
                    });
                    this.getInfo();
                }
            });
        },

        bindPickerChange(e) {
            const books = this.books;
            const index = e.detail.value;
            this.setData({
                bookInfo: books[index],
                ['form.book_id']: books[index]['id']
            });
        },

        bindPickerChangeDate(e) {
            this.setData({
                ['form.date']: e.detail.value,
                ['form.date_lebal']: formatTimeTwo(e.detail.value, 'M月D日')
            });
        },

        setNav(e) {
            this.setData({
                ['form.type']: e.currentTarget.dataset.value
            });
			this.categorysFun()
        },

        // 获取分类
        categorysFun() {
            app.globalData.ajaxPost(
                '/api/get-category-list',
                {
                    type: this.form.type
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

        setMoney(e) {
            this.setData({
                ['form.money']: e.detail.value
            });
        },

        setDesc(e) {
            this.setData({
                ['form.desc']: e.detail.value
            });
        },

        setName(e) {
            this.setData({
                ['form.name']: e.detail.value
            });
        },

        setcategory(e) {
            this.setData({
                ['form.category_id']: e.currentTarget.dataset.id
            });
        },

        tijiao() {
            const { book_id, date, category_id, name, money } = this.form;
            let code = true;

            if (!book_id) {
                uni.showToast({
                    icon: 'none',
                    title: '请选择账本'
                });
                code = false;
            }

            if (!date) {
                uni.showToast({
                    icon: 'none',
                    title: '请选择日期'
                });
                code = false;
            }

            if (!category_id) {
                uni.showToast({
                    icon: 'none',
                    title: '请选择分类'
                });
                code = false;
            }

            // if (!name) {
            //     uni.showToast({
            //         icon: 'none',
            //         title: '请输入名称'
            //     });
            //     code = false;
            // }

            if (!money) {
                uni.showToast({
                    icon: 'none',
                    title: '请输入金额'
                });
                code = false;
            }

            if (code) {
                // 提交
                app.globalData.ajaxPost('/api/set-tally-edit', this.form, (res) => {
                    if (res.code === 200) {
                        uni.showToast({
                            icon: 'none',
                            title: '成功，即将返回'
                        });
                        setTimeout(() => {
                            uni.navigateBack({
                                delta: 1
                            });
                        }, 1000);
                    }
                });
            }
        },

        showTally() {
            this.setData({
                isTally: true
            });
        }
    }
};
</script>
<style>
/* pages/add/edit.wxss */
.tally {
    padding: 32rpx 50rpx;
    padding-top: 30rpx;
}
.h-title {
    font-size: 42rpx;
    font-weight: bold;
    color: #232a24;
    padding-left: 36rpx;
    padding-bottom: 30rpx;
}
.tally .navs {
    display: flex;
    align-items: center;
}
.tally .navs .item {
    padding: 12rpx 24rpx;
    border-right: 16rpx;
    background: #f8f8f8;
    margin-right: 20rpx;
    font-size: 28rpx;

    color: #adaeae;
    display: flex;
    align-items: center;
}
.tally .navs .item.active {
    font-weight: bold;
    color: #33b793;
    background: rgba(34, 173, 135, 0.1);
}
.tally .navs .date {
    position: absolute;
    right: 30rpx;
    color: #333333;
}
.tally .navs .arrow {
    color: #adaeae;
    transform: rotate(90deg);
    font-size: 28rpx;
    margin-left: 10rpx;
}

.tally .form {
    display: flex;
    align-items: center;
    padding: 26rpx 0;
    padding-top: 42rpx;
    border-bottom: 1px solid #f8f8f8;
}
.tally .form .lebal {
    font-size: 38rpx;
    font-weight: bold;
    color: #232a24;
}
.tally .form .value {
    padding-left: 30rpx;
    font-size: 38rpx;
    color: #232a24;
    font-weight: bold;
}
.tally .form .value .plac {
    font-size: 28rpx;
    color: #adaeae;
    font-weight: 400;
}
.tally .classify {
    margin-top: 30rpx;
    max-height: 440rpx;
    overflow-y: scroll;
    margin-left: -16rpx;
    margin-right: -16rpx;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}
.tally .classify .item {
    padding: 16rpx;
    text-align: center;
    float: left;
}
.tally .classify .item.active .name {
    color: #33b793;
}
.tally .classify .item.zw {
    padding: 0 16rpx;
}
.tally .classify .item.zw .abc {
    width: 82rpx;
}
.tally .classify .item .cover {
    width: 82rpx;
    height: 82rpx;
    border-radius: 50%;
    background: #f5f5f5;
}
.tally .classify .item .name {
    font-size: 28rpx;
    color: #adaeae;
    margin-top: 12rpx;
}

.tally .remark {
    padding-top: 30rpx;
}
.tally .remark .add {
    font-size: 28rpx;
    color: #006699;
    font-weight: bold;
}
.tally .remark .iput {
    padding-top: 30rpx;
    padding-bottom: 30rpx;
    border-bottom: 1px solid #f8f8f8;

    font-size: 28rpx;
    line-height: 28rpx;
    color: #232a24;
}
.tally .remark .iput textarea {
    font-size: 28rpx;
    line-height: 28rpx;
    color: #232a24;
}
.tally .remark .iput .plac {
    font-size: 28rpx;
    color: #adaeae;
    font-weight: 400;
}
.tally .confirm {
    padding-top: 32rpx;
}
.book {
    padding: 0 0 50rpx 0;
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
</style>
