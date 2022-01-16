<template>
	<view>
		<input class="singinput" style="margin-top:10px" type="password" value="" placeholder="输入旧密码" v-model="oldpassword"/>
		<input class="singinput" type="password" value="" placeholder="输入新密码" v-model="newpassword"/>
		<input class="singinput" type="password" value="" placeholder="再次输入新密码" v-model="renewpassword"/>
		
		<view class="uni-btn-v">
		    <button class="passwordch" :disabled="disabled" @click="submit()">设置</button>
		    <!-- <button type="default" form-type="reset">Reset</button> -->
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				oldpassword:'',
				newpassword:'',
				renewpassword:'',
			}
		},
		computed:{
			disabled(){
				return this.oldpassword == '' || this.newpassword == '' || this.renewpassword == '';
			}
		},
		onLoad() {
			console.log(this.$store.state.token);
		},
		methods:{
			check(){
				if(this.newpassword !== this.renewpassword){
					uni.showToast({
						title:'两次密码不一致',
						icon:'none'
					})
					return false;
				}
				if(this.newpassword==this.oldpassword){
					uni.showToast({
						title:'新旧密码一样',
						icon:'none'
					})
					return false;
				}
				return true;
			},
			submit(){
				if(!this.check()){
					return;
				}
				uni.request({
					url:'/api/user/changePassword',
					method:'POST',
					header:{
						'content-type':"application/json",
						'authorization':this.$store.state.token,
					},
					data: {
					    password:this.newpassword,
					},
					success: res => {
						console.log(res);
						console.log(this.newpassword)
						uni.showToast({
							title:'修改密码成功',
							icon:'none'
						})
						// this.productList = res.data.items;
						// console.log(this.articalList);
					},
					fail:res =>{
						uni.showToast({
							title:'接口请求失败，稍后再试试',
							icon:'none'
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.passwordch{
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
	.singinput{
		border-bottom:1px solid #DCDCDC; 
		width:90%;
		height:30px;
		margin:0px auto;
		padding:5px;
	}
</style>
