<template>
	<view >
		<view class="metop">
			<view class="hreeng1" v-if="loginsta">
				<view class="hreengtop">
					<image class="hreengtop1" src="../../static/img/im/face/face_11.jpg"></image>
				</view>	
				<view class="hreengname" >尚虹霖</view>
				<view class="hreengwallat" @click="gobuscard"><b>名片夹</b></view>
				<image class="hreengicon" style="" src="../../static/icon/all.png" @click="gosettings"/>
				<view class="hreenggrape" @click="grades">积分：200</view>
			</view>
			<view class="hreeng1" v-if="!loginsta">
				<view class="hreenglogin" @click="golog">手机登录</view>
			</view>
		</view>
		<view style=" display:flex; justify-content: center;">
			<view class="rounded " style="background-color:#1d1d1f; display: flex; flex-direction:column;align-items: center; justify-content:center; font-size: 28rpx;">
				<text style="color:#FFFDEF;">Dre@mTech工作组期待您的加入</text>
				<text style="color:#81b991; padding-top:7px">广告加盟请联系微信Shreeng</text>
			</view>
			<!-- <image src="../../static/广告.jpg" mode="aspectFill" class="rounded "></image> -->
		</view>
		<!-- 我的选项卡 -->
		<view class="menextnew">
			<scroll-view scroll-x style=" width:100%; white-space: nowrap; border-bottom: 2px solid #b9b9b9;box-shadow: 0px 10px 30px rgba(209, 213, 223, 0.5);">
				<view v-for="(item,index) in tabbars" :key="index" :id="'tab'+index" style="display: inline-block !important;padding:20rpx 20rpx;padding-top:30rpx;height:50rpx;margin-left:3%"
				 :class="tabindex===index?'fontcolor':''" @click="changtab(index)" :scroll-into-view="scoreInto" scroll-with-animation>
				{{item.name}}</view>
			</scroll-view>
			 
			<swiper :duration="150" :current="tabindex" @change="onchangetab" :style="'height:'+scrollH+'px;'">
				<!-- <swiper-item v-for="(item,index) in tabbars" :key="index">
					<view class="swiper-item">{{item.name}}</view>
				</swiper-item> -->
				<swiper-item  >
					<scroll-view scroll-y="true" :style="'height:'+scrollH+'px;'" >
						<view>
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
											<text class="botbtn" @click="addtea" >进入茶桌</text>
										</view>
									</view>
								</view>
							</div>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item >
					<scroll-view scroll-y="true" :style="'height:'+scrollH+'px;'" >
					<view>
						<div class="hm-friend-information-card" >
							<view v-for="item in productList">
								<view class="box1">
									<view class="title"><text>Dre@mTech工作室</text></view>
									<view class="mid">
										<image class="primary" :src="item.image_src" />
										<view class="side">
											<view class="namClass"><text class="name">{{teadetail | fontNumber}}</text></view>
										</view>
									</view>
									<view class="bot">
										<text>已收到</text>
										<text class="bottext" style="border-bottom:1px solid #81B991 ;color: #81B991;">254530</text>
										<text class="bottext"><span>&yen</span>，来自</text>
										<text class="bottext" style="border-bottom:1px solid #81B991 ;color: #81B991;">53</text>
										<text class="bottext">茶友</text>
										<text class="botbtn" @click="addtea" >进入茶桌</text>
									</view>
								</view>
							</view>
						</div>
					</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		
		
		
		
		
		
		<!-- 分段器选项卡 -->
		<!-- <view class="menext">
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
									</view>
								</view>
								<view class="bot">
									<text>已收到</text>
									<text class="bottext" style="border-bottom:1px solid #81B991 ;color: #81B991;">3000</text>
									<text class="bottext"><span>&yen</span>，来自</text>
									<text class="bottext" style="border-bottom:1px solid #81B991 ;color: #81B991;">4</text>
									<text class="bottext">茶友</text>
									<text class="botbtn" @click="addtea" >进入茶桌</text>
								</view>
							</view>
						</view>
					</div>
				</view>
			</view>
			<view v-show="tab_current === 1">
				<div class="hm-friend-information-card" >
					<view v-for="item in productList">
						<view class="box1">
							<view class="title"><text>Dre@mTech工作室</text></view>
							<view class="mid">
								<image class="primary" :src="item.image_src" />
								<view class="side">
									<view class="namClass"><text class="name">{{teadetail | fontNumber}}</text></view>
								</view>
							</view>
							<view class="bot">
								<text>已收到</text>
								<text class="bottext" style="border-bottom:1px solid #81B991 ;color: #81B991;">254530</text>
								<text class="bottext"><span>&yen</span>，来自</text>
								<text class="bottext" style="border-bottom:1px solid #81B991 ;color: #81B991;">53</text>
								<text class="bottext">茶友</text>
								<text class="botbtn" @click="addtea" >进入茶桌</text>
							</view>
						</view>
					</view>
				</div>
			</view>
		</view> -->
	</view>
