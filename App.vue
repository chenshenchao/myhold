<script>
	import { DBBuilder } from '@/common/database.js'
	
	export default {
		async onLaunch() {
			console.log('App Launch');
			const builder = new DBBuilder('myhold');
			await builder.build();
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
