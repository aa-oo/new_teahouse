<template>
	<view>
		<view v-for="item in productList">
				<view class="box1" style="height:300rpx ;margin-top: 45rpx;position: relative" >
					<view class="buscardright"><image class="buscardImg" :src="item.image_src" /></view>
					<view class="buscardleft">
						<view class="context">
							<text class="" style=" border-bottom: 1px solid #81B991;" @click="gobusCard">Easter</text>
							<text class="titletext">上海</text>
							<image class="buscardicon" src="../../static/icon/nv.png" />
						</view>
						<view class="context">
							<image class="buscardicon" style="margin-left: 0;" src="../../static/icon/nv.png" />
							<text class="titletext">:国家电网公司</text>
						</view>
						<view class="context"><text class="titletext" style="margin-left: 0;">行业:电子商务</text></view>
						<view class="context">
							<text class="titletext" style="margin-left: 0;">需求:每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。</text>
						</view>
					</view>
				</view>
			</view>
	</view>
</template>

<script>
	export default {
		name:"buscard",
		props:['productList'],
		data() {
			return {
				
			};
		},
		methods:{
			gobusCard() {
				uni.navigateTo({
					url:'../../pages/home/business-card/business-card'
				})
			}
		}
	
	}
</script>

<style>
@import url("./buscard.css");
@import url("../../pages/teaHouse/start.response.css");
</style>