</template>

<script>
	export default{
		data() {
			return {
				//窗体高度
				scrollH:600,
				title: 1,
				teadetail:'wikimedia是一项全球运动，其使命是将免费的教育内容带给世界。wikimedia是一项全球运动，其使命是将免费的教育内容带给世界。',
				xuqiu:'每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。边框的间隔大一倍。',
				productList: [],
				tabs: ['我发起的', '我参与的'],
				tabbars:[{
					name:"我发起的",
				},{
					name:"我参与的",
				}
				],
				tabindex:0,
				tab_current: 0,
				disk_list: [],
				showPass: false,
				loginsta: true,
				form_network_disk: {
					username: '',
					password: '',
					path: ''
				},
				scoreInto:'',
			};
		},
		onLoad() {
			// console.log(getApp().globalData.tabindex);
			this.getteaHouse();
			uni.getSystemInfo({
				success:res=>{
					this.scrollH =res.windowHeight - uni.upx2px(600);
					console.log(this.scrollH)
				}
			})
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
				gosettings() {
					uni.navigateTo({
						url:'./mesetting'
					})
				},
				addtea(){
					uni.redirectTo({
						url:'../built-tea-house/teatable'
					})
				},
				gobuscard(){
					uni.navigateTo({
						url:'./me-buscard'
					})
				},
				grades(){
					uni.showToast({
						title: '积分功能暂未开启',
						icon:'none'
					});
				},
				golog(){
					uni.navigateTo({
						url:'../index/login'
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
	}
</script>

<style>
	@import './start.response.css';
	.metop{
		width:100%;
		height:280rpx;
		background-image:url(../../static/backsolo.png);
		position:relative;
		background-size: 100% auto;
		background-position: center;
	}
	.hreeng1{
		/* border:1px solid red; */
		position:absolute;
		/* float:left; */
		width:100%;
		height:180rpx;
		margin-top:100rpx;
	}
	.hreengtop{
		width:150rpx;
		height:150rpx;
		border-radius: 50%;
		/* background-image: url(../../static/蓝天.jpg); */
		border:2px solid #FFFDEF;
		margin-left:5%;
		/* margin-top:90rpx; */
		position:absolute;
	}
	.hreengtop1{
		width:150rpx;
		height:150rpx;
		border-radius: 50%;
	}
	.hreengname{
		font-size:35rpx;
		color:#FFFDEF;
		margin-top:30rpx;
		position:absolute;
		margin-left:30%;
		flaot:left;
	}
	.hreengwallat{
		font-size:28rpx;
		color:#4dbc5d;
		background-color: #FFFDEF;
		margin-top:35rpx;
		position:absolute;
		margin-left:50%;
		/* float:left; */
		border-radius:50px;
		width:130rpx;
		text-align: center;
	}
	.hreenglogin{
		font-size:38rpx;
		color:#4dbc5d;
		background-color: #FFFDEF;
		margin-left:30%;
		position:absolute;
		border-radius:50px;
		width:280rpx;
		height:80rpx;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.hreenggrape{
		font-size:28rpx;
		color:#FFFDEF;
		margin-top:90rpx;
		position:absolute;
		margin-left:30%;
		flaot:left;
	}
	.hreengicon{
		border-radius: 110rpx;
		width: 70rpx;
		height: 70rpx;
		overflow: hidden;
		position: absolute;
		/* float:right; */
		margin-top:20rpx;
		margin-left:85%;
		/* top:-40rpx; */
		/* right:35rpx; */
	}
	.rounded{
		height:170rpx; 
		width:95%;
		border-radius: 10px;
		margin:0px auto;
		margin-top:10px;
	},
	.fontcolor{
		color:#4dbc5d;
		border-bottom:3px solid #4dbc5d;
	}
</style>
