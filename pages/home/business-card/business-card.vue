<template>
	<view>
		<!-- 名该片 -->
		<view class="buscardTop">
			<div class="hm-friend-information-card">
				<view class="box2" style="margin-top: 45rpx;position: relative">
					<view class="buscardright"><image class="buscardImg" :src="productList[1].image_src" />
						<!-- <view v-if="collected" class="collectcard" >已收藏</view> -->
					</view>
					<view class="buscardleft">
						<view class="context">
							<text class=""style="font-size:22px;">Easter</text>
							<text class="titletext"style="font-size:16px;padding:0.1px 10px;">上海</text>
							<image class="buscardicon" src="../../../static/icon/nv1.png" />
							<!-- <image class="buscardicon" src="../../../static/icon/nv.png" /> -->
						</view>
						<view class="context">
							<image class="buscardicon" style="margin-left: 0;" src="../../../static/icon/company.png" />
							<text class="titletext">国家电网公司</text>
						</view>
						<view class="context"><text class="titletext" style="margin-left: 0;">行业 :&emsp;电子商务</text></view>
						<!-- <view class="context"><text class="titletext" style="margin-left: 0;">需求 :&emsp;电子商务</text></view> -->
						<view class="context" style="margin-bottom: 20rpx;margin-top:1rpx;">
							<text class="titletext" style="margin-left: 0;margin-top:-10px;">特长：</text>
							<text class="titletextadd">数据挖掘</text>
							<text class="titletextadd">网站开发</text>
							<text class="titletextadd">前端</text>
						</view>
					</view>
				</view>
			</div>
		</view>
		<view class="buscardBom">
			<view class="buscardBomtitle">
				<text style="	border-bottom:1px solid #81b991 ;padding-bottom: 5rpx;">个人信息</text>
			</view>
			<view class="buscardBomconnect">
				<div class="hm-friend-information-card">
					<view class="box2" style="margin-top: 25rpx;position: relative">
					<view class="context" style="font-size: 35rpx;padding: 5rpx;font-weight: 600;">
						联系方式
					</view>
					<view class="context" style="font-size:30rpx;" >
						手机号：<span style="color:#81b991">112345678901</span>
					</view>
					<view class="context" style="margin-bottom: 25rpx;font-size:30rpx;">
						微信号：<span style="color:#81b991">112345678901</span>
					</view>
					</view>
				</div>
				<div class="hm-friend-information-card">
					<view class="box2" style="margin-top: 15rpx;position: relative;">
					<view class="context">
						<text style="width: 240rpx;">出生年月:</text><text style="margin-left:20rpx;">2020/11/11</text>
					</view>
					<view class="context" style="display: flex;">
						<text style="width: 240rpx;">我的标签:</text><text class="contexttext">前端工程师，计算机图像处理，去模糊处理，人工智能</text>
					</view>
					<view class="need" >
						<view class="" style="margin:15rpx 30rpx;">
							需求:
						</view>
						<view class="" style="margin-left: 30rpx;margin-right: 20rpx;color: #82878a;margin-bottom: 25rpx;" >
							1-了解国内互联网最新动态2-知识分享类内容分发形式3-社群高效高能的组织形式4-认识同频的国内外华人朋友
						</view>
					</view>
					<view class="skill" >
						<view class="" style="margin:15rpx 30rpx;">
							技能:
						</view>
						<view class="" style="margin-left: 30rpx;margin-right: 20rpx;color: #82878a;margin-bottom: 25rpx;" >
							1-企业管理咨询、管理培训2-企业人才开发、培训体系搭建3-个人学习能力提升、职业生涯规划4-全世界跑马拉松比赛、环球旅行
						</view>
					</view>
					</view>
				</div>
			</view>
			<view class="buscardBombutton">
				<view class="buttonadd" @click="addFriend">
					添加好友
				</view>
				<view class="buttonadd" @click="collectCard">
					收藏名片
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			productList: [],
			collected:false
		};
	},
	onLoad() {
		// console.log(getApp().globalData.tabindex);
		this.getbusinessCard();
		// uni.setNavigationBarTitle({
		//     title:'个人信息'
		// })
	},
	methods: {
		getbusinessCard() {
			uni.request({
				url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
				success: res => {
					this.productList = res.data.message;
					console.log(this.productList);
				}
			});
		}
	},
	addFriend(){},
	collectCard(){
		// this.collected=true
		console.log("11")
	}
};
</script>

<style>
@import '../teaHouse/start.response.css';
@import '../teaHouse/business-card.css';
.box2{
	  margin-top: 25rpx;
	  display: flex;
	  /* align-self: center; */
	  flex-direction: column;
	
	  /* align-items: center; */
	  /* flex-direction: row; */
	  /* justify-content:center; */
	  /* border-radius: 38.96rpx; */
	  border-radius: 28rpx;
	  border: 1rpx solid rgba(209, 213, 223, 0.5);
	  box-shadow: 0px 10px 30px rgba(209, 213, 223, 0.5);
	  background-color: #ffffff;
	  /* width: 720.78rpx; */
	  width: 700rpx;
	  /* height: 233.77rpx; */
	
}
.titletextadd {
	display: inline-block;
	text-align: center;
	margin-top:5px;
	margin-left: 15rpx;
	font-size: 25rpx;
	background-color: #d2e6d7;
	padding: 13rpx 15rpx;
	border-radius: 7rpx;
}
.buscardBom{
	/* height: 270rpx; */
	margin-top: 20rpx;
	/* box-shadow: 0px 10px 30px rgba(209, 213, 223, 0.5); */
	 background-color: #ffffff;
	 font-size: 29rpx;
}
.buscardBomtitle{
	font-size: 27rpx;
	margin-left:5%;
}
.contexttext{
	/* margin-top: -3rpx; */
	font-size:30rpx;
	margin-left: -40rpx;
	margin-right: 15rpx;
	 -webkit-line-clamp: 3;
	 text-overflow: ellipsis;
	 display: -webkit-box;
	 -webkit-box-orient: vertical;
	overflow: hidden;
	/* line-height: 50rpx; */
}
.skill,.need{
	/* border:1px solid red; */
	margin: 10px auto;
	font-size: 26rpx;
	background-color: #f1f6fa;
	width:95%;
	border-radius: 5rpx;
	/* box-shadow: 0px 10px 30px rgba(209, 213, 223, 0.5); */
}
.skill{
	margin-top: -5rpx;
	margin-bottom: 20rpx;
}
.buscardBombutton{
	height:80rpx ;
	margin-top: 45rpx;
	display: flex;
	flex-wrap: nowrap;
	justify-content: space-evenly;
	color: white;
}
.buttonadd{
	/* width: 200rpx;
	height: 100rpx;
	background-color: #81b991;
	text-align: center; */
	font-size:28rpx ;
	text-align: center;
	/* margin-right: 30rpx; */
	margin-top: -15rpx;
	background-color: #81B991;
	width: 190rpx;
	height: 70rpx;
	line-height: 70rpx;
	border-radius: 10rpx;
}
.collectcard{
	width: 130rpx;
	line-height: 50rpx;
	text-align: center;
	position: absolute;
	top:140rpx;
	right:67rpx;
	border: 1px solid black;
	background-color: #eeeeee;
	font-size: 29rpx;
}
</style>
