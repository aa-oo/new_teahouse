<template>
	<view class="">
			<view class="top">
			<view class="articletop">维基媒体基金会的创立</view>
			<view class="articleauthor">周春来</view>
			<view class="articletime">2020/8/15</view>
			</view>
			<view class="bottom">
				<view class="articlecontect">
					文章详情文章详情文章详情文章详情文章详情v文章详情文章详情v文章详情文章详情v文章详情文章详情v文章详情v文章详情vv文章详情v文章详情v文章详情文章详情vv文章详情vv文章详情文章详情vv文章详情文章详情v文章详情文章详情v文章详情文章详情vv文章详情文章详情v文章详情文章详情v文章详情文章详情vvv文章详情
						文章详情文章详情文章详情文章详情文章详情v文章详情文章详情v文章详情文章详情v文章详情文章详情v文章详情v文章详情vv文章详情v文章详情v文章详情文章详情vv文章详情vv文章详情文章详情vv文章详情文章详情v文章详情文章详情v文章详情文章详情vv文章详情文章详情v文章详情文章详情v文章详情文章详情vvv文章详情
						文章详情文章详情文章详情文章详情文章详情v文章详情文章详情v文章详情文章详情v文章详情文章详情v文章详情v文章详情vv文章详情v文章详情v文章详情文章详情vv文章详情vv文章详情文章详情vv文章详情文章详情v文章详情文章详情v文章详情文章详情vv文章详情文章详情v文章详情文章详情v文章详情文章详情vvv文章详情
						文章详情文章详情文章详情文章详情文章详情v文章详情文章详情v文章详情文章详情v文章详情文章详情v文章详情v文章详情vv文章详情v文章详情v文章详情文章详情vv文章详情vv文章详情文章详情vv文章详情文章详情v文章详情文章详情v文章详情文章详情vv文章详情文章详情v文章详情文章详情v文章详情文章详情vvv文章详情
						文章详情文章详情文章详情文章详情文章详情v文章详情文章详情v文章详情文章详情v文章详情文章详情v文章详情v文章详情vv文章详情v文章详情v文章详情文章详情vv文章详情vv文章详情文章详情vv文章详情文章详情v文章详情文章详情v文章详情文章详情vv文章详情文章详情v文章详情文章详情v文章详情文章详情vvv文章详情
				</view>
				<view class="delartbutton">删除文章</view>
			</view>
			
			<!-- {{item.titlename}} -->
	</view>
</template>

<script>
	export default{
		data() {
			return {};
		},
		onLoad() {
			uni.setNavigationBarTitle({
			    title:'茶馆文摘'
			})
		},
		// props:['item.titlename']
		methords(){
			
		}
	}
</script>

<style>
	.top{
		border-top: 2px solid #53989f;
		text-align: center;
	}
	.articletop{
		margin-top: 25rpx;
	    /* font-style: italic; */
		font-weight: bold;
		font-size: 45rpx;
	}
	.articleauthor{
		margin-top: 30rpx;
		font-size: 38rpx;
	}
	.articletime{
		margin-top: 15rpx;
		font-size: 20rpx;
	}
	.bottom{
		margin-top: 30rpx;
		font-size: 32rpx;
	}
	.articlecontect{
		padding:0 30rpx 30rpx 30rpx;
	}
	.delartbutton{
		font-size:35rpx ;
		text-align: center;
		margin:30rpx auto;
		background-color: #dcdcdc;
		width:80%;
		height: 70rpx;
		line-height: 70rpx;
		border-radius: 10rpx;
		color:#215631;
		border:1px solid #81b991;
		margin-bottom:200rpx;
	}
	
</style>
