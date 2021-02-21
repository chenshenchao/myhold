<template>
	<view class="content">
		<image class="logo" src="/static/image/hold.png"></image>
		<view class="text-area">
			<text class="title">我执</text>
		</view>
	</view>
</template>

<script>
	import page from "@/common/page.js"
	import time from "@/common/time.js"
	
	export default {
		data() {
			return {
				title: ''
			}
		},
		onLoad() {

		},
		async onReady() {
			await time.wait(1000);
			await page.switchTab({
				url: '../star/index'
			});
		},
		methods: {

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
