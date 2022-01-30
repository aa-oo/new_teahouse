<template>
	<view class="">
		<!-- <scroll-view scroll-x style=" width:100%; white-space: nowrap; border-bottom: 1px solid #ffffff;box-shadow: 0px 10px 30px rgba(209, 213, 223, 0.5);background-color:#81b991 ;color:#f5f5f7">
			<view v-for="(item,index) in tabbars" :key="index" :id="'tab'+index" style="display: inline-block !important;padding:auto 60rpx;margin-top:30rpx;margin-left:15%;height:65rpx;text-align: center;"
			 @click="changtab(index)" :scroll-into-view="scoreInto" scroll-with-animation>
			<text :class="tabindex===index?'fontcolor':''" style="padding:10rpx 30rpx;border-radius:5px;">{{item.name}}</text></view>
		</scroll-view>
		
		<swiper :duration="150" :current="tabindex" @change="onchangetab" :style="'height:'+scrollH+'px;'">
			<swiper-item>
				<scroll-view scroll-y="true" :style="'height:'+scrollH+'px;'">
					<view>
						<view class="t-wrap">
							<t-slide ref="slide" :btnArr="btnArr1" @edit="edit" @del="del" @itemClick="itemClick">
								<template v-slot:default="{ item }">
									<view>
									<manage-friend :friendList="item"></manage-friend>
									</view>
								</template>
							</t-slide>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y="true" :style="'height:'+scrollH+'px;'">
					<view>
						<view class="t-wrap">
							<t-slide ref="slide" :btnArr="btnArr2" @edit="edit" @del="del" @itemClick="itemClick">
								<template v-slot:default="{ item }">
									<view>
									<manage-friend :friendList="item"></manage-friend>
									</view>
								</template>
							</t-slide>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper> -->

		<!-- 这里是状态栏 -->
		<view class="status_bar"></view>
		<uni-nav-bar left-icon="back" left-text="" right-text="" title="" @clickLeft="back" style="background-color: #81b991;">
			<view style="margin-left: 10rpx;" :class="{ onshow: flag, noshow: !flag }" @click="flag = true"><text class="onshowtext" style="font-size:30rpx;">好友名片</text></view>
			<view style="margin-left: 150rpx;" :class="{ onshow: !flag, noshow: flag }" @click="flag = false"><text style="font-size:30rpx;">收藏名片</text></view>
		</uni-nav-bar>

		
				<view class="titletop">
					<input class="titleinput" type="text" v-model="peopleserchs" placeholder="" />
					<image class="titleicon" style="" @click="peoplesearch" src="../../static/icon/search.png" />
				</view>
				<view class="" v-show="flag">
					<view class="t-wrap">
						<t-slide ref="slide" :btnArr="btnArr1" @edit="edit" @del="del" @itemClick="itemClick">
							<template v-slot:default="{ item }">
								<view><manage-friend :friendList="item"></manage-friend></view>
							</template>
						</t-slide>
					</view>
					<!-- 上拉加载 -->
					<view style="display:flex;align-items: center;justify-content: center;padding:20rpx;">
						<text style="color:#9e9e9e">{{ loadmsg }}</text>
					</view>
				</view>
		

		<view class="" v-show="!flag">
			<view class="t-wrap">
				<t-slide1 ref="slide1" :btnArr="btnArr2" @edit="edit" @del1="del1" @itemClick="itemClick">
					<template v-slot:default="{ item }">
						<view><manage-friend :friendList="item"></manage-friend></view>
					</template>
				</t-slide1>
			</view>
			<!-- 上拉加载 -->
			<view style="display:flex;align-items: center;justify-content: center;padding:20rpx;">
				<text style="color:#9e9e9e">{{ loadmsg }}</text>
			</view>
		</view>
	</view>
