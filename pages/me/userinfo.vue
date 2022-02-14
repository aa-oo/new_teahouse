<template>
	<view>
		<uni-list-item title="头像">
			<view slot="footer" class="listclass" @click="changeUserpic">
				<image :src="userInfo.headPhoto" class="touxiang"></image>
				<image class="hreengicons" src="../../static/icon/change.png" />
			</view>
		</uni-list-item>
		<uni-list-item title="昵称">
			<view slot="footer" class="listclass">
				<input v-model="userInfo.name" class="usertext" maxlength="10" @blur="endBlur(userInfo.name)" />
				<image class="hreengicons" style="" src="../../static/icon/change.png" />
			</view>
		</uni-list-item>
		<uni-list-item title="性别">
			<view slot="footer" class="listclass" @click="sexchange()">
				<text>{{ sextext }}</text>
				<image class="hreengicons" style="" src="../../static/icon/change.png" />
			</view>
		</uni-list-item>
		<picker mode="date" @change="ondatachange" v-model="time">
			<uni-list-item title="出生年月">
				<view slot="footer" class="listclass">
					<text>{{ time }}</text>
					<image class="hreengicons" style="" src="../../static/icon/change.png" />
				</view>
			</uni-list-item>
		</picker>
		<pickerAddress @change="citychange" v-model="userInfo.address">
			<uni-list-item title="城市">
				<view slot="footer" class="cityclass">
					<text>{{ userInfo.address }}</text>
					<image class="hreengicons" style="" src="../../static/icon/change.png" />
				</view>
			</uni-list-item>
		</pickerAddress>
		<uni-list-item title="行业">
			<view slot="footer" class="listclass">
				<text>{{ userInfo.work }}</text>
				<image class="hreengicons" style="" src="../../static/icon/change.png" />
			</view>
		</uni-list-item>
		<uni-list-item title="公司">
			<view slot="footer" class="listclass">
				<input v-model="userInfo.company" class="usertext" @blur="endBlur(userInfo.company)" />
				<image class="hreengicons" style="" src="../../static/icon/change.png" />
			</view>
		</uni-list-item>
		<uni-list-item title="职位">
			<view slot="footer" class="listclass">
				<input v-model="userInfo.occupation" class="usertext" @blur="endBlur(userInfo.occupation)" />
				<image class="hreengicons" style="" src="../../static/icon/change.png" />
			</view>
		</uni-list-item>
		<uni-list-item title="邮箱">
			<view slot="footer" class="listclass">
				<input v-model="userInfo.email" class="usertext" @blur="endBluremail(userInfo.email)" />
				<image class="hreengicons" style="" src="../../static/icon/change.png" />
			</view>
		</uni-list-item>
		<uni-list-item title="手机号">
			<view slot="footer" class="listclass">
				<input v-model="userInfo.phone" class="usertext" @blur="endBlurphone(userInfo.phone)" />
				<image class="hreengicons" src="../../static/icon/change.png" />
			</view>
		</uni-list-item>
		<uni-list-item title="是否隐藏手机号">
			<view slot="footer" class="listclass" @click="endBlurmmphone()">
				<text>{{ phonetext }}</text>
				<image class="hreengicons" style="" src="../../static/icon/change.png" />
			</view>
		</uni-list-item>
		<uni-list-item title="需求">
			<view slot="footer" class="listclass">
				<input v-model="userInfo.need" class="usertext" maxlength="50" @blur="endxq(userInfo.need)" />
				<image class="hreengicons" style="" src="../../static/icon/change.png" />
			</view>
		</uni-list-item>
		<uni-list-item title="技能">
			<view slot="footer" class="listclass">
				<input v-model="userInfo.skill" class="usertext" maxlength="50" @blur="endjn(userInfo.skill)" />
				<image class="hreengicons" style="" src="../../static/icon/change.png" />
			</view>
		</uni-list-item>
		<view class="tags">
			<view class="tag1" @click="addtag">+标签</view>
			<view v-for="(items, index) in activetag" class="tag2" :key="index">
				<span>{{ items.strength }}</span>
				<b style="padding-left:5px" @click="cleartag(index)">×</b>
			</view>
		</view>
		<view style="padding-bottom:10px;">
			<button class="passwordch" @click="submitchange">完成</button>
			<!-- <button type="default" form-type="reset">Reset</button>@click="submit()" -->
		</view>
	</view>
