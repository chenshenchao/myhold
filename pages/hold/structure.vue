<template>
	<view class="hold-structure-page">
		<hold-structure-table :rows="rows"/>
	</view>
</template>

<script>
	import {
		myhold
	} from '@/common/database.js';
	import HoldStructureTable from './widget/structure-table.vue';

	export default {
		components: {
			HoldStructureTable
		},
		data() {
			return {
				rows: []
			};
		},
		async onLoad() {
			this.rows = await myhold.query(`SELECT * FROM mh_structure ORDER BY id DESC`);
		}
	}
</script>

<style lang="scss" scoped>
	.hold-structure-page {}
</style>
