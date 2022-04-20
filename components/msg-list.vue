<template>
	<view>
		<view style="display:flex;align-items: center;padding:25rpx 20rpx;border-bottom:1px solid #eaeaea;" @click="open(item)">
			<view class="" v-if="item.type==1">
				<view class="" v-if="user.id==item.userId">
					<image style="height:100rpx;width:100rpx;margin-right:20rpx;border-radius: 50%;"
					:src="item.toHeadPhoto"></image>
				</view>
				<view class="" v-else="user.id!=item.userId">
					<image style="height:100rpx;width:100rpx;margin-right:20rpx;border-radius: 50%;"
					:src="item.headPhoto"></image>
				</view>
			</view>
			<view class="" v-else="item.type==2">
				<view class="">
					<image style="height:100rpx;width:100rpx;margin-right:20rpx;border-radius: 50%;"
					:src="item.toHeadPhoto"></image>
				</view>
			</view>
<!-- 			<view class="" v-if="user.id==item.userId">
				<image style="height:100rpx;width:100rpx;margin-right:20rpx;border-radius: 50%;"
				:src="item.toHeadPhoto"></image>
			</view>
			<view class="" v-else="user.id!=item.userId">
				<image style="height:100rpx;width:100rpx;margin-right:20rpx;border-radius: 50%;"
				:src="item.headPhoto"></image>
			</view> -->
	<!-- 		<image style="height:100rpx;width:100rpx;margin-right:20rpx;border-radius: 50%;" 
			:src="user.id==item.userId?item.toheadPhoto:item.headPhoto"></image> -->
			<view style="display:flex;flex-direction: column;flex:1;">
				<!-- <view > -->
					<view  style="display:flex;align-items:center;justify-content: space-between;" class="" v-if="item.type==1">
						<text style="font-size:33rpx" v-if="user.id==item.userId">{{item.toName}}</text>
						<text style="font-size:33rpx" v-if="user.id!=item.userId">{{item.name}}</text>
						<!-- <text style="font-size:27rpx;color:#999999">{{item.createTime| timechange}}</text> -->
					</view>
					<view style="display:flex;align-items:center;justify-content: space-between;" class="" v-else="item.type==2">
						<text style="font-size:33rpx" >{{item.toName}}</text>
						<!-- <text style="font-size:27rpx;color:#999999">{{item.createTime| timechange}}</text> -->
					</view>

				<!-- </view> -->
				<view style="display:flex;align-items:center;justify-content: space-between;margin-top:15rpx;">
					<text style="font-size:27rpx;color:#999999;max-width: 500rpx;" class="text-ellipsis">{{item.message}}</text>
					<uni-badge class="uni-badge-left-margin"  :text="item.isRead" type="error" :max-num="maxnum" ></uni-badge>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
import {mapState} from 'vuex' 
	export default {
		props:{
			item:Object,
			index:Number
		},
		data(){
			return{
				maxnum:99,
				time:'',
				teaMes:[]
			}
		},
		computed: {
			...mapState({
				user: state => state.user
			})
		},
		methods:{
			open(item){

					uni.request({
						url: 'http://101.34.137.197/tearoom/info',
						method: 'POST',
						header: {
							'content-type': 'application/json',
							authorization: this.$store.state.token
						},
						data: {
							roomId: item.toId
						},
						success: res => {
							// console.log(JSON.stringify(res));
							this.teaMes = res.data;
							console.log('茶屋信息1');
							console.log(this.teaMes);
						}
					});
				if(item.type==1){
						uni.navigateTo({
					// url:'../pages/chat/view/pangugle-chat.vue',
					// url: './article?detail='+JSON.stringify(item)+'&host_id='+JSON.stringify(this.teaMes.hostId)
					url: '../chat/view/pangugle-chat?mesdetail='+JSON.stringify(item)
				});
				}
				else{
					var ishost=1
					if (this.user.id == this.teaMes.hostId) {
						ishost=0
					}
					uni.navigateTo({
						// url:'../pages/chat/view/pangugle-chat.vue',
						// url: './article?detail='+JSON.stringify(item)+'&host_id='+JSON.stringify(this.teaMes.hostId)
							url:'../built-tea-house/pangugle-chat?tea_id='+item.toId +'&tea_name=' +item.toName+'&tab_index=' +this.ishost
					});
				}
			
			}
		},
		filters:{
			 timechange(date) {
			    var json_date = new Date(date.replace(/-/g, '/')).toJSON();
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
