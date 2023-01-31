<template>
    <view>
        <!--pages/add/index.wxml-->
        <view>
            <view class="h-title">添加记账</view>
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
					<view class="item date">
					    <picker @change="bindPickerChangeDate" mode="date">
					        {{ form.date_lebal || '选择日期' }}
					        <van-icon class="arrow" name="play" />
					    </picker>
					</view>
                </view>
                <view class="navs">
					<view :class="'item ' + (form.type == 2 ? 'active' : '')" @tap="setNav" :data-value="2">充值</view>
                    <view :class="'item ' + (form.type == 3 ? 'active' : '')" @tap="setNav" :data-value="3">卡消</view>
					<view :class="'item ' + (form.type == 4 ? 'actives' : '')" @tap="setNav" :data-value="4">散客</view>
					<view :class="'item ' + (form.type == 1 ? 'active' : '')" @tap="setNav" :data-value="1">支出</view>

                    
                </view>

                <view class="form">
                    <div class="formItem">
						<view class="lebal" :class="{redText:form.type == 4}">￥</view>
						<view class="value">
						    <input type="digit" :class="{redText:form.type == 4}" :value="form.money" @input="setMoney" maxlength="6" placeholder-class="plac" placeholder="请输入金额" />
						</view>
					</div>
					<div class="formItem" v-if="form.type==2">
						<view class="lebal">￥</view>
						<view class="value">
						    <input type="digit" v-model="form.money2" maxlength="6" placeholder-class="plac" placeholder="请输入赠送金额" />
						</view>
					</div>
                </view>
				<view class="remark">
					<text class="add">选择分类</text>
					<view class="classify" v-if="categorys.length">
					    <view :class="'item ' + (item.id === form.category_id ? 'active' : '')" @tap="setcategory" :data-id="item.id" v-for="(item, index) in categorys" :key="index">
					        <view class="cover" :style="'background-image: url(' + item.icon_url + ');'"></view>
					        <view class="name">{{ item.name }}</view>
					    </view>
					</view>
					<view class="no" v-else>
						请先到类型管理添加分类
					</view>
				</view>

				<view class="remark" v-if="form.type!=1">
                    <text class="add">选择客户</text>
                    <view class="iput" @click="goSelectUser(1)">
                        {{customer.id?customer.name+"（余额："+customer.money+"）" : '请选择客户'}}
                    </view>
                </view>
				<view class="remark" v-if="form.type!=1">
				    <text class="add">选择店员</text>
				    <view class="iput" @click="goSelectUser(2)">
				        {{clerk.id?clerk.name+"（业绩："+clerk.money+"）" : '请选择店员'}}
				    </view>
				</view>
                <view class="remark">
                    <text class="add">备注</text>
                    <view class="iput">
                        <input :value="form.name" @input="setName" placeholder-class="plac" placeholder="请输入名称" />
                    </view>
                </view>

                <!-- <view class="remark" style="margin-top: 30rpx">
                    <text class="add">备注</text>
                    <view class="iput">
                        <textarea :value="form.desc" @input="setDesc" auto-height placeholder-class="plac" placeholder="请输入备注" />
                    </view>
                </view> -->

                <view class="confirm">
                    <van-button color="#33b793" type="primary" @tap.native="tijiao" block>确 定</van-button>
                </view>
            </view>
        </view>
        <view class="app-zw-bc"></view>
        <view class="app-zw"></view>
		<tabbar :selected='1'></tabbar>
    </view>
</template>

