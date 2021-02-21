<template>
	<view class="hold-structure-table">
		<view class="head">
			<view class="start-time column">开始时间</view>
			<view class="end-time column">结束时间</view>
		</view>
		<scroll-view class="body">
			<view v-for="row in rows" :key="row.id" class="item" @click="onClickRow(row)">
				<view class="item-head">
					<view class="start-time column">{{row.start_at}}</view>
					<view class="end-time column">{{row.end_at}}</view>
				</view>
				<view class="item-body">
					{{row.filename}}
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		props: {
			rows: {
				type: Array,
				default: () => [],
			},
		},
		methods: {
			onClickRow(row) {
				this.$emit('click-row', row);
			}
		},
	}
</script>

<style lang="scss" scoped>
	.hold-structure-table {
		.column {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-grow: 0;
			flex-shrink: 0;
			box-sizing: border-box;
		
			&.start-time {
				width: 50%;
			}
		
			&.end-time {
				width: 50%;
			}
		}
		
		.head {
			display: flex;
			align-items: center;
			justify-content: space-around;
			margin-bottom: 10rpx;
			padding-bottom: 10rpx;
			border-bottom: 1rpx solid #ddd;
		}
		
		.item {
			border-bottom: 1rpx solid #eee;
			
			.item-head {
				display: flex;
				align-items: center;
				justify-content: space-around;
				font-size: 22rpx;
				font-weight: lighter;
				color: #AAA;
			}
			.item-body {
				text-indent: 2em;
			}
		}
	}
</style>
