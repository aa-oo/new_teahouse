<template>
	<view class="mesetbody">
		这是消息页
		<button @click="golog"> 登录页面</button>
		
	</view>
</template>

<script>
	export default{
		methods:{
			golog() {
				uni.navigateTo({
					url:'../index/index'
				})
			}
		}
	}
</script>

<style>
	
</style>
