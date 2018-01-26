<template>
	<div class="danXuan">
		
		
		<el-radio-group v-model="item['radio' + indexx]" v-for="(item , indexx) in danxuan[2]" :key="indexx">
			<el-radio v-for="(list, idxx) in item.data" :label="list" :key="idxx">{{ list }}</el-radio>
		</el-radio-group>
		
		
	</div>
</template>

<script type="text/ecmascript-6">
	import '@/common/js/mockCommon'
	import {mapMutations,mapGetters} from 'vuex'
	
	export default {
		props:{
			
			
			
		},
		data() {
			return {
				
				
				
				
				
			}
		},
		computed: {
			
			
			
			...mapGetters([
				
				
				
				
			
			])
			
			
			
		},
		methods: {
		
			
			
			
			...mapMutation({
			
		
			
			
			})
		
		
		}




	}
	
</script>

<style scoped lang="less">



</style>