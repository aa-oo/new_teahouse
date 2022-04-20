<template>
	<view>
		<view style="display: flex;align-items: center;justify-content: center;flex-direction: column;padding-top:10%;">
		<image style="width:500rpx;height:500rpx;" src="../static/choiceicon/nomes.png"></image>
		<view style="font-size:35rpx;color:#aaaaaa">{{msg}}</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:['msg']
	}
</script>

<style>
</style>
