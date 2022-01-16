<template>
	<view>
		<view class="tablebody">
			<view class="ttabletext">
				<text class="tttext">创建茶桌</text>
				<image class="tableicon" src="../../static/icon/namecard-fill.png" />
			</view>
			<view class="tablehold">
				<!-- <view class="tabinput1"> -->
				<!-- <view  @click="chooseimage"><text>添加照片</text> -->
				<image class="tabtitle1" :src="item" @click="previewPictures()"></image>
			</view>
			<!-- <button class="tabpic" type="primary" @click="uploadPictures">上传图片</button> -->
			<!--  -->

			<!-- </view> -->
			<view class="tabinput1">
				<!-- <view class="tabtitle">发起人</view> -->
				<input class="teainput" name="input" disabled :placeholder="loginStatus?user.name:'未登录'" />
			</view>
			<view class="tabinput1">
				<!-- <view class="tabtitle">茶桌名称</view> -->
				<input class="teainput" v-model="tabname" maxlength="15" @blur="endBlur(tabname)" @input="onInput($event, 'tabname')" placeholder="茶桌名称(2~15个字)" />
			</view>
			<view style="margin-left:15px;">
				<!-- <view >茶桌介绍</view> -->
				<textarea
					class="teainput1"
					maxlength="40"
					v-model="textarea"
					@blur="endBlurtext(textarea)"
					@input="onInput($event, 'textarea')"
					placeholder="茶桌简介(最多40个字)"
				></textarea>
			</view>
			<view class="uni-form-item uni-column" style="margin-top: 20px;margin-left:15px;">
				<view class="title" style="float:left;width:180rpx;">加入方式</view>
				<radio-group name="radio" @change="chooseIn">
					<label>
						<radio value="radio1" :checked="joinMethod===0" color="#81b991" />
						<text>自由加入</text>
					</label>
					<label>
						<radio value="radio2" :checked="joinMethod===1" color="#81b991" />
						<text>审核加入</text>
					</label>
				</radio-group>
			</view>

			<view class="uni-btn-v">
				<button @click="submit" class="tableadd">立即创建</button>
				<!-- <button type="default" form-type="reset">Reset</button> -->
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
export default {
	data() {
		return {
			txt: ' ',
			item: '../../static/icon/camera.png',
			tabname: '',
			textarea: '',
			joinMethod:0,
			teaList:[]
		};
	},
	computed:{
		...mapState({
			loginStatus:state=>state.loginStatus,
			user:state=>state.user,
			//写法二
			// user:function(state){
			// 	return this.str+':'+state.user;
			// }
		})
	},
	methods: {
		previewPictures() {
			var that=this
			uni.chooseImage({
				count: 1,
				sizeType: ['compressed'],
				sourceType: ['album', 'camera'],
				success: res => {
					console.log(res);
					this.item = res.tempFilePaths[0];
					console.log(this.item)
					uni.uploadFile({
						url:'/api/upload',
						header:{
							// 'content-type':"application/json",
							'authorization':that.$store.state.token
						},
						filePath: that.item,
						  name: 'file',
						  formData:this.sendDate,
						  success: (res) => {
						  	
						  	if(res.statusCode==200){
						  		console.log('图片格式化');
								let imgData=JSON.parse(res.data)
						  		this.item=imgData.obj
								console.log(this.item)
						  		
						  	}
						  	
						  }
					})
				}
			});
		
			
		},
		endBlur(item) {
			if (item.length < 3) {
				uni.showToast({
					title: '茶桌名称在2~15个字范围内',
					icon: 'none'
				});
				return false;
			}
			return true;
		},
		endBlurtext(item) {
			if (item.length < 1) {
				uni.showToast({
					title: '茶桌简介在1~40个字范围内',
					icon: 'none'
				});
				return false;
			}
			return true;
		},
		onInput(e, item) {
			console.log(item);
			if ('tabname' == item) {
				this.tabname = e.detail.value;
			} else if ('textarea' == item) {
				this.textarea = e.detail.value;
			}
		},
		chooseIn(e){
			if(e.detail.value=='radio1'){
				this.joinMethod=0
			}
			else if(e.detail.value=='radio2'){
				this.joinMethod=1
			}
			
			console.log(this.joinMethod)
		},
		teaCreat(){

			uni.request({
				url:'/api/tearoom/create',
				method:'POST',
				header:{
					'content-type':"application/json",
					'authorization':this.$store.state.token
				},
				data: {
					introduce:this.textarea,
					joinMethod:this.joinMethod,
					name:this.tabname,
					photo:this.item
				},
				success: res => {
					console.log('创建茶屋');
					if(res.statusCode==200){
						uni.showToast({
							title: '创建茶屋成功',
							icon:'none'
						});
						this.textarea=''
						this.tabname=''
						this.joinMethod=0
						this.item= '../../static/icon/camera.png'
					}
					
				}
			});
		},
		submit() {
			var that=this
			this.checkAuth(()=>{
				that.endBlur(that.tabname);
			    that.endBlurtext(that.textarea);
			    that.teaCreat()
			})
			
		}
	}
};
</script>

