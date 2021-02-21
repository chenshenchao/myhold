<template>
	<view class="plan-detail-form">
		<view class="head">
			<input v-model="plan.title" placeholder="标题"/>
		</view>
		<view ref="editor">
			<textarea v-model="plan.content"/>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				placeholder: '开始输入...'
			};
		},
		props: {
			plan: {
				type: Object,
				default: () => ({}),
			},
			steps: {
				type: Array,
				default: () => [],
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.plan-detail-form {
		padding: 10px;
	}
</style>
