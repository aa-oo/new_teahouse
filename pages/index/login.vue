<template>
	<view class="content">
		<view class="logolog"><image class="logoImg" src="../../static/图标.png" /></view>
		<view class="loginput">
			<view class="logput1">
			    <!-- <view class="logtitle">账号</view> -->
			    <input class="linput" name="userName" @input="userNameInput" type="number" maxlength="11" placeholder="请输入手机号" confirm-type="done" confirm-hold="true"/>
			</view> 
			<view class="logput1" style="margin-top:20rpx;">
			    <!-- <view class="logtitle">密码</view> -->
			    <input class="linput" name="password" password maxlength="10" placeholder="请输入密码"confirm-type="done" confirm-hold="true" />
			</view>
			<button class="logbutton" @click="sublog" type="" :disabled="isAble">登录</button>
			<view class="nolog"  @click="subsign">没有账号，立即注册</view>
		</view>
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
			}
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
		margin-top:-35%;
	}
	.logoImg{
		width:420rpx;
		height:320rpx;
	}
	.logput1{
		dispaly:flex;
		flex-direction: row;
		font-size:40rpx;
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
		font-size:37rpx;
		background-color: #c9e1d0;
		padding:10rpx 10rpx;
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
		text-decoration: underline;
		font-size:25rpx;
		color:#f3f9f5;
		float:right;
		margin-top:30rpx;
	}
</style>
