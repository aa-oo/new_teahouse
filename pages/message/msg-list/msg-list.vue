<template>
	<view class="t-wrap">
		<t-slide ref="slide" @edit="edit" @del="del" @itemClick="itemClick">
		
			<template v-slot:default="{ item }">
				<view>
					<div class="hm-friend-information-card">
						<view class="box1" style="height: 270rpx;width: 700rpx;display: flex;flex-direction: row;flex-wrap: nowrap;">
							<view class="box2" style="display: flex;flex-direction: row;">
								<view class="slide-left" style="margin: auto 10rpx;">
									<image class="primary" :src="item.image_src" style="width:130rpx;height: 130rpx;border-radius: 50% ;" />
								</view>

								<view class="side-right">
									<view class="buscardleft" style="margin-left: 5rpx;">
										<view class="context1" style="margin-left: 5rpx;">
											<text class="" style=" font-size:35rpx;">Easter</text>
											<text class="titletext" style="font-size:18rpx;padding:0.1px 10px;">上海</text>
											<image class="buscardicon" src="../../../static/icon/nv1.png" />
										</view>
										<view class="context" style="margin-top: 5rpx;margin-left: 5rpx;">
											<image class="buscardicon" style="margin-left: 0;" src="../../../static/icon/company.png" />
											<text class="titletext" style="font-size:18rpx;margin-top: 0;">国家电网公司</text>
										</view>
										<view class="context" style="margin-top: 0;margin-left: 5rpx;">
											<text class="titletext" style="margin-left: 0;font-size: 20rpx;">行业：电子商务</text>
										</view>
										<view class="context2" style="margin-top: 0;margin-left: 5rpx;line-height: 35rpx;">
											<text class="titletext" style="margin-left: 0;font-size:20rpx;">
												需求：
												<span>{{ xuqiu | fontxuqiu }}</span>
											</text>
										</view>
									</view>
								</view>
							</view>
						</view>
					</div>
				</view>
			</template>
		</t-slide>
	</view>
</template>

<script>
import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue';
import tSlide from '@/components/t-slide/t-slide.vue';
export default {
	components: { tSlide, uniSegmentedControl },
	data() {
		return {
			title: 1,
			teadetail: 'wikimedia是一项全球运动，其使命是将免费的教育内容带给世界。wikimedia是一项全球运动，其使命是将免费的教育内容带给世界。',
			xuqiu: '每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。边框的间隔大一倍。',
			dataList: [],
			dass:'',
		};
	},
	onLoad() {
		this.getteaHouse();
		setTimeout( o =>{
			console.log(this.dataList);
			console.log(22222);
			this.$nextTick(() => {
				this.$refs.slide.assignment(this.dataList);
				console.log(this.dataList);
				console.log(33333);
		});
		},500);
	},
	methods: {
		getteaHouse() {
			uni.request({
				url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
				success: res => {
					this.dataList = res.data.message;
					console.log(this.dataList);
					console.log(11111)
				}
			});
			console.log('先输出这个。')
		},
		back() {
			uni.navigateBack({
				delta: 1
			});
		},
		//点击单行
		itemClick(data) {
			console.log('点击', data);
		},
		//删除
		del(data) {
			console.log('删除', data);
			uni.showToast({
				title: '删除ID--' + data.goods_id,
				icon: 'none'
			});
		},
		//编辑
		edit(data) {
			console.log('编辑', data);
			uni.showToast({
				title: '编辑ID--' + data.goods_id,
				icon: 'none'
			});
		}
	},
	
	filters: {
		fontNumber(date) {
			const length = date.length;
			if (length > 50) {
				var str = '';
				str = date.substring(0, 50) + '...';
				return str;
			} else {
				return date;
			}
		},
		fontxuqiu(date) {
			const length = date.length;
			if (length > 38) {
				var str = '';
				str = date.substring(0, 38) + '...';
				return str;
			} else {
				return date;
			}
		}
	}
};
</script>

<style>
@import '../../home/teaHouse/start.response.css';
@import '../../home/teaHouse/business-card.css';
@import '../../home/teaHouse/titlecard.css';
</style>
