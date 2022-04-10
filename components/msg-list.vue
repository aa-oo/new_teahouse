<template>
	<view>
		<view style="display:flex;align-items: center;padding:25rpx 20rpx;border-bottom:1px solid #eaeaea;" @click="open(item)">
			<image style="height:100rpx;width:100rpx;margin-right:20rpx;border-radius: 50%;" 
			:src="item.headPhoto"></image>
			<view style="display:flex;flex-direction: column;flex:1;">
				<view style="display:flex;align-items:center;justify-content: space-between;">
					<text style="font-size:33rpx">{{item.name}}</text>
					<text style="font-size:27rpx;color:#999999">{{item.createTime| timechange}}</text>
				</view>
				<view style="display:flex;align-items:center;justify-content: space-between;margin-top:15rpx;">
					<text style="font-size:27rpx;color:#999999;max-width: 500rpx;" class="text-ellipsis">{{item.message}}</text>
					<uni-badge class="uni-badge-left-margin"  :text="item.isread" type="error" :max-num="maxnum" ></uni-badge>
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
				maxnum:99,
				time:''
			}
		},
		methods:{
			open(item){
			
				uni.navigateTo({
					// url:'../pages/chat/view/pangugle-chat.vue',
					// url: './article?detail='+JSON.stringify(item)+'&host_id='+JSON.stringify(this.teaMes.hostId)
					url: '../chat/view/pangugle-chat?mesdetail='+JSON.stringify(item)
				});
			}
		},
		filters:{
			 timechange(date) {
			    var json_date = new Date(date).toJSON();
			    return new Date(new Date(json_date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
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
