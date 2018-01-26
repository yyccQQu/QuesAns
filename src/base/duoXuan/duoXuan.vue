<template>
	<div class="duoXuan">
		<el-checkbox-group  v-model="checkList" @change="changeHandler" >
			<el-checkbox :label="item">
				<slot></slot>
			</el-checkbox>
		</el-checkbox-group>

	</div>
</template>

<script type="text/ecmascript-6">
	
	export default {
		props: {
			itme: {
				type: String
			},
			
			indexx: {
				type: Number
			}
			
			
		},
		data() {
			return {
				checkList: []
				

			}
		},
		mounted() {
			this._Snei()
			
		
		},
		methods: {
			changeHandler(value) {
				//单选选中之后的值。单选默认选中的第一个值
	            console.log('改变之后的值是:' + value, this.indexx)
	        },
			_Snei(){
				let index= this.indexx
	       		this.$emit('duo', index)
		       
			
			}
	        
	        
	        
		}
		
		


	}


</script>

<style scoped lang="less">



</style>