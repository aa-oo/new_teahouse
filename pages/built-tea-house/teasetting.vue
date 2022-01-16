<template>
	<view>
	
		<view class="mesetting1"  style="border-bottom: 1px solid #DCDCDC;" @click="gopho">修改茶屋头像 <text style="float:right">></text></view>

		<!-- <view class="mesetblank"></view> -->
		<view class="mesetting1"  style="border-bottom: 1px solid #DCDCDC;" @click="gocon">修改茶屋信息 <text style="float:right">></text></view>
		<!-- <view class="mesetting1"  style="border-bottom: 1px solid #DCDCDC;" @click="phone">茶屋成员管理<text style="float:right">></text></view> -->
		
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
			}
		},
	
		methods:{
			gopho(){
				uni.navigateTo({
					url:'./teaeditpho'
				})
			},
			gocon(){
				uni.navigateTo({
					url:'./teaeditcon'
				})
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
