<template>
	<div class="top">
		<label><slot name="title"></slot></label>
		<slot name="inputK"></slot>
	</div>
</template>

<script>

</script>

<style scoped lang="less">
	.top{
		text-align: left;
		label{
			font-size: 15px;
			line-height: 38px;
			margin-bottom: 20px;
		}
	}
</style>