<template>
	<view class="plan-search-table">
		<view class="head">
			<view class="start-at column">开始时间</view>
			<view class="alter-at column">跟进时间</view>
			<view class="status column">状态</view>
		</view>
		<scroll-view class="body">
			<view v-for="row in rows" :key="row.id" class="item" @click="onClickRow(row)">
				<view class="item-head">
					<view class="start-at column">{{row.start_at}}</view>
					<view class="alter-at column">{{row.alter_at}}</view>
					<view class="status column">完成</view>
				</view>
				<view class="item-body">
					{{row.title}}
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {};
		},
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
		}
	}
</script>

<style lang="scss" scoped>
	.plan-search-table {
		.column {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-grow: 0;
			flex-shrink: 0;
			box-sizing: border-box;

			&.start-at {
				width: 39%;
			}

			&.alter-at {
				width: 39%;
			}

			&.status {
				width: 22%;
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
