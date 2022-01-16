<template>
	<view >
		<!-- 手机验证码登录 -->
		
		<view class="loginput">
			<view class="logput1" style="margin-top: 20rpx;">
			    <!-- <view >+86</view>   @input="userNameInput" -->
			    <input class="linput" name="userName" v-model="phone" type="number" maxlength="11" placeholder="请输入手机号" confirm-type="done" confirm-hold="true"/>
			</view> 
			<view class="logput1" style="margin-top:15px;" ><!-- style="width:70%" -->
				<view class="phonoe-code" >
					 <input class="linput" name="password"  placeholder="请输入验证码" v-model="code"confirm-type="done" confirm-hold="true" />
				     <view class="logtitle" @click="getcode()">{{codetime>0 ? codetime+'秒后重发':'获取验证码'}}</view>
				</view>
			   
			</view>
			<view class="uni-btn-v">
				<button class="logbutton" @click="sublog" :disabled="disabled" >确定</button>
			</view>
			
		</view>
	
	</view>
</template>

<script>
	
	export default{
	
		data() {
			return {
				phone:'',
				code:'',
				codetime:0,
		
			}
		},
	
		computed:{
			disabled(){
				return this.phone == '' || this.code == '';
			}
		},
		methods:{
			getcode(){
				console.log(111)
				if(this.codetime>0){
					return;
				}
				this.codetime=60;
				let timer= setInterval(()=>{
					if(this.codetime>=1){
						this.codetime--;
					}else{
						this.codetime=0;
						clearInterval(timer)
					}
				},1000)
			}
		}
	}
</script>

<style lang="scss">
	page{
		height:100%;
	}
	.logput1{
		
			border-bottom:1px solid #DCDCDC; 
			width:90%;
			height:30px;
			margin:0px auto;
			padding:5px;
	}
	.phonoe-code{
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;

		color:#549f6a;
		border-radius: 10rpx;
	}
	.logtitle{
		margin: auto 0;
		margin-left:90rpx;
		padding-left: 20rpx;
		width:180rpx;
		font-size:30rpx;
		border-left: 1px solid  #549f6a;

	}

	.logbutton{
		/* font-size:35rpx ;
		text-align: center;
		margin-top:30rpx;
		background-color: #f3f9f5;
		color:#549f6a;
		width:100%;
		height: 70rpx;
		line-height: 70rpx;
		border-radius: 10rpx; */
		font-size:28rpx ;
		text-align: center;
		color:white;
		background-color: #81B991;
		width:90%;
		/* margin-right:50rpx; */
		height: 70rpx;
		line-height: 70rpx;
		border-radius: 10rpx;
		// margin-left:-5rpx;
		margin-top:20px;
		margin-bottom:15px;
	}


</style>
