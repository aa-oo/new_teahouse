<template>
	<view class="content">
		
		<view class="text-area">
			<text class="title">您还未登录...</text>
		</view>
		<view class="buttonclose">
			<button class="loggroup" @click="gologin">登录</button>
			<button class="signgroup"  @click="gologin1">注册</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
	
		methods: {
			gologin() {
				uni.navigateTo({
					url:'./login'
				})
		    },
			gologin1() {
				uni.navigateTo({
					url:'./signin'
				})
			},
		}
		
	}
</script>

<style>
	page{
		height:100%;
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #81b991;
		width:100%;
		height:100%;
		/* border:1px solid red; */
	}
.text-area{
	font-size:50rpx;
	color:#FFFFFF;
	margin-top:-30%;
}
.buttonclose{
	height:80rpx ;
	margin-top: 45rpx;
	display: flex;
	flex-wrap: nowrap;
	justify-content: space-between;
	margin-top: 20%;
}
.loggroup{
	font-size:35rpx ;
	text-align: center;
	margin-right:80rpx;
	background-color: #bcd6c3;
	color:#549f6a;
	width: 170rpx;
	height: 80rpx;
	line-height: 80rpx;
	border-radius: 10rpx;
}
.signgroup{
	font-size:35rpx ;
	text-align: center;
	/* margin-right: 30rpx; */
	/* margin-top: -15rpx; */
	background-color: #509268;
	color:#dcf7e4;
	width: 170rpx;
	height: 80rpx;
	line-height: 80rpx;
	border-radius: 10rpx;
}
	
</style>
