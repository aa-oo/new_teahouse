<template>
	<view class="content">
		<view class="logolog"><image class="logoImg" src="../../static/图标.png" /></view>
		<view class="loginput">
			<view class="logput1">
			    <!-- <view class="logtitle">账号</view> -->
			    <input class="linput" name="userName" @input="userNameInput" type="number" maxlength="11" placeholder="请输入手机号" confirm-type="done" confirm-hold="true"/>
			</view> 
			<view class="logput1" style="margin-top:15px;">
			    <!-- <view class="logtitle">密码</view> -->
			    <input class="linput" name="password" password maxlength="10" placeholder="请输入密码"confirm-type="done" confirm-hold="true" />
			</view>
			<button class="logbutton" @click="sublog" type="" :disabled="isAble">登录</button>
			<view class="nolog"><span>验证码登录</span><span style="padding:0 8px;">|</span><span  @click="subsign">注册新用户</span></view>
			
		</view>
		    <view class="nolog" style="align-items: center; margin-top:20px;">
				<view style="height:1rpx;background-color:#dddddd ;width:100rpx;"></view>
				<view style="padding:0 5px; color:#dddddd">社交账号登陆</view>
				<view style="height:1rpx;background-color:#dddddd ;width:100rpx;"></view>
			</view>
			<view class="nolog" style="align-items: center;width:100%; ">
				<view class="shejiao1"><image class="shejiao" src="../../static/weixin.png"></image></view>
				<view class="shejiao1"><image class="shejiao" style="width:45px;height:45px;" src="../../static/qq.png" @click="weibo"> </image></view>
				<view class="shejiao1"><image class="shejiao" src="../../static/weiboo.png" @click="weibo"></image></view>
			</view>
			<view class="nolog"><span>注册即代表同意</span><span  @click="subsign" style="color:#007AFF">《创客茶馆APP用户协议》</span></view>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				isAble: true,
				userNameInp : '',
				userNameLen : '',
				loadFlag : false,
				statusBarHeight:0,
			}
		},
		onLoad() {
			let{statusBarHeight}=uni.getSystemInfoSync()
			this.statusBarHeight=statusBarHeight;
		},
		methods:{
			userNameInput(e){
					// console.log(e);
					this.userNameInp = e.target.value;
					this.userNameLen = e.target.cursor;
					if(this.userNameLen>0){
						this.isAble = false
					}else{
						this.isAble = true
					}
				},
			sublog(e){
				this.loadFlag = true;
				this.isAble = true;
				var _this = this;
				setTimeout(function(){
					// uni.hideLoading()
					uni.showToast({
						title: "正在登录中..."
					});
					_this.loadFlag = false;
					_this.isAble = false;
					},2000)
				
			},
			subsign() {
				uni.navigateTo({
					url:'./signin'
				})
			},
			weibo(){
				uni.showToast({
					title: '该功能暂未开通',
					icon:'none'
				});
			}
		}
	}
</script>

<style>
	page{
		height:100%;
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #81b991;
		width:100%;
		height:100%;
		/* border:1px solid red; */
	}
	.logolog{
		/* border:1px solid red; */
		/* margin-top:-10%; */
	}
	.logoImg{
		width:420rpx;
		height:320rpx;
	}
	.loginput{
		width:80%;
		margin:0px auto;
	}
	.logput1{
		dispaly:flex;
		flex-direction: row;
		margin-top:10%;
		height:70rpx;
		/* overflow: hidden; */
	}
	.logtitle{
		width:180rpx;
		float:left;
		color:#FFFDEF;
		font-size:40rpx;
		/* text-align: right; */
	}
	.linput{
		font-size:20px;
		background-color: #c9e1d0;
		padding:8px 10px;
		border-radius: 10rpx;
	}
	.logbutton{
		font-size:35rpx ;
		text-align: center;
		margin-top:30rpx;
		background-color: #f3f9f5;
		color:#549f6a;
		width:100%;
		height: 70rpx;
		line-height: 70rpx;
		border-radius: 10rpx;
	}
	.nolog{
		display: flex;
		justify-content: center;
		font-size:14px;
		color:#f3f9f5;
		/* float:right; */
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
