<template>
	<view class="plan-detail-form">
		<view ref="editor">
			<view id="toolbar"></view>
			<editor id="editor" class="ql-container" :placeholder="placeholder" @ready="onEditorReady"></editor>
			<button type="warn" @tap="undo">撤销</button>
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
		methods: {
			onEditorReady() {
				console.log(this.$refs.editor)
				uni.createSelectorQuery()
					.select('#editor')
					.context((res) => {
						this.editorCtx = res.context
					}).exec();
			},
			undo() {
				this.editorCtx.undo()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.plan-detail-form {
		padding: 10px;
	}

	#editor {
		width: 100%;
		height: 300px;
		background-color: #CCCCCC;
	}
</style>
