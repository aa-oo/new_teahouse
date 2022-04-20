<template>
	<view class="">
		<!-- 这是新首页 -->
		<scroll-view
			scroll-x
			style=" width:100%; white-space: nowrap; border-bottom: 1px solid #ffffff;box-shadow: 0px 10px 30px rgba(209, 213, 223, 0.5);background-color:#81b991 ;color:#f5f5f7"
		>
			<view
				v-for="(item, index) in tabbars"
				:key="index"
				:id="'tab' + index"
				style="display: inline-block !important;padding:auto 60rpx;margin-top:30rpx;margin-left:13%;height:65rpx;text-align: center;"
				@click="changtab(index)"
				:scroll-into-view="scoreInto"
				scroll-with-animation
			>
				<text :class="tabindex === index ? 'fontcolor' : ''" style="padding:10rpx 30rpx;border-radius:5px;">{{ item.name }}</text>
			</view>
		</scroll-view>

		<swiper :duration="150" :current="tabindex" @change="onchangetab" :style="'height:' + scrollH + 'px;'">
			<swiper-item>
				<scroll-view scroll-y="true" :style="'height:' + scrollH + 'px;'" @scrolltolower="loadmore()">
					<view>
						<view class="titletop">
							<input class="titleinput" v-model="teaserchs" type="text" placeholder="" />
							<image class="titleicon" @click="teaserch()" style="" src="../../../static/icon/search.png" />
						</view>
						<div class="hm-friend-information-card">
							<view v-for="item in productList">
								<view class="box1">
									<view class="title">
										<text>{{ item.name }}</text>
									</view>
									<view class="mid">
										<image class="primary" v-bind:src="item.photo"></image>
										<view class="side">
											<view class="namClass">
												<text class="name">{{ item.introduce | fontNumber }}</text>
											</view>
										</view>
									</view>
									<view class="bot">
										<text>已收到</text>
										<text class="bottext" style="border-bottom:1px solid #81B991 ;color: #81B991;">{{ item.invest}}</text>
										<text class="bottext">
											<span>&yen</span>
											<span>，来自</span>
										</text>
										<text class="bottext" style="border-bottom:1px solid #81B991 ;color: #81B991;">{{ item.investNum  }}</text>
										<text class="bottext">茶友</text>
										<text class="botbtn" @click="addtea(item)">+加入茶桌</text>
									</view>
								</view>
							</view>
						</div>
						<!-- 上拉加载 -->
						<view style="display:flex;align-items: center;justify-content: center;padding:20rpx;">
							<text style="color:#9e9e9e">{{ loadmsg }}</text>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y="true" :style="'height:' + scrollH + 'px;'" @scrolltolower="loadpeople()">
					<view>
						<view class="titletop">
							<input class="titleinput" type="text" v-model="peopleserchs" placeholder="" />
							<image class="titleicon" @click="peoplesearch" src="../../../static/icon/search.png" />
						</view>
						<div class="hm-friend-information-card">
							<view v-for="item in productList1">
								<view class="box1" style="height:300rpx ;margin-top:25rpx;position: relative">
									<view class="buscardright"><image class="buscardImg" :src="item.headPhoto" /></view>
									<view class="buscardleft">
										<view class="context1">
											<text style=" border-bottom: 1px solid #81B991;font-size:22px;" @click="gobusCard(item)">{{ item.name }}</text>
											<text class="titletext" style="font-size:16px;padding:0.1px 10px;">{{ item.address }}</text>
											<image v-if="item.gender === '男'" class="buscardicon" style="width:50rpx;height:50rpx" src="../../../static/icon/nv1.png" />
											<image v-if="item.gender === '女'" class="buscardicon" src="../../../static/icon/newnv.png" />
										</view>
										<view class="context">
											<image class="buscardicon" style="margin-left: 0;" src="../../../static/icon/company.png" />
											<text class="titletext" style="font-size:16px;">{{ item.company }}</text>
										</view>
										<view class="context">
											<text class="titletext" style="margin-left: 0;">行业：{{ item.work }}</text>
										</view>
										<view class="context2">
											<text class="titletext" style="margin-left: 0;">
												<span>需求：</span>
												<span>{{ item.need | fontxuqiu }}</span>
											</text>
										</view>
									</view>
								</view>
							</view>
						</div>
						<view style="display:flex;align-items: center;justify-content: center;padding:20rpx;">
							<text style="color:#9e9e9e">{{ loadmsg }}</text>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y="true" :style="'height:' + scrollH + 'px;'" @scrolltolower="loadarticle()">
					<view>
						<view class="titletop">
							<input class="titleinput" type="text" v-model="articleserchs" placeholder="" />
							<image class="titleicon" @click="articlesearch" src="../../../static/icon/search.png" />
						</view>
							<div class="hm-friend-information-card">
									<view class="box1" v-for="item in articleList" style="height: 290rpx;">
										<view class="title"><text style="display: table-cell; border-bottom: 1px solid #81B991;font-size:20px;" @click="goArticle(item)">{{item.name}}</text></view>
										<view class="contents">
											<!-- 导读： -->
											{{item.content | fontNumber}}
											<!-- <text class="guild"></text> -->
										</view>
									</view>
									
							</div>
						<!-- <card class="titlecard" :articleList="articleList"></card> -->

						<!-- 上拉加载 -->
						<view style="display:flex;align-items: center;justify-content: center;padding:20rpx;">
							<text style="color:#9e9e9e">{{ loadmsg }}</text>
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
import { mapState } from 'vuex';
import card from '@/components/card/card.vue';
import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue';
export default {
	components: {
		card,
		uniSegmentedControl
	},
	computed: {
		...mapState({
			user: state => state.user
		})
	},
	data() {
		return {
			scrollH: 600,
			title: 1,
			teadetail: 'wikimedia是一项全球运动，其使命是将免费的教育内容带给世界。wikimedia是一项全球运动，其使命是将免费的教育内容带给世界。',
			xuqiu: '每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。边框的间隔大一倍。',
			productList: [],
			productList1: [],
			articleList: [],
			tabs: ['茶屋', '名片', '文章'],
			tabbars: [
				{
					name: '茶屋'
				},
				{
					name: '名片'
				},
				{
					name: '文章'
				}
			],
			isin: false,
			teaserchs: '',
			teaserches: '',
			peopleserchs: '',
			peopleserches: '',
			articleserchs: '',
			articleserches: '',
			tab_current: 0,
			disk_list: [],
			showPass: false,
			form_network_disk: {
				username: '',
				password: '',
				path: ''
			},
			sexchoose: '男',
			scoreInto: '',
			tabindex: 0,
			loadmsg: '上拉加载更多',
			teapage: 1,
			articlepage: 1,
			peopage: 1,
			peopledetails: ''
		};
	},
	onShow() {
		this.getteaHouse();
		this.getteaArticle();
	},
	onLoad() {
		// console.log(getApp().globalData.tabindex);
		// this.$store.commit('changeLoginStatus',123)
		// console.log(this.$store.state.loginStatus);

		uni.getSystemInfo({
			success: res => {
				this.scrollH = res.windowHeight - uni.upx2px(120);
			}
		});
		this.getteaHouse();
		this.getteaPeople();
		this.getteaArticle();
		// this.teapage = 1;
	},
	onPullDownRefresh() {},
	methods: {
		// async getteaHouse(){

		// 	let res=await this.$H.get('/tearoom/list',{key:this.teaserches,
		// 	page:this.teapage,rows:5})

		// 	this.productList = res.items;
		// 	if(this.productList.length<5){
		// 		this.teapage--;
		// 	}
		// 	console.log("aa")
		// 	console.log(res)
		// },
		getteaHouse() {
			uni.request({
				// url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',this.$store.state.ip+
				url: 'http://101.34.137.197/tearoom/list',
				method: 'GET',
				header: {
					'content-type': 'application/json',
					authorization: ''
				},
				data: {
					key: this.teaserches,
					name:'',
					page: this.teapage,
					rows: 5
					
				},
				success: res => {
					// console.log(JSON.stringify(res));
					this.productList = res.data.items;
					if (this.productList.length < 5) {
						this.teapage--;
					}
					console.log('茶桌名片');
					console.log(this.productList);
					// console.log(this.productList[0].name)
				}
			});
		},
		getteaPeople() {
			uni.request({
				url: 'http://101.34.137.197/user/list',
				method: 'GET',
				header: {
					'content-type': 'application/json',
					authorization: ''
				},
				data: {
					key: this.peopleserches,
					// name: '',
					page: this.peopage,
					rows: 5
				},
				success: res => {
					// console.log(JSON.stringify(res));
					this.productList1 = res.data.items;
					if (this.productList1.length < 5) {
						this.peopage--;
					}
					console.log('个人名片');
					console.log(this.productList1);
				}
			});
		},
		getteaArticle() {
			uni.request({
				url: 'http://101.34.137.197/paper/list',
				method: 'GET',
				header: {
					'content-type': 'application/json',
					authorization: ''
				},
				data: {
					key: this.articleserches,
					page: this.articlepage,
					rows: 5
				},
				success: res => {
					// console.log(JSON.stringify(res));
					console.log('article如下');
					this.articleList = res.data.items;

					if (this.articleList.length < 5) {
						this.articlepage--;
					}
					console.log(res.data);
				}
			});
		},
		onClickItem(e) {
			this.tab_current = e.currentIndex;
			if (e.currentIndex == 0) {
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
			this.checkAuth(() => {
				this.peopledetails = item.id;
				console.log(this.peopledetails);
				uni.navigateTo({
					url: '../business-card/business-card?detail=' + JSON.stringify(this.peopledetails)
				});
			});
		},
		goArticle(item){
			this.articledetails=item.id;
			this.navigateTo({	
				url:'../article/article?detail='+JSON.stringify(this.articledetails)
			})
		},
		// isinroom(id) {
		// 	uni.request({
		// 		url: ' /api/tearoom/inroom',
		// 		method: 'POST',
		// 		header: {
		// 			'content-type': 'application/json',
		// 			authorization: this.$store.state.token
		// 		},
		// 		data: {
		// 			roomId: id,
		// 			name: ''
		// 		},
		// 		success: res => {
				
		// 			console.log('是否在该茶屋内');
		// 			this.isin = res.data;
		// 			console.log(this.isin);
		// 		}
		// 	});
		// },
		addtea(item) {
			console.log('加入茶桌');
			this.checkAuth(() => {
				console.log(item);
				// this.isinroom(item.id);
				// setTimeout(() => {
					// console.log(this.isin);
					// if (this.isin) {
					// 	uni.showToast({
					// 		icon: 'none',
					// 		title: '您已在茶屋内'
					// 	});
					// } else {
						// console.log('不在内');
						uni.request({
							url: ' http://101.34.137.197/tearoom/request',
							method: 'POST',
							header: {
								'content-type': 'application/json',
								authorization: this.$store.state.token
							},
							data: {
								toId: item.id,
								message: '',
								name: ''
							},
							success: res => {
								console.log(res.data);
								uni.showToast({
									icon: 'none',
									title: res.data.msg
								});
								if ((res.statusCode == 500 && res.data.msg == '用户已经在茶屋里面') || (res.statusCode == 200 && res.data.msg == '加入成功')) {
									var ishost=1
									
									if (this.user.id == item.hostId) {
										ishost=0
									}
									console.log('ishost'+ishost)
									setTimeout(o=>{
										uni.navigateTo({
											url:'../../built-tea-house/pangugle-chat?tea_id='+item.id +'&tea_name=' +item.name+'&tab_index=' +ishost
										// url:'../../built-tea-house/teatable?tea_id='+item.id +'&tea_name=' +item.name+'&tab_index=' +ishost
									})
									},700)
									
								}
							}
						});
			// 		}
			// 	}, 1000);
			});
		},
		changtab(index) {
			if (this.tabindex === index) {
				return;
			}
			this.tabindex = index;
			this.scoreInto = 'tab' + index;
		},
		onchangetab(e) {
			this.changtab(e.detail.current);
		},
		loadmore() {
			this.loadmsg = '加载中...';
			setTimeout(() => {
				this.loadmsg = '上拉更新推荐';
				this.teapage += 1;
				this.getteaHouse();
			}, 2000);
		},
		loadpeople() {
			this.loadmsg = '加载中...';
			setTimeout(() => {
				this.loadmsg = '上拉更新推荐';
				this.peopage += 1;
				this.getteaPeople();
			}, 2000);
		},
		loadarticle() {
			this.loadmsg = '加载中...';
			setTimeout(() => {
				this.loadmsg = '上拉更新推荐';
				this.articlepage += 1;
				this.getteaArticle();
			}, 2000);
		},
		teaserch() {
			if (this.teaserchs == '') {
				this.teapage = 1;
				this.teaserches = '';
				this.getteaHouse();
			} else {
				this.teapage = 1;
				this.teaserches = this.teaserchs;
				this.getteaHouse();
			}
			// this.teaserches =''
		},
		peoplesearch() {
			if (this.peopleserchs == '') {
				this.peopage = 1;
				this.peopleserches = '';
				this.getteaPeople();
			} else {
				this.peopage = 1;
				this.peopleserches = this.peopleserchs;
				this.getteaPeople();
			}
		},
		articlesearch() {
			if (this.articleserchs == '') {
				this.articlepage = 1;
				this.articleserches = '';
				this.getteaArticle();
			} else {
				this.articlepage = 1;
				this.articleserches = this.articleserchs;
				this.getteaArticle();
			}
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
@import './start.response.css';
@import './business-card.css';
@import './titlecard.css';
</style>
