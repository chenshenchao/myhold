<template>
	<view class="plan-addition-page">
		<plan-detail-form/>
	</view>
</template>

<script>
	import PlanDetailForm from './widget/detail-form.vue'
	
	export default {
		components: {
			PlanDetailForm,
		},
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.plan-addition-page {}
</style>
