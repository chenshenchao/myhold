<template>
	<view class="plan-information-page">
		
	</view>
</template>

<script>
	import {myhold} from '@/common/database.js'
	export default {
		data() {
			return {
				plan: {},
				steps: [],
			};
		},
		async onLoad(param) {
			this.plan = await myhold.find(`SELECT * FROM mh_plan WHERE id=${param.id}`, {});
			this.steps = await myhold.query(`SELECT * FROM mh_plan_step WHERE plan_id=${param.id}`);
		}
	}
</script>

<style lang="scss" scoped>
	.plan-information-page {
		
	}
</style>
