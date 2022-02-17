<template>
	<view>
		<view class="indetailtop">
			<view class="indetailtop1">
				茶屋名称：
				<text>{{ teaname }}</text>
			</view>
			<view class="indetailtop2">
				茶屋房主：
				<text>{{ hostList.name }}</text>
			</view>
			<view class="indoctop3">投资记录</view>
			<view class="indocbox">
				<view class="indocinput">
					<picker @change="bindPickerChange" :range="array">
						<!-- //@change用于获取下拉框改变的值，:range用于循环遍历array数组将数组内容循环 -->
						<label class="indoctitle">会员：</label>
						<label class="">{{ array[index] }}</label>
						<!-- 	//循环array数组index为索引 -->
					</picker>
				</view>
				<view class="indocinput">
					<view class="indoctitle">金额：</view>
					<input class="singinput" name="input" placeholder="请输入金额" v-model="investmoney" />
				</view>
				<view class="indocinput">
					<view class="indoctitle" style="width:85px;">投资日期：</view>
					<view class="uni-list-cell-db">
						<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
							<view class="uni-input">{{ date }}</view>
						</picker>
					</view>
				</view>
			</view>

			<view class="docbutton" @click="sub">提交</view>
			<view class="indetailbottom">
				<scroll-view scroll-y="true" :style="'height:800rpx;'" @scrolltolower="loadmore()">
					<view class="indetailbot1" v-for="items in investList">
						<view><image class="investImg" :src="items.userHeadPhoto"></image></view>
						<view class="indetailbot2">{{ items.username }}</view>
						<view class="indetailbot3">+{{ items.money }}</view>
						<view class="indetailbot4">{{ items.createTime |time}}</view>
					</view>
					<!-- 上拉加载 -->
					<view style="display:flex;align-items: center;justify-content: center;padding:20rpx;">
						<text style="color:#9e9e9e">{{ loadmsg }}</text>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	// import  dateChangeFormat  from '../home/article/change-date.js';
export default {
	data() {
		const currentDate = this.getDate({
			format: true
		});
		return {
			tea_id: 0,
			host_id: 0,
			teaname: '',
			totalpage: 1,
			peopage: 1,
			investpage: 1,
			loadmsg: '上拉加载更多',
			hostList: [],
			teaPeo: [],
			investList: [],
			array: ['请选择会员'],
			index: 0,
			investname:'',
			investmoney:0,
			date: currentDate
		};
	},
	computed: {
		startDate() {
			return this.getDate('start');
		},
		endDate() {
			return this.getDate('end');
		}
	},
	onLoad(opt) {
		this.tea_id = opt.tea_id;
		this.teaname = opt.tea_name;
		this.host_id = opt.host_id;
		// console.log("page"+this.peopage)
		this.getteaInvest();
		this.getteaPeople();
		this.getteaPeo();
			// this.time=dateChangeFormat.dateChangeFormat('YYYY-mm-dd HH:MM:SS', this.articledetail.createTime) 
		// this.getteaPeo1()
		// while(this.peopage<=this.totalpage){
		// 	this.getteaPeo()
		// }
		// console.log("page"+this.peopage)
		// for(;this.peopage<=2;){

		// 	this.getteaPeo1()

		// }
	},
	methods: {
		getteaPeople() {
			uni.request({
				url: '/api/user/info',
				method: 'POST',
				header: {
					'content-type': 'application/json',
					authorization: this.$store.state.token
				},
				data: {
					name: '',
					userId: this.host_id
				},
				success: res => {
					console.log('房主信息');
					this.hostList = res.data.obj;
					console.log(this.hostList);
				}
			});
		},
		getteaPeo() {
			uni.request({
				url: '/api/tearoom/getPartners',
				method: 'POST',
				header: {
					'content-type': 'application/json',
					authorization: this.$store.state.token
				},
				data: {
					roomId: this.tea_id,
					page: 0,
					rows: 0
				},
				success: res => {
					console.log('会员');
					// this.totalpage=res.data.totalPage
					// this.peopage++;
					this.teaPeo = res.data.items;
					for (var i = 0; i < this.teaPeo.length; i++) {
						console.log(this.teaPeo[i].name);
						this.array.push(this.teaPeo[i].name);
					}
					// this.array=[...this.array,...this.teaPeo]
					console.log('会员信息');
					console.log(this.array);
				}
			});
		},
		getteaInvest() {
			uni.request({
				url: '/api/invest/query',
				method: 'GET',
				header: {
					'content-type': 'application/json',
					authorization: this.$store.state.token
				},
				data: {
					rid: this.tea_id,
					page: this.investpage,
					rows: 4,
					sort: 0,
					sortBy: 'create_time'
				},
				success: res => {
					console.log('投资信息');
					this.investList = res.data.items;
					console.log(res.data)
					if (res.data.total == 0) {
						this.loadmsg = '暂无投资';
					}
					if (this.investList.length < 4) {
						this.investpage--;
					}

					// this.investList=[...this.investList,...this.investList]
					console.log(this.investList);
				}
			});
		},
		sub() {
			var that=this
			console.log(this.investname+this.investmoney+this.date)
			console.log(this.teaPeo[that.index-1].userId)
			uni.request({
				url: '/api/invest/create',
				method: 'POST',
				header: {
					'content-type': 'application/json',
					authorization: this.$store.state.token
				},
				data: {
					roomId: this.tea_id,
					money:this.investmoney,
					createTime:this.date,
					userId:this.teaPeo[that.index-1].userId,
					name:this.investname,
					
				},
				success: res => {
					console.log('投资记录成功');
					console.log(res);
					uni.showToast({
						title:res.data.msg,
						icon:'none'
					})
					setTimeout(o => {
						that.getteaInvest()
					}, 500);
					
					
				}
			});
		},

		loadmore() {
			this.loadmsg = '加载中...';
			setTimeout(() => {
				this.loadmsg = '上拉更新推荐';

				this.investpage += 1;
				this.getteaInvest();
			}, 2000);
		},

		//下拉框
		bindPickerChange: function(e) {
			//改变的事件名
			//console.log('picker发送选择改变，携带值为', e.target.value)   用于输出改变索引值
			this.index = e.target.value; //将数组改变索引赋给定义的index变量
			this.investname = this.array[this.index]; //将array【改变索引】的值赋给定义的jg变量
			//	console.log("籍贯为：",this.jg)		//输出获取的籍贯值，例如：中国
		},
		formSubmit: function(e) {
			console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value));
			var formdata = e.detail.value;
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
				success: res => {
					console.log(res);
					// 将选择的本地图片赋值给data中定义的images变量
					this.images = res.tempFilePaths;
					console.log(this.images);
				}
			});
		},
		/* 图片预览 */
		previewPictures(item) {
			uni.previewImage({
				current: item,
				urls: this.images
			});
		},
		bindDateChange: function(e) {
			this.date = e.target.value;
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
			month = month > 9 ? month : '0' + month;
			day = day > 9 ? day : '0' + day;
			return `${year}-${month}-${day}`;
		},
		change(data) {
			this.value = data.data.join('');
		}
	},
	filters: {
		 time:function renderTime(date) {
		    var dateee = new Date(date).toJSON();
		    return (new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')).substring(0,10)
		  },

			// time: function time(value) {
			// 	var d = new Date(parseInt(value) );
			// 	return (d.getFullYear()) + '-' + (d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) + '-' + (d.getDate() > 9 ? d.getDate() : '0' + d.getDate());
			// }
		}
};
</script>

