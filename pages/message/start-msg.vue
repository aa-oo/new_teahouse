<template>
	<view class="">
		<!-- 这是滑动板消息列表-->
		<scroll-view scroll-x style=" width:100%; white-space: nowrap; border-bottom: 1px solid #ffffff;box-shadow: 0px 10px 30px rgba(209, 213, 223, 0.5);background-color:#81b991 ;color:#f5f5f7">
			<view v-for="(item,index) in tabbars" :key="index" :id="'tab'+index" style="display: inline-block !important;padding:auto 60rpx;margin-top:30rpx;margin-left:7%;height:65rpx;text-align: center;"
			 @click="changtab(index)" :scroll-into-view="scoreInto" scroll-with-animation>
			<text :class="tabindex===index?'fontcolor':''" style="padding:10rpx 30rpx;;border-radius:5px;">{{item.name}}</text></view>
		</scroll-view>
		
		<swiper :duration="150" :current="tabindex" @change="onchangetab" :style="'height:'+scrollH+'px;'">
			<swiper-item>
				<scroll-view scroll-y="true" :style="'height:'+scrollH+'px;'">
					<view>
						<view class="uni-list">
							<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item, index) in dataList" @click="jumpToTargetView(item)">
								<view class="uni-media-list ">
									<view class="uni-media-list-logo">
										<image class="listimg" src="../../static/pg_def_avatar.png"></image>
									</view>
									<view class="uni-media-list-body ">
										<view class="uni-media-list-text-top uni-ellipsis">{{ item.title }}</view>
										<view class="uni-media-list-text-bottom uni-ellipsis">{{ item.content }}</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y="true" :style="'height:'+scrollH+'px;'">
					<view>
						<div class="hm-friend-information-card">
							<view v-for="item in productList">
								<view class="box1" style="height:250rpx ;margin-top: 30rpx;position: relative">
									<view class="buscardright"><button class="msgadd" type="default" @click="addfriend">添加</button></view>
									<view class="buscardleft">
										<view class="context1">
											<text class="" style="font-size:22px;" >Easter</text>
											<text class="titletext" style="font-size:16px;padding:0.1px 10px;">上海</text>
											<image class="buscardicon" src="../../static/icon/nv1.png" />
										</view>
										<view class="context"><text class="titletext" style="margin-left: 0;">行业：电子商务</text></view>
										<view class="context2">
											<text class="titletext" style="margin-left: 0;">
												需求：
												<span>{{ xuqiu | fontxuqiu }}</span>
											</text>
										</view>
									</view>
								</view>
							</view>
						</div>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y="true" :style="'height:'+scrollH+'px;'">
					<view>
						<div class="hm-friend-information-card">
							<view v-for="item in productList">
								<view class="box1" style="height:230rpx ;margin-top: 30rpx;position: relative">
									<view class="buscardright"><button class="msgadd" type="default" @click="addfriend">同意</button></view>
									<view class="buscardleft">
										<view class="context1" style="margin-top:30rpx ;">
											<text class="" style="font-size:22px;" >Easter</text>	
										</view>
										<view class="context"><text class="titletext" style="margin-left: 0;">请求加入：dt分公司的故事</text></view>
									</view>
								</view>
							</view>
						</div>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
		
		
		
		
		
		<!-- 这是首页 -->
		<view class="box" v-if="show">
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
					<!-- 列表 key 在wx不行，但是这里必须唯一 -->
					<view class="uni-list">
						<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item, index) in dataList" @click="jumpToTargetView(item)">
							<view class="uni-media-list ">
								<view class="uni-media-list-logo">
									<image class="listimg" src="../../static/pg_def_avatar.png"></image>
									<!-- <text class="sp">1</text> -->
								</view>
								<view class="uni-media-list-body ">
									<view class="uni-media-list-text-top uni-ellipsis">{{ item.title }}</view>
									<view class="uni-media-list-text-bottom uni-ellipsis">{{ item.content }}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view v-show="tab_current === 1">
				<div class="hm-friend-information-card">
					<view v-for="item in productList">
						<view class="box1" style="height:250rpx ;margin-top: 30rpx;position: relative">
							<view class="buscardright"><button class="msgadd" type="default" @click="addfriend">添加</button></view>
							<view class="buscardleft">
								<view class="context1">
									<text class="" style="font-size:22px;" >Easter</text>
									<text class="titletext" style="font-size:16px;padding:0.1px 10px;">上海</text>
									<image class="buscardicon" src="../../static/icon/nv1.png" />
								</view>
								<view class="context"><text class="titletext" style="margin-left: 0;">行业：电子商务</text></view>
								<view class="context2">
									<text class="titletext" style="margin-left: 0;">
										需求：
										<span>{{ xuqiu | fontxuqiu }}</span>
									</text>
								</view>
							</view>
						</view>
					</view>
				</div>
			</view>
			<view v-show="tab_current === 2">
				<div class="hm-friend-information-card">
					<view v-for="item in productList">
						<view class="box1" style="height:230rpx ;margin-top: 30rpx;position: relative">
							<view class="buscardright"><button class="msgadd" type="default" @click="addfriend">同意</button></view>
							<view class="buscardleft">
								<view class="context1" style="margin-top:30rpx ;">
									<text class="" style="font-size:22px;" >Easter</text>	
								</view>
								<view class="context"><text class="titletext" style="margin-left: 0;">请求加入：dt分公司的故事</text></view>
							</view>
						</view>
					</view>
				</div>
			</view>
		</view>
	</view>
