<template>
	<view class="">
		<!-- 这是首页 -->
		<view class="box">
			<uni-segmented-control
				:current="tab_current"
				:values="tabs"
				@clickItem="onClickItem"
				style-type="text"
				active-color="#81b991"
				background-color="#81b991"
			></uni-segmented-control>
			<view class="content">
				<view v-show="tab_current === 0">
					<div class="hm-friend-information-card">
						<view v-for="item in productList">
							<view class="box1">
								<view class="title"><text>维基媒体基金会</text></view>
								<view class="mid">
									<image class="primary" :src="item.image_src" />
									<view class="side">
										<view class="namClass"><text class="name">{{teadetail | fontNumber}}</text></view>
										<!-- <text class="address">{{ item.goods_id }}</text> -->
									</view>
								</view>
								<view class="bot">
									<text>已收到</text>
									<text class="bottext" style="border-bottom:1px solid #81B991 ;color: #81B991;">3000</text>
									<text class="bottext"><span>&yen</span>，来自</text>
									<text class="bottext" style="border-bottom:1px solid #81B991 ;color: #81B991;">4</text>
									<text class="bottext">茶友</text>
									<!-- 已收到<text class="bottext">3000</text>,来自<text class="bottext">4</text>茶友 -->
									<text class="botbtn" @click="addtea" >+加入茶桌</text>
								</view>
							</view>
						</view>
					</div>
				</view>
			</view>
			<view v-show="tab_current === 1">
				<div class="hm-friend-information-card" >
					<view v-for="item in productList">
						<view class="box1" style="height:300rpx ;margin-top: 45rpx;position: relative" >
							<view class="buscardright"><image class="buscardImg" :src="item.image_src" /></view>
							<view class="buscardleft">
								<view class="context1">
									<text class="" style=" border-bottom: 1px solid #81B991;font-size:22px;" @click="gobusCard">Easter</text>
									<text class="titletext" style="font-size:16px;padding:0.1px 10px;">上海</text>
									<image class="buscardicon" src="../../../static/icon/nv1.png" />
								</view>
								<view class="context">
									<image class="buscardicon" style="margin-left: 0;" src="../../../static/icon/company.png" />
									<text class="titletext"style="font-size:16px;">国家电网公司</text>
								</view>
								<view class="context"><text class="titletext" style="margin-left: 0;">行业：电子商务</text></view>
								<view class="context2">
									<text class="titletext" style="margin-left: 0;">需求：<span>{{xuqiu | fontxuqiu}}</span></text>
								</view>
							</view>
						</view>
					</view>
				</div>
			</view>
			<view v-show="tab_current === 2">
				<view class="titlebox">
					<view class="titletop">
						<input class="titleinput" type="text" placeholder="" />
						<image class="titleicon" style="" src="../../../static/icon/search.png" />
					</view>
					<card class="titlecard"></card>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
import card from '@/components/card/card.vue';
import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue';
export default {
	components: {
		card,
		uniSegmentedControl
	},
	data() {
		return {
			title: 1,
			teadetail:'wikimedia是一项全球运动，其使命是将免费的教育内容带给世界。wikimedia是一项全球运动，其使命是将免费的教育内容带给世界。',
			xuqiu:'每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。边框的间隔大一倍。',
			productList: [],
			tabs: ['茶屋', '名片', '文章'],
			tab_current: 0,
			disk_list: [],
			showPass: false,
			form_network_disk: {
				username: '',
				password: '',
				path: ''
			}
		};
	},
	onLoad() {
		// console.log(getApp().globalData.tabindex);
		this.getteaHouse()
	},
	methods: {
		getteaHouse(){
			uni.request({
				url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
				success: res => {
					this.productList = res.data.message;
					console.log(this.productList);
				}
			});
		},
		onClickItem(e) {
			this.tab_current = e.currentIndex;
			if(e.currentIndex==0){
			}
			if (e.currentIndex == 1) {
				// uni.request({
				// 	url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
				// 	success: res => {
				// 		this.productList = res.data.message;
				// 		console.log(this.productList);
				// 	}
				// });
			}
		},
		gobusCard() {
			uni.navigateTo({
				url:'../business-card/business-card'
			})
		},
		addtea() {
			uni.navigateTo({
				// url:'../../built-tea-house/teatable'
				url:'../../chat/view/pangugle-chat'
			})
		}
		
	},
filters: {
	fontNumber (date) {
	  const length = date.length
	  if (length > 50) {
	    var str = ''
	    str = date.substring(0, 50) + '...'
	    return str
	  } else {
	    return date
	  }
	},
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
@import './start.response.css';
@import './business-card.css';
@import './titlecard.css';
</style>
