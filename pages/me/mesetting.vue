<template>
	<view>
		
		<view class="mesetting1" style="border-bottom: 1px solid #DCDCDC;" @click="siginin">账号与安全 <text style="float:right">></text></view>
		<view class="mesetting1" style="border-bottom: 1px solid #DCDCDC;" @click="phone">手机号绑定 <text style="float:right">></text></view>
		<view class="mesetting1" @click="siginin1"> 编辑信息 <text style="float:right" >></text></view>
		<view class="mesetblank"></view>
		<view class="mesetting1"@click="writein"> 写文章 <text style="float:right" >></text></view>
		<view class="mesetblank"></view>
		<view class="mesetting1" style="border-bottom: 1px solid #DCDCDC;" @click="clear"> 清除缓存 
					<text style="float:right;font-size:14px;color:#81838d">{{currentSize | format}}</text></view>
		<view class="mesetting1" style="border-bottom: 1px solid #DCDCDC;" @click="helpone"> 帮助与反馈 <text style="float:right">></text></view>
		<view class="mesetting1" @click="abouttea"> 关于茶馆 <text style="float:right">></text></view>
		<view class="mesetblank"></view>
		<view class="mesetting2" @click="backout">退出登录</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				currentSize:0,
			}
		},
		onLoad() {
			let res = uni.getStorageInfoSync()
			this.currentSize=res.currentSize;
		},
		filters: {
			format: function(value) {
				return value>1024? (value/1024).toFixed(2)+'Mb' : value.toFixed(2)+'Kb';
			}
		},
		methods:{
			siginin(){
				uni.navigateTo({
					url:'passwordchange'
				})
			},
			phone(){
				uni.navigateTo({
					url:'phonechange'
				})
			},
			siginin1(){
				uni.navigateTo({
					url:'userinfo'
				})
			},
			writein(){
				uni.navigateTo({
					url:'../built-tea-house/newarticals'
				})
			},
			backout(){
				uni.showModal({
					content: '是否要退出登录？',
					success:(res)=>{
						if (res.confirm) {
							this.$store.commit('logout')
							// uni.navigateTo({
							// 	url:'../index/login'
							// })
							uni.navigateBack({
								delta:1
							})
						}
					}
				});
				
			},
			helpone(){
				uni.showToast({
					title: '请联系shl635306159@163.com',
					icon:'none'
				});
			},
			abouttea(){
				uni.navigateTo({
					url:'./aboutteas'
				})
			},
			clear(){
				uni.showModal({
					title:'提示',
					content:'是否清除所有缓存？',
					confirmText:'是',
					cancelText:'否',
					success:res=> {
						if(res.confirm){
							uni.clearStorageSync();
							let res = uni.getStorageInfoSync()
							this.currentSize=res.currentSize;
							uni.showToast({
								title: '清除成功',
								icon:'none'
							});
						}
					}
					
				})
			}
		}
	}
</script>

<style>
	.mesetbody{
		background-color:#DCDCDC ;
	}
	.mesetting1{
		padding:5px 18px;
		height:30px;
		font-size:30rpx;
		height:30px;
		/* border:1px solid red; */
		background-color: #FFFFFF;
		line-height:30px;
	}
	.mesetblank{
		width:100%;
		height:8px;
		background-color: #e1e1e1;
	}
	.mesetting2{
		padding:5px 18px;
		height:30px;
		font-size:30rpx;
		height:30px;
		background-color: #FFFFFF;
		text-align: center;
		line-height:30px;
		border-bottom: 1px solid #dadada;
	}
</style>
