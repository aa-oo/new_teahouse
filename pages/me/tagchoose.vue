<template>
	<view>
		<view class="tagchoos" v-for="(items, index) in tags" @click="addtag(items, index)" :class="{ subl: items.isSelect }">
			<view class="tagtext">{{ items.tagsName }}</view>
			<view><b class="context">√</b></view>
			<!-- :class="{none: i===index}" -->
		</view>
		<view class="uni-btn-v">
			<button class="passwordch">完成</button>
			<!-- <button type="default" form-type="reset">Reset</button>@click="submit()" -->
		</view>
	</view>
</template>

<script>
export default {
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
		color: red;
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
	padding-right: 15px;
	color: #008000;
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
</style>
