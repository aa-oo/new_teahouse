<template>
	<view class="content">
		<view class="logolog"><image class="logoImg" src="../../static/图标.png" /></view>
		<!-- 手机号登录 -->
		<template v-if="!status">
		<view class="loginput">
			<view class="logput1"><!-- @input="userNameInput" -->
			    <input class="linput" name="userName"  type="number" v-model="usercode"  maxlength="11" placeholder="请输入手机号" confirm-type="done" confirm-hold="true"/>
			</view> 
			<view class="logput1" style="margin-top:15px;">
			    <input class="linput" name="password" password  v-model="password" placeholder="请输入密码" confirm-type="done" confirm-hold="true" />
			</view>
			<button class="logbutton" @click="sublog" :disabled="disabled" :loading="loading">{{loading ? '登录中...' : '登录'}}</button>
		</view>
		</template>	
		<!-- 手机验证码登录 -->
		<template v-else>
		<view class="loginput">
			<view class="logput1">
			    <!-- <view >+86</view>   @input="userNameInput" -->
			    <input class="linput" name="userName" v-model="phone" type="number" maxlength="11" placeholder="请输入手机号" confirm-type="done" confirm-hold="true"/>
			</view> 
			<view class="logput1" style="margin-top:15px;" ><!-- style="width:70%" -->
				<view class="phonoe-code" >
					 <input class="linput" name="password"  placeholder="请输入验证码" v-model="code"confirm-type="done" confirm-hold="true" />
				     <view class="logtitle" @click="getcode()">{{codetime>0 ? codetime+'秒后重发':'获取验证码'}}</view>
				</view>
			   
			</view>
			<button class="logbutton" @click="sublog" :disabled="disabled" >登录</button>
		</view>
		</template>	
		
		
		
		
			<view class="nolog"><text @click="changstatus()">{{status ? '账号密码登录':'验证码登录'}}</text>
			<span style="padding:0 8px;">|</span><span  @click="subsign">登录遇到问题</span></view>
		    <view class="nolog" style="align-items: center; margin-top:20px;">
				<view style="height:1rpx;background-color:#dddddd ;width:100rpx;"></view>
				<view style="padding:0 5px; color:#dddddd">社交账号登陆</view>
				<view style="height:1rpx;background-color:#dddddd ;width:100rpx;"></view>
			</view>
			<!-- <view class="nolog" style="align-items: center;width:100%; ">
				<view class="shejiao1"><image class="shejiao" src="../../static/weixin.png"></image></view>
				<view class="shejiao1"><image class="shejiao" style="width:45px;height:45px;" src="../../static/qq.png" @click="weibo"> </image></view>
				<view class="shejiao1"><image class="shejiao" src="../../static/weiboo.png" @click="weibo"></image></view>
			</view> -->
			<otherLogin></otherLogin>
			<view class="nolog"><span>注册即代表同意</span><span  @click="subsign" style="color:#007AFF">《创客茶馆APP用户协议》</span></view>
	</view>
</template>

<script>
	import otherLogin from '@/components/other-login.vue';
	export default{
		components:{
			otherLogin
		},
		data() {
			return {
				// isAble: true,
				userNameInp : '',
				userNameLen : '',
				loadFlag : false,
				statusBarHeight:0,
				status:false,
				usercode:'',
				password:'',
				phone:'',
				code:'',
				codetime:0,
				loading:false,
			}
		},
		onLoad() {
			let{statusBarHeight}=uni.getSystemInfoSync()
			this.statusBarHeight=statusBarHeight;
		},
		computed:{
			disabled(){
				if((this.usercode === '' || this.password === '') &&
				(this.phone === ''|| this.code === '')){
					return true;
				}
				return false;
			}
		},
		methods:{
			// userNameInput(e){
			// 		this.userNameInp = e.target.value;
			// 		this.userNameLen = e.target.cursor;
			// 		if(this.userNameLen>0){
			// 			this.isAble = false
			// 		}else{
			// 			this.isAble = true
			// 		}
			// 	},
			sublog(){
				this.loading=true;
				uni.request({
					url:'/api/login',
					method:'POST',
					header:{
						'content-type':"application/json",
					},
					data: {
						password:this.password,
						phone:this.usercode,
					},
					success: res => {
						//修改vuex的state
						console.log(res);
						this.loading=false;
						if(res.statusCode==500){
							uni.showToast({
								title: '账号或密码错误',
								icon:'none'
							});
							this.usercode='';
							this.password='';
							return;
						}
						else if(res.statusCode==200){
							if(res.data.state==200){
								this.$store.commit('Login',res.data.obj.user);
								this.$store.commit('Token',res.data.obj.token);
								console.log("个人token如下所示111")
								
								console.log(res.data.obj.token)
							//持久化存储
							// 提示和跳转
								

								uni.navigateBack({
									delta:1,
								});
								uni.showToast({
									title: '登陆成功',
									icon:'none'
								});
							}
							else{
								uni.showToast({
									title:'账号或密码错误',
									icon:'none'
								});
								this.usercode='';
								this.password='';
								return;
							}
							
						}
						
						// this.productList = res.data.items;
					},
					fail:res=>{
						this.loading=false;
						uni.showToast({
						title: '该用户不存在',
						icon:'none'
								});
					}
				});
			},
			subsign() {
				// uni.navigateTo({
				// 	url:'./signin'
				// });
				uni.showToast({
						title: '请联系Dre@mTech工作组',
						icon:'none'
					});
			},
			// weibo(){
			// 	uni.showToast({
			// 		title: '该功能暂未开通',
			// 		icon:'none'
			// 	});
			// },
			changstatus(){
				this.status= ! this.status;
				this.usercode ='';
				this.password ='';
				this.phone ='';
				this.code ='';
			},
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
		margin-bottom:15px;
	}
	.logoImg{
		width:420rpx;
		height:320rpx;
	}
	.loginput{
		width:80%;
		margin:0px auto;
		height:180px;
		/* border:1px solid red; */
		overflow: hidden;
	}
	.logput1{
		dispaly:flex;
		align-items: stretch;
		justify-content: center;
		width:100%;
		height:45px;
		/* border:1px solid yellow; */
		margin-top:5%;
	}
	.phonoe-code{
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		background-color: #f3f9f5;
		color:#549f6a;
		border-radius: 10rpx;
	}
	.logtitle{
/* 		dispaly: flex;
		justify-content: center;
		align-items: center;
		align-content: center; */
		margin: auto 0;
		padding-left:15rpx;
		width:80px;
		/* float:right;
		margin-top:-14%; 
		height:43px; */
		font-size:25rpx;
		/* border-radius: 10rpx; */
		/* box-shadow:-1px 0px 5px #888888; */
	}
	.linput{
		font-size:20px;
		background-color: #c9e1d0;
		padding:8px 10px;
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
