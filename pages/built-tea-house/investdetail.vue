<template>
	<view>
		<view class="indetailtop">
			<view class="indetailtop1">茶屋名称：<text>{{teaname}}</text></view>
			<view class="indetailtop2">茶屋名称：<text>{{teapeople}}</text></view>
			<view class="indetailtop3">投资详情</view>
			<view class="indetailbottom">
				<view class="indetailbot1"> 
					<view><image class="investImg" src="../../static/hm-friend-information-card/images/img_24031_0_1.png"></image></view>
					<view class="indetailbot2">尚虹霖</view>
					<view class="indetailbot3">+100,230</view>
					<view class="indetailbot4">2020/11/15</view>
				</view>
				<view class="indetailbot1">
					<view><image class="investImg" src="../../static/hm-friend-information-card/images/img_24031_0_1.png"></image></view>
					<view class="indetailbot2">尚虹霖</view>
					<view class="indetailbot3">+100,230</view>
					<view class="indetailbot4">2020/11/15</view>
				</view>
				<view class="indetailbot1">
					<view><image class="investImg" src="../../static/hm-friend-information-card/images/img_24031_0_1.png"></image></view>
					<view class="indetailbot2">尚虹霖</view>
					<view class="indetailbot3">+100,230</view>
					<view class="indetailbot4">2020/11/15</view>
				</view>
				<view class="indetailbot1">
					<view><image class="investImg" src="../../static/hm-friend-information-card/images/img_24031_0_1.png"></image></view>
					<view class="indetailbot2">尚虹霖</view>
					<view class="indetailbot3">+100,230</view>
					<view class="indetailbot4">2020/11/15</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				teaname:'创客茶馆',
				teapeople:'李静秋',
			}
		}
	}
</script>

<style>
	.indetailtop{
		width:96%;
		background-color:#d4e7d9;
		height:1200rpx;
		margin:0rpx auto;
		border-radius: 10rpx;
		margin-top:3%;
		position: absolute;
		margin-left: 2%;;
	}
	.indetailtop1{
		padding-top:20rpx;
		/* margin-top:20px; */
		margin-left:5%;
		/* position: absolute; */
		font-size: 33rpx;
		color:#376042;
	}
	.indetailtop2{
		margin-top:20px;
		margin-left:5%;
		/* position: absolute; */
		font-size: 33rpx;
		color:#376042;
	}
	.indetailtop3{
		margin-top:20px;
		margin-left:5%;
		/* position: absolute; */
		font-size: 33rpx;
		color:#376042;
		padding-bottom:20px;
	}
	.indetailbottom{
		width:90%;
		border-radius:20rpx;
		margin:3rpx auto;
		height:400px;
		background-color: #FFFFFF;
		padding-top:30px;
		overflow: auto;
	}
	.indetailbot1{
		width:80%;
		margin:3rpx auto;
		height:60px;
		/* border:1px solid #222222; */
		border-bottom:2px solid #008000;
		padding:10px 10px;
		position:relative;
		margin-bottom:20px;
	}
	.investImg{
	border-radius: 110rpx;
	width: 150rpx;
	height: 150rpx;
	/* line-height:150rpx; */
	overflow: hidden;
	position: absolute;
	top:-10rpx;
	left:15rpx;
	position: absolute;
	}
	.indetailbot2{
		font-size:30rpx;
		margin-left:32%;
		position: absolute;
		width:90px;
		overflow: hidden;
	}
	.indetailbot3{
		font-size:30rpx;
		float:right;
		position: absolute;
		width:90px;
		overflow: hidden;
		color:#008000;
		right:4px;
	}
	.indetailbot4{
		font-size:30rpx;
		margin-left:32%;
		position: absolute;
		width:90px;
		overflow: hidden;
		margin-top:35px;
	}
</style>
