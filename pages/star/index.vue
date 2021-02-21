<template>
	<view>
		<view v-for="e in rows">
			{{e.id}}
			=>
			{{e.name}}
			=>
			{{e.fullPath}}
		</view>
	</view>
</template>

<script>
	import { DBBuilder } from '@/common/database.js'
	export default {
		data() {
			return {
				rows: [],
			}
		},
		async onLoad() {
			const builder = new DBBuilder();
			const rows = await builder.listBuildFile();
			this.rows = rows.map(i => {
				return {
					name: i.name,
					fullPath: i.fullPath,
					id: Number(i.name.match(/^\d+/)[0]),
				}
			});
			await builder.build();
		},
		methods: {

		}
	}
</script>

<style>

</style>
