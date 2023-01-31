<template>
    <!--miniprogram/custom-tab-bar/index.wxml-->
    <view class="tab-bar">
        <image class="bg" src="/static/images/tabbar/tab-bg.png"></image>
        <view class="main">
            <block v-for="(item, index) in list" :key="index">
                <view v-if="item.text ? true : false" class="tab-bar-item" :data-path="item.pagePath" :data-index="index" @tap="switchTab">
                    <image class="icon" :src="selected === index ? item.selectedIconPath : item.iconPath"></image>
                    <view class="txt" :style="'color: ' + (selected === index ? selectedColor : color)">{{ item.text }}</view>
                </view>

                <view v-else class="tab-bar-item yuan-bar" :data-index="1" :data-path="item.pagePath" @tap="switchTab">
                    <image class="semicircle" src="/static/images/tabbar/add_del.png"></image>
                </view>
            </block>
        </view>
    </view>
</template>

<script>
export default {
	props:{
		selected:0,
	},
    data() {
        return {
            color: '#d8d8d8',
            selectedColor: '#00a578',
            list: [
                {
                    iconPath: '/static/images/tabbar/tally.png',
                    selectedIconPath: '/static/images/tabbar/tally-active.png',
                    pagePath: 'pages/tally/index',
                    text: '首页'
                }, // {
                //   "iconPath": "../images/tabbar/scat.png",
                //   "selectedIconPath": "../images/tabbar/scat-active.png",
                //   "pagePath": "pages/stats/index",
                //   "text": "统计"
                // },
                {
                    iconPath: '/static/images/tabbar/tally.png',
                    pagePath: 'pages/add/index'
                }, // {
                //   "iconPath": "../images/tabbar/family.png",
                //   "selectedIconPath": "../images/tabbar/family-active.png",
                //   "pagePath": "pages/family/index",
                //   "text": "家庭"
                // },
                {
                    iconPath: '/static/images/tabbar/user.png',
                    selectedIconPath: '/static/images/tabbar/user-active.png',
                    pagePath: 'pages/user/index',
                    text: '我的'
                }
            ]
        };
    },
    beforeMount() {},
    methods: {
        switchTab(e) {
            const url = e.currentTarget.dataset.path;
			let index = e.currentTarget.dataset.index;
			let page = getCurrentPages();
			if (this.selected == index) return;
			if (index == 0) {
				if (page.length > 1) {
					uni.navigateBack({
						delta: page.length-1,
						animationType:'zoom-in',
						animationDuration:200
					});
				} else {
					uni.reLaunch({
						url: '/' + url
					})
				}
				return
			}else{
				if (page.length > 2) {
					uni.navigateBack({
						delta: 1,
						animationType:'zoom-in',
						animationDuration:200
					});
				} else {
					uni.navigateTo({
						url: '/' + url,
						animationType:'zoom-out',
						animationDuration:200
					})
				}
			}
        }
    }
};
</script>
<style>
cover-view {
    overflow: initial;
}
.tab-bar {
    position: fixed;
	z-index: 99999;
    bottom: 0;
    left: 0;
    right: 0;
    padding-bottom: env(safe-area-inset-bottom);
}
.tab-bar .main {
    display: flex;
    justify-content: space-between;
}
.tab-bar .bg {
    width: 100vw;
    height: 142rpx;
    background-size: cover;
    background-position: center;
    position: absolute;
    z-index: -1;
    top: 42rpx;
}
.tab-bar-item {
    flex: 1;
    display: flex;
    align-items: center;
    height: 142rpx;
    flex-flow: column;
    position: relative;
    z-index: 102;
    top: 42rpx;
    padding-top: 32rpx;
}
.tab-bar-item .icon {
    width: 48rpx;
    height: 48rpx;
}
.tab-bar-item .txt {
    width: 48rpx;
    height: 48rpx;
    font-size: 22rpx;
    line-height: 22rpx;
    margin-top: 18rpx;
}
.yuan-bar {
    z-index: 120;
    top: 0;
    position: relative;
}
.yuan-bar .semicircle {
    width: 104rpx;
    height: 104rpx;
    border-radius: 50%;
    box-shadow: 0rpx 0rpx 28rpx #ffc89e;
    position: absolute;
    top: 26rpx;
    /* left: 50%;
  margin-left: -52rpx; */
    z-index: 120;
    color: #ffffff;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 42rpx;
}
</style>
