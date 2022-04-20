<template>
	<view>
		<!-- <view class="newarticaltop">
			
		</view> -->
		<view class="newarticaltop">
		    <input class="newartical1" v-model="tabname" name="input"maxlength="15" @input="onInput($event, 'tabname')" placeholder="请输入标题"  />
		</view> 
		<view class="newarticalmid">
		    <input class="newartical2" name="input"  disabled :placeholder="user.name" />
		</view>
		<view class="newarticalnext"></view>
		<view class="">
		    
		    <textarea class="newartical3" v-model="textarea" @input="onInput($event, 'textarea')" placeholder="从这里开始写正文"></textarea>
		</view> 
		 <button form-type="submit" class="tableadd" @click="submit">提交</button>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				tea_id:0,
				tabname: '',
				textarea: '',
				teaList:[]
			};
		},
		computed:{
			...mapState({
				user:state=>state.user,
			})
		},
		onLoad() {
			
		},
		methods: {
			
			onInput(e, item) {
				console.log(item);
				if ('tabname' == item) {
					this.tabname = e.detail.value;
				} else if ('textarea' == item) {
					this.textarea = e.detail.value;
				}
			},
			submit() {
				console.log(this.user.name)
				uni.request({
					url:'http://101.34.137.197/paper/create',
					method:'POST',
					header:{
						'content-type':"application/json",
						'authorization':this.$store.state.token
					},
					data: {
						content:this.textarea,
						name:this.tabname,
						writerName:this.user.name,
					},
					success: res => {
						console.log('写文章');
						console.log(res.data)
						if(res.statusCode==200){
							uni.showToast({
								title: '文章发表成功',
								icon:'none'
							});
							this.textarea=''
							this.tabname=''
							setTimeout(o => {
								uni.navigateBack()
							}, 500);
							
						}
						
					}
				});
			}
		}
	};
	
</script>

<style>
	.newarticaltop{
		dispaly:flex;
		flex-direction: row;
		height:70rpx;
		/* overflow: hidden; */
		margin:0px auto;
		padding-top:30px;
		/* margin-left:10%; */
		width:80%;
	}
	.newarticalmid{
		height:70rpx;
		/* overflow: hidden; */
		margin:0px auto;
		padding-top:10px;
		width:80%;
	}
	.newartical1{
		/* border:0.5px solid green; */
		/* text-align: center; */
		font-size:50rpx;
	}
	.newartical2{
		/* border:0.5px solid green; */
		/* text-align: center; */
		font-size:40rpx;
	}
	.newarticalnext{
		border-bottom:2px solid #dadada;
		height:10px;
		/* overflow: hidden; */
		margin:0px auto;
		/* padding-top:10px; */
		width:80%;
		}
	.newartical3{
		width:80%;
		height:500px;
		margin:0px auto;
		margin-top:10px;
		/* border-bottom:2px solid black; */
	}
	.tableadd{
		font-size:28rpx ;
		text-align: center;
		color:white;
		background-color: #81B991;
		width:90%;
		/* margin-right:50rpx; */
		height: 70rpx;
		line-height: 70rpx;
		border-radius: 10rpx;
		/* margin-left:-5rpx; */
		margin-top:10px;
		margin-bottom:15px;
	}
</style>
