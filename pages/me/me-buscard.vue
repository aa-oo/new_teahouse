<template>
	<view class="">
		<view class="status_bar"><!-- 这里是状态栏 --></view>
		<uni-nav-bar left-icon="back" left-text="" right-text="" title="" @clickLeft="back" style="background-color: #81b991;">
			<view style="margin-left: 10rpx;">好友名片</view>
			<view style="margin-left: 150rpx;">收藏名片</view>

			<!-- <view slot="left" style="margin-left: 150rpx;">好友名片</view>
			    <view slot="right" style="margin-right: 100rpx;">收藏名片</view> -->
		</uni-nav-bar>
		<view class="titletop">
			<input class="titleinput" type="text" placeholder="" />
			<image class="titleicon" style="" src="../../static/icon/search.png" />
		</view>

		<div class="hm-friend-information-card">
			<view v-for="item in productList">
				<view class="box1" style="height: 290rpx;" >
					<view class="box2" style="display: flex;flex-direction: row;">
						
				
					<!-- <view class="title"><text>维基媒体基金会</text></view> -->
					<view class="slide-left" style="margin: auto 10rpx;"><image class="primary" :src="item.image_src" style="width:150rpx;height: 150rpx;border-radius: 50% ;" /></view>

					<view class="side-right" >
						<view class="buscardleft" style="margin-left: 10rpx;">
							<view class="context1">
								<text class="" style=" font-size:35rpx;" >Easter</text>
								<text class="titletext" style="font-size:18rpx;padding:0.1px 10px;">上海</text>
								<image class="buscardicon" src="../../static/icon/nv1.png" />
							</view>
							<view class="context" style="margin-top: 5rpx;">
								<image class="buscardicon" style="margin-left: 0;" src="../../static/icon/company.png" />
								<text class="titletext" style="font-size:18rpx;margin-top: 0;">国家电网公司</text>
							</view>
							<view class="context" style="margin-top: 0;"><text class="titletext" style="margin-left: 0;font-size: 20rpx;">行业：电子商务</text></view>
							<view class="context2" style="margin-top: 0;line-height: 35rpx;">
								<text class="titletext" style="margin-left: 0;font-size:20rpx;">
									需求：
									<span >{{ xuqiu | fontxuqiu }}</span>
								</text>
							</view>
						</view>
					</view>
				</view>
					</view>
			</view>
		</div>

		<!-- <div class="hm-friend-information-card" >
			<view v-for="item in productList">
				<view class="box1" style="height:300rpx ;margin-top: 45rpx;position: relative" >
					<view class="buscardright"><image class="buscardImg" :src="item.image_src" /></view>
					<view class="buscardleft">
						<view class="context1">
							<text class="" style=" border-bottom: 1px solid #81B991;font-size:22px;" @click="gobusCard">Easter</text>
							<text class="titletext" style="font-size:16px;padding:0.1px 10px;">上海</text>
							<image class="buscardicon" src="../../static/icon/nv1.png" />
						</view>
						<view class="context">
							<image class="buscardicon" style="margin-left: 0;" src="../../static/icon/company.png" />
							<text class="titletext"style="font-size:16px;">国家电网公司</text>
						</view>
						<view class="context"><text class="titletext" style="margin-left: 0;">行业：电子商务</text></view>
						<view class="context2">
							<text class="titletext" style="margin-left: 0;">需求：<span>{{xuqiu | fontxuqiu}}</span></text>
						</view>
					</view>
				</view>
			</view>
		</div> -->
	</view>
</template>
<script>
import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue';
import uniNavBar from '@/uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue';
export default {
	data() {
		return {
			title: 1,
			teadetail: 'wikimedia是一项全球运动，其使命是将免费的教育内容带给世界。wikimedia是一项全球运动，其使命是将免费的教育内容带给世界。',
			xuqiu: '每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。边框的间隔大一倍。',
			productList: []
		};
	},
	components: {
		uniNavBar,
		uniSegmentedControl
	},
	onLoad() {
		// console.log(getApp().globalData.tabindex);
		this.getteaHouse();
	},
	methods: {
		getteaHouse() {
			uni.request({
				url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
				success: res => {
					this.productList = res.data.message;
					console.log(this.productList);
				}
			});
		},
		back() {
			uni.navigateBack({
				delta: 1
			});
		}
	},
	filters: {
		fontNumber(date) {
			const length = date.length;
			if (length > 50) {
				var str = '';
				str = date.substring(0, 50) + '...';
				return str;
			} else {
				return date;
			}
		},
		fontxuqiu(date) {
			const length = date.length;
			if (length > 38) {
				var str = '';
				str = date.substring(0, 38) + '...';
				return str;
			} else {
				return date;
			}
		}
	}
};
</script>
<style>
@import '../home/teaHouse/start.response.css';
@import '../home/teaHouse/business-card.css';
@import '../home/teaHouse/titlecard.css';
.status_bar {
	height: var(--status-bar-height);
	width: 100%;
}
</style>
