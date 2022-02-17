<template>
	<view>
		<view class="indetailtop">
			<view class="indetailtop1">
				茶屋名称：
				<text>{{ teaname }}</text>
			</view>
			<view class="indetailtop2">
				茶屋主人：
				<text>{{ hostList.name }}</text>
			</view>
			<view class="indetailtop3">投资详情</view>
			<view class="indetailbottom">
				<scroll-view scroll-y="true" :style="'height:800rpx;'" @scrolltolower="loadmore()">
				
				<view class="indetailbot1" v-for="items in investList">
					<view><image class="investImg" :src="items.userHeadPhoto"></image></view>
					<view class="indetailbot2">{{items.username}}</view>
					<view class="indetailbot3">+{{items.money}}</view>
					<view class="indetailbot4">{{items.createTime|time}}</view>
				</view>
				<!-- 上拉加载 -->
				<view style="display:flex;align-items: center;justify-content: center;padding:20rpx;">
					<text style="color:#9e9e9e">{{loadmsg}}</text>
				</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			teaname: '',
			teapeople: '李静秋',
			host_id: 0,
			tea_id: 0,
			investpage:1,
			loadmsg:'上拉加载更多',
			hostList: [],
			investList: [		
			]
		};
	},
	// onReachBottom() {
	// 	console.log("上拉加载")
	// },
	// onPullDownRefresh() {
	// 	console.log("下拉刷新")
	// 	setTimeout(()=>{
	// 		this.getteaInvest()
	// 		uni.stopPullDownRefresh()
	// 	},2000)
	// },
	onLoad(opt) {
		this.tea_id = opt.tea_id;
		this.teaname = opt.tea_name;
		this.host_id = opt.host_id;
		// uni.getSystemInfo({
		// 	success:res=>{
		// 		this.scrollH =res.windowHeight - uni.upx2px(120);
		// 		console.log(this.scrollH)
		// 	}
		// });
		// console.log(this.host_id)
		this.getteaInvest();
		this.getteaPeople();
	},
	methods: {
		getteaPeople() {
			uni.request({
				url: '/api/user/info',
				method: 'POST',
				header: {
					'content-type': 'application/json',
					authorization: this.$store.state.token
				},
				data: {
					name: '',
					userId: this.host_id
				},
				success: res => {
					console.log('房主信息');
					this.hostList = res.data.obj;
					console.log(this.hostList);
				}
			});
		},
		getteaInvest() {
			uni.request({
				url: '/api/invest/query',
				method: 'GET',
				header: {
					'content-type': 'application/json',
					authorization: this.$store.state.token
				},
				data: {
					rid: this.tea_id,
					page: this.investpage,
					rows: 4,
					sort: 0,
					sortBy: 'create_time'
				},
				success: res => {
					console.log('投资信息');
					this.investList = res.data.items;
					if(res.data.total==0){
						this.loadmsg='暂无投资'
					}
					if(this.investList.length<4){
						this.investpage--;
					}
					
				// this.investList=[...this.investList,...this.investList]
					console.log(this.investList);
				}
			});
		},
		loadmore(){
			this.loadmsg="加载中...";
			setTimeout(()=>{
				this.loadmsg="上拉更新推荐";
				
				this.investpage += 1;
				this.getteaInvest();
			},2000)
		},
	},
	filters: {
		 time:function renderTime(date) {
		    var dateee = new Date(date).toJSON();
		    return (new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')).substring(0,10)
		  },
		}
};
</script>

<style>
.indetailtop {
	width: 96%;
	background-color: #d4e7d9;
	height: 1200rpx;
	margin: 0rpx auto;
	border-radius: 10rpx;
	margin-top: 3%;
	position: absolute;
	margin-left: 2%;
}
.indetailtop1 {
	padding-top: 20rpx;
	/* margin-top:20px; */
	margin-left: 5%;
	/* position: absolute; */
	font-size: 33rpx;
	color: #376042;
}
.indetailtop2 {
	margin-top: 20px;
	margin-left: 5%;
	/* position: absolute; */
	font-size: 33rpx;
	color: #376042;
}
.indetailtop3 {
	margin-top: 20px;
	margin-left: 5%;
	/* position: absolute; */
	font-size: 33rpx;
	color: #376042;
	padding-bottom: 20px;
}
.indetailbottom {
	width: 90%;
	border-radius: 20rpx;
	margin: 3rpx auto;
	height: 800rpx;
	background-color: #ffffff;
	padding-top: 26px;
	overflow: auto;
}
.indetailbot1 {
	width: 80%;
	margin: 10rpx auto;
	height: 60px;
	/* border:1px solid #222222; */
	border-bottom: 2px solid #008000;
	padding: 15px 10px;
	position: relative;
	margin-bottom: 20px;
}
.investImg {
	border-radius: 110rpx;
	width: 150rpx;
	height: 150rpx;
	/* line-height:150rpx; */
	overflow: hidden;
	position: absolute;
	top: -10rpx;
	left: 15rpx;
	position: absolute;
}
.indetailbot2 {
	font-size: 30rpx;
	margin-left: 32%;
	position: absolute;
	width: 90px;
	overflow: hidden;
}
.indetailbot3 {
	font-size: 30rpx;
	float: right;
	position: absolute;
	width: 90px;
	overflow: hidden;
	color: #008000;
	right: 4px;
}
.indetailbot4 {
	font-size: 30rpx;
	margin-left: 32%;
	position: absolute;
	width: 180px;
	overflow: hidden;
	margin-top: 35px;
}
</style>