</template>

<script>
const sexarray = ['男', '女'];
const phonearray = ['否', '是'];
import { mapState } from 'vuex';
import dateChangeFormat from '../home/article/change-date.js';
import uniListItem from '../../components/uni-ui/uni-list-item/uni-list-item.vue';
import pickerAddress from '../../components/pickeraddress/pickeraddress.vue';
export default {
	components: {
		uniListItem,
		pickerAddress
	},

	data() {
		return {
			userInfo: {},
			mmphone: 0,
			sex: 1,
			time: '',
			jineng: '必填',
			tags: ['前端', '数据挖掘', 'uni-app', '数字孪生技术', '计算机图形学']
		};
	},
	computed: {
		sextext() {
			return sexarray[this.sex];
		},
		phonetext() {
			return phonearray[this.mmphone];
		},
		activetag: {
			get() {
				return this.userInfo.strengths.filter(items => {
					return items.isSelect;
				});
			},
			set() {}
		},
		...mapState({
			user: state => state.user
		})
	},

	onLoad(opt) {
		this.userInfo = this.user;
		this.time = dateChangeFormat.dateChangeFormat('YYYY-mm-dd ', this.userInfo.birthday);

		this.sexjudge();
		console.log(this.time);
		console.log(this.userInfo);
		console.log('this.user');
	},
	methods: {
		submitchange() {
			// console.log(this.user);
			// console.log(this.userInfo.strengths)
			if(this.phonetext=='是'){
				this.userInfo.privatePhone=true
			}
			else{
				this.userInfo.privatePhone=false
			}
			console.log(this.userInfo.privatePhone)
			uni.request({
				url: '/api/user/edit',
				method: 'POST',
				header: {
					'content-type': 'application/json',
					authorization: this.$store.state.token
				},
				data: {
				
					address: this.userInfo.address,
				
					birthday: this.time,
					company: this.userInfo.company,
					credentialsNonExpired: true,
					email: this.userInfo.email,
					enabled: true,
					gender:this.sextext,
					headPhoto:this. userInfo.headPhoto,
					id: this.userInfo.id,
					label: this.userInfo.label,
					name: this.userInfo.name,
					need: this.userInfo.need,
					occupation: this.userInfo.occupation,
					password: this.userInfo.password,
					phone:this.userInfo.phone,
					privatePhone: this.userInfo.privatePhone,
					skill: this.userInfo.skill,
					userStrengths: this.userInfo.strengths,
					username: this.userInfo.name,
					wchat:this.userInfo.wchat,
					work: this.userInfo.work
				},
				success: res => {
					console.log(res);
					
					uni.showToast({
						title: '修改信息成功',
						icon: 'none'
					});
					// this.productList = res.data.items;
					// console.log(this.articalList);
				},
				fail: res => {
					uni.showToast({
						title: '接口请求失败，稍后再试试',
						icon: 'none'
					});
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
					this.userInfo.headPhoto = res.tempFilePaths[0];
					uni.uploadFile({
						url: '/api/upload',
						header: {
							// 'content-type':"application/json",
							authorization: that.$store.state.token
						},
						filePath: that.userInfo.headPhoto,
						name: 'file',
						formData: this.sendDate,
						success: res => {
							if (res.statusCode == 200) {
								console.log('图片格式化');
								let imgData = JSON.parse(res.data);
								this.userInfo.headPhoto = imgData.obj;
								console.log(this.userInfo.headPhoto);
							}
						}
					});
					// uni.uploadFile({
					// 	url: '/api/user/headPhoto',
					// 	filePath: res.tempFilePaths[0],
					// 	name: 'picturePath',
					// 	header: {
					// 		'content-type': 'application/json',
					// 		authorization: this.$store.state.token
					// 	},
					// 	success: uploadFileRes => {
					// 		if (uploadFileRes.statusCode !== 200) {
					// 			return uni.showToast({
					// 				title: '上传头像失败',
					// 				icon: 'none'
					// 			});
					// 		}
					// 		let data = JSON.parse(uploadFileRes.data);
					// 		console.log(data)
					// 	}
					// });
				}
			});
		},
		endBlur(item) {
			if (item.length < 3) {
				uni.showToast({
					title: '昵称在2~10个字范围内',
					icon: 'none'
				});
				// uni.showModal({
				// 	title: '昵称在2~10个字范围内',
				// });
				return false;
			}
			return true;
		},
		endBlurphone(reg_tel) {
			var reg = /^1[3456789]\d{9}$/;
			if (reg_tel === '') {
				callback1(new Error('手机号不可为空'));
			} else if (reg_tel !== '' && !reg.test(reg_tel)) {
				callback(new Error('请输入有效的手机号码'));
				// if (reg_tel !== '') {
				// 	var reg = /^1[3456789]\d{9}$/;
				// 	if (!reg.test(reg_tel)) {
				// 		callback(new Error('请输入有效的手机号码'));
				// 	}
				// }
			} else {
				uni.request({
					url: '/api/user/checkPhone',
					method: 'GET',
					header: {
						'content-type': 'application/json',
						authorization: this.$store.state.token
					},
					data: {
						phone: reg_tel
					},
					success: res => {
						console.log(res);
						if (res.data) {
							callback2(new Error('手机号码已存在'));
						}
					}
				});
			}
			function callback2(Error) {
				console.log('name', Error);
				uni.showToast({
					title: '手机号码已存在',
					icon: 'none'
				});
			}
			function callback1(Error) {
				console.log('name', Error);
				uni.showToast({
					title: '手机号码不能为空',
					icon: 'none'
				});
			}
			function callback(Error) {
				console.log('name', Error);
				uni.showToast({
					title: '请输入有效的手机号码',
					icon: 'none'
				});
			}
		},
		endBlurmmphone() {
			uni.showActionSheet({
				itemList: phonearray,
				success: res => {
					console.log(res);
					this.mmphone = res.tapIndex;
				}
			});
		},
		sexjudge() {
			if (this.userInfo.gender == '男') {
				this.sex = 0;
			} else {
				this.sex = 1;
			}
			// console.log(this.sex)
		},
		sexchange() {
			uni.showActionSheet({
				itemList: sexarray,
				success: res => {
					this.sex = res.tapIndex;
				}
			});
		},
		ondatachange(e) {
			this.birthday = e.detail.value;
		},
		citychange(data) {
			this.city = data.data.join('');
		},
		endBluremail(data) {
			let rule = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
			if (!rule.test(data)) {
				uni.showToast({
					title: '请输入有效邮箱',
					icon: 'none'
				});
				return false;
			} else {
				uni.request({
					url: '/api/user/checkEmail',
					method: 'GET',
					header: {
						'content-type': 'application/json',
						authorization: this.$store.state.token
					},
					data: {
						email: data
					},
					success: res => {
						console.log(res);
						if (res.data) {
							uni.showToast({
								title: '邮箱已存在',
								icon: 'none'
							});
							return false;
						}
						return true;
					}
				});
			}
		},
		endxq(item) {
			if (item.length < 1) {
				uni.showToast({
					title: '需求不能为空',
					icon: 'none'
				});
				return false;
			}
			return true;
		},
		endjn(item) {
			if (item.length < 1) {
				uni.showToast({
					title: '技能不能为空',
					icon: 'none'
				});
				return false;
			}
			return true;
		},
		cleartag(ind) {
			console.log(ind);
			let arr = this.activetag[ind];
			arr.isSelect = false;
			// this.userInfo.strengths[ind].isSelect=false
			console.log(arr);
			console.log(this.userInfo.strengths);
			// this.activetag = this.activetag.filter(function(value, index, array) {
			// 	return value != arr;
			// });
		},
		addtag() {
			uni.navigateTo({
				url: './tagchoose'
			});
		}
	},
	filters: {
		fontxuqiu(date) {
			const length = date.length;
			if (length > 10) {
				var str = '';
				str = date.substring(0, 10) + '...';
				return str;
			} else {
				return date;
			}
		}
	}
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
