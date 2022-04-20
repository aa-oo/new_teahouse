<template>
	<view class="container">
		<!--  需求:通过websocket实时获取数据，赋值到输入框 ，如果websocket链接失败则弹窗警告-->
		  <view class="content-left">
			     <!-- 扫描条码 -->
				 <view class="textFontSize scan-container">
						<view class="mr-2 color-red font-w-b" style="font-size: 35rpx;">扫描条码:</view>
						<view class="scanBox flex-1 mr-1">
								<input class="flex-1 pl-2" type="text" confirm-type="search" placeholder="请扫描载具条码" v-model="scanCode"/>
						</view>
						<view class="scan-btn">
							<text class="iconfont icon-dagou"></text>
							<text class="ml-2">扫描提交</text>
						</view>
				 </view>
				 
		  </view>  
		   <!-- websocket连接失败弹窗 -->
		   <u-mask :show="socketShow" >
		   		<view class="warp">
		   			<u-tag :text="webtext" mode="dark" class="warp-tag" type="error"/>
		   		</view>
		   	</u-mask>
	</view>
</template>
<script>

import { websocetObj } from 'websocet.js';

export default {
data() {
	return {
		     socketShow:false,
			webtext:'',
			
	  }
},
		methods: {
			//websocet函数回调：返回监听的数据
			getWebsocetData(val){
			// val = String.fromCharCode.apply(null, new Uint8Array(val)).trim()  如果后端返回数据格式是其他的，可能需要转换一下，比如这个，应该是转Unicode编码
				console.log(val,'函数回调');
				this.scanCode = val;
			},
			//websocet函数抛错： 返回错误信息 用于用户提示
			getWebsocetError(err){
				this.socketShow = err.isShow;
			    this.webtext = err.messge;
				console.log('websocet函数抛错',this.socketShow);
			},
			//websocet函数成功进入： 监听连接状态，在失败的时候弹窗提示，具体需求看自身情况
			onErrorSucceed(val){
				this.socketShow = val.isShow;
				console.log('websocet函数成功进入',this.socketShow);
			}   
		},
		mounted() {
		},
		onLoad() {
	    // 在onload的时候调用，创建webscoet连接对象，参数分别为：url、获取后端返回数据、监听websocket的链接失败返回的报错、监听链接状态，返回布尔值
			websocetObj.sokcet('ws://192.168.xxxx',this.getWebsocetData,this.getWebsocetError,this.onErrorSucceed)
		
    },
    //离开页面销毁websocket
		beforeDestroy() {
			websocetObj.stop();
	   },
	}
</script>
