<template>
	<view>
		<!-- <view class="newarticaltop">
			
		</view> -->
		<view class="newarticaltop">
		    <input class="newartical1" name="input"maxlength="15" placeholder="请输入标题"  />
		</view> 
		<view class="newarticalmid">
		    <input class="newartical2" name="input"  disabled placeholder="尚虹霖" />
		</view>
		<view class="newarticalnext"></view>
		<view class="">
		    
		    <textarea class="newartical3"  placeholder="从这里开始写正文"></textarea>
		</view> 
	</view>
</template>

<script>
</script>

<style>
	.newarticaltop{
		dispaly:flex;
		flex-direction: row;
		height:70rpx;
		/* overflow: hidden; */
		margin:0px auto;
		padding-top:30px;
		/* margin-left:10%; */
		width:80%;
	}
	.newarticalmid{
		height:70rpx;
		/* overflow: hidden; */
		margin:0px auto;
		padding-top:10px;
		width:80%;
	}
	.newartical1{
		/* border:0.5px solid green; */
		/* text-align: center; */
		font-size:50rpx;
	}
	.newartical2{
		/* border:0.5px solid green; */
		/* text-align: center; */
		font-size:40rpx;
	}
	.newarticalnext{
		border-bottom:2px solid #dadada;
		height:10px;
		/* overflow: hidden; */
		margin:0px auto;
		/* padding-top:10px; */
		width:80%;
		}
	.newartical3{
		width:80%;
		height:500px;
		margin:0px auto;
		margin-top:10px;
		/* border-bottom:2px solid black; */
	}
</style>