<script>
import vanPopup from '@/wxcomponents/@vant/weapp/popup/index';
import vanButton from '@/wxcomponents/@vant/weapp/button/index';
import vanField from '@/wxcomponents/@vant/weapp/field/index';
import vanIcon from '@/wxcomponents/@vant/weapp/icon/index';
import vanEmpty from '@/wxcomponents/@vant/weapp/empty/index';
import tabbar from '@/components/tabbar/index.vue';
// pages/add/index.js
const app = getApp();
import { formatTime, formatTimeTwo } from '../../utils/util';
export default {
    components: {
        vanPopup,
        vanButton,
        vanField,
		vanIcon,
		vanEmpty,
		tabbar
    },
    data() {
        return {
            isTally: true,
            isRemark: false,
            books: [],
            categorys: [],
            bookInfo: {},
			customer:{},
			clerk:{},
            form: {
                id: '',
                book_id: '',
                category_id: 0,
                type: 2,
                money: '',
				money2: '',
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
		    ['form.date']: formatTimeTwo(formatTime(new Date()), 'Y-M-D'),
		    ['form.date_lebal']: formatTimeTwo(formatTime(new Date()), 'M月D日')
		});
	},
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        // if (typeof this.getTabBar === 'function' && this.getTabBar()) {
        //     this.getTabBar().setData({
        //         //唯一标识（其它设置不同的整数）
        //         selected: 1
        //     });
        // }

        this.setData({
			['form.book_id']: app.globalData.book_id,
			['bookInfo.name']: app.globalData.book_name
        });
		if(!this.form.book_id){
			setTimeout(()=>{
				uni.showToast({
				    icon: 'none',
				    title: '请先到首页选择账本',
				});
			},100)
			// uni.showToast({
			// 	title:'请先到首页选择账本',
			// 	icon:'none'
			// })
		}
        this.booksFun();
        this.categorysFun();
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
            ['form.date']: formatTimeTwo(formatTime(new Date()), 'Y-M-D'),
            ['form.date_lebal']: formatTimeTwo(formatTime(new Date()), 'M月D日')
        });
        this.booksFun();
        this.categorysFun();
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
		goSelectUser(type){
			let url = ''
			if(type==1){
				url = '/pages/views/customer?select=1'
			}else{
				url = '/pages/views/clerk?select=2'
			}
			uni.navigateTo({
				url: url
			})
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
                ['form.book_id']: books[index]['id']
            });
        },

        bindPickerChangeDate(e) {
            console.log(e, 89);
            this.setData({
                ['form.date']: e.detail.value,
                ['form.date_lebal']: formatTimeTwo(e.detail.value, 'M月D日')
            });
        },

        setNav(e) {
            this.setData({
                ['form.type']: e.currentTarget.dataset.value
            });
			this.categorysFun();
        },

        // 获取分类
        categorysFun() {
			let type = this.form.type;
			if(type==4){
				type = 3
			}
            app.globalData.ajaxPost(
                '/api/get-category-list',
                {
                    type: type
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
			console.log(e,e.currentTarget.dataset.id);
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
            if (!money) {
                uni.showToast({
                    icon: 'none',
                    title: '请输入金额'
                });
                code = false;
            }
			this.form.customer_id = this.customer.id
			this.form.staff_id = this.clerk.id
            if (code) {
                // 提交
                app.globalData.ajaxPost('/api/set-tally-edit', this.form, (res) => {
                    if (res.code === 200) {
                        uni.showToast({
                            icon: 'none',
                            title: '添加成功'
                        });
                        this.setData({
							['form.id'] : '',
							['form.money'] : '',
							['form.money2'] : '',
							['form.desc'] : '',
							['form.name'] : '',
							['form.customer_id'] : '',
							['form.staff_id'] : '',
							customer:{},
							clerk:{}
                        });
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
.tally .navs .item.actives {
    font-weight: bold;
    color: #d12f2f;
    background: rgba(202, 35, 29, 0.1);
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
.tally .form .formItem{
	display: flex;
	align-items: center;
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
.tally .form .redText{
    color: #d12f2f;
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
    /* justify-content: space-between; */
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
    background-size: cover;
    background-position: center;
    margin: auto;
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
.tally .remark .no {
	padding: 20rpx 0;
	text-align: center;
    font-size: 26rpx;
    color: #999;
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
	display: flex;
	justify-content: space-between;
	align-items: center;
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
.book .date {
    position: absolute;
    right: 30rpx;
    color: #333333;
}
.book .arrow {
    color: #adaeae;
    transform: rotate(90deg);
    font-size: 28rpx;
    margin-left: 10rpx;
}
.book .item {
    padding: 12rpx 24rpx;
    border-right: 16rpx;
    background: #f8f8f8;
    margin-right: 20rpx;
    font-size: 28rpx;

    color: #333333;
    display: flex;
    align-items: center;
}
</style>
