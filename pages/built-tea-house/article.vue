<template>
	<view class="">
			<view class="top">
			<view class="articletop">{{articledetail.name}}</view>
			<view class="articleauthor">{{articledetail.writerName}}</view>
			<view class="articletime">{{articledetail.createTime}}</view>
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

	import {mapState} from 'vuex';
	export default{
		data() {
			return {
				articleid:'',
				host_id:0,
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
				this.articledetail = JSON.parse(e.detail)
				this.host_id=JSON.parse(e.host_id)
				console.log(this.articledetail)
				console.log("111")
				console.log(this.host_id)
				console.log(this.user.id)
				console.log(this.articledetail.userId)
				if(this.articledetail.userId == this.user.id||this.user.id==this.host_id){
					this.own=true;
				}
				console.log(this.own)
			
			};
			
			uni.setNavigationBarTitle({
			    title:'茶馆文摘'
			});
			
			// this.changeTime()
			// console.log(dateChangeFormat.dateChangeFormat('YYYY-mm-dd HH:MM:SS', "2022-02-14T06:37:05.000 00:00"))
		},
		// props:['item.titlename']
		methods:{
			delArticle(){
				uni.request({
					url:'http://101.34.137.197/roomPaper/deletePaper',
					method:'POST',
					header:{
						'content-type':"application/json",
						'authorization':this.$store.state.token,
					},
					data: {
					   	paperId: this.articledetail.id,
					   	roomId:this.articledetail.roomId
					},
					success: res => {
						console.log(res.data);
						if(res.data.state==200){
							uni.showToast({
								icon:'none',
								title:'删除文章成功'
							})
							setTimeout(o => {
								uni.navigateBack()
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
