<template>
	<view>
		
		<view class="mesetting1" style="border-bottom: 1px solid #DCDCDC;" @click="siginin">账号与安全 <text style="float:right">></text></view>
		<view class="mesetting1" @click="siginin1"> 编辑信息 <text style="float:right" >></text></view>
		<view class="mesetblank"></view>
		<view class="mesetting1"> 写文章 <text style="float:right" @click="writein">></text></view>
		<view class="mesetblank"></view>
		<view class="mesetting1" style="border-bottom: 1px solid #DCDCDC;" @click="helpone"> 帮助与反馈 <text style="float:right">></text></view>
		<view class="mesetting1" @click="helpone"> 关于茶馆 <text style="float:right">></text></view>
		<view class="mesetblank"></view>
		<view class="mesetting2" @click="backout">退出登录</view>
	</view>
</template>

<script>
	export default{
		
		methods:{
			siginin(){
				uni.navigateTo({
					url:'passwordchange'
				})
			},
			siginin1(){
				uni.navigateTo({
					url:'userinfo'
				})
			},
			writein(){
				uni.navigateTo({
					url:'../built-tea-house/newarticals'
				})
			},
			backout(){
				uni.navigateTo({
					url:'../index/login'
				})
			},
			helpone(){
				uni.showToast({
					title: '该功能暂未开启',
					icon:'none'
				});
			}
		}
	}
</script>

<style>
	.mesetbody{
		background-color:#DCDCDC ;
	}
	.mesetting1{
		padding:5px 18px;
		height:30px;
		font-size:30rpx;
		height:30px;
		/* border:1px solid red; */
		background-color: #FFFFFF;
		line-height:30px;
	}
	.mesetblank{
		width:100%;
		height:8px;
		background-color: #e1e1e1;
	}
	.mesetting2{
		padding:5px 18px;
		height:30px;
		font-size:30rpx;
		height:30px;
		background-color: #FFFFFF;
		text-align: center;
		line-height:30px;
		border-bottom: 1px solid #dadada;
	}
</style>
