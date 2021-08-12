<template>
	<view class="nolog" style="align-items: center;width:100%; ">
		<!-- <view class="shejiao1" v-for="(item,index) in providerList" :key="index">
			<image class="shejiao" :src="item.addsrc"></image>
		</view> -->
		<!-- <button @click="fan">fanh</button> -->
		<view class="shejiao1"><image class="shejiao" src="../static/weixin.png"></image></view>
		<view class="shejiao1"><image class="shejiao" style="width:45px;height:45px;" src="../static/qq.png" > </image></view>
		<view class="shejiao1"><image class="shejiao" src="../static/weiboo.png" ></image></view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				providerList: []
			}
		},
		mounted(){
			uni.getProvider({
			    service: 'oauth',
			    success: (result) => {
			        this.providerList = result.provider.map((value) => {
			            let providerName = '';
						let addsrc = '';
			            switch (value) {
			                case 'weixin':
			                    providerName = '微信登录'
								addsrc = '../static/weixin.png'
			                    break;
			                case 'qq':
			                    providerName = 'QQ登录'
								addsrc = '../static/qq.png'
			                    break;
			                case 'sinaweibo':
			                    providerName = '新浪微博登录'
								addsrc = './static/weiboo.png'
			                    break;
			            }
			            return {
			                name: providerName,
			                id: value,
							addsrc:addsrc
			            }
			        });
			    },
			    fail: (error) => {
			        console.log('获取登录通道失败', error);
			    }
			});
			
		},
		methods:{
			fan(){
				console.log(this.providerList)
			}
		}
		
	}
</script>

<style>
	.nolog{
		display: flex;
		justify-content: center;
		font-size:14px;
		color:#f3f9f5;
		margin-top:30px;
	}
	.shejiao{
		width:40px;
		height:40px;
	}
	.shejiao1{
		width:20%;
		/* border:1px solid red; */
		display:flex;
		justify-content: center;
		align-items: center;
	}
</style>
