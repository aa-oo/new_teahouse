<template>
	<view>
		<view class="tabtop">
			<view class="tabback" @click="goback"><</view>
			<view class="tabtopname">{{tea_name}}</view>
			<view class="tabtopopt" @click="gooption">...</view>
		</view>
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
				tea_name:''
			}
		},
		onLoad(opt) {
			this.tea_name=opt.tea_id;
			console.log(this.tea_name)
		},
		methods:{
			gooption() {
				uni.navigateTo({
					url:'./tableoption'
				})
			},
			goback() {
			uni.navigateBack({
				delta: 1
			});
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
	.tabback{
		position: absolute;
		font-size:48rpx;
		height:80rpx;
		line-height:80rpx;
		margin-left:2%;
		/* margin-top:-15rpx; */
	}
</style>
