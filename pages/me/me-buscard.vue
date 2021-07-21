<template>
	<view class="">
		<view class="status_bar"> <!-- 这里是状态栏 --> </view>
		<uni-nav-bar left-icon="back" left-text="返回" right-text="菜单" title="导航栏组件"></uni-nav-bar>
		
	</view>
</template>
<script>
	import uniNavBar from '@/uni_modules/uni-nav-bar/uni-nav-bar.vue'
	export default {
		data(){
			return{
				
			}
		},
		components: {
			// uniNavBar,
			}
	}
</script>
<style>
	.status_bar {
	      height: var(--status-bar-height);
	      width: 100%;
	  }
</style>

