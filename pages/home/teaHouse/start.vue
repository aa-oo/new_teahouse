<template>
	<view class="">
		<!-- 这是新首页 -->
		<scroll-view scroll-x style=" width:100%; white-space: nowrap; border-bottom: 1px solid #ffffff;box-shadow: 0px 10px 30px rgba(209, 213, 223, 0.5);background-color:#81b991 ;color:#f5f5f7">
			<view v-for="(item,index) in tabbars" :key="index" :id="'tab'+index" style="display: inline-block !important;padding:auto 60rpx;margin-top:30rpx;margin-left:13%;height:65rpx;text-align: center;"
			 @click="changtab(index)" :scroll-into-view="scoreInto" scroll-with-animation>
			<text :class="tabindex===index?'fontcolor':''" style="padding:10rpx 30rpx;border-radius:5px;">{{item.name}}</text></view>
		</scroll-view>
		
		<swiper :duration="150" :current="tabindex" @change="onchangetab" :style="'height:'+scrollH+'px;'">
			<swiper-item >
				<scroll-view scroll-y="true" :style="'height:'+scrollH+'px;'" @scrolltolower="loadmore()">
					<view >
						<view class="titletop">
							<input class="titleinput" v-model="teaserchs" type="text" placeholder="" />
							<image class="titleicon" @click="teaserch()" style="" src="../../../static/icon/search.png" />
						</view>
						<div class="hm-friend-information-card">
							<view v-for="item in productList">
								<view class="box1">
									<view class="title"><text>{{item.name}}</text></view>
									<view class="mid">
										<image class="primary" v-bind:src="item.photo"></image>
										<view class="side">
											<view class="namClass"><text class="name">{{item.introduce | fontNumber}}</text></view>
										</view>
									</view>
									<view class="bot">
										<text>已收到</text>
										<text class="bottext" style="border-bottom:1px solid #81B991 ;color: #81B991;">{{item.investNum}}</text>
										<text class="bottext"><span>&yen</span>，来自</text>
										<text class="bottext" style="border-bottom:1px solid #81B991 ;color: #81B991;">{{item.invest}}</text>
										<text class="bottext">茶友</text>
										<text class="botbtn" @click="addtea(item.id)">+加入茶桌</text>
									</view>
								</view>
							</view>
						</div>
						<!-- 上拉加载 -->
						<view style="display:flex;align-items: center;justify-content: center;padding:20rpx;">
							<text style="color:#9e9e9e">{{loadmsg}}</text>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item >
				<scroll-view scroll-y="true" :style="'height:'+scrollH+'px;'" @scrolltolower="loadpeople()">
					<view>
						<view class="titletop">
							<input class="titleinput" type="text" v-model="peopleserchs" placeholder="" />
							<image class="titleicon" @click="peoplesearch" src="../../../static/icon/search.png" />
						</view>
						<div class="hm-friend-information-card" >
							<view v-for="item in productList1">
								<view class="box1" style="height:300rpx ;margin-top:25rpx;position: relative" >
									<view class="buscardright"><image class="buscardImg" :src="item.headPhoto" /></view>
									<view class="buscardleft">
										<view class="context1">
											<text style=" border-bottom: 1px solid #81B991;font-size:22px;" @click="gobusCard(item)">{{item.name}}</text>
											<text class="titletext" style="font-size:16px;padding:0.1px 10px;">{{item.address}}</text>
											<image v-if="item.gender ==='男'" class="buscardicon" style="width:50rpx;height:50rpx" src="../../../static/icon/nv1.png" />
											<image  v-if="item.gender ==='女'" class="buscardicon" src="../../../static/icon/女.png" />
										</view>
										<view class="context">
											<image class="buscardicon" style="margin-left: 0;" src="../../../static/icon/company.png" />
											<text class="titletext"style="font-size:16px;">{{item.company}}</text>
										</view>
										<view class="context"><text class="titletext" style="margin-left: 0;">行业：{{item.work}}</text></view>
										<view class="context2">
											<text class="titletext" style="margin-left: 0;">需求：<span>{{item.need | fontxuqiu}}</span></text>
										</view>
									</view>
								</view>
							</view>
						</div>
						<view style="display:flex;align-items: center;justify-content: center;padding:20rpx;">
							<text style="color:#9e9e9e">{{loadmsg}}</text>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item >
				<scroll-view scroll-y="true" :style="'height:'+scrollH+'px;'">
					<view >
						<view class="titlebox">
							<view class="titletop">
								<input class="titleinput" type="text" placeholder="" />
								<image class="titleicon" style="" src="../../../static/icon/search.png" />
							</view>
							<card class="titlecard" :articalList="articalList"></card>
							
						</view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
		
		
		<!-- 这是首页 -->
	<!-- 	<view class="box">
			<uni-segmented-control
				:current="tab_current"
				:values="tabs"
				@clickItem="onClickItem"
				style-type="text"
				active-color="#81b991"
				background-color="#81b991"
				
			></uni-segmented-control>
			<view class="content" >
				<view v-show="tab_current === 0">
					<view class="titletop">
						<input class="titleinput" type="text" placeholder="" />
						<image class="titleicon" style="" src="../../../static/icon/search.png" />
					</view>
					<div class="hm-friend-information-card">
						<view v-for="item in productList">
							<view class="box1">
								<view class="title"><text>维基媒体基金会</text></view>
								<view class="mid">
									<image class="primary" :src="item.image_src" />
									<view class="side">
										<view class="namClass"><text class="name">{{teadetail | fontNumber}}</text></view>
									</view>
								</view>
								<view class="bot">
									<text>已收到</text>
									<text class="bottext" style="border-bottom:1px solid #81B991 ;color: #81B991;">3000</text>
									<text class="bottext"><span>&yen</span>，来自</text>
									<text class="bottext" style="border-bottom:1px solid #81B991 ;color: #81B991;">4</text>
									<text class="bottext">茶友</text>
									<text class="botbtn" @click="addtea(item.goods_id)" >+加入茶桌</text>
								</view>
							</view>
						</view>
					</div>
				</view>
			</view>
			<view v-show="tab_current === 1">
				<view class="titletop">
					<input class="titleinput" type="text" placeholder="" />
					<image class="titleicon" style="" src="../../../static/icon/search.png" />
				</view>
				<div class="hm-friend-information-card" >
					<view v-for="item in productList">
						<view class="box1" style="height:300rpx ;margin-top:25rpx;position: relative" >
							<view class="buscardright"><image class="buscardImg" :src="item.image_src" /></view>
							<view class="buscardleft">
								<view class="context1">
									<text class="" style=" border-bottom: 1px solid #81B991;font-size:22px;" @click="gobusCard">Easter</text>
									<text class="titletext" style="font-size:16px;padding:0.1px 10px;">上海</text>
									<image v-if="sexchoose" class="buscardicon" src="../../../static/icon/nv1.png" />
									<image v-if="!sexchoose" class="buscardicon" src="../../../static/icon/女.png" />
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
	 -->
	 
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
			scrollH:600,
			title: 1,
			teadetail:'wikimedia是一项全球运动，其使命是将免费的教育内容带给世界。wikimedia是一项全球运动，其使命是将免费的教育内容带给世界。',
			xuqiu:'每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。边框的间隔大一倍。',
			productList: [],
			productList1: [],
			articalList: [],
			tabs: ['茶屋', '名片', '文章'],
			tabbars:[{
				name:"茶屋",
			},{
				name:"名片",
			},{
				name:"文章",
			}],
			teaserchs:'',
			teaserches:'',
			peopleserchs:'',
			peopleserches:'',
			tab_current: 0,
			disk_list: [],
			showPass: false,
			form_network_disk: {
				username: '',
				password: '',
				path: '',
			},
			sexchoose:'男',
			scoreInto:'',
			tabindex:0,
			loadmsg:'上拉加载更多',
			teapage:1,
			articalpage:1,
			peopage:1,
			peopledetails:''
		};
	},
	onLoad() {
		// console.log(getApp().globalData.tabindex);
		// this.$store.commit('changeLoginStatus',123)
		console.log(this.$store.state.loginStatus);
		this.getteaHouse();
		this.getteaPeople();
		this.getteaArtical();
		uni.getSystemInfo({
			success:res=>{
				this.scrollH =res.windowHeight - uni.upx2px(120);
			}
		});
		this.teapage = 1;
	},
	onPullDownRefresh() {
		
	},
	methods: {
		getteaHouse(){
			uni.request({
				// url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',this.$store.state.ip+
				url:'/api/tearoom/list',
				method:'GET',
				header:{
					'content-type':"application/json",
					'authorization':''
				},
				data: {
				    key:this.teaserches,
					page:this.teapage,
					rows:5,
				},
				success: res => {
					// console.log(JSON.stringify(res));
					this.productList = res.data.items;
					if(this.productList.length<5){
						this.teapage--;
					}
					console.log('茶桌名片');
					console.log(this.productList);
				}
			});
		},
		getteaPeople(){
			uni.request({
				url:'/api/user/list',
				method:'GET',
				header:{
					'content-type':"application/json",
					'authorization':''
				},
				data: {
				    key:this.peopleserches,
					name:'',
				    page:this.peopage,
				    rows:5,
				},
				success: res => {
					// console.log(JSON.stringify(res));
					this.productList1 = res.data.items;
					if(this.productList1.length<5){
						this.peopage--;
					}
					console.log('个人名片');
					console.log(this.productList1);
				}
			});
		},
		getteaArtical(){
			uni.request({
				url:'/api/paper/list',
				method:'GET',
				header:{
					'content-type':"application/json",
					'authorization':''
				},
				data: {
				    key:'',
					name:'',
				    page:this.articalpage,
				    rows:5,
				},
				success: res => {
					// console.log(JSON.stringify(res));
					console.log('artical如下')
					this.articalList = res.data.items;
					console.log(this.articalList);
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
		gobusCard(item) {
			this.checkAuth(()=>{
				this.peopledetails=item.id;
				// console.log(this.peopledetails)
				uni.navigateTo({
					url:'../business-card/business-card?detail='+JSON.stringify(this.peopledetails),
				})
			})
			
		},
		addtea(id) {
			console.log(this.$store.state.token);
			this.checkAuth(()=>{
				console.log(id)
				uni.navigateTo({
					url:'../../built-tea-house/teatable?tea_id='+id
				// url:'../../chat/view/pangugle-chat'
				})
			})
			
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
		},
		loadmore(){
			this.loadmsg="加载中...";
			setTimeout(()=>{
				this.loadmsg="上拉更新推荐";
				this.teapage += 1;
				this.getteaHouse();
			},2000)
		},
		loadpeople(){
			this.loadmsg="加载中...";
			setTimeout(()=>{
				this.loadmsg="上拉更新推荐";
				this.peopage += 1;
				this.getteaPeople();
			},2000)
		},
		teaserch(){
			if(this.teaserchs==''){
				this.teapage = 1;
				this.teaserches ='';
				this.getteaHouse();
			}
			else{
				this.teapage = 1;
				this.teaserches = this.teaserchs;
				this.getteaHouse();
			}
			// this.teaserches =''
		},
		peoplesearch(){
			if(this.peopleserchs==''){
				this.peopage = 1;
				this.peopleserches ='';
				this.getteaPeople();
			}
			else{
				this.peopage = 1;
				this.peopleserches = this.peopleserchs;
				this.getteaPeople();
			}
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
