<template>
	<div class="head">
		<div class="left" ref="left">
			<div class="ulWrapper">
				<ul>
					<router-link to="/Head/title" tag="li">
						标题
					</router-link>
					<router-link to="/Head/single" tag="li">
						单选题
					</router-link>
					<router-link to="/Head/multiselect" tag="li">
						多选题
					</router-link>
					<router-link to="/Head/qaq" tag="li">
						实例
					</router-link>
					<router-link to="/Head/quesAns" tag="li">
						问答题
					</router-link>
				</ul>
			</div>
		</div>
		<div class="right" ref="rightHeight">
			<router-view :right="right"></router-view>
		</div>

	</div>
</template>

<script type="text/ecmascript-6">

	export default {
		data() {
			return {
				hheight: window.screen.height + "px",
				wwidth: window.screen.width + "px",
				right: (window.screen.width*0.6) + "px",
				rightHeight: ''
			}


		},
		
		mounted() {

			this.$nextTick(() => {
				this._neibu()

			})


		},
		computed: {



		},
		methods: {
			_neibu() {
				//this.$refs.left.style.height = this.hheight ;

//				console.log(this.rightHeight)
//				if(this.hheight<this.rightHeight) {
//					this.$refs.left.style.height = rightHeight;
//				}
			}
		}

	}



</script>

<style scoped lang="less">
	.border() {
		border: 1px solid red;
	}
	.background() {
		background: #f5f5f5;
	}
	.flex() {
		display: flex;
	}

	.head{
		width: 100%;
		.flex;

		.left{
			display: inline-block;
			.flex;
			flex: 0 0 37%;
			.ulWrapper{
				margin-left: 8%;
				width: 85%;
				.background;

				ul{
					list-style: none;
					width: 80%;
					margin: 0 auto;
						li{
							background: #fff;
							padding: 13px;
							margin: 10px 0;
							text-align: center;
							border-radius: 3px;
							&.router-link-active{
								color: #2bb6f1;
								background: #f5f5f5;
							}
						}
				}
			}

		}
		.right{
			display:inline-block;
			.flex;
			flex: 0 0 60%;
		}
	}
</style>
