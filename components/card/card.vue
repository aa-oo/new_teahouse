<template>
	<view>
		<div class="hm-friend-information-card">
				<view class="box1" v-for="item in articalList">
					<view class="title"><text style="display: table-cell; border-bottom: 1px solid #81B991;font-size:20px;" @click="goArticle">{{item.name}}</text></view>
					<view class="contents">
						<!-- 导读： -->{{item.content | fontNumber}}<!-- <text class="guild"></text> -->
					</view>
				</view>
				
		</div>
		
	</view>
</template>

<script>
	export default {
		props:['articalList'],
		filters: {
			fontNumber (date) {
			  const length = date.length
			  if (length > 40) {
			    var str = ''
			    str = date.substring(0, 40) + '...'
			    return str
			  } else {
			    return date
			  }
			},
		},
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
				this.navigateTo({
					url:'../../home/article/article'
				})
			}
		}
	}
</script>

<style>
@import url("./card.css");
</style>
