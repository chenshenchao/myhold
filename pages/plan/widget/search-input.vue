<template>
	<view class="plan-search-input">
		<input v-model="plain"/>
		<view class="icon">
			<image src="@/static/loupe.png"/>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cache: null
			};
		},
		props: {
			value: {
				type: String,
				default: null,
			}
		},
		computed: {
			plain: {
				get() {
					return this.value || this.cache;
				},
				set(v) {
					this.cache = v;
					this.$emit('input', v);
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	.plan-search-input {
		display: flex;
		align-items: center;
		flex-grow: 1;
		border: 1rpx solid #ddd;
		
		& > input {
			flex-grow: 1;
			padding: 5rpx;
			font-size: 32rpx;
		}
		
		& > .icon {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-shrink: 0;
			width: 32rpx;
			height: 32rpx;
			margin: 0 10rpx;
			
			image {
				max-width: 100%;
				max-height: 100%;
			}
		}
	}
</style>
