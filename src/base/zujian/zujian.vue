<template>
	<div class="imgIcon">
		<div class="to-down">
			<i class="iconfont toDown">&#xe601;</i>
		</div>
		<div class="to-top">
			<i class="iconfont toTop">&#xe603;</i>
		</div>
		<div class="to-delete" @click="GGG(index)">
			<i class="iconfont toDelete">&#xe602;</i>
		</div>
		<div class="to-edit" @click="edit(index)">
			<i class="el-icon-edit"></i>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">

	export default {
		props: {
			index: {
				type: Number
			},
			xuanChang: {
				type: String
			}



		},
		methods: {

			GGG(index) {
				this.$emit('del',index)
				console.log(index)
			},
			edit(index) {
				this.$emit('edit',index)
				this.$message.success('欢迎进入编辑页')
				//判断进入那个界面，需要flag
				//判断单、多、问答题
				let str = ''
				if(this.xuanChang === '0'){
						str = 'quesAns'
				}else if(this.xuanChang === '1'){
						str = 'single'
				}else{
						str = 'multiselect'
				}
				this.$router.push({
					path:`/Head/${str}/${index}`
				})

				//编辑页只能编辑本页信息，不得添加。
				//总体自己搞
				//进入指定路由页面，但是模板都是复用的，
				//	所以相应的逻辑也是照常执行
				// 故，要用一个标志位来提醒该路由页面

				//编辑即为重新赋值。
				//给个对应路由，进行精确赋值

				//编辑步骤
				//赋予对应选项原来的值

				//->图片的重新编辑
				//->编辑页只能进行编辑操做

				console.log(index)

			}







		},





	}


</script>

<style scoped lang="less">
.imgIcon{
	margin-top: 10px;
	text-align: right;
	div{
		width: 15px;
		height: 15px;
		display: inline-block;
		margin-left: 10px;
		.iconfont{
			font-size: 20px;
		}
		.toDown{
			color: #2bb6f1;
		}
		.toTop{
			color: #44b549;
		}
	}
}
</style>