</template>
<script>
import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue';

export default {
	components: {
		uniSegmentedControl
	},
	data() {
		return {
			scrollH:600,
			tabindex:0,
			scoreInto:'',
			dataList: [],
			tabs: ['消息列表', '好友请求', '茶屋请求'],
			tabbars:[{
				name:"消息列表",
			},{
				name:"好友请求",
			},{
				name:"茶屋请求",
			}],
			tab_current: 0,
			xuqiu: '每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。边框的间隔大一倍。',
			productList: [],
			form_network_disk: {
				username: '',
				password: '',
				path: ''
			},
			show:false,
			
		};
	},
	onLoad() {
		//this.getteaHouse()
		this.dataList = [{ title: '张三', content: '在哪里啊？' }, { title: '李四', content: '天气怎么这么热啊？' }, { title: '王五', content: '什么情况？' }];
		uni.getSystemInfo({
			success:res=>{
				this.scrollH =res.windowHeight - uni.upx2px(120);
				console.log(this.scrollH)
			}
		});
		// 好友请求和茶屋请求
		uni.request({
			url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
			success: res => {
				this.productList = res.data.message;
				console.log(this.productList);
			}
		});
	},
	methods: {
		// getteaHouse(){
		// 	uni.request({
		// 		url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
		// 		success: res => {
		// 			this.productList = res.data.message;
		// 			console.log(this.productList);
		// 		}
		// 	});
		// },
		jumpToTargetView(item) {
			uni.navigateTo({
				url: '../chat/view/pangugle-chat'
			});
		},
		onClickItem(e) {
			this.tab_current = e.currentIndex;
			if (e.currentIndex == 0) {
			}
			if (e.currentIndex == 1) {
				uni.request({
					url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
					success: res => {
						this.productList = res.data.message;
						console.log(this.productList);
					}
				});
			}
		},
		addfriend(){
		},
		changtab(index){
			if(this.tabindex ===index){
				return;
			}
			this.tabindex =index;
			this.scoreInto='tab'+index;
		},
		onchangetab(e){
			this.changtab(e.detail.current)
		}
	},
	filters: {
		fontNumber(date) {
			const length = date.length;
			if (length > 50) {
				var str = '';
				str = date.substring(0, 50) + '...';
				return str;
			} else {
				return date;
			}
		},
		fontxuqiu(date) {
			const length = date.length;
			if (length > 38) {
				var str = '';
				str = date.substring(0, 38) + '...';
				return str;
			} else {
				return date;
			}
		}
	}
};
</script>
<style>
@import '../home/teaHouse/start.response.css';
@import '../home/teaHouse/business-card.css';
.msgadd{
	border-radius: 10rpx;
	width: 180rpx;
	height: 70rpx;
	overflow: hidden;
	position: absolute;
	top:20rpx;
	right:35rpx;
	font-size:28rpx ;
	text-align: center;
	/* background-color: #81B991; */
	/* background-color: #0088cc; #ee9f00*/
	background-color:rgb(240, 173, 78) ; 
	line-height: 70rpx;
	color:white;
}
.flex-item {
	width: 33.3%;
	height: 100px;
	text-align: center;
	line-height: 100px;
}

