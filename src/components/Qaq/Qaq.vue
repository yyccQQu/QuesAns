<template>
	<div class="Qaq" ref="Qaq" @click="con">
		<div class="titleWrapper">

			<div class="beforeContent">
				<h2 v-show="biaoti.length>0" v-html="biaoti[0]"></h2>
				<p class="ppp" v-html="biaotiNeirong[0]"></p>
				<el-button type="primary" >编辑</el-button>
			</div>


			<!--
				danxuan[0][0]: 单选标题
				danxuan[1][x/3]： 单选图片最多3张，可不要
				danxuan[2][x/3]: 单选选项最少2组，最多3组
			-->

			<!--//单选题-->
			<!--
			<div class="danxuan" v-for="(danxuan , index) in danxuanAll" :key="index">
				<h3>{{index+1}}、+++{{danxuan[0][0]}}+++{{index}}</h3>
				<el-radio-group v-model="item['radio' + indexx]" v-for="(item , indexx) in danxuan[2]" :key="indexx" @change="changeHandler">
					<el-radio v-for="(list, idxx) in item.data" :label="list" :key="idxx">{{ list }}</el-radio>
				</el-radio-group>

				图片-》{{danxuan[1][0]}}
			</div>

			-->

			<!--//多选题-->


		<div class="danxuanAll" v-if="danxuanAll.length>0">
				<div class="danxuanAll"
				v-for="(danxuan , index) in danxuanAll"
				:key="index">

					<h3 style="margin-bottom:13px;">{{index+1}}、{{danxuan[0][0]}}
						<span v-if="danxuan[2].length > 1">[可多选]</span>
						<span v-else-if="danxuan[2].length === 1">[单选]</span>
						<span v-else-if="danxuan[2].length === 0">[问答]</span>
					</h3>
					<div v-if="danxuan[2].length === 0" :key="index">
						<!--运行一次，执行一次。一直添加，不能让v-model一样-->

						<el-form :model="dynamicValidateForm"
							ref="dynamicValidateForm"
							class="demo-dynamic"
							:key="index"
							:prop="dynamicValidateForm.email"
						>
							  <el-input
								  type="textarea"
								  :autosize="{ minRows: 2, maxRows: 4}"
								  placeholder="请输入内容"
								  v-model="dynamicValidateForm.email[index]"
								  >
							  </el-input>
								<!--<p v-if="dynamicValidateForm.fontFlag[index]" class="red">长度需要为1-5</p>-->
							  <el-button type="primary" @click="tijiao(index)">提交</el-button>
						</el-form>



					</div>
					<div class="danxuanAlln" v-for="(item , indexx) in danxuan[2]" :key="indexx">
						<div :key="indexx" v-if="danxuan[2].length === 1">

								<!--<el-radio-group v-model="item['radio' + indexx]" :key="indexx" @change="changeHandler">
									<el-radio v-for="(list, idxx) in item.data"  :key="idxx" :label="item">{{list}}</el-radio>
								</el-radio-group>-->
								<el-checkbox-group
									v-model= "checkList"
									:key= "indexx"
									@change= "changeHandler"
									>
									<el-checkbox :label="itemm" :key="indee"  v-for="(itemm,indee) in item" :min="0"
									:max="1" class="block">{{itemm}}</el-checkbox>
								</el-checkbox-group>

						</div>
						<div v-if="danxuan[2].length > 1" :key="indexx">
								<el-checkbox-group  v-model="checkList" :key="indexx" @change="changeHandler">
									<el-checkbox :label="item">{{item}}</el-checkbox>
								</el-checkbox-group>

						</div>
						<!-- danxuan[0][0]为各类型题标题  danxuan[1]为各类型题图片集  -->
						<!-- danxuan[2]长度为等于一为单选，大于一为多选，空为问答-->
					</div>

					<!-- vue-music:10-10 -->
					<zujian
						:index = 'index'
						:xuanChang = '`${danxuan[2].length}`'
						@edit = "edit(index)"
						@del = "delitem(index)"></zujian>


					<el-button v-if="editSuc===true">确认编辑</el-button>
				</div>
		</div>

