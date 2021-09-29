import Vue from 'vue'
import App from './App'
import store from './store/index.js';

Vue.prototype.$store = store
Vue.config.productionTip = false

//权限验证
Vue.prototype.checkAuth = (callback) =>{
	//权限验证
	if(!store.state.loginStatus){
		uni.showToast({
			title:"请先登录",
			icon:'none'
		});
		return uni.navigateTo({
			url:'/pages/index/login'
		})
	};
	callback()
}
//权限验证跳转
Vue.prototype.navigateTo = (options)=>{
	if(!store.state.loginStatus){
		uni.showToast({
			title:"请先登录",
			icon:'none'
		});
		return uni.navigateTo({
			url:'/pages/index/login'
		})
	};
	uni.navigateTo(options)
}

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
