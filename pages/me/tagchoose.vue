<template>
	<view>
		<view class="tagchoos" v-for="(items, index) in tags" @click="addtag(items, index)" :class="{ subl: items.isSelect }">
			<view class="tagtext">{{ items.strength }}</view>
			<view  :class="[items.isSelect?'context1':'context']"><b>√</b></view>
			<!-- :class="{none: i===index}" -->
		</view>
		<!-- <uniListItem  title="列表右侧显示角标" :show-badge="true" badge-text="12" >
					nihao
				</uniListItem>
				<uniListItem title="列表右侧显示 switch"  :show-switch="true"  @switchChange="switchChange" >
					hihihihi
				</uniListItem> -->

		<view class="uni-btn-v">
			<button class="passwordch" @click="goinfo">完成</button>
			<!-- <button type="default" form-type="reset">Reset</button>@click="submit()" -->
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	import uniListItem from '@/components/uni-ui/uni-list/uni-list.vue';
	export default {
		components:{
					uniListItem,
				},
				computed: {
					...mapState({
						
						user: state => state.user
					})
				},
	data() {
		return {
			tags: [],
			intotag: []
			// ishave:false,
			// i:null,
		};
	},
	onLoad() {
		this.tags=this.user.strengths
		console.log(this.tags)
	},
	methods: {
		addtag(items, index) {
			let list = this.tags;
			// this.ishave=false;

			if (list[index].isSelect) {
				list[index].isSelect = false;
				var index0 = this.intotag.findIndex(item => {
					if (item== list[index].tagsName) {
						return true;
					}
				});
				this.intotag.splice(index0, 1); //取消选中
			} else {
				if (this.intotag.length >= 5) {
					uni.showToast({
						title: '最多添加五个标签',
						icon: 'none'
					});
					return;
				}
				list[index].isSelect = true;
				this.intotag.push(items.tagsName);
			}
			this.tags = list;
			console.log(this.intotag);
		},
		goinfo(){
			var pages = getCurrentPages();
			
			var currPage = pages[pages.length - 1]; //当前页面
			
			var prevPage = pages[pages.length - 2]; //上一个页面
			
			
			//直接调用上一个页面的setData()方法，把数据存到上一个页面中去
			// page.setData({a:'a'})改为page.$vm.a='a'
			prevPage.$vm.userInfo.strengths=this.tags
			uni.navigateBack({
				delta:1,
			})
		}
	}
};
</script>

<style lang="scss">
.subl {
	.context {
		background-color:#81b991;
	}
}
.tagchoos {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 43px;
	border-bottom: 2px solid #eaeaec;
}
.tagtext {
	padding-left: 15px;
	color: #1d1d1f;
}
.context1{
	margin-right:20px;
	height:25px;
	width:25px;
	background-color:#81b991;;
	color:#FFFFFF;
	font-size: 16px;
	display:flex;
	align-items: center;
	justify-content: center;
	border-radius:50%;
}
.context {
	// color: #008000;
	margin-right:20px;
	height:25px;
	width:25px;
	background-color:#eaeaec;
	color:#FFFFFF;
	font-size: 16px;
	display:flex;
	align-items: center;
	justify-content: center;
	border-radius:50%;
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
.context1 {
	/* color:#008000; */
}
</style>
