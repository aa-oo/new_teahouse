<template>
	<view>
		<uni-list-item title="茶屋头像">
			<view slot="footer" class="listclass" @click="changeUserpic">
				<image :src="teaMes.photo" class="touxiang"></image>
				<image class="hreengicons" src="../../static/icon/change.png" />
			</view>
		</uni-list-item>
		<uni-list-item title="茶屋名称">
			<view slot="footer" class="listclass">
				<input v-model="teaMes.name" class="usertext" maxlength="15" @blur="endBlur(teaMes.name)" />
				<image class="hreengicons" style="" src="../../static/icon/change.png" />
			</view>
		</uni-list-item>
	
		<uni-list-item title="茶屋简介">
			<view slot="footer" class="listclass">
				<input v-model="teaMes.introduce" class="usertext" maxlength="40" @blur="endBlurtext(teaMes.introduce)" />
				<image class="hreengicons" style="" src="../../static/icon/change.png" />
			</view>
		</uni-list-item>
		<uni-list-item title="加入方式">
			<view slot="footer" class="listclass" @click="joinchange()">
				<text>{{ jointext }}</text>
				<image class="hreengicons" style="" src="../../static/icon/change.png" />
			</view>
		</uni-list-item>
	
		<!-- <uni-list-item title="加入方式">
			<view slot="footer" class="listclass">
				<input v-model="teaMes.joinMethod" class="usertext" maxlength="50" />
				<image class="hreengicons" style="" src="../../static/icon/change.png" />
			</view>
		</uni-list-item> -->
		
		<view style="padding-bottom:10px;">
			<button class="passwordch" @click="submitchange">完成</button>
			<!-- <button type="default" form-type="reset">Reset</button>@click="submit()" -->
		</view>
	</view>
</template>

<script>
const joinarray = ['自由加入', '审核加入'];

import uniListItem from '../../components/uni-ui/uni-list-item/uni-list-item.vue';
export default {
	components: {
		uniListItem,
	},

	data() {
		return {
			tea_id:0,
			teaMes:[],
		
		};
	},
	computed: {
		jointext() {
			return joinarray[this.teaMes.joinMethod];
		},
	}
,
	onLoad(opt) {
		this.tea_id=opt.tea_id,
		this.getteaMes()
		// this.joinjudge()
	},
	methods: {
		getteaMes() {
			uni.request({
				url: '/api/tearoom/info',
				method: 'POST',
				header: {
					'content-type': 'application/json',
					authorization: this.$store.state.token
				},
				data: {
					roomId: this.tea_id
				},
				success: res => {
					// console.log(JSON.stringify(res));
					this.teaMes = res.data;
					console.log('茶屋信息1');
					console.log(this.teaMes);
				}
			});
		},
		joinchange() {
			uni.showActionSheet({
				itemList: joinarray,
				success: res => {
					this.teaMes.joinMethod= res.tapIndex;
				}
			});
		},
		changeUserpic() {
			var that = this;
			uni.chooseImage({
				count: 1,
				sizeType: ['compressed'],
				sourceType: ['album', 'camera'],
				success: res => {
					// console.log(res);
					this.teaMes.photo = res.tempFilePaths[0];
					uni.uploadFile({
						url: '/api/upload',
						header: {
							// 'content-type':"application/json",
							authorization: that.$store.state.token
						},
						filePath: that.teaMes.photo,
						name: 'file',
						formData: this.sendDate,
						success: res => {
							if (res.statusCode == 200) {
								console.log('图片格式化');
								let imgData = JSON.parse(res.data);
								this.teaMes.photo = imgData.obj;
								console.log(this.teaMes.photo);
							}
						}
					});
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
		submitchange() {
			console.log("头像")
			console.log(this.teaMes)
			uni.request({
						url: '/api/tearoom/editHeadPhoto',
						method: 'POST',
						header: {
							'content-type': 'application/json',
							authorization: this.$store.state.token
						},
						data: {
							roomId:this.tea_id,
							url:this.teaMes.photo,
							// photo:this.teaMes.photo
						
						},
						success: res => {
							console.log("修改头像信息");	
							console.log(res)
							
						},
						fail: res => {
							uni.showToast({
								title: '接口请求失败，稍后再试试',
								icon: 'none'
							});
						}
					});
			uni.request({
					url: '/api/tearoom/edit',
					method: 'POST',
					header: {
						'content-type': 'application/json',
						authorization: this.$store.state.token
					},
					data: {
						id:this.tea_id,
						introduce:this.teaMes.introduce,
						joinMethod:this.teaMes.joinMethod,
						name:this.teaMes.name,
						// photo:this.teaMes.photo
					
					},
					success: res => {
						console.log("修改基本信息");
						console.log(res)
						if(res.statusCode==500){
							uni.showToast({
							title: '只有房主可以进行修改',
							icon: 'none'
						});
						}
						
						if(res.statusCode==200){
							uni.showToast({
							title: '修改成功',
							icon: 'none'
						});
						setTimeout(o=>{
							uni.navigateBack()
						},500)
						
						}
					},
					fail: res => {
						uni.showToast({
							title: '接口请求失败，稍后再试试',
							icon: 'none'
						});
					}
				});
		},
		
	},
	
};
</script>

<style>
.touxiang {
	border-radius: 50%;
	width: 50px;
	height: 50px;
}
.passwordch {
	font-size: 28rpx;
	text-align: center;
	color: white;
	background-color: #81b991;
	width: 90%;
	/* margin-right:50rpx; */
	height: 70rpx;
	line-height: 70rpx;
	border-radius: 10rpx;
	// margin-left:-5rpx;
	margin-top: 20px;
	margin-bottom: 15px;
}
.listclass {
	display: flex;
	align-items: center;
}
.hreengicons {
	width: 30rpx;
	height: 30rpx;
	padding-left: 15px;
}
.usertext {
	text-align: right;
}
.cityclass {
	display: flex;
	align-items: center;
}
.tags {
	width: 100%;
	display: flex;
	/* flex-direction: row; */
	flex-wrap: wrap;
	border-top: 2px solid #eaeaec;
	align-content: flex-start;
}
.tag1 {
	margin-top: 10px;
	margin-left: 10px;
	width: 70px;
	height: 30px;
	border-radius: 20px;
	border: 1px solid #81b991;
	color: #81b991;
	display: flex;
	justify-content: center;
	align-items: center;
}
.tag2 {
	margin-top: 10px;
	margin-left: 10px;
	padding: 0px 10px;
	height: 30px;
	border-radius: 20px;
	border: 1px solid #81b991;
	color: #81b991;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
