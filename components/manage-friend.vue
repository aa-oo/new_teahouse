<template>
	<view>
		<div class="hm-friend-information-card">
			<view class="box1" style="height: 260rpx;width: 700rpx;display: flex;flex-direction: row;flex-wrap: nowrap;">
				<view class="box2" style="display: flex;flex-direction: row;">
					<view class="slide-left" style="margin: auto 10rpx;">
						<image class="primary" :src="friendList.headPhoto" style="width:130rpx;height: 130rpx;border-radius: 50% ;" />
					</view>

					<view class="side-right">
						<view class="buscardleft" style="margin-left: 5rpx;">
							<view class="context1" style="margin-left: 5rpx;margin-top:20rpx;font-size:48rpx;">
								<text class="" style=" font-size:38rpx;">{{friendList.name}}</text>
								<text class="titletext" style="font-size:28rpx;padding:0.1px 10px;">{{friendList.address}}</text>
								<image v-if="friendList.gender ==='男'" class="buscardicon" style="width:50rpx;height:50rpx" src="../static/icon/nv1.png" />
								<image  v-if="friendList.gender ==='女'" class="buscardicon" src="../static/icon/女.png" />
							</view>
							<view class="context" style="margin-top: 5rpx;margin-left: 5rpx;" >
								<image class="buscardicon" style="margin-left: 0;" src="../static/icon/company.png" />
								<text class="titletext" style="font-size:28rpx;margin-top: 0;">{{friendList.company}}</text>
							</view>
							<view class="context" style="margin-top: 0;margin-left: 5rpx;">
								<text class="titletext" style="margin-left: 0;font-size: 28rpx;">行业：{{friendList.work}}</text>
							</view>
							<view class="context2" style="margin-top: 0;margin-left: 5rpx;line-height:40rpx;">
								<text class="titletext" style="margin-left: 0;font-size:28rpx;">
									需求：
									<span>{{ friendList.need | fontxuqiu }}</span>
								</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</div>
	</view>
</template>

<script>


export default {
	props:['friendList',],
	name: 'manageFriend',
	data() {
		return {
			title: 1,
			teadetail: 'wikimedia是一项全球运动，其使命是将免费的教育内容带给世界。wikimedia是一项全球运动，其使命是将免费的教育内容带给世界。',
			xuqiu: '每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。边框的间隔大一倍。',
		};
	},
	onLoad() {
		console.log(friendList)
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
			if (length > 30) {
				var str = '';
				str = date.substring(0, 30) + '...';
				return str;
			} else {
				return date;
			}
		}
	}
};
</script>
<style>
@import '../pages/home/teaHouse/start.response.css';
@import '../pages/home/teaHouse/business-card.css';
@import '../pages/home/teaHouse/titlecard.css';
</style>

