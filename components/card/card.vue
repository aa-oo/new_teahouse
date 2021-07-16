<template>
	<view>
		<div class="hm-friend-information-card">
				<view class="box1" v-for="item in msg">
					<view class="title"><text style="display: table-cell; border-bottom: 1px solid #3f6a4b;font-size:20px;" @click="goArticle"  >{{item.titlename}}</text></view>
					<view class="content">
						<text class="guild">导读：{{item.contentguild}}</text>
					</view>
				</view>
				
		</div>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				msg:[
					{
						titlename:"维基媒体基金会",
						contentguild:"容器默认存在两根轴交叉轴的开始位置叫做cross start，结束位置叫做cross end,结束位置叫做cross end,结束位置叫做cross end,结束位置叫做cross end"
					},
					{
						titlename:"维基媒体基金会",
						contentguild:"容器默认存在两根轴交叉轴的开始位置叫做cross start，结束位置叫做cross end,结束位置叫做cross end开始位置叫做cross start，结束位置叫做cross end,结束位置"
					},
					{
						titlename:"维基媒体基金会",
						contentguild:"容器默认存在两根轴交叉轴的开始位置叫做cross start，结束位置叫做cross end"
					}	
				]
			};
		},
		methods:{
			goArticle(){
				uni.navigateTo({
					url:'../../home/article/article'
				})
			}
		}
	}
</script>

<style>
@import url("./card.css");
</style>
