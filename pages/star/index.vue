<template>
	<view>
		<view v-for="r in rows">
		</view>
	</view>
</template>

<script>
	import {myhold} from '@/common/database.js'
	
	export default {
		data() {
			return {
				rows: [],
			}
		},
		async onLoad() {
		},
		methods: {

		}
	}
</script>

<style>

</style>
