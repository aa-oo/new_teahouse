<template>
	<view >
		<view class="metop">
			<view class="hreeng1">
				<view class="hreengtop"></view>	
				<view class="hreengname" >尚虹霖</view>
				<view class="hreengwallat" @click="gobuscard"><b>名片夹</b></view>
				<image class="hreengicon" style="" src="../../static/icon/all.png" @click="gosettings"/>
				<view class="hreenggrape">积分：200</view>
			</view>
		</view>
		<view class="menext">
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
									<!-- <text class="address">{{ item.goods_id }}</text> -->
								</view>
							</view>
							<view class="bot">
								<text>已收到</text>
								<text class="bottext" style="border-bottom:1px solid #81B991 ;color: #81B991;">254530</text>
								<text class="bottext"><span>&yen</span>，来自</text>
								<text class="bottext" style="border-bottom:1px solid #81B991 ;color: #81B991;">53</text>
								<text class="bottext">茶友</text>
								<!-- 已收到<text class="bottext">3000</text>,来自<text class="bottext">4</text>茶友 -->
								<text class="botbtn" @click="addtea" >进入茶桌</text>
							</view>
						</view>
					</view>
				</div>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				title: 1,
				teadetail:'wikimedia是一项全球运动，其使命是将免费的教育内容带给世界。wikimedia是一项全球运动，其使命是将免费的教育内容带给世界。',
				xuqiu:'每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。边框的间隔大一倍。',
				productList: [],
				tabs: ['我发起的', '我参与的'],
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
		background-image: url(../../static/蓝天.jpg);
		border:1px solid #FFFDEF;
		margin-left:5%;
		/* margin-top:90rpx; */
		position:absolute;
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
		flaot:left;
		border-radius:50px;
		width:130rpx;
		text-align: center;
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
</style>
