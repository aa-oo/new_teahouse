<template>
	<view>
		<view class="teainvestop">
			<text>茶屋投资实际操作会涉及合规处理,并且一般资金都会比较大。我们希望您先与该茶屋房主进行一对一沟通确认后再进行投资，同时我们也希望您可以进行线下投资既保证了被投资人的真实性，有保证了资金的安全性。</text>
			<br/>
			<text style="padding-left:33px;">交易包括了签订合同、第三方资金托管、股权交易等。</text>
		</view>
		<view class="teainmid" >联系房主</view>
		<view class="investbox1" style="height:300rpx ;margin-top: 45rpx;position: relative" >
			<view class="buscardright"><image class="buscardImg" src="../../static/hm-friend-information-card/images/img_24031_0_1.png"/></view>
			<view class="buscardleft">
				<view class="context1">
					<text class="" style=" border-bottom: 1px solid #81B991;font-size:22px;" @click="gobusCard">Easter</text>
					<text class="titletext" style="font-size:16px;padding:0.1px 10px;">上海</text>
					<image class="buscardicon" src="../../static/icon/nv1.png" />
				</view>
				<view class="context">
					<image class="buscardicon" style="margin-left: 0;" src="../../static/icon/company.png" />
					<text class="titletext"style="font-size:16px;">国家电网公司</text>
				</view>
				<view class="context"><text class="titletext" style="margin-left: 0;">行业：电子商务</text></view>
				<view class="context2">
					<text class="titletext" style="margin-left: 0;">需求：<span>{{xuqiu | fontxuqiu}}</span></text>
				</view>
			</view>
		</view>
		<view class="teainvesbot">投资金额请与房主商议后确定</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 1,
				teadetail:'wikimedia是一项全球运动，其使命是将免费的教育内容带给世界。wikimedia是一项全球运动，其使命是将免费的教育内容带给世界。',
				xuqiu:'每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。边框的间隔大一倍。',
			};
		},
		methods: {
			gobusCard() {
				uni.navigateTo({
					url:'../home/business-card/business-card'
				})
			},
			
		},
	filters: {
		fontxuqiu (date) {
		  const length = date.length
		  if (length > 38) {
		    var str = ''
		    str = date.substring(0, 38) + '...'
		    return str
		  } else {
		    return date
		  }
		}
	  },
	  
	};
</script>

<style>
	@import './business-card.css';
	.teainvestop{
		margin:3px auto;
		height:300rpx;
		width:90%;
		padding-top:30px;
		text-indent:33px;
		/* border:1px solid red; */
	}
	.teainmid{
		font-size:40rpx;
		color:#81b991;
		margin-top:20rpx;
		margin-left:5%;
	}
	.teainvesbot{
		/* text-decoration: underline; */
		color:#81b991;
		margin-left:5%;
		margin-top:20px;
	}
</style>
