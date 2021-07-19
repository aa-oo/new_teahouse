<template>
	<view>
		<view class="tablebody">
			<view class="ttabletext">
				<text class="tttext">创建茶桌</text>
				<image class="tableicon" src="../../static/icon/namecard-fill.png" />
			</view>
			<view class="tablehold">
				<form @submit="formSubmit" @reset="formReset">
					<!-- <view class="tabinput1"> -->
					    <view class="tabtitle1" @click="chooseimage"><text>添加照片</text>
						<image v-for="(item,index) in images" :key="index" :src="item" @click="previewPictures(item)"></image>
						</view>
					    <!-- <button class="tabpic" type="primary" @click="uploadPictures">上传图片</button> -->
					    		<!--  -->
					    
					<!-- </view> -->
				    <view class="tabinput1">
				        <!-- <view class="tabtitle">发起人</view> -->
				        <input class="teainput" name="input" disabled placeholder="尚虹霖" />
				    </view> 
				    <view class="tabinput1">
				        <!-- <view class="tabtitle">茶桌名称</view> -->
				        <input class="teainput" name="input" maxlength="15" placeholder="茶桌名称(2~15个字)" />
				    </view> 
					<view class="tabinput2">
					    <!-- <view >茶桌介绍</view> -->
					    <textarea class="teainput1" maxlength="50" placeholder="茶桌简介(最多40个字)"></textarea>
					</view> 
					
					
					
				                <view class="uni-form-item uni-column" style="margin-top: 20px;">
				                    <view class="title" style="float:left;width:180rpx;">加入方式</view>
				                    <radio-group name="radio">
				                        <label>
				                            <radio value="radio1" color="#81b991" /><text>自由加入</text>
				                        </label>
				                        <label>
				                            <radio value="radio2" color="#81b991" /><text>审核加入</text>
				                        </label>
				                    </radio-group>
				                </view>
				               
				                
				                
				                <view class="uni-btn-v">
				                    <button form-type="submit" class="tableadd">立即创建</button>
				                    <!-- <button type="default" form-type="reset">Reset</button> -->
				                </view>
				            </form>
			</view>
		
		</view>
	</view>
</template>

<script>
	export default {
	        data() {
	            return {
					"txt":" ",
					images:[]

	            }
	        },
	        methods: {
	            formSubmit: function(e) {
	                console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
	                var formdata = e.detail.value
	                uni.showModal({
	                    content: '表单数据内容：' + JSON.stringify(formdata),
	                    showCancel: false
	                });
	            },
	            // formReset: function(e) {
	            //     console.log('清空数据')
	            // }
				uploadPictures() {
					uni.chooseImage({
						success:res => {
							console.log(res)
							// 将选择的本地图片赋值给data中定义的images变量
							this.images = res.tempFilePaths;
							console.log(this.images)
						}
					})
				},
				/* 图片预览 */
				previewPictures(item) {
					uni.previewImage({
						current:item,
						urls:this.images
					})
				},
				chooseimage(){
					uni.chooseImage({
										count: 1, //默认9
										sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
										sourceType: ['album'], //从相册选择、摄像头
										success: function(res) {
											console.log(JSON.stringify(res.tempFilePaths));
											 uni.previewImage({
											            urls: res.tempFilePaths,
											            longPressActions: {
											                itemList: ['发送给朋友', '保存图片', '收藏'],
											                success: function(data) {
											                    console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
											                },
											                fail: function(err) {
											                    console.log(err.errMsg);
											                }
											            }
											        });
										}
									});
				}
				
	        }
	    }
</script>

<style>
	.tablebody{
		width:95%;
		margin:0px auto;
		margin-top:10px;
		height:100%;
		display: flex;
		/* align-items: center; */
		/* align-content: center; */
		flex-direction: column;
		/* border-radius: 10rpx;
		box-shadow: 0px 10px 30px rgba(209, 213, 223, 0.5); */
	}
	.ttabletext{
		/* margin-top:5%; */
		margin-left:5%;
		font-size:40rpx;
		/* border:1px solid red; */
		display: flex;
		justify-content:space-between;
		height:100rpx;
		line-height:100rpx;
	}
	.tablehold{
		/* border:1px solid blue; */
		margin-top:3%;
		margin-left:5%;
	}
	.tableicon{
		width: 100rpx;
		height: 100rpx;
		margin-right: 40rpx;
	}
	.tabinput1{
		dispaly:flex;
		flex-direction: row;
		font-size:30rpx;
		/* border:1px solid yellow; */
		height:70rpx;
		/* overflow: hidden; */
	}
	.tabtitle{
		width:180rpx;
		float:left;
		/* text-align: right; */
	}
	.teainput{
		border-bottom:1px solid #dadada;
		width:90%;
		padding:10rpx;
	}
	.teainput1{
		border-bottom:1px solid #dadada;
		width:90%;
		height:65px;
		padding:10rpx;
	}
	.tabtitle1{
		width:90px;
		border:1px solid #dadada;
		margin:0px auto;
		height:90px;
		line-height:90px;
		text-align:center;
		border-radius: 50%;;
		margin-bottom:10px;
		margin-top:-20px;
		color:#808080;
	}
	.tabpic{
		font-size:28rpx ;
		text-align: center;
		color:white;
		background-color: #81B991;
		width:100px;
		height:60rpx;
		line-height:60rpx;
		border-radius: 10rpx;
		margin-top:20rpx;
		margin-left:-18%;
	}
	.tableadd{
		font-size:28rpx ;
		text-align: center;
		color:white;
		background-color: #81B991;
		width:90%;
		margin-right:50rpx;
		height: 70rpx;
		line-height: 70rpx;
		border-radius: 10rpx;
		margin-top:20px;
		margin-bottom:15px;
	}
</style>
