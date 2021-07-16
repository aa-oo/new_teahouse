<template>
	<view>
		<view class="tabtop">
			<view class="tabtopname">维基媒体基金会(3)</view>
			<view class="tabtopopt" @click="gooption">...</view>
		</view>
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			gooption() {
				uni.navigateTo({
					url:'./tableoption'
				})
			}
		}
	}
</script>

<style>
	.tabtop{
		height:80rpx;
		width:100%;
		position:relative;
		background:#81b991;
		color:#FFFDEF;
	}
	.tabtopname{
		position: absolute;
		font-size:35rpx;
		height:80rpx;
		line-height:80rpx;
		margin-left:30%;
	}
	.tabtopopt{
		position: absolute;
		font-size:60rpx;
		height:80rpx;
		line-height:80rpx;
		margin-left:90%;
		margin-top:-15rpx;
	}
</style>
