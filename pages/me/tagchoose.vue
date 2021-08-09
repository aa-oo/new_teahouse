<template>
	<view>
		<view class="tagchoos" v-for="(items,index) in tags" @click="addtag(index)">
			<view class="tagtext">{{items}}</view>
			<view ><b class="context">√</b></view><!-- :class="{none: i===index}" -->
		</view>
		<view class="uni-btn-v">
		    <button class="passwordch">完成</button>
		    <!-- <button type="default" form-type="reset">Reset</button>@click="submit()" -->
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				tags:['前端','人工智能','Linux','axios','计算机图形学','电力物联网','数据挖掘','uni-app','数字孪生技术','虚拟现实'],
				intotag:[],
				ishave:false,
				i:null,
			}
		},
		methods:{
			addtag(index){
				this.ishave=false;
				if(this.intotag.length >= 5){
					uni.showToast({
						title:'最多添加五个标签',
						icon:'none'
					});
					return;
				}
				// this.i=index;
				for(var i=0;i<=this.intotag.length;i++){
					if(this.intotag[i] == this.tags[index]){
						this.ishave = true;
					}
				}
				if(this.ishave == false){
					this.intotag.push(this.tags[index]);
				}
				console.log(this.intotag)
			}
		}
	}
</script>

<style>
	.tagchoos{
		display:flex;
		justify-content: space-between;
		align-items: center;
		height:43px;
		border-bottom:2px solid #eaeaec;
	}
		.tagtext{
			padding-left:15px;
			color:#1d1d1f;
		}
	.context{
		padding-right:15px;
		color:#008000;
	}
	.passwordch{
		font-size:28rpx ;
		text-align: center;
		color:white;
		background-color: #81B991;
		width:90%;
		/* margin-right:50rpx; */
		height: 70rpx;
		line-height: 70rpx;
		border-radius: 10rpx;
		// margin-left:-5rpx;
		margin-top:20px;
		margin-bottom:15px;
	}
</style>