<style>
.indetailtop {
	width: 96%;
	background-color: #d4e7d9;
	height: 730px;
	margin: 0rpx auto;
	border-radius: 10rpx;
	margin-top: 3%;
	position: absolute;
	margin-left: 2%;
	margin-bottom: 10px;
}
.indetailtop1 {
	padding-top: 20rpx;
	/* margin-top:20px; */
	margin-left: 5%;
	/* position: absolute; */
	font-size: 33rpx;
	color: #376042;
}
.indetailtop2 {
	margin-top: 20px;
	margin-left: 5%;
	/* position: absolute; */
	font-size: 33rpx;
	color: #376042;
}
.indoctop3 {
	margin-top: 20px;
	margin-left: 5%;
	/* position: absolute; */
	font-size: 33rpx;
	color: #376042;
}
.indetailbottom {
	width: 90%;
	border-radius: 20rpx;
	margin: 3rpx auto;
	height: 720rpx;
	background-color: #ffffff;
	padding-top: 26px;
	overflow: auto;
}
.indetailbot1 {
	width: 80%;
	margin: 10rpx auto;
	height: 60px;
	/* border:1px solid #222222; */
	border-bottom: 2px solid #008000;
	padding: 15px 10px;
	position: relative;
	margin-bottom: 20px;
}
.investImg {
	border-radius: 110rpx;
	width: 150rpx;
	height: 150rpx;
	/* line-height:150rpx; */
	overflow: hidden;
	position: absolute;
	top: -10rpx;
	left: 15rpx;
	position: absolute;
}
.indetailbot2 {
	font-size: 30rpx;
	margin-left: 32%;
	position: absolute;
	width: 90px;
	overflow: hidden;
}
.indetailbot3 {
	font-size: 30rpx;
	float: right;
	position: absolute;
	width: 90px;
	overflow: hidden;
	color: #008000;
	right: 4px;
}
.indetailbot4 {
	font-size: 30rpx;
	margin-left: 32%;
	position: absolute;
	width: 180px;
	overflow: hidden;
	margin-top: 35px;
}
.docbutton {
	font-size: 30rpx;
	text-align: center;
	margin: 30rpx auto;
	background-color: #81b991;
	width: 70%;
	height: 60rpx;
	line-height: 60rpx;
	border-radius: 10rpx;
	color: #ffffff;
	border: 1px solid #81b991;
}
.indocbox {
	width: 70%;
	border-radius: 20rpx;
	margin: 0rpx auto;
	height: 100px;
	/* background-color: #FFFFFF; */
	/* border:1px solid red; */
	/* padding-top:20px; */
	overflow: auto;
}
.indocinput {
	dispaly: flex;
	flex-direction: row;
	font-size: 30rpx;
	/* border:1px solid yellow; */
	/* height:70rpx; */
	margin-top: 10px;
	/* overflow: hidden; */
}
.indoctitle {
	width: 85px;
	float: left;
	/* text-align: right; */
}
.singinput {
	/* border:0.5px solid green; */
	width: 50%;
}
</style>
