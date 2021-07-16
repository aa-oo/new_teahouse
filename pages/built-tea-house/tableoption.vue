<template>
	<view class="optall">
		<view class="optiontop">
			<view class="optionhy">会员</view>
			<view class="optpeople">
				<view class="optpeo" >
					<view class="optpeo1"></view>
					<view class="optpeo2">名称</view>
				</view>
				<view class="optpeo" >
					<view class="optpeo1"></view>
					<view class="optpeo2">名称</view>
				</view>
				<view class="optpeo" >
					<view class="optpeo1"></view>
					<view class="optpeo2">名称</view>
				</view>
				<view class="optpeo" >
					<view class="optpeo1"></view>
					<view class="optpeo2">名称</view>
				</view>
			</view>
			<!-- <view class="addfriend">+</view> -->
		</view>
		<view class="optionmid">
			<view class="optionmid1">茶屋名称: 维基媒体基金会</view>
			<view class="optionmid2">茶屋简介: {{teadetail | fontNumber}}</view>
			<view class="optionmid3">
				<text>茶屋投资:</text>
				<button class="optionmid3but" @click="gotoinvest">我也要投资</button>
			</view>
			<view class="optionmid4">
				<text>已收到</text>
				<text class="bottext" style="border-bottom:1px solid #81B991 ;color: #81B991;">3000</text>
				<text class="bottext"><span>&yen</span>，来自</text>
				<text class="bottext" style="border-bottom:1px solid #81B991 ;color: #81B991;">4</text>
				<text class="bottext">茶友</text>
				<text class="optmidxq" @click="gotodetail">详情</text>
				<text class="optmidjl" @click="gotodoc">记录</text>
			</view>
		</view>
		<view class="optionbottom">
			<view class="optionbottom1">
				<text class="optionbottext1">茶屋文摘</text>
				<text class="optionbottext2">more+</text>
			</view>
			<view class="optionbottom2">
				<view class="optbotartical" @click="gotoartical">
					<text class="optbotartical1">《创客茶馆》</text>
					<text class="optbotartical2">作者：李静秋</text>
				</view>
				<view class="optbotartical">
					<text class="optbotartical1">《创客茶馆》</text>
					<text class="optbotartical2">作者：李静秋</text>
				</view>
				<view class="optbotartical">
					<text class="optbotartical1">《创客茶馆》</text>
					<text class="optbotartical2">作者：李静秋</text>
				</view>
			</view>
		</view>
		<view class="optionbutton" @click="gotohome">删除并退出</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				teadetail:'wikimedia是一项全球运动，其使命是将免费的教育内容带给世界。wikimedia是一项全球运动，其使命是将免费的教育内容带给世界。',
			}
		},
		filters: {
			fontNumber (date) {
			  const length = date.length
			  if (length > 50) {
			    var str = ''
			    str = date.substring(0,35) + '...'
			    return str
			  } else {
			    return date
			  }
			},
		  },
		  methods:{
			  gotoartical(){
				  uni.navigateTo({
				  	url:'../home/article/article'
				  })
			  },
			  gotohome(){
				  uni.navigateTo({
				  	url:'../home/teaHouse/start'
				  });
			  },
			  gotoinvest(){
				  uni.navigateTo({
				  	url:'./teainvest'
				  });
			  },
			  gotodetail(){
				  uni.navigateTo({
				  	url:'./investdetail'
				  });
			  },
			  gotodoc(){
				  uni.navigateTo({
				  	url:'./investdoc'
				  });
			  }
		  }
	}
</script>

<style>
	@import './tableoption.css';
</style>
