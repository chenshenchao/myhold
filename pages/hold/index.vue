<template>
	<view>
		<button @click="onClickStructrue">结构</button>
	</view>
</template>

<script>
	import page from '@/common/page.js'
	
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			async onClickStructrue() {
				await page.navigateTo({
					url: 'structure'
				})
			}
		}
	}
</script>

<style>

</style>
