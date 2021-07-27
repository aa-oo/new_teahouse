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
		
		
		<view style="margin-top: 20rpx;">
			<view class="img" v-for="(item, i) in imgList" :key='i' @click="ViewImage(i)">
					<image style="width: 100%;height: 100%;" :src="item.uri"></image>
					<view @click.stop="DelImg(i)" style="display: inline;">
						<uni-icons type="closeempty" class="close" size="20"></uni-icons>
					</view>
			</view>
			<view class="camera" @tap="ChooseImage">
				<uni-icons type="camera" size="40"></uni-icons>
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
										count:5,
										sizeType: "original",
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
				},
			
				ChooseImage(_this, key = '') {
					uni.chooseImage({	
						success: (res) => {
						// 拿到上传的图片列表进行遍历压缩。
							let images = res.tempFilePaths;
							for (let i = 0; i < images.length; i++) {
								compressImage(images[i], _this, function(path, name, _this) {
								// 这里的图片数组我给封装成一个对象也是后台需要。自行调节，后面的预览图片同样。 
									_this.imgList.push({
											"name": key + name, 
											"uri": path
									})
								});
							}
							
						}
					})
				},
				// 压缩图片 
				// src: 压缩转换原始图片的路径
				// _this: 当前的this，如果不想传递this可将该函数改为箭头函数
				// callback: 回调函数，详情chooseImage方法
				 compressImage(src, _this, callback) {
					var dstname = "_doc/IMG-" + (new Date()).valueOf() + ".jpg"; //设置压缩后图片的路径 
					var width, height, quality;
					width = "80%";
					height = "80%";
					quality = 80;
					// 具体情况可查看HTML5+文档 ===> http://www.html5plus.org/doc/zh_cn/zip.html#plus.zip.compressImage
					plus.zip.compressImage({
							src: src,
							dst: dstname,
							overwrite: true,
							quality: quality,
							width: width,
							height: height
						},
						function(event) {
							callback(event.target, dstname, _this);
						},
						function(error) {
							return src;
						});
				},
				
				// i： 选择的图片索引
				// imgList： 自行封装的图片数组
				ViewImage(i, imgList) {
					let imgurl = []
					imgList.forEach(item => imgurl.push(item.uri))
					uni.previewImage({
						urls: imgurl,
						current: imgList[i].uri
					});
				},
				
				// i: 删除图片的索引
				// _this: 当前的this，如果不想传递this可将该函数改为箭头函数
				DelImg(i, _this) {
					uni.showModal({
						title: '提示',
						content: '确定要删除照片吗？',
						cancelText: '取消',
						confirmText: '确定',
						success: res => {
							if(res.confirm) {
								_this.imgList.splice(i, 1)
							}
						}
					})
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
		background-color: rgba(0, 0, 0, .4);
		color: #fff;
	}
	.camera {
		display: inline-block;
		width: 166rpx;
		height: 166rpx;
		text-align: center;
		line-height: 166rpx;
		font-size: 46rpx;
		border: 1rpx dotted #8C9697;
		color: #8C9697;
		margin-bottom: 10rpx;
	}
</style>