<style>
.tablebody {
	width: 95%;
	margin: 0px auto;
	margin-top: 10px;
	height: 100%;
	display: flex;
	/* align-items: center; */
	/* align-content: center; */
	flex-direction: column;
	/* border-radius: 10rpx;
		box-shadow: 0px 10px 30px rgba(209, 213, 223, 0.5); */
}
.ttabletext {
	/* margin-top:5%; */
	margin-left: 5%;
	font-size: 40rpx;
	/* border:1px solid red; */
	display: flex;
	justify-content: space-between;
	height: 100rpx;
	line-height: 100rpx;
}
.tablehold {
	/* border:1px solid blue; */
	margin-top: 3%;
	margin: 0px auto;
}
.tableicon {
	width: 100rpx;
	height: 100rpx;
	margin-right: 40rpx;
}
.tabinput1 {
	dispaly: flex;
	flex-direction: row;
	font-size: 30rpx;
	/* border:1px solid yellow; */
	margin-left: 15px;
	height: 70rpx;
}
.tabtitle {
	width: 180rpx;
	float: left;
	/* text-align: right; */
}
.teainput {
	border-bottom: 1px solid #dadada;
	width: 90%;
	padding: 10rpx;
}
.teainput1 {
	border-bottom: 1px solid #dadada;
	width: 90%;
	height: 65px;
	padding: 10rpx;
}
.tabtitle1 {
	width: 90px;
	border: 1px solid #dadada;
	height: 90px;
	line-height: 90px;
	text-align: center;
	border-radius: 50%;
	margin-bottom: 10px;
	margin-top: -5px;
	color: #808080;
}
.tabpic {
	font-size: 28rpx;
	text-align: center;
	color: white;
	background-color: #81b991;
	width: 100px;
	height: 60rpx;
	line-height: 60rpx;
	border-radius: 10rpx;
	margin-top: 20rpx;
	margin-left: -18%;
}
.tableadd {
	font-size: 28rpx;
	text-align: center;
	color: white;
	background-color: #81b991;
	width: 90%;
	margin-right: 50rpx;
	height: 70rpx;
	line-height: 70rpx;
	border-radius: 10rpx;
	margin-top: 20px;
	margin-bottom: 15px;
}

.img {
	position: relative;
	display: inline-block;
	width: 166rpx;
	height: 166rpx;
	vertical-align: top;
	margin-right: 10rpx;
	margin-bottom: 10rpx;
}
.close {
	position: absolute;
	right: 0;
	background-color: rgba(0, 0, 0, 0.4);
	color: #fff;
}
.camera {
	display: inline-block;
	width: 166rpx;
	height: 166rpx;
	text-align: center;
	line-height: 166rpx;
	font-size: 46rpx;
	border: 1rpx dotted #8c9697;
	color: #8c9697;
	margin-bottom: 10rpx;
}
</style>
