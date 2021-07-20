<template>
	<view>
		<view class="signbody">
			
			<view class="tablehold">
				<form @submit="formSubmit" @reset="formReset">
					<view class="uni-form-item uni-column" style="margin-bottom:20rpx;">
						<view class="signtext">
								<text class="signtext1">头像</text>
								<view class="signtext2">
									<text>上传照片</text>
								</view>
				<!-- <image class="tableicon" src="../../static/icon/namecard-fill.png" /> -->
						</view>
						
						
					    <view class="title" style="float:left;width:180rpx;">性别</view>
					    <radio-group name="radio">
					        <label>
					            <radio value="radio1" color="#81b991" /><text>男</text>
					        </label>
					        <label>
					            <radio value="radio2" color="#81b991" /><text>女</text>
					        </label>
					    </radio-group>
					</view>
				    <view class="signinput1">
				        <view class="signtitle">昵称</view>
				        <input class="singinput" name="input" maxlength="10" placeholder="请输入昵称(2~10个字)"  />
				    </view> 
					<view class="signinput1">
					    <view class="signtitle">密码</view>
					    <input class="singinput"password  name="input" placeholder="请输入密码"  />
					</view> 
					<view class="signinput1">
					    <view class="signtitle"> 出生年月</view>
					    <view class="uni-list-cell-db">
					        <picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
					            <view class="uni-input">{{date}}</view>
					        </picker>
					    </view>
					</view>
					<view class="signinput1">
					    <view class="signtitle">城市</view>
					    <pickerAddress @change="change">{{value}}</pickerAddress>
					</view> 
				    <view class="signinput1">
				        <view class="signtitle">行业</view>
				        <input class="singinput" name="input" maxlength="10" placeholder="请输入行业" />
				    </view>
					 <view class="signinput1">
					     <view class="signtitle">公司</view>
					     <input class="singinput" name="input" placeholder="请输入入职公司"  />
					 </view> 
					 <view class="signinput1">
					     <view class="signtitle">职位</view>
					     <input class="singinput" name="input"  placeholder="请输入职位" />
					 </view> 
					 <view class="signinput1">
					     <view class="signtitle">邮箱</view>
					     <input class="singinput" name="input" placeholder="请输入邮箱"  />
					 </view> 
					 <view class="signinput1">
					     <view class="signtitle">手机号</view>
					     <input class="singinput"type="number" name="input" placeholder="请输入手机号"  />
					 </view> 
					 <view class="uni-form-item uni-column" style="margin-bottom: 20rpx;">
				                    <view class="title" style="float:left;width:180rpx;">隐藏手机号</view>
				                    <radio-group name="radio">
				                        <label>
				                            <radio value="radio1" color="#81b991" /><text>是</text>
				                        </label>
				                        <label>
				                            <radio value="radio2" color="#81b991" /><text>否</text>
				                        </label>
				                    </radio-group>
				                </view>
					 <view class="signinput1">
					     <view class="signtitle">微信号</view>
					     <input class="singinput" name="input" placeholder="请输入为微信号"  />
					 </view> 
					<view ><!-- class="signinput1" -->
					    <view class="signtitle" >需求</view>
					    <textarea class="singinput1" maxlength="50" placeholder="请输入您的需求(50个字以内)"></textarea>
					</view> 
					<!-- <view class="tabinput2">v-model="txt" 
					    <view class="tabtitle1" >茶桌封面</view>
					    <button class="tabpic" type="primary" @click="uploadPictures">上传图片</button>
					    		<image v-for="(item,index) in images" :key="index" :src="item" @click="previewPictures(item)"></image>
					    
					</view> -->
					
					
				                
				               
				                
				                
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
	import pickerAddress from '../../components/pickeraddress/pickeraddress.vue'
	export default {
			components: {
						pickerAddress
					},
	        data() {
				const currentDate = this.getDate({
		            format: true
		        })
	            return {
					"txt":" ",
					images:[],
					date: currentDate,
					value:"请选择地区",
	
	            }
	        },
			computed: {
			        startDate() {
			            return this.getDate('start');
			        },
			        endDate() {
			            return this.getDate('end');
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
				bindDateChange: function(e) {
				    this.date = e.target.value
				},
				getDate(type) {
				            const date = new Date();
				            let year = date.getFullYear();
				            let month = date.getMonth() + 1;
				            let day = date.getDate();
				
				            if (type === 'start') {
				                year = year - 60;
				            } else if (type === 'end') {
				                year = year + 2;
				            }
				            month = month > 9 ? month : '0' + month;;
				            day = day > 9 ? day : '0' + day;
				            return `${year}-${month}-${day}`;
				},
				 change(data) {
				 				this.value = data.data.join('')
				},
				
	        }
	    }
</script>

<style>
	.signbody{
		width:95%;
		margin:20rpx auto;
		/* border:1px solid #81b991; */
		height:100%;
		display: flex;
		/* align-items: center; */
		/* align-content: center; */
		flex-direction: column;
		border-radius: 10rpx;
		box-shadow: 0px 10px 30px rgba(209, 213, 223, 0.5);
		margin-top:20px;
	}
	.signtext{
		margin-top:5%;
		font-size:30rpx;
		/* border:1px solid red; */
		display: flex;
		justify-content:space-between;
		height:60px;
		line-height:60rpx;
		flex-direction: row;
	}
	.signtext2{
		font-size:14px;
		width:70px;
		border:1px solid #dadada;
		margin:0px auto;
		height:70px;
		line-height:70px;
		text-align:center;
		border-radius: 50%;;
		margin-bottom:10px;
		margin-top:-20px;
		color:#808080;
		margin-left:19%;
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
	.signinput1{
		dispaly:flex;
		flex-direction: row;
		font-size:30rpx;
		/* border:1px solid yellow; */
		height:40px;
		/* line-height:70px; */
		/* overflow: hidden; */
	}
	.signtitle{
		width:180rpx;
		float:left;
		/* text-align: right; */
	}
	.singinput{
		/* border:0.5px solid green; */
		width:50%;
	}
	.singinput1{
		/* border:0.5px solid green; */
		width:65%;
		margin-left:26%;
		height:70px;
	}
	.tabtitle1{
		width:180rpx;
		float:left;
		height:40px;
		line-height:40px;
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
		/* margin-right:50rpx; */
		height: 70rpx;
		line-height: 70rpx;
		border-radius: 10rpx;
		margin-left:-5rpx;
		margin-top:20px;
		margin-bottom:15px;
	}
</style>
