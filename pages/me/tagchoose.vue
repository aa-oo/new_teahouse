<template>
	<view>
		<view class="tagchoos" v-for="(items, index) in tags" @click="addtag(items, index)" :class="{ subl: items.isSelect }">
			<view class="tagtext">{{ items.tagsName }}</view>
			<view class="context"><b>√</b></view>
			<!-- :class="{none: i===index}" -->
		</view>
		<!-- <uniListItem  title="列表右侧显示角标" :show-badge="true" badge-text="12" >
					nihao
				</uniListItem>
				<uniListItem title="列表右侧显示 switch"  :show-switch="true"  @switchChange="switchChange" >
					hihihihi
				</uniListItem> -->

		<view class="uni-btn-v">
			<button class="passwordch">完成</button>
			<!-- <button type="default" form-type="reset">Reset</button>@click="submit()" -->
		</view>
	</view>
</template>

<script>
	import uniListItem from '@/components/uni-ui/uni-list/uni-list.vue';
	export default {
		components:{
					uniListItem,
				},
	data() {
		return {
			tags: [
				{ isSelect: false, tagsName: '前端' },
				{ isSelect: false, tagsName: '人工智能' },
				{ isSelect: false, tagsName: '前端1' },
				{ isSelect: false, tagsName: '人工智能1' },
				{ isSelect: false, tagsName: '人工智能12' },
				{ isSelect: false, tagsName: '人工智能11' },
				{ isSelect: false, tagsName: '人工智能10' }
			],
			intotag: []
			// ishave:false,
			// i:null,
		};
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
