<template>
	<view>
		<view style="display:flex;align-items: center;padding:25rpx 20rpx;border-bottom:1px solid #eaeaea;" @click="open(item)">
			<image style="height:100rpx;width:100rpx;margin-right:20rpx;border-radius: 50%;" 
			:src="item.userimg"></image>
			<view style="display:flex;flex-direction: column;flex:1;">
				<view style="display:flex;align-items:center;justify-content: space-between;">
					<text style="font-size:33rpx">{{item.username}}</text>
					<text style="font-size:27rpx;color:#999999">{{item.updatetime}}</text>
				</view>
				<view style="display:flex;align-items:center;justify-content: space-between;margin-top:15rpx;">
					<text style="font-size:27rpx;color:#999999;max-width: 500rpx;" class="text-ellipsis">{{item.message}}</text>
					<uni-badge class="uni-badge-left-margin" :text="item.noread" type="error" :max-num="maxnum" ></uni-badge>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		props:{
			item:Object,
			index:Number
		},
		data(){
			return{
				maxnum:99
			}
		},
		methods:{
			open(item){
				uni.navigateTo({
					url:'../pages/chat/view/pangugle-chat.vue',
				});
			}
		}
	}
</script>

<style>
	.text-ellipsis{
		/* #ifndef APP-PLUS-NVUE	 */
		overflow: hidden;text-overflow: ellipsis;white-space: nowrap;
		/* #endif */
		/* #ifdef APP-PLUS-NVUE	 */
		lines:1;
		/* #endif */
	}
</style>
