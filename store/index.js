import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state:{
		loginStatus:false,
		ip:'http://101.34.137.197',
		token:'',
		user:{
			 // "id": 10,
			 //      "name": "李云飞",
			 //      "gender": "男",
			 //      "headPhoto": "https://pic.imgdb.cn/item/611a03d15132923bf836f950.jpg",
			 //      "birthday": "2021-08-20T16:00:00.000+00:00",
			 //      "address": "河北保定",
			 //      "work": "it",
			 //      "company": "华电",
			 //      "occupation": "学生",
			 //      "phone": "13673564951",
			 //      "email": "2039906074@qq.com",
			 //      "privatePhone": false,
			 //      "label": "好人好人好人",
			 //      "wchat": "w13673564951",
			 //      "need": "沃尔沃二归属",
			 //      "strengths": [
			 //        {
			 //          "strengthId": 1,
			 //          "strength": "前端",
			 //          "isSelect": false
			 //        },
			 //        {
			 //          "strengthId": 2,
			 //          "strength": "后台",
			 //          "isSelect": false
			 //        },
			 //        {
			 //          "strengthId": 3,
			 //          "strength": "人工智能",
			 //          "isSelect": false
			 //        },
			 //        {
			 //          "strengthId": 4,
			 //          "strength": "云计算",
			 //          "isSelect": false
			 //        },
			 //        {
			 //          "strengthId": 5,
			 //          "strength": "游戏开发",
			 //          "isSelect": false
			 //        },
			 //        {
			 //          "strengthId": 6,
			 //          "strength": "数字孪生",
			 //          "isSelect": false
			 //        },
			 //        {
			 //          "strengthId": 7,
			 //          "strength": "AR/VR/MR",
			 //          "isSelect": false
			 //        },
			 //        {
			 //          "strengthId": 8,
			 //          "strength": "区块链",
			 //          "isSelect": false
			 //        },
			 //        {
			 //          "strengthId": 9,
			 //          "strength": "边缘计算",
			 //          "isSelect": false
			 //        },
			 //        {
			 //          "strengthId": 10,
			 //          "strength": "计算机体系结构",
			 //          "isSelect": false
			 //        },
			 //        {
			 //          "strengthId": 11,
			 //          "strength": "数据结构与算法",
			 //          "isSelect": false
			 //        },
			 //        {
			 //          "strengthId": 12,
			 //          "strength": "UI",
			 //          "isSelect": false
			 //        },
			 //        {
			 //          "strengthId": 13,
			 //          "strength": "机器学习",
			 //          "isSelect": false
			 //        },
			 //        {
			 //          "strengthId": 14,
			 //          "strength": "物联网",
			 //          "isSelect": false
			 //        },
			 //        {
			 //          "strengthId": 15,
			 //          "strength": "机器人开发",
			 //          "isSelect": false
			 //        },
			 //        {
			 //          "strengthId": 16,
			 //          "strength": "计算机网络",
			 //          "isSelect": false
			 //        },
			 //        {
			 //          "strengthId": 17,
			 //          "strength": "安全渗透",
			 //          "isSelect": false
			 //        },
			 //        {
			 //          "strengthId": 18,
			 //          "strength": "逆向破解",
			 //          "isSelect": false
			 //        },
			 //        {
			 //          "strengthId": 19,
			 //          "strength": "计算机视觉",
			 //          "isSelect": false
			 //        },
			 //        {
			 //          "strengthId": 20,
			 //          "strength": "自然语言处理",
			 //          "isSelect": false
			 //        }
			 //      ],
			 //      "skill": "法定三分类",
			 //      "account": 932765
		},
		// Socket链接状态
		IsOpen:false,
		//SocketTask
		socketTask:false,
		//是否上线（会员id绑定客户id，验证用户身份，通过则绑定）
		IsOnline:false,
		msgconnect:{}
	},
	mutations:{
		Login(state,user){
			state.loginStatus = true;
			state.user=user;
			// uni.setStorageSync('user',JSON.stringify());
			uni.setStorageSync('user',user);
		},
		Token(state,token){
			state.token=token;
			uni.setStorageSync('token',token);
		},
		SocketTask(state,socketTask){
			state.IsOpen=true
			state.socketTask=socketTask;
			uni.setStorageSync('SocketTask',socketTask);
		},
			// 登录初始化状态 
		initUser(state){
			let user = uni.getStorageSync('user');
			let token = uni.getStorageSync('token');
			let socketTask = uni.getStorageSync('socketTask');
			if(user){
				state.loginStatus = true;
				state.user = JSON.parse(user);
				state.token = token;
				state.socketTask=socketTask
			}
		},
		logout(state){
			state.loginStatus = false;
			state.user={};
			state.token='';
			state.socketTask=false
			uni.removeStorageSync('user');
			uni.removeStorageSync('token');
			uni.removeStorageSync('socketTask');
		},
		onMessage(state){
			if(state.socketTask==false){
				return
			}
			state.socketTask.onMessage(res=>{
				console.log('zzz')
				console.log(res.data)
				if(res.data!=null){
					uni.showToast({
						title:"你收到了一条消息",
						icon:'none'
					})
				}
			})
		}
	},
	// actions:{
	// 	//打开socket
	// 	openSocket({state,dispatch}){
	// 		//防止重复链接
	// 		if(state.IsOpen) return
	// 		//链接
	// 		state.SocketTask = uni.connectSocket({
	// 			url: 'ws://101.34.137.197/connection/', //仅为示例，并非真实接口地址。
	// 			complete: ()=> {}
	// 		});
	// 		if(!state.SocketTask) return
	// 		//监听开启
	// 		state.SocketTask.onOpen(()=>{
	// 			//将链接状态设为已连接
	// 			console.log('将链接状态设为已连接')
	// 			state.IsOpen=true
	// 		})
	// 		//监听关闭
	// 		state.SocketTask.onClose(()=>{
				
	// 			console.log('链接已关闭')
	// 			state.IsOpen=false;
	// 			state.SocketTask=false
	// 			//清空会话列表
	// 			//更新未读提示
				
	// 		})
	// 		//监听错误
	// 		state.SocketTask.onError(()=>{
				
	// 			console.log('链接错误')
	// 			state.IsOpen=false;
	// 			state.SocketTask=false
				
	// 		})
	// 		//监听接受消息
	// 		state.SocketTask.onMessage((e)=>{
				
	// 			console.log('接受消息',e)
	// 			state.IsOpen=false;
	// 			state.SocketTask=false
	// 			//清空会话列表
	// 			//更新未读提示
				
	// 		})
	// 	}
	// }
	
})