<template>
	<view>
		<view class="tabtop">
			<view class="tabback" @click="goback"><</view>
			<view class="tabtopname">{{tea_name}}</view>
			<view class="tabtopopt" @click="gooption">...</view>
		</view>
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
				tea_name:'',
				tea_id:0,
				tab_index:0
			}
		},
		onLoad(opt) {
			console.log(opt)
			this.tea_name=opt.tea_name;
			this.tea_id=opt.tea_id
			this.tab_index=opt.tab_index
		},
		methods:{
			gooption() {
				uni.navigateTo({
					url:'./tableoption?tea_id='+this.tea_id+'&tab_index=' +this.tab_index
				})
			},
			goback() {
			uni.navigateBack({
				delta: 1
			});
		}
		}
	}
</script>

<style>
	.tabtop{
		height:80rpx;
		width:100%;
		position:relative;
		background:#81b991;
		color:#FFFDEF;
	}
	.tabtopname{
		position: absolute;
		font-size:35rpx;
		height:80rpx;
		line-height:80rpx;
		 left:50%;
		transform:translate(-50%);
		/* margin-left:30%; */
	}
	.tabtopopt{
		position: absolute;
		font-size:60rpx;
		height:80rpx;
		line-height:80rpx;
		margin-left:90%;
		margin-top:-15rpx;
	}
	.tabback{
		position: absolute;
		font-size:48rpx;
		height:80rpx;
		line-height:80rpx;
		margin-left:2%;
		/* margin-top:-15rpx; */
	}
</style>
