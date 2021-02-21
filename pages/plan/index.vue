<template>
	<view class="plan-index-page">
		<view class="toolbar">
			<plan-search-input v-model="plain"/>
			<view class="addition-button" @click="onClickAdd">添加</view>
		</view>
		<plan-search-table :rows="rows" @click-row="onClickInfo"/>
	</view>
</template>

<script>
	import page from '@/common/page.js';
	import {myhold} from '@/common/database.js';
	import PlanSearchInput from './widget/search-input.vue';
	import PlanSearchTable from './widget/search-table.vue';
	
	export default {
		components: {
			PlanSearchInput,
			PlanSearchTable,
		},
		data() {
			return {
				plain: null,
				rows: [],
			}
		},
		methods: {
			async onClickAdd() {
				await page.navigateTo({
					url: 'addition'
				})
			},
			
			async onClickInfo(row) {
				await page.navigateTo({
					url: `information?id=${row.id}`
				})
			}
		},
		async onLoad() {
			// this.rows = await myhold.query('SELECT * FROM mh_plan');
		},
		async onShow() {
			this.rows = await myhold.query('SELECT * FROM mh_plan');
		},
		mounted() {
		}
	}
</script>

<style lang="scss" scoped>
.plan-index-page {
	.toolbar {
		display: flex;
		align-items: center;
		margin: 10rpx;
		
		.addition-button {
			color: #27f;
			margin: 0 5rpx;
		}
	}
}
</style>
