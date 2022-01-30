<template>
	<view class="">
			<view class="top">
			<view class="articletop">{{articledetail.name}}</view>
			<view class="articleauthor">{{articledetail.writerName}}</view>
			<view class="articletime">{{time}}</view>
			</view>
			<view class="bottom">
				<view class="articlecontect">
					{{articledetail.content}}
				</view>
				<view class="delartbutton" @click="delArticle" v-show="own">删除文章</view>
			</view>
			
			<!-- {{item.titlename}} -->
	</view>
</template>

<script>
	
	import  dateChangeFormat  from './change-date.js';
	import {mapState} from 'vuex';
	export default{
		data() {
			return {
				articleid:'',
				articledetail:'',
				time:'',
				own:false,
			};
		},
		computed:{
			...mapState({
				user:state=>state.user,
			}),
		},
		onLoad(e) {
			if(e.detail){
				this.articleid = JSON.parse(e.detail)
				// console.log(this.articleid)
			};
			uni.setNavigationBarTitle({
			    title:'茶馆文摘'
			});
			this.getArticle()
			// this.changeTime()
			// console.log(dateChangeFormat.dateChangeFormat('YYYY-mm-dd HH:MM:SS', "2021-07-02T14:19:59+08:00"))
		},
		// props:['item.titlename']
		methods:{
			getArticle() {
				uni.request({
					url:'/api/paper/'+this.articleid,
					method:'GET',
					header:{
						'content-type':"application/json",
						'authorization':this.$store.state.token,
					},
					data: {
					    id:this.articleid,
					},
					success: res => {
						console.log('文章详细信息如下');
						this.articledetail = res.data;
						console.log(this.articledetail)
						if(this.articledetail.userId == this.user.id){
							this.own=true;
						}
						this.time=dateChangeFormat.dateChangeFormat('YYYY-mm-dd HH:MM:SS', this.articledetail.createTime) 
						// console.log(this.time)
					}
				});
			},
			delArticle(){
				uni.request({
					url:'/api/paper/deletePaper/'+this.articleid,
					method:'GET',
					header:{
						'content-type':"application/json",
						'authorization':this.$store.state.token,
					},
					data: {
					    id:this.articleid,
					},
					success: res => {
						console.log(res.data);
						if(res.data.state==200){
							uni.showToast({
								icon:'none',
								title:'删除文章成功'
							})
							setTimeout(o => {
								uni.switchTab({
								url:'../teaHouse/start'
							})
							}, 500);
						}else{
							uni.showToast({
								icon:'none',
								title:res.data.msg+',不可删除'
							})
						}
							
						
						
					}
				});
			}
			
			
		}
	}
</script>

<style>
	.top{
		border-top: 2px solid #53989f;
		text-align: center;
	}
	.articletop{
		margin-top: 25rpx;
	    /* font-style: italic; */
		font-weight: bold;
		font-size: 45rpx;
	}
	.articleauthor{
		margin-top: 30rpx;
		font-size: 38rpx;
	}
	.articletime{
		margin-top: 15rpx;
		font-size: 20rpx;
	}
	.bottom{
		margin-top: 30rpx;
		font-size: 32rpx;
	}
	.articlecontect{
		padding:0 30rpx 30rpx 30rpx;
	}
	.delartbutton{
		font-size:35rpx ;
		text-align: center;
		margin:30rpx auto;
		background-color: #dcdcdc;
		width:80%;
		height: 70rpx;
		line-height: 70rpx;
		border-radius: 10rpx;
		color:#215631;
		border:1px solid #81b991;
		margin-bottom:200rpx;
	}
	
</style>
