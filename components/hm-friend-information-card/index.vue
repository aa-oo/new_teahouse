<template>
	<div class="hm-friend-information-card">
		<!-- <button @click="getList">点我</button> -->
		<!-- <view v-for="item in productList" >
		</view> -->
		 <!-- <view @getTea> -->
	  <button @click="get">点我</button>
		<view v-for="item in productList">
			<view class="box">
				<image class="primary" :src="item.image_src" />
				<view class="side">
					<view class="namClass">
						<text class="name">{{ item.goods_id }}</text>
					</view>
					<!-- <image class="titleImg" :src="item.image_src" /> -->
					<text class="address">{{ item.goods_id }}</text>
				</view>
			</view>
		</view>
		<!-- {{title}} -->
		</view>
	</div>
</template>
<script>
export default {
		props:['productList'],
	data() {
		return {
			// productList: []
		};
	},
	onLoad() {
		this.getList();
	},
	methods: {
		// getList() {
		// 	uni.request({
		// 		url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
		// 		// dataType: 'json',
		// 		success: res => {
		// 			this.productList = res.data.message;
		// 			console.log(this.productList);
		// 		}
		// 	});
		// },
		get(){
			console.log(this.productList)
		}
	}
};
</script>
<style>
@import './index.response.css';
</style>