.uni-media-list-logo {
	height: 48px;
	width: 48px;
	position: relative;
}

.uni-media-list-text-top {
	padding-top: 5px;
}
.uni-media-list-text-bottom {
	padding-top: 2px;
}

.sp {
	position: absolute;
	right: -6px;
	background-color: #f95454;
	color: #fff;
	font-size: 12px;
	width: 19px;
	height: 19px;
	line-height: 19px;
	text-align: center;
	border-radius: 50%;
	top: -7px;
}
/* 列表 */
.uni-list {
	background-color: #ffffff;
	position: relative;
	width: 100%;
	display: -webkit-box;
	display: -webkit-flex;
	display: flex;
	-webkit-box-orient: vertical;
	-webkit-box-direction: normal;
	-webkit-flex-direction: column;
	flex-direction: column;
}
.uni-list:after {
	position: absolute;
	z-index: 10;
	right: 0;
	bottom: 0;
	left: 15px;
	height: 1px;
	content: '';
	-webkit-transform: scaleY(0.5);
	transform: scaleY(0.5);
	background-color: #c8c7cc;
}
.uni-list::before {
	position: absolute;
	z-index: 10;
	right: 0;
	top: 0;
	left: 0;
	height: 1px;
	content: '';
	-webkit-transform: scaleY(0.5);
	transform: scaleY(0.5);
	background-color: #c8c7cc;
}
.uni-list-cell {
	position: relative;
	display: -webkit-box;
	display: -webkit-flex;
	display: flex;
	-webkit-box-orient: horizontal;
	-webkit-box-direction: normal;
	-webkit-flex-direction: row;
	flex-direction: row;
	-webkit-box-pack: justify;
	-webkit-justify-content: space-between;
	justify-content: space-between;
	-webkit-box-align: center;
	-webkit-align-items: center;
	align-items: center;
}
.uni-list-cell-hover {
	background-color: #eee;
}

.uni-list-cell::after {
	position: absolute;
	z-index: 3;
	right: 0;
	bottom: 0;
	left: 15px;
	height: 1px;
	content: '';
	-webkit-transform: scaleY(0.5);
	transform: scaleY(0.5);
	background-color: #c8c7cc;
}
.uni-list .uni-list-cell:last-child::after {
	height: 0px;
}
.uni-list-cell-last.uni-list-cell::after {
	height: 0px;
}

/* 图文列表 */
.uni-media-list {
	padding: 11px 15px;
	box-sizing: border-box;
	display: -webkit-box;
	display: -webkit-flex;
	display: flex;
	width: 100%;
	-webkit-box-orient: horizontal;
	-webkit-box-direction: normal;
	-webkit-flex-direction: row;
	flex-direction: row;
}

.uni-media-list-logo {
	height: 42px;
	width: 42px;
	margin-right: 10px;
}
.uni-media-list-logo uni-image {
	height: 100%;
	width: 100%;
}
.uni-media-list-body {
	height: 42px;
	display: -webkit-box;
	display: -webkit-flex;
	display: flex;
	-webkit-box-flex: 1;
	-webkit-flex: 1;
	flex: 1;
	-webkit-box-orient: vertical;
	-webkit-box-direction: normal;
	-webkit-flex-direction: column;
	flex-direction: column;
	-webkit-box-pack: justify;
	-webkit-justify-content: space-between;
	justify-content: space-between;
	-webkit-box-align: start;
	-webkit-align-items: flex-start;
	align-items: flex-start;
	overflow: hidden;
}
.uni-media-list-text-top {
	width: 100%;
	line-height: 18px;
	font-size: 15px;
}
.uni-media-list-text-bottom {
	width: 100%;
	line-height: 15px;
	font-size: 13px;
	color: #8f8f94;
}
.fontcolor{
		color:#81b991;
		background-color:#f5f5f7;
		font-weight:500;
	}
</style>
