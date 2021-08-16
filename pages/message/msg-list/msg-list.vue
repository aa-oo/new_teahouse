<template>
	<view class="">
		<view class="status_bar"><!-- 这里是状态栏 --></view>
		<uni-nav-bar left-icon="back" left-text="" right-text="" title="" @clickLeft="back" style="background-color: #81b991;">
			<view style="margin-left: 10rpx;" :class="{onshow:flag,noshow:!flag}" @click="flag=true"><text class="onshowtext" style="font-size:30rpx;">好友名片</text></view>
			<view style="margin-left: 150rpx;" :class="{onshow:!flag,noshow:flag}" @click="flag=false"><text style="font-size:30rpx;">收藏名片</text></view>

		</uni-nav-bar>
		<view class="titletop">
			<input class="titleinput" type="text" placeholder="" />
			<image class="titleicon" style="" src="../../../static/icon/search.png" />
		</view>
		<view class="" v-show="flag">
		<div class="hm-friend-information-card" >
			<view v-for="item in productList">
				<view class="box1" style="height: 270rpx;width: 700rpx;display: flex;flex-direction: row;flex-wrap: nowrap;">
					<view class="box2" style="display: flex;flex-direction: row;">
						<!-- <view class="title"><text>维基媒体基金会</text></view> -->
						<view class="slide-left" style="margin: auto 10rpx;">
							<image class="primary" :src="item.image_src" style="width:130rpx;height: 130rpx;border-radius: 50% ;" />
						</view>

						<view class="side-right">
							<view class="buscardleft" style="margin-left: 5rpx;">
								<view class="context1" style="margin-left: 5rpx;">
									<text class="" style=" font-size:35rpx;">Easter</text>
									<text class="titletext" style="font-size:18rpx;padding:0.1px 10px;">上海</text>
									<image class="buscardicon" src="../../../static/icon/nv1.png" />
								</view>
								<view class="context" style="margin-top: 5rpx;margin-left: 5rpx;">
									<image class="buscardicon" style="margin-left: 0;" src="../../../static/icon/company.png" />
									<text class="titletext" style="font-size:18rpx;margin-top: 0;">国家电网公司</text>
								</view>
								<view class="context" style="margin-top: 0;margin-left: 5rpx;">
									<text class="titletext" style="margin-left: 0;font-size: 20rpx;">行业：电子商务</text>
								</view>
								<view class="context2" style="margin-top: 0;margin-left: 5rpx;line-height: 35rpx;">
									<text class="titletext" style="margin-left: 0;font-size:20rpx;">
										需求：
										<span>{{ xuqiu | fontxuqiu }}</span>
									</text>
								</view>
							</view>
						</view>
					</view>
					<button type="default" class="collect-buscard"style="background-color: #F95454;color:#FFFDEF">删除好友</button>
				</view>
				
			</view>
		</div>
		</view>
		
		<view class="" v-show="!flag">
		<div class="hm-friend-information-card" >
			<view v-for="item in productList">
				<view class="box1" style="height: 270rpx;width: 700rpx;display: flex;flex-direction: row;flex-wrap: nowrap;">
					<view class="box2" style="display: flex;flex-direction: row;">
						<!-- <view class="title"><text>维基媒体基金会</text></view> -->
						<view class="slide-left" style="margin: auto 10rpx;">
							<image class="primary" :src="item.image_src" style="width:130rpx;height: 130rpx;border-radius: 50% ;" />
						</view>
		
						<view class="side-right">
							<view class="buscardleft" style="margin-left: 5rpx;">
								<view class="context1" style="margin-left: 5rpx;">
									<text class="" style=" font-size:35rpx;">Easter</text>
									<text class="titletext" style="font-size:18rpx;padding:0.1px 10px;">上海</text>
									<image class="buscardicon" src="../../../static/icon/nv1.png" />
								</view>
								<view class="context" style="margin-top: 5rpx;margin-left: 5rpx;">
									<image class="buscardicon" style="margin-left: 0;" src="../../../static/icon/company.png" />
									<text class="titletext" style="font-size:18rpx;margin-top: 0;">国家电网公司</text>
								</view>
								<view class="context" style="margin-top: 0;margin-left: 5rpx;">
									<text class="titletext" style="margin-left: 0;font-size: 20rpx;">行业：电子商务</text>
								</view>
								<view class="context2" style="margin-top: 0;margin-left: 5rpx;line-height: 35rpx;">
									<text class="titletext" style="margin-left: 0;font-size:20rpx;">
										需求：
										<span>{{ xuqiu | fontxuqiu }}</span>
									</text>
								</view>
							</view>
						</view>
					</view>
					<button type="default" class="collect-buscard" style="background-color: #F0AD4E;color:#FFFDEF">添加好友</button>
					<button type="default" class="collect-buscard" style="background-color: #F95454;color:#FFFDEF">取消收藏</button>
				</view>
				
			</view>
		</div>
		</view>
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
			productList: [],
			flag:true
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
		},
		gofriend(){
		
	
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
@import '../../home/teaHouse/start.response.css';
@import '../../home/teaHouse/business-card.css';
@import '../../home/teaHouse/titlecard.css';
.status_bar {
	height: var(--status-bar-height);
	width: 100%;
}
.collect-buscard{
	width: 100rpx;
	font-size: 30rpx;
	line-height: 70rpx;
}
.onshow{
	background-color: #FFFFFF;
	height:20px;
	border-radius: 12rpx;
	line-height:20px;
	color:#81b991;
	padding:5px 5px;
	margin-bottom:-5px;
	/* vertical-align: middle; */
}
.onshowtext{
	
}
.noshow{
	/* background-color: #FFFFFF; */
	height:60rpx;
	color:#FFFFFF;
	border-radius: 12rpx;
	margin-bottom:10rpx;
	/* vertical-align: middle; */
}
</style>
