<template>
	<button 
		class="buttonS"
		@click="changeColor"
		ref="buttonS">
		<slot></slot>
	</button>
</template>

<script type="text/ecmascript-6">

	export default {
		props: {
			ceshi: {
		        type: Boolean
		    },
		   	ceshiNotice: {
		   		type: Boolean
		   	},
		   	ceshiSingle: {
		   		type: Boolean
		   	}
		   	
		   	
		   	
		   	
		   	
		},

		data() {
			return {
				dui: '0.5',
				cuo: '1'	
			}

		},
		methods:{
			changeColor() {

				if(this.ceshi || this.ceshiNotice || this.ceshiSingle) {
					this.$refs.buttonS.style.opacity = this.dui
					console.log('dui')
				}
	
			}
		}

	}
</script>

<style scoped lang="less">
	.buttonS {
				display: inline-block;
			    line-height: 1;
			    white-space: nowrap;
			    cursor: pointer;
			    background: #fff;
			    border: 1px solid #d8dce5;
			    -webkit-appearance: none;
				text-align: center;
				box-sizing: border-box;
			    outline: 0;
			    margin: 0;
			    transition: .1s;
			    font-weight: 500;
			    padding: 8px 13px;
			    font-size: 14px;
			    border-radius: 4px;
			    color: #fff;
			    background-color: #2bb6f1;
			    border-color: #2bb6f1;
			    margin-bottom: 15px;
			    opacity: 1
	}
</style>