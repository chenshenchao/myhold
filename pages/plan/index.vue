<template>
	<view class="plan-index-page">
		<view class="toolbar">
			<plan-search-input v-model="plain"/>
			<view class="addition-button" @click="onClickAdd">添加</view>
		</view>
		<plan-search-table :rows="rows"/>
	</view>
</template>

<script>
	import page from '@/common/page.js'
	import PlanSearchInput from './widget/search-input.vue';
	import PlanSearchTable from './widget/search-table.vue'
	
	export default {
		components: {
			PlanSearchInput,
			PlanSearchTable,
		},
		data() {
			return {
				plain: null,
				rows: [{
					id: 1,
					start_time: '2021-02-17',
					alter_time: '2021-02-18',
					status: '',
					summary: '完成我执',
				}, {
					id: 2,
					start_time: '2021-02-17',
					alter_time: '2021-02-18',
					status: '',
					summary: '完成我执',
				}],
			}
		},
		methods: {
			async onClickAdd() {
				console.log('add')
				await page.navigateTo({
					url: 'addition'
				})
			}
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
