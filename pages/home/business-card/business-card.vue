<template>
	<view >
		<!-- 名该片 -->
		<view class="buscardTop" >
			<div class="hm-friend-information-card">
				<view class="box2" style="margin-top: 45rpx;position: relative"  >
					<view class="buscardright" ><image style="margin-top:-10rpx;" class="buscardImg" :src="peopledetail.headPhoto" />
						<!-- <view v-if="collected" class="collectcard" >已收藏</view> -->
					</view>
					<view class="buscardleft">
						<view class="context">
							<text class=""style="font-size:22px;">{{ peopledetail.name }}</text>
							<text class="titletext"style="font-size:16px;padding:0.1px 10px;">{{peopledetail.address}}</text>
							<!-- <image class="buscardicon" src="../../../static/icon/nv1.png" /> -->
							<image v-if="peopledetail.gender ==='男'" class="buscardicon" style="width:50rpx;height:50rpx" src="../../../static/icon/nv1.png" />
							<image  v-if="peopledetail.gender ==='女'" class="buscardicon" src="../../../static/icon/女.png" />
							<!-- <image class="buscardicon" src="../../../static/icon/nv.png" /> -->
						</view>
						<view class="context">
							<image class="buscardicon" style="margin-left: 0;" src="../../../static/icon/company.png" />
							<text class="titletext">{{peopledetail.company}}</text>
						</view>
						<view class="context"><text class="titletext" style="margin-left: 0;">行业 :&emsp;{{peopledetail.work}}</text></view>
						<!-- <view class="context"><text class="titletext" style="margin-left: 0;">需求 :&emsp;电子商务</text></view> -->
						<view class="context" style="margin-bottom: 20rpx;margin-top:10rpx;">
							<text class="titletext" style="margin-left: 0;margin-top:-10px;">标签：</text>
							<text class="titletextadd" v-for="item in strength">{{strength.length === 0 ? '暂无标签' : item}}</text>
						</view>
					</view>
				</view>
			</div>
		</view>
		<view class="buscardBom" >
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
						手机号：<span style="color:#81b991">{{peopledetail.privatePhone?'电话信息已隐藏':peopledetail.phone}}</span>
					</view>
					<view class="context" style="margin-bottom: 25rpx;font-size:30rpx;">
						邮&emsp;箱：<span style="color:#81b991;">{{peopledetail.email}}</span>
					</view>
					</view>
				</div>
				<div class="hm-friend-information-card">
					<view class="box2" style="margin-top: 15rpx;position: relative;">
						<view class="context" style="font-size: 35rpx;padding: 5rpx;font-weight: 600;">
							需求服务
						</view>
					<!-- <view class="context">
						<text style="width: 240rpx;">出生年月:</text><text style="margin-left:20rpx;">2020/11/11</text>
					</view> -->
					<!-- <view class="context" style="display: flex;">
						<text style="width: 240rpx;">我的标签:</text><text class="contexttext">前端工程师，计算机图像处理，去模糊处理，人工智能</text>
					</view> -->
					<view class="need" >
						<view class="" style="margin:15rpx 30rpx;">
							需求:
						</view>
						<view class="" style="margin-left: 30rpx;margin-right: 20rpx;color: #82878a;margin-bottom: 25rpx;" >
							{{peopledetail.need}}
						</view>
					</view>
					<view class="skill" >
						<view class="" style="margin:15rpx 30rpx;">
							技能:
						</view>
						<view class="" style="margin-left: 30rpx;margin-right: 20rpx;color: #82878a;margin-bottom: 25rpx;" >
							{{peopledetail.skill}}
						</view>
					</view>
					</view>
				</div>
			</view>
			<view class="buscardBombutton">
				<view class="buttonadd" @click="addFriend" v-show="!isfriend">添加好友</view>
				<view class="buttonadd" style="background-color:#F95454 ;" @click="addFriend" v-show="isfriend">删除好友</text></view>
				<view class="buttonadd" style="background-color:#F0AD4E ;"@click="collectCard" v-show="!iscollect">收藏名片</view>
				<view class="buttonadd" style="background-color:#1365ff;" @click="collectCard" v-show="iscollect">取消收藏</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			peopledetail: [],
			collected:false,
			isfriend:false,
			iscollect:false,
			peopleid:'',
			strength:[],
		};
	},
	onLoad(e) {
		if(e.detail){
			this.peopleid = JSON.parse(e.detail)
			console.log(this.peopleid)
		}
		// console.log(getApp().globalData.tabindex);
		console.log(this.$store.state.token)
		
		this.isfriends()
		this.isAttention()
		
		this.getbusinessCard()
		// var author= JSON.stringify(this.$store.state.token)
		// uni.setNavigationBarTitle({
		//     title:'个人信息'
		// })
	},
	methods: {
		getbusinessCard() {
			uni.request({
				url:'/api/user/info',
				method:'POST',
				header:{
					'content-type':"application/json",
					'authorization':this.$store.state.token,
				},
				data: {
				    userId:this.peopleid,
					name:''
				},
				success: res => {
					console.log('名片详细信息如下');
					this.peopledetail = res.data.obj;
					console.log(this.peopledetail)
					for (let key in this.peopledetail.strengths){
					  if(this.peopledetail.strengths[key].isSelect == true){
					      let aa=this.peopledetail.strengths[key].strength
					      this.strength.push(aa)
					  }
					}
					console.log(this.strength.length)
				}
			});
		},
		isfriends(){
			uni.request({
				url:'/api/friend/isFriend',
				method:'POST',
				header:{
					'content-type':"application/json",
					'authorization':this.$store.state.token,
				},
				data: {
				    friendId:this.peopleid,
				},
				success: res => {
					console.log('是否是好友');
					this.isfriend = res.data;
					console.log(this.isfriend)				
				}
			});
		},
		
		isAttention(){
			uni.request({
				url:'/api/friend/isAttention',
				method:'POST',
				header:{
					'content-type':"application/json",
					'authorization':this.$store.state.token,
				},
				data: {
				     attentionId:this.peopleid,
				},
				success: res => {
					console.log('是否已收藏');
					this.iscollect = res.data;
					console.log(this.iscollect)				
				}
			});
		},
		addFriend(){
			if(this.isfriend==true){
				uni.request({
					url:'/api/friend/endFriend',
					method:'POST',
					header:{
						'content-type':"application/json",
						'authorization':this.$store.state.token,
					},
					data: {
					    toId:this.peopleid,
						message:'',
						name:''
					},
					success: res => {
						this.isfriend = false;
						console.log(this.isfriend)
						uni.showToast({
							title: '删除好友成功',
							icon:'none'
						});
					}
				});
			}
			else{
				uni.request({
					url:'/api/friend/request',
					method:'POST',
					header:{
						'content-type':"application/json",
						'authorization':this.$store.state.token,
					},
					data: {
					    toId:this.peopleid,
					    message:'',
					    name:''
					},
					success: res => {
						console.log('添加');
						uni.showToast({
							title: '已发送好友请求',
							icon:'none'
						});
						// this.isfriend = true;
						console.log(this.isfriend)				
					}
				});
			}
		},
		collectCard(){
		// this.collected=true
			if(this.iscollect==true){
				uni.request({
					url:'/api/friend/deleteAttention',
					method:'POST',
					header:{
						'content-type':"application/json",
						'authorization':this.$store.state.token,
					},
					data: {
					    attentionId:this.peopleid,
						name:''
					},
					success: res => {						
						this.iscollect = false;
						uni.showToast({
							title: '取消收藏成功',
							icon:'none'
						});
					}
				});
			}
			else{
				uni.request({
					url:'/api/friend/attention',
					method:'POST',
					header:{
						'content-type':"application/json",
						'authorization':this.$store.state.token,
					},
					data: {
					    attentionId:this.peopleid,
						name:''
					},
					success: res => {
						this.iscollect = true;	
						uni.showToast({
							title: '收藏成功',
							icon:'none'
						});
					}
				});
			}
		}
	},
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
.dele{
	background-color: #F95454;
}
</style>