<!--本页执行操作后，其他页可以同样执行该操作-->
<!--解除双向绑定，本页执行操作不影响其他页面，若要影响，必须再次执行同一操作-->
			<!--单选框循环出来只能选一下-->

		</div>


	</div>
</template>

<script type="text/ecmascript-6">

	import '@/common/js/mockCommon'
	import {mapMutations,mapGetters} from 'vuex'
	import zujian from '@/base/zujian/zujian'

	//怎么判断它是单选题还是多选题

	export default {

		props: {
			right: {
				type: String
			}

		},

		data() {
			return{

				checkList: [],
				xuhao: '',
				xinva: '',

				rn: '',
				dynamicValidateForm: {
		          email: {},
		          fontFlag: {}

		        }



			}

		},
		computed: {






			...mapGetters([
				'biaoti',
				'biaotiNeirong',
				'tishi',
				'danxuan',
				'danxuanBiaoti',
				'danxuanXiang',
				'imgurlDan',
				'danxuanAll',
				'playing',//用来标志是否是必填项
				'addC',
				'zhi',
				'editFlag',
				'editSuc'


			])



		},
		mounted() {
			this.$nextTick(() => {
				this._neiStyler();

			})

		},
		methods: {

			//!!!!*********
			changeHandler(value) {
				//单选选中之后的值。单选默认选中的第一个值
          console.log('改变之后的值是:' + value)
      },

			add() {
				//this.$refs.Qaq.



			},
			//编辑
			edit(index) {

				this.CHANGE_EDIT(true)
				this.CHANGE_SERIAL(index)

			},
			//在这里不能重新获取index,提前给个固定值，初始化问题。
			//添加完成之后再删除。。。
			delitem(index) {
				this.cutDanxuanall(index)
				this.setPlayingState(true)
				//分别获取index,对index进行分组,分别获取,再到对应页面进行删除操作,给state.zhi赋值
				this.CHANGE_ZHI(index)

				this.xuhao = index
				//this.con()
				this.CUT_JISU()

			},
		    con() {
		    	//console.log(1234,this.xuhao)
		    },

		    //问答题部分
		   	//提交之后值的删除
		    tijiao(index) {
		    	this.rn = index
		    	//console.log(this.dynamicValidateForm.email[index],this.rn)

		    	let reg=/^.{1,5}$/
		    	if(reg.test(this.dynamicValidateForm.email[index])){
		    		this.dynamicValidateForm.fontFlag[index] = false
		    		this.$message.success('提交成功')
		    	}else{
		    		this.dynamicValidateForm.fontFlag[index] = true
		    		this.$message.error('提交失败')
		    	}

		    },



		   	_neiStyler() {
		   		this.$refs.Qaq.style.width = this.right;

		   	},


		    ...mapMutations({
					cutDanxuanall:'CUT_DANXUAN_ALL',
					setPlayingState: 'SET_PLAYING_STATE',
					CHANGE_ZHI: 'CHANGE_ZHI',
					ADD_ADDC: 'ADD_ADDC',
					CUT_JISU: 'CUT_JISU',
					CHANGE_SERIAL: 'CHANGE_SERIAL',
					CHANGE_EDIT: 'CHANGE_EDIT'

		   	})





		},
		components: {
			zujian

		},
		watch: {





		}



	}


</script>

<style scoped lang="less">

	.Qaq{
		padding-bottom: 0;
		margin-top: 15px;


		.beforeContent{
			text-align: right;
			margin-bottom: 20px;
			h2{
				text-align: center;
				font-size: 18px;
			}
			.ppp{
				white-space:nowrap;
				overflow:hidden;
				text-overflow:ellipsis;
				line-height: 37px;
				color: gray;
			}
		}
	}
		.block{
			display: block;
			margin: 0;
		}
		.red{
			color: red;
		}



</style>
