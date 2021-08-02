<template>
	<view>
		<uni-list-item title="头像">
			<view slot="footer" class="listclass" @click="changeUserpic">
			<image :src="userpic" class="touxiang"></image>
			<image class="hreengicons" style="" src="../../static/icon/change.png" @click="gosettings"/>
			</view>
		</uni-list-item>
		<uni-list-item title="昵称">
			<view slot="footer" class="listclass">
			<text>hreeng</text>
			<image class="hreengicons" style="" src="../../static/icon/change.png" @click="gosettings"/>
			</view>
		</uni-list-item>
		<uni-list-item title="性别">
			<view slot="footer" class="listclass">
			<text>男</text>
			<image class="hreengicons" style="" src="../../static/icon/change.png" @click="gosettings"/>
			</view>
		</uni-list-item>
		<uni-list-item title="出生年月">
			<view slot="footer" class="listclass">
			<text>1999-04-17</text>
			<image class="hreengicons" style="" src="../../static/icon/change.png" @click="gosettings"/>
			</view>
		</uni-list-item>
		<uni-list-item title="城市">
			<view slot="footer" class="listclass">
			<text>河北保定</text>
			<image class="hreengicons" style="" src="../../static/icon/change.png" @click="gosettings"/>
			</view>
		</uni-list-item>
		<uni-list-item title="行业">
			<view slot="footer" class="listclass">
			<text>计算机科学与技术</text>
			<image class="hreengicons" style="" src="../../static/icon/change.png" @click="gosettings"/>
			</view>
		</uni-list-item>
		<uni-list-item title="公司">
			<view slot="footer" class="listclass">
			<text>华北电力大学</text>
			<image class="hreengicons" style="" src="../../static/icon/change.png" @click="gosettings"/>
			</view>
		</uni-list-item>
		<uni-list-item title="职位">
			<view slot="footer" class="listclass">
			<text>研究生</text>
			<image class="hreengicons" style="" src="../../static/icon/change.png" @click="gosettings"/>
			</view>
		</uni-list-item>
		<uni-list-item title="邮箱">
			<view slot="footer" class="listclass">
			<text>635306159@qq.com</text>
			<image class="hreengicons" style="" src="../../static/icon/change.png" @click="gosettings"/>
			</view>
		</uni-list-item>
		<uni-list-item title="手机号">
			<view slot="footer" class="listclass">
			<text>17325226235</text>
			<image class="hreengicons" style="" src="../../static/icon/change.png" @click="gosettings"/>
			</view>
		</uni-list-item>
		<uni-list-item title="需求">
			<view slot="footer" class="listclass">
			<text>{{xuqiu | fontxuqiu}}</text>
			<image class="hreengicons" style="" src="../../static/icon/change.png" @click="gosettings"/>
			</view>
		</uni-list-item>
		<uni-list-item title="特长">
			<view slot="footer" class="listclass">
			<text>男</text>
			<image class="hreengicons" style="" src="../../static/icon/change.png" @click="gosettings"/>
			</view>
		</uni-list-item>
		
		<view class="uni-btn-v">
		    <button class="passwordch">完成</button>
		    <!-- <button type="default" form-type="reset">Reset</button>@click="submit()" -->
		</view>
	</view>
</template>

<script>
	import uniListItem from '../../components/uni-ui/uni-list-item/uni-list-item.vue';
	export default{
		components:{
			uniListItem,
		},
		data(){
			return{
				xuqiu:'需要抱大腿大腿大腿大腿大腿大腿大腿大腿',
				userpic:'../../static/hm-friend-information-card/images/img_24031_0_1.png'
			}
		},
		filters: {
			fontxuqiu (date) {
			  const length = date.length
			  if (length > 10) {
			    var str = ''
			    str = date.substring(0, 10) + '...'
			    return str
			  } else {
			    return date
			  }
			}
		  },
		  methods:{
			  changeUserpic(){
				  uni.chooseImage({
				  	count:1,
					sizeType:['compressed'],
					sourceType:["album","camera"],
					success: (res)=> {
						console.log(res)
					}
				  })
			  }
		  }
	}
</script>

<style>
	.touxiang{
		border-radius: 50%;
		width:50px;
		height:50px;
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
	.listclass{
		display:flex;
		align-items: center;
	}
	.hreengicons{
		width:30rpx;
		height:30rpx;
		padding-left: 15px;
	}
</style>
