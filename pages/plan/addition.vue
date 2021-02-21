<template>
	<view class="plan-addition-page">
		<plan-detail-form :plan.sync="plan" :steps.sync="steps" />
		<button @click="onClickAdd">添加</button>
	</view>
</template>

<script>
	import dayjs from 'dayjs';
	import {
		myhold
	} from "@/common/database.js";
	import PlanDetailForm from './widget/detail-form.vue';

	export default {
		components: {
			PlanDetailForm,
		},
		data() {
			return {
				plan: {},
				steps: [],
				waiting: false,
			}
		},
		methods: {
			async onClickAdd() {
				const now = dayjs().format('YYYY-MM-DD HH:mm:ss');
				await myhold.execute(`
					INSERT INTO mh_plan
					(
						title, content, start_at
					)
					VALUES
					(
						'${this.plan.title}',
						'${this.plan.content}',
						'${now}'
					)
				`);
				console.log(this.steps);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.plan-addition-page {}
</style>
