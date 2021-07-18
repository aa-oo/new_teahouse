<template>
	
	<view>
		
		<!-- 列表 key 在wx不行，但是这里必须唯一 -->
		msg-list页
		
	</view>
	
</template>

<script>
	
	// framework
	
	export default {
		data() {
			return {
				dataList : [],
			}
		},
		
		onLoad() {
			this.dataList = [
				
				{title:"张三", content:"在哪里啊？"},
				{title:"李四", content:"天气怎么这么热啊？"},
				{title:"王五", content:"什么情况？"}
			]
		},
		methods: {
			jumpToTargetView(item)
			{
				uni.navigateTo({
					url:""
				})
			},
		},
		
	}
</script>

<style>
	
	.flex-item {
		width: 33.3%;
		height: 100px;
		text-align: center;
		line-height: 100px;
	}
	
	.uni-media-list-logo {height: 48px;width: 48px;position: relative;}
	
	.uni-media-list-text-top{padding-top: 5px;}
	.uni-media-list-text-bottom{padding-top: 2px;}
	
	.sp{
		position: absolute;
		right: -6px;
		background-color: #f95454;
		color: #fff;
		font-size: 12px;
		width: 19px;
		height: 19px;
		line-height: 19px;
		text-align: center;
		border-radius: 50%;
		top: -7px;
	}
</style>

