<template>
	<view class="optall">
		<view class="optiontop">
			<view class="optionhy">会员</view>
			<view class="optpeople">
				<view class="optpeo" v-for="item in teaPeo">
					<view class="optpeo1">
						<image class="optpeo1" v-bind:src="item.headPhoto" @click="gobusCard(item)"></image>
					</view>
					<view class="optpeo2" @click="gobusCard(item)">{{item.name}}</view>
				</view>	
					
			</view>
			<!-- <view class="addfriend">+</view> -->
		</view>
		<view class="optionmid">
			<view class="optionmid1">茶屋名称: {{teaMes.name}}</view>
			<view class="optionmid2">茶屋简介: {{ teaMes.introduce  | fontNumber }}</view>
			<view class="optionmid3">
				<text>茶屋投资:</text>
				<button class="optionmid3but" @click="gotoinvest">我也要投资</button>
			</view>
			<view class="optionmid4">
				<text>已收到</text>
				<text class="bottext" style="border-bottom:1px solid #81B991 ;color: #81B991;margin-left: 10rpx;">{{teaMes.invest}}</text>
				<text class="bottext" style="margin-left: 10rpx;">
					<span> &yen</span>
					，来自 
				</text>
				<text class="bottext" style="border-bottom:1px solid #81B991 ;color: #81B991;margin-left: 10rpx;">{{teaMes.investNum}}</text>
				<text class="bottext" style="margin-left: 10rpx;"> 茶友</text>
				<text class="optmidxq" @click="gotodetail">详情</text>
				<text class="optmidjl" @click="gotodoc">记录</text>
			</view>
		</view>
		<view class="optionbottom">
			<view class="optionbottom1">
				<text class="optionbottext1">茶屋文摘</text>
				<text class="optionbottext2" @click="gotonewartical">write+</text>
			</view>
			<view class="optionbottom2">
				<view class="optbotartical" @click="gotoartical">
					<text class="optbotartical1">《创客茶馆》</text>
					<text class="optbotartical2">作者：李静秋</text>
				</view>
				<view class="optbotartical">
					<text class="optbotartical1">《创客茶馆》</text>
					<text class="optbotartical2">作者：李静秋</text>
				</view>
				<view class="optbotartical">
					<text class="optbotartical1">《创客茶馆》</text>
					<text class="optbotartical2">作者：李静秋</text>
				</view>
			</view>
		</view>
		<view class="optionbutton" @click="gotohome">{{teaDel}}</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			tea_id: 0,
			tab_index:0,
			teaDel:'删除茶屋',
			teaMes: [],
			teaPeo:[],
			teaArticle:[],
			peopledetails:'',
			teadetail: 'wikimedia是一项全球运动，其使命是将免费的教育内容带给世界。wikimedia是一项全球运动，其使命是将免费的教育内容带给世界。'
		};
	},
	// onShow() {
	// 	console.log('omload');
	// 	this.getteaMes();
	// },
	onNavigationBarButtonTap() {
		uni.navigateTo({
			url:'./teaedit?tea_id='+JSON.stringify(this.teaMes.id)
		})
	},
	onLoad(opt) {
		this.tea_id = opt.tea_id;
		console.log(this.tea_id)
		this.tab_index=opt.tab_index
		if(this.tab_index==1){
			this.teaDel='离开茶屋'
		}
		this.getteaPeo()
		this.getteaMes();
		this.getroomArticle()
	},

	methods: {
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
					page:0,
					rows:0
				},
				success: res => {
					// console.log(JSON.stringify(res));
					this.teaPeo = res.data.items;
					console.log('会员信息');
					console.log(this.teaPeo);
				}
			});
		},
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
					console.log('茶屋信息');
					console.log(this.teaMes);
				}
			});
		},
		getroomArticle() {
			uni.request({
				url: '/api/roomPaper/getPaper',
				method: 'POST',
				header: {
					'content-type': 'application/json',
					authorization: this.$store.state.token
				},
				data: {
					page: 0,
					roomId: this.tea_id,
					rows: 0,
					
				},
				success: res => {
					// console.log(JSON.stringify(res));
					console.log(res)
					this.teaArticle = res.data;
					console.log('文章信息');
					console.log(this.teaArticle);
				}
			});
		},
		gotoartical() {
			uni.navigateTo({
				url: '../home/article/article'
			});
		},
		gotohome() {
			
			if(this.tab_index==0){
				uni.request({
					url: '/api/tearoom/delete',
					method: 'POST',
					header: {
						'content-type': 'application/json',
						authorization: this.$store.state.token
					},
					data: {
						roomId: this.tea_id,
						name:''
					},
					success: res => {
						
						if(res.data.state==200){
							uni.showToast({
								icon:'none',
								title:'删除茶屋成功'
							})
							setTimeout(o => {
								uni.switchTab({
								url:'../me/me-home'
							})
							}, 500);
						}
					}
				});
			}else{
				uni.request({
					url: '/api/tearoom/exit',
					method: 'POST',
					header: {
						'content-type': 'application/json',
						authorization: this.$store.state.token
					},
					data: {
						roomId: this.tea_id,
					},
					success: res => {
						// console.log(JSON.stringify(res));
						if(res.data.state==200){
							uni.showToast({
								icon:'none',
								title:'退出茶屋成功'
							})
							setTimeout(o => {
								uni.switchTab({
								url:'../me/me-home'
							})
							}, 500);	
						}
					}
				});
			}
		},
		gotoinvest() {
			uni.navigateTo({
				url: './teainvest?host_id='+JSON.stringify(this.teaMes.hostId)
			});
		},
		gotodetail() {
			uni.navigateTo({
				url: './investdetail?tea_id='+JSON.stringify(this.teaMes.id) +'&tea_name=' +this.teaMes.name+'&host_id=' +JSON.stringify(this.teaMes.hostId)
			});
		},
		gotodoc() {
			if(this.tab_index==0){
				uni.navigateTo({
				url: './investdoc?tea_id='+JSON.stringify(this.teaMes.id) +'&tea_name=' +this.teaMes.name+'&host_id=' +JSON.stringify(this.teaMes.hostId)
			});
			}else{
				uni.showToast({
					icon:'none',
					title:'请联系房主进行投资记录'
				})
			}
			
		},
		gobusCard(item) {
			this.peopledetails=item.userId;
			// console.log(this.peopledetails)
			uni.navigateTo({
				url:'../home/business-card/business-card?detail='+JSON.stringify(this.peopledetails),
			})
		},
		gotonewartical() {
			uni.navigateTo({
				url: './newarticals'
			});
		}
	},
	filters: {
		fontNumber(date) {
			const length = date.length;
			if (length > 50) {
				var str = '';
				str = date.substring(0, 35) + '...';
				return str;
			} else {
				return date;
			}
		}
	}
};
</script>

<style>
@import './tableoption.css';
/* @import '../home/teaHouse/start.response.css'; */
</style>
