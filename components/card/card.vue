<template>
	<view>
		<div class="hm-friend-information-card">
				<view class="box1" v-for="item in articleList">
					<view class="title"><text style="display: table-cell; border-bottom: 1px solid #81B991;font-size:20px;" @click="goArticle(item)">{{item.name}}</text></view>
					<view class="contents">
						<!-- 导读： -->{{item.content | fontNumber}}<!-- <text class="guild"></text> -->
					</view>
				</view>
				
		</div>
		
	</view>
</template>

<script>
	export default {
		props:['articleList'],
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
				articledetails:''
			};
		},
		methods:{
			goArticle(item){
				this.articledetails=item.id;
				this.navigateTo({	
					url:'../../pages/home/article/article?detail='+JSON.stringify(this.articledetails)
				})
			}
		}
	}
</script>

<style>
@import url("./card.css");
</style>