</template>
<script>
import manageFriend from '@/components/manage-friend.vue';
import uniNavBar from '@/uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue';
import tSlide from '@/components/t-slide/t-slide.vue';
import tSlide1 from '@/components/t-slide/t-slide1.vue';
export default {
	data() {
		return {
			dataList: [],
			friendList: [],
			attentionList: [],
			peopleserchs: '',
			peopleserches: '',
			fripage: 1,
			attpage: 1,
			loadmsg: '上拉加载更多',
			dass: '',
			flag: true,
			//按钮数组
			btnArr1: [
				{
					name: '删除好友',
					background: 'rgb(240, 173, 78)',
					color: '#fff',
					events: 'del'
				}
			],
			btnArr2: [
				{
					name: '添加好友',
					background: 'rgb(240, 173, 78)',
					color: '#fff',
					events: 'edit'
				},
				{
					name: '取消收藏',
					background: 'rgb(249, 84, 84)',
					color: '#fff',
					events: 'del1'
				}
			],
			scrollH: 600,
			scoreInto: '',
			tabbars: [
				{
					name: '好友名片'
				},
				{
					name: '收藏名片'
				}
			],
			tabindex: 0
		};
	},
	components: {
		manageFriend,
		tSlide,
		tSlide1,
		uniNavBar
	},

	onLoad() {
		this.getteaHouse();
		this.getteaFriend();
		this.getteaAttention();
		this.fresh()
		uni.getSystemInfo({
			success: res => {
				this.scrollH = res.windowHeight - uni.upx2px(100);
				console.log(this.scrollH);
			}
		});
	},
	onReachBottom() {
		this.loadmore()
		// this.fresh()
	},
	methods: {
		fresh(){
			setTimeout(o => {
				console.log(this.dataList);
				console.log(22222);
			
				this.$nextTick(() => {
					console.log(this.$refs);
					this.$refs.slide.assignment(this.friendList);
					this.$refs.slide1.assignment(this.attentionList);
					console.log(this.dataList);
					console.log(33333);
				});
			}, 500)
		},
		getteaFriend() {
			uni.request({
				url:'/api/friend/getFriends',
				// url: '/api/user/list',
				method: 'GET',
				header: {
					'content-type': 'application/json',
					authorization: this.$store.state.token
				},
				data: {
					key: this.peopleserches,
					page: this.fripage,
					rows: 4
				},
				success: res => {
					console.log('我的好友名片');
					console.log(res);
					console.log(this.fripage);
					this.friendList = res.data.items;
					if (this.friendList.length <4) {
						this.fripage--;
					}
					this.fresh()
					console.log(this.friendList);
				}
			});
		},
		getteaAttention() {
			uni.request({
				url: '/api/friend/getAttention',
				method: 'GET',
				header: {
					'content-type': 'application/json',
					authorization: this.$store.state.token
				},
				data: {
					key: this.peopleserches,
					page:this.attpage,
					rows: 4
				},
				success: res => {
					console.log('我的收藏名片');
					console.log(res);
					this.attentionList = res.data.obj.data;
					if (this.attentionList.length < 5) {
						this.attpage--;
					}
						this.fresh()
					// console.log(this.attentionList);
				}
			});
		},

		getteaHouse() {
			uni.request({
				url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
				success: res => {
					this.dataList = res.data.message;
					console.log(this.dataList);
					console.log(11111);
				}
			});
			console.log('先输出这个。');
		},
		back() {
			uni.switchTab({
				url:'./me-home'
			})
		},
		//点击单行
		itemClick(data) {
			console.log('点击', data);
		},
		//删除
		del(data) {
			console.log('删除', data);
			uni.request({
				url: '/api/friend/endFriend',
				method: 'POST',
				header: {
					'content-type': 'application/json',
					authorization: this.$store.state.token
				},
				data: {
					friendId: data.id,
				},
				success: res => {
					console.log('删除好友');
					console.log(res.data);
					uni.showToast({
						title: res.data.msg,
						icon:'none'
					});
					setTimeout(o=>{
						this.getteaFriend()
					},500)
				}
			});
		},
		del1(data) {
			console.log('取消收藏', data);
			uni.request({
				url:'/api/friend/deleteAttention',
				method:'POST',
				header:{
					'content-type':"application/json",
					'authorization':this.$store.state.token,
				},
				data: {
				    attentionId:data.id,
				},
				success: res => {						
					this.iscollect = false;
					console.log(res.data)
					uni.showToast({
						title: '取消收藏成功',
						icon:'none'
					});
					setTimeout(o=>{
						this.getteaAttention()
					},500)
					
				}
			});
		},
		//编辑
		edit(data) {
			console.log('添加', data);
			uni.request({
				url:'/api/friend/request',
				method:'POST',
				header:{
					'content-type':"application/json",
					'authorization':this.$store.state.token,
				},
				data: {
				    toId:data.id,
				    message:'',
				    // name:''
				},
				success: res => {
					console.log('添加');
					console.log(res.data)
					uni.showToast({
						title: res.data.msg,
						icon:'none'
					});
					// this.isfriend = true;
								
				}
			});
		},
		peoplesearch() {
			if (this.flag) {
				if (this.peopleserchs == '') {
					this.fripage = 1;
					this.peopleserches = '';
					this.getteaFriend();
				} else {
					this.fripage = 1;
					this.peopleserches = this.peopleserchs;
					this.getteaFriend();
				}
			} else {
				if (this.peopleserchs == '') {
					this.attpage = 1;
					this.peopleserches = '';
					this.getteaAttention();
				} else {
					this.attpage = 1;
					this.peopleserches = this.peopleserchs;
					this.getteaAttention();
				}
			}
		},
		loadmore() {
			this.loadmsg = '加载中...';
			setTimeout(() => {
				this.loadmsg = '上拉加载更多';
				console.log(this.flag)
				if (this.flag) {
					this.fripage += 1;
					this.getteaFriend();
				} else {
					this.attpage += 1;
					this.getteaAttention();
				}
			}, 2000);
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
			console.log(this.tabindex);
		}
	}
};
</script>
<style>
@import '../home/teaHouse/titlecard.css';
.status_bar {
	height: var(--status-bar-height);
	width: 100%;
}
.collect-buscard {
	width: 100rpx;
	font-size: 30rpx;
	line-height: 70rpx;
}
.onshow {
	background-color: #ffffff;
	height: 20px;
	border-radius: 12rpx;
	line-height: 20px;
	color: #81b991;
	padding: 5px 5px;
	margin-bottom: -5px;
	/* vertical-align: middle; */
}
.onshowtext {
}
.noshow {
	/* background-color: #FFFFFF; */
	height: 60rpx;
	color: #ffffff;
	border-radius: 12rpx;
	margin-bottom: 10rpx;
	/* vertical-align: middle; */
}
.fontcolor {
	color: #81b991;
	background-color: #f5f5f7;
	font-weight: 500;
}
</style>
