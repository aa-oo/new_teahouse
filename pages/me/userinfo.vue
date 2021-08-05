<template>
	<view>
		<uni-list-item title="头像" >
			<view slot="footer" class="listclass" @click="changeUserpic" >
			<image :src="userpic" class="touxiang"></image>
			<image class="hreengicons" src="../../static/icon/change.png"/>
			</view>
		</uni-list-item>
		<uni-list-item title="昵称">
			<view slot="footer" class="listclass">
			<input v-model="username" class="usertext" maxlength="10" @blur="endBlur(username)"/>
			<image class="hreengicons" style="" src="../../static/icon/change.png" />
			</view>
		</uni-list-item>
		<uni-list-item title="性别">
			<view slot="footer" class="listclass" @click="sexchange()">
			<text>{{sextext}}</text>
			<image class="hreengicons" style="" src="../../static/icon/change.png"/>
			</view>
		</uni-list-item>
		<picker mode="date" @change="ondatachange" v-model="birthday">
		<uni-list-item title="出生年月">
			<view slot="footer" class="listclass">
			<text>{{birthday}}</text>
			<image class="hreengicons" style="" src="../../static/icon/change.png"/>
			</view>
		</uni-list-item>
		</picker>
		<pickerAddress @change="citychange" v-model="city">
		<uni-list-item title="城市" >
			<view slot="footer" class="cityclass">
			<text>{{city}}</text>
			<image class="hreengicons" style="" src="../../static/icon/change.png" />
			</view>
		</uni-list-item>
		</pickerAddress>
		<uni-list-item title="行业">
			<view slot="footer" class="listclass">
			<text>计算机科学与技术</text>
			<image class="hreengicons" style="" src="../../static/icon/change.png"/>
			</view>
		</uni-list-item>
		<uni-list-item title="公司">
			<view slot="footer" class="listclass">
			<input v-model="company" class="usertext"  @blur="endBlur(company)"/>
			<image class="hreengicons" style="" src="../../static/icon/change.png" />
			</view>
		</uni-list-item>
		<uni-list-item title="职位">
			<view slot="footer" class="listclass">
			<input v-model="position" class="usertext"  @blur="endBlur(position)"/>
			<image class="hreengicons" style="" src="../../static/icon/change.png"/>
			</view>
		</uni-list-item>
		<uni-list-item title="邮箱">
			<view slot="footer" class="listclass">
			<input v-model="email" class="usertext"  @blur="endBluremail(email)"/>
			<image class="hreengicons" style="" src="../../static/icon/change.png"/>
			</view>
		</uni-list-item>
		<uni-list-item title="手机号">
			<view slot="footer" class="listclass">
			<input v-model="phone" class="usertext"  @blur="endBlurphone(phone)"/>
			<image class="hreengicons" style="" src="../../static/icon/change.png"/>
			</view>
		</uni-list-item>
		<uni-list-item title="需求">
			<view slot="footer" class="listclass">
			<input v-model="xuqiu" class="usertext" maxlength="50" @blur="endBlur(xuqiu)"/>
			<image class="hreengicons" style="" src="../../static/icon/change.png"/>
			</view>
		</uni-list-item>
		<uni-list-item title="特长">
			<view slot="footer" class="listclass">
			<text>男</text>
			<image class="hreengicons" style="" src="../../static/icon/change.png"/>
			</view>
		</uni-list-item>
		
		<view class="uni-btn-v">
		    <button class="passwordch">完成</button>
		    <!-- <button type="default" form-type="reset">Reset</button>@click="submit()" -->
		</view>
	</view>
</template>

<script>
	const sexarray=['男','女'];
	import uniListItem from '../../components/uni-ui/uni-list-item/uni-list-item.vue';
	import pickerAddress from '../../components/pickeraddress/pickeraddress.vue';
	export default{
		components:{
			uniListItem,
			pickerAddress
		},
		data(){
			return{
				xuqiu:'需要抱大腿大腿大腿大腿大腿大腿大腿大腿',
				userpic:'../../static/hm-friend-information-card/images/img_24031_0_1.png',
				username:'hreeng',
				company:'华北电力大学',
				position:'研究生',
				email:'635306159@qq.com',
				phone:'17325225001',
				sex:0,
				birthday:'2019-02-04',
				city:'河北保定',
			}
		},
		filters: {
			fontxuqiu (date) {
			  const length = date.length
			  if (length > 10) {
			    var str = ''
			    str = date.substring(0, 10) + '...'
			    return str
			  } else {
			    return date
			  }
			}
		  },
		  methods:{
			  changeUserpic(){
				  uni.chooseImage({
				  	count:1,
					sizeType:['compressed'],
					sourceType:["album","camera"],
					success: (res)=> {
						console.log(res);
						this.userpic = res.tempFilePaths[0];
					}
				  })
			  },
			  endBlur(item){
				  if(item.length < 3 ){
						uni.showToast({
							title:'昵称在2~10个字范围内',
							icon:'none'
						})
						// uni.showModal({
						// 	title: '昵称在2~10个字范围内',
						// });
						return false;
				  	}
					return true;
			  },
			  endBlurphone(reg_tel){
				  if (reg_tel === '') {
				  		callback1(new Error('手机号不可为空'));
				  	} 
				  else {
				  		if (reg_tel !== '') {
				  			 var reg=/^1[3456789]\d{9}$/;
				  			if(!reg.test(reg_tel)){
				  			    callback(new Error('请输入有效的手机号码'));
				  			 }
				  		}
				  	}
				  	function callback1(Error){
				  		console.log("name",Error);
				  			 uni.showToast({
				  				title: '手机号码不能为空',
								icon:'none'
				  			});
				  	}
				  	function callback(Error){
				  			         console.log("name",Error);
				  			  		 uni.showToast({
				  			  		 	title: '请输入有效的手机号码',
										icon:'none'
				  			  		 });
				  			  		 
				  	}
			  },
			  sexchange(){
				  uni.showActionSheet({
				      itemList:sexarray,
				      success:(res)=>{
						  this.sex = res.tapIndex;
				      },
				  });
			  },
			  ondatachange(e){
				  this.birthday = e.detail.value;
			  },
			  citychange(data) {
			   		this.city = data.data.join('')
			  },
			  endBluremail(data){
				  let rule= /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
				  if(!rule.test(data)){
					  uni.showToast({
					  	title: '请输入有效邮箱',
					  	icon:'none'
					  });
					  return false;
				  }
				  return true;
			  }
		  },
		  computed: {
		  	sextext() {
		  		return sexarray[this.sex]
		  	}
		  },
	}
</script>

<style>
	.touxiang{
		border-radius: 50%;
		width:50px;
		height:50px;
	}
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
	.listclass{
		display:flex;
		align-items: center;
	}
	.hreengicons{
		width:30rpx;
		height:30rpx;
		padding-left: 15px;
	}
	.usertext{
		text-align: right;
	}
	.cityclass{ 
		display:flex;
		align-items: center;
	}
</style>
