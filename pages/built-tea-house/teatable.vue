<template>
	<view>
		<view class="tabtop">
			<view class="tabback" @click="goback"><</view>
			<view class="tabtopname">{{tea_name}}</view>
			<view class="tabtopopt" @click="gooption">...</view>
		</view>
		<view class="content">
			<scroll-view class="msg-list" scroll-y="true" :scroll-with-animation="scrollAnimation" :scroll-top="scrollTop" :scroll-into-view="scrollToView" upper-threshold="50">
				<view class="row" v-for="(row, index) in msglist" :key="index">
					<!-- 系统消息 -->
					<block v-if="row.type == 2">
						<view class="system">
							<view class="text">{{ row.msg.content.text }}</view>
						</view>
					</block>
					<!-- 用户消息 -->
					<block v-if="row.type == 1">
						<!-- 自己发出的消息 -->
						<view class="my" v-if="row.userId == user.id">
							<!-- 左-消息 -->
							<view class="left">
								<view class="username"><!-- <view class="time">{{row.createTime}}</view> --></view>
								<view class="bubble"><rich-text :nodes="row.message"></rich-text></view>
							</view>
							<!-- 右-头像 -->
							<view class="right"><image :src="row.headPhoto"></image></view>
						</view>
						<!-- 别人发出的消息 -->
						<view class="other" v-if="row.userId != user.id">
							<!-- 左-头像 -->
							<view class="left"><image :src="row.headPhoto"></image></view>
							<!-- 右-用户名称-时间-消息 -->
							<view class="right">
								<view class="username">
									<view class="name">{{ row.name }}</view>
									<!-- <view class="time">{{row.createTime}}</view> -->
								</view>
								<!-- 文字消息 -->
								<view class="bubble"><rich-text :nodes="row.message"></rich-text></view>
							</view>
						</view>
					</block>
				</view>
			</scroll-view>
		</view>
		
		<!-- 底部输入栏 -->
		<view class="input-box" :class="popupLayerClass" @touchmove.stop.prevent="discard">
			<view class="textbox">
				<view class="text-mode" :class="isVoice ? 'hidden' : ''">
					<view class="box"><textarea auto-height="true" v-model="textMsg" @focus="textareaFocus" /></view>
				</view>
			</view>
		
			<view class="send" :class="isVoice ? 'hidden' : ''" @click="sendText"><view class="btn">发送</view></view>
		</view>
		
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	export default{
		data(){
			return{
				tea_name:'',
				tea_id:0,
				tab_index:0,
				mesdetail: '',
				//文字消息
				textMsg: '',
				//消息列表
				sendmsglist: {
					type: 0,
					userId: 0,
					toId: 0,
					message: ''
				},
				recmsglist:{},
				getteamesid: 0,
				isHistoryLoading: false,
				scrollAnimation: false,
				scrollTop: 0,
				scrollToView: '',
				msgList: [],
				msglist: [],
				msgImgList: [],
				myuid: 0,
				
				//录音相关参数
				// #ifndef H5
				//H5不能录音
				RECORDER: uni.getRecorderManager(),
				// #endif
				isVoice: false,
				voiceTis: '按住 说话',
				recordTis: '手指上滑 取消发送',
				recording: false,
				willStop: false,
				initPoint: { identifier: 0, Y: 0 },
				recordTimer: null,
				recordLength: 0,
				isVoice: false,
				//播放语音相关参数
				AUDIO: uni.createInnerAudioContext(),
				playMsgid: null,
				VoiceTimer: null,
				// 抽屉参数
				popupLayerClass: '',
				// more参数
				hideMore: true,
				//表情定义
				hideEmoji: true,
				trydata:1
			}
		},
		computed: {
			...mapState({
				socketTask: state => state.socketTask,
				user: state => state.user
			})
		},
		onLoad(opt) {
			console.log(opt)
			this.tea_name=opt.tea_name;
			this.tea_id=opt.tea_id
			this.tab_index=opt.tab_index
			
			// this.getteaMes();
			// this.socketTask.onMessage(res=>{
			// 	console.log("data")
			// 	console.log(res)
			// 	// JSON.parse(res)
			// 	this.recmsglist=JSON.parse(res.data)
			// 	if(this.recmsglist.fromId==this.msglist.userId||this.recmsglist.fromId==this.msglist.toId){
			// 		console.log('是我 是我')
			// 		console.log(this.recmsglist)
			// 		// this.
			// 		this.getteaMes()
			// 		this.screenMsg(this.recmsglist)
			// 	}
			// 	else{
			// 		console.log("不是我 是其他人")
			// 		uni.showToast({
			// 			title:"你收到了一条新消息",
			// 			icon: 'none',
			// 			position:'top'
					
			// 		})
			// 	}
				
			// })
			// setInterval(()=>{
			// 	this.onmessage()
			// },1000)
			// setInterval(()=>{
			// 	uni.$emit('onmessage', {
			// 		data: 2})
			//               },1000)
			// uni.$on('onmessage', this.onmessage)
		},
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url:'./tableoption?tea_id='+this.tea_id+'&tab_index=' +this.tab_index
			});
		},
		methods:{
			gooption() {
				uni.navigateTo({
					url:'./tableoption?tea_id='+this.tea_id+'&tab_index=' +this.tab_index
				})
			},
			goback() {
			uni.navigateBack({
				delta: 1
			})
			},
			getteaMes() {
				uni.request({
					url: 'http://101.34.137.197/message/getMessages',
					method: 'POST',
					header: {
						'content-type': 'application/json',
						authorization: this.$store.state.token
					},
					data: {
						page: 1,
						fromId: this.getteamesid,
						rows: 10,
						type: this.mesdetail.type
					},
					success: res => {
						console.log('聊天消息111');
						console.log(res);
						this.msglist = res.data.obj.items;
						console.log(this.msglist);
						this.msglist=this.msglist.reverse()
						// for (i = 0; i < this.m)
						console.log(this.msglist)
						this.$nextTick(function() {
							//进入页面滚动到底部
							this.scrollTop = 9999;
							this.$nextTick(function() {
								this.scrollAnimation = true;
							});
						});
					}
				});
			},
			//获取焦点，如果不是选表情ing,则关闭抽屉
			textareaFocus() {
				if (this.popupLayerClass == 'showLayer' && this.hideMore == false) {
					// this.hideDrawer();
				}
			},
			onmessage(e){
				this.trydata+=e
				this.socketTask.onMessage(res=>{
					console.log("data")
					console.log(res)
					// JSON.parse(res)
					this.recmsglist=JSON.parse(res.data)
					console.log(this.recmsglist)
					// this.
					this.screenMsg(this.recmsglist)
				})
			},
			// 接受消息(筛选处理)
			screenMsg(msg) {
				// socketTask.onMessage(function(){
				// 	console.log(data)
				// })
				//从长连接处转发给这个方法，进行筛选处理
				if (msg.type == 2) {
					// 系统消息
					this.addSystemTextMsg(msg);
				} else if (msg.type == 1) {
					// 用户消息
			
					this.addTextMsg(msg);
				}
				console.log('用户消息');
				//非自己的消息震动
				if (msg.userId != this.user.id) {
					console.log('振动');
					// uni.vibrateLong();
				}
			},
			
			// 发送文字消息
			sendText() {
				// this.hideDrawer(); //隐藏抽屉
				if (!this.textMsg) {
					return;
				}
				console.log(this.textMsg);
			
				// let content = this.replaceEmoji(this.textMsg);
			
				this.sendmsglist.type = this.mesdetail.type;
				if (this.user.id == this.mesdetail.userId) {
					this.sendmsglist.userId = this.user.id;
					this.sendmsglist.toId = this.mesdetail.toId;
				} else {
					this.sendmsglist.userId = this.user.id;
					this.sendmsglist.toId = this.mesdetail.userId;
				}
				this.sendmsglist.message = this.textMsg;
			
				// let msg = {text:content}
				// this.sendMsg(msg,'text');
				this.sendMsg(JSON.stringify(this.sendmsglist), 'text');
				this.textMsg = ''; //清空输入框
			},
			
			// 发送消息
			sendMsg(content, type) {
				//实际应用中，此处应该提交长连接，模板仅做本地处理。
			
				this.socketTask.send({
					data: content,
					complete: res => {
						// console.log(this.try);
						// this.$store.
			
						console.log('send over');
						console.log(res);
					}
				});
				this.getteaMes()
			
				// var nowDate = new Date();
				// let lastid = this.msgList[this.msgList.length-1].msg.id;
				// lastid++;
				// let msg = {type:'user',msg:{id:lastid,time:nowDate.getHours()+":"+nowDate.getMinutes(),type:type,userinfo:{uid:0,username:"大黑哥",face:"/static/img/face.jpg"},content:content}}
				// // 发送消息
				// this.screenMsg(msg);
				// // 定时器模拟对方回复,三秒
				// setTimeout(()=>{
				// 	lastid = this.msgList[this.msgList.length-1].msg.id;
				// 	lastid++;
				// 	msg = {type:'user',msg:{id:lastid,time:nowDate.getHours()+":"+nowDate.getMinutes(),type:type,userinfo:{uid:1,username:"售后客服008",face:"/static/img/im/face/face_2.jpg"},content:content}}
				// 	// 本地模拟发送消息
				// 	this.screenMsg(msg);
				// },3000)
			},
			
			// 添加文字消息到列表
			addTextMsg(msg) {
				this.msglist.push(msg);
			},
			// 添加语音消息到列表
			addVoiceMsg(msg) {
				this.msglist.push(msg);
			},
			
			// 添加系统文字消息到列表
			addSystemTextMsg(msg) {
				this.msglist.push(msg);
			},
			
			discard() {
				return;
			}
		}
		}
	
</script>

<style lang="scss">
	@import '../chat/view/pangugle_chat.scss';
	.tabtop{
		height:80rpx;
		width:100%;
		position:relative;
		background:#81b991;
		color:#FFFDEF;
	}
	.tabtopname{
		position: absolute;
		font-size:35rpx;
		height:80rpx;
		line-height:80rpx;
		 left:50%;
		transform:translate(-50%);
		/* margin-left:30%; */
	}
	.tabtopopt{
		position: absolute;
		font-size:60rpx;
		height:80rpx;
		line-height:80rpx;
		margin-left:90%;
		margin-top:-15rpx;
	}
	.tabback{
		position: absolute;
		font-size:48rpx;
		height:80rpx;
		line-height:80rpx;
		margin-left:2%;
		/* margin-top:-15rpx; */
	}
</style>
