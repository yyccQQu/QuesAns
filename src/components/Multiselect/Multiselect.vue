<template>
	<div class="Multiselect" ref="Multiselect" @click.stop="cutXiang">

		<Qaq ></Qaq>
		<div class="titleWrapper">
			<div class="top">
				<p>{{jisu+1}}、</p>
				<p>必填</p>
				<!--多选标题部分-->
				<el-form :model="ruleForms" :rules="ruless" ref="ruleForms" class="demo-ruleForm">
					  <el-form-item label="编辑选项标题信息【多】" prop="MultiTit">
					    <el-input v-model="ruleForms.MultiTit" placeholder="请输入选项标题信息"></el-input>
					  </el-form-item>
				 	<el-form-item style="text-align: right;">
					    <el-button @click="resetForms('ruleForms')">重置</el-button>
					    <el-button type="primary" @click="submitForms('ruleForms')">完成</el-button>
				  	</el-form-item>
				</el-form>
				<p style="margin:10px 0 5px;">添加图片 <small style="font-size:13px;color:gray;">[选填]</small></p>
				<!--添加图片上传功能-->
				<div style="border: 1px dashed red;" class="imgAdd">
					<el-upload
					  :action="imgURLduo"
					  list-type="picture-card"
					  :on-preview="handlePictureCardPreview"
					  :on-remove="handleRemove"
					  :before-upload="beforeAvatarUpload"
					  :on-success="handleAvatarSuccess">
					  <i class="el-icon-plus"></i>
					</el-upload>
					<el-dialog :visible.sync="dialogVisible">
						<img width="120%" :src="dialogImageUrlduo" alt="">
					</el-dialog>
				</div>

				<!--编辑选项内容部分-->

				<!--多选框表单部分-->
				<el-form :model="dynamicValidateForm2" ref="dynamicValidateForm2" class="demo-dynamic">
					  <el-form-item
					    v-for="(domain, index) in dynamicValidateForm2.domains"
					    :label="'编辑选项内容' + `${index+1}`"
					    :key="domain.key"
					    :prop="'domains.' + index + '.value'"
					    :rules="[
				            { required: true, message: '请输入提示信息', trigger: 'blur' },
				            { min: 1, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				          ]"
					  >
					    <el-input v-model="domain.value" placeholder="请输入选项内容"></el-input>
					    	{{domain.value}}
					    <div class="imgIcon" style="float: right; margin-bottom: -16px;">
					    	<div class="to-delete">
								<i class="iconfont toDelete" @click.prevent="removeDomain2(domain)">&#xe602;</i>
							</div>
					    </div>
					    <!--
					    	<p>增删变序功能</p>
					    <div class="imgIcon">
							<div class="to-down">
								<i class="iconfont toDown">&#xe601;</i>
							</div>
							<div class="to-top">
								<i class="iconfont toTop">&#xe603;</i>
							</div>
							<div class="to-delete">
								<i class="iconfont toDelete">&#xe602;</i>
							</div>
						</div>
						-->
					  </el-form-item>

					  <div class="bboo" style="margin-top: 30px;text-align:right;">
						  <el-form-item>
							 	<el-button @click="addDomain2" type="primary">新增选项</el-button>
							 	<el-button @click="submitForm7('dynamicValidateForm2')" type="primary">完成</el-button>
						    	<el-button @click="resetForm7('dynamicValidateForm2')" style="margin-top:10px;">重置单选</el-button>
						    	<el-button @click="submitAll2" type="primary" style="margin-top:10px;">提交</el-button>
						  </el-form-item>
					  </div>
				</el-form>
				<!--{{MultiXiang}}： 汇总多选题并没有把 多选题分开-->

				<!--{{MultiXiang3}}-->


				{{MultiXiang2}}
				{{MultiXiangNum}}
			</div>


		</div>

	</div>
</template>

<script type="text/ecmascript-6">
	//import '@/common/js/mockCommon'
	import {mapMutations,mapGetters,mapActions} from 'vuex'
	import Qaq from '@/components/Qaq/Qaq'


	export default {

	//在data里面的数据，其实就是不用在这个vue html实例里面应用的时候前面添加'this.'
	//在vue js实例里面如果未在data里面定义变量，那么可以用“this.”加名称的格式添加变量，或者是在exportdefault外面定义
		props: {
			right: {
				type: String
			}
		},
		data() {
			return{

				flag: false,
				flagger: false,
				flaggger: false,
				imgUrlflag: false,

				MultiXiangNum: 0,
				MultiXiangFlag: false,
				MultiXianglen: '',
				dialogImageUrlduo: '',
        		dialogVisible: false,
        		imgURLduo: 'http://mockjs.com/dist/mock',
        		imageNum: 0 ,
        		dynamicValidateForm2: {
		          domains: [{
		            value: ''
		          }]
		        },
				ruleForms: {
					MultiTit: ''
				},
        		ruless: {
        			MultiTit: [
			            { required: true, message: '请输入标题名称', trigger: 'blur' },
			            { min: 1, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
			            //{ pattern:/^(?![0-9])[0-9a-zA-Z_\u4e00-\u9fa5]+$/, message: '只允许字母和汉字开头'}
			        ]
        		}


			}

		},
		mounted() {
			this.$nextTick(() => {
				this._beforeFn()
			})

		},
		computed: {

			//筛选多选标题(解除双向绑定)
			MultiBiaoti2() {
				//获取多选标题，解除双向绑定
				let arr = []
				let len = this.MultiBiaoti.length
				for(var i = 0; i<len; i++) {
					if(i>len-2){
						arr.push(this.MultiBiaoti[i])
					}
				}
				//提交完成之后清空单选标题
				this.MultiBiaoti.length = 0
				return arr
			},

			//筛选多选选项
			MultiXiang2() {
				//判断输入框个数，进而分别保存输入框的值，解除双向绑定
				let arr =[]
				this.MultiXiangFlag = true

				//arr.abcn  = true
				if(this.MultiXiang.length>3){
					for(var i = 0; i<this.MultiXianglen; i++){
						if(this.flaggger === false){
							if(i>this.MultiXianglen-3){
								arr.push(this.MultiXiang[i])
							}
						}else{
							if(this.MultiXiangNum === 2){
								if(i>this.MultiXianglen-5){
									arr.push(this.MultiXiang[i])
								}
							}else if(this.MultiXiangNum === 3){
								if(i>this.MultiXianglen-6){
									arr.push(this.MultiXiang[i])
								}
							}else if(this.MultiXiangNum === 1){
								if(i>this.MultiXianglen-4){
									arr.push(this.MultiXiang[i])
								}
							}
						}
					}
					return arr;
				}else{
					for(var i = 0; i<this.MultiXiang.length; i++){
						arr.push(this.MultiXiang[i])
					}

					return arr;
				};



			},

			//收集MultiXiang2的单选项，重新组成一个二维数组。
			MultiXiang3() {
				let arr = []
				let len = this.danxuanAll.length
				for(var i=0;i<len;i++){
					arr[i] = this.danxuanAll[i][2]
				}
				return arr
			},


			//筛选单选图片
			imgurlMulti2() {
				let arr =[]
				//提交之后才能激活
				if(this.imgUrlflag === true){
					let imagelen = this.imgurlMulti.length
					for(var i = 0; i<imagelen; i++) {
						arr.push(this.imgurlMulti[i])
					}
					this.imgUrlflag = false
					return arr
				}

			},


			...mapGetters([
				'MultiBiaoti',
				'imgurlMulti',
				'MultiXiang',
				'danxuanAll',
				'Multi',
				'playing',
				'addC',
				'jisu',
				'zhi'

			])

		},

		methods: {



			//单选标题
			submitForms(formName) {
		        this.$refs[formName].validate((valid) => {
		          if (valid) {
		           	this.$message.success('表单选项完成');
		            console.log(this.ruleForms.MultiTit);
		            this.addMultiBiaoti(this.ruleForms.MultiTit);
		            //flag: 判断标题是否提交
		            this.flag = true;
		          } else {
		            this.$message.error('提交失败');
		            this.flag = false;
		            return false;
		          }
		        });

		    },
			resetForms(formName) {
				this.flag = false;
				this.cutMultiBiaoti(this.ruleForms.MultiTit);
	        	this.$refs[formName].resetFields();
	        	this.$message.success('标题重置成功');
	      	},

	      	/*上传图片部分*/
			//图片成功上传
			handleAvatarSuccess(res, file) {
		       this.imageUrlduo2 = file.url;
		       this.addimgurlMulti(this.imageUrlduo2);
		       console.log(this.imageUrlduo2,"fileurl");
		       console.log(this.imgurlMulti,"1");
		       this.$message.success('图片上传成功');
		    },
		    //图片更新
		    beforeAvatarUpload(file) {
		        const isJPG = file.type === 'image/jpeg';
	            const isGIF = file.type === 'image/gif';
	            const isPNG = file.type === 'image/png';
	            const isBMP = file.type === 'image/bmp';
	            const isLt2M = file.size / 1024 / 1024 < 2;
	            if (!isJPG && !isGIF && !isPNG && !isBMP) {
	                this.$message.error('上传图片必须是JPG/GIF/PNG/BMP 格式!');
	            }
	            if (!isLt2M) {
	                this.$message.error('上传图片大小不能超过 2MB!');
	            }
	            this.imageNum++;
	            if(this.imageNum>3){
		       		this.$message.error('最多只能上传3张图片');
		            return (!isJPG || !isBMP || !isGIF || !isPNG) && !isLt2M;
		        }
	           return (isJPG || isBMP || isGIF || isPNG) && isLt2M;
		    },
		    //图片删除
			handleRemove(file) {
				if(this.imageNum>3){
					this.imageNum--;
					return
				}
				this.imageNum--;
				//找到删除图片的地址，执行逻辑，即可得到所要的数组
				this.cutimgurlMulti(file.url);
				console.log(this.imgurlMulti,"2")
		    },
		    //图片预览
		    handlePictureCardPreview(file) {
		        this.dialogImageUrlduo = file.url;
		        console.log(this.dialogImageUrlduo,"预览模式")
		        this.dialogVisible = true;
		    },
	      	//多选选项部分
	      	submitForm7(formName) {
		        this.$refs[formName].validate((valid) => {
		          if (valid) {
		            this.$message.success('提交成功');
		            this.addSucesess();
		            this.flagger = true;
		          } else {
		            this.$message.error('提交失败');
		            this.flagger = false;
		            return false;
		          }
		        });
		    },
		    addSucesess() {
		   		let index = this.dynamicValidateForm2.domains.length
		   		let domains = this.dynamicValidateForm2.domains
		   		for(index in domains){
		   			//console.log(domains[index].value)
		   			this.addMultiXiang(domains[index].value)
		   		}
		   		this.MultiXianglen = this.MultiXiang.length
		   		console.log(this.MultiXianglen)
		   		console.log(this.danxuanAll,"全部多选")
//		   		console.log(this.danxuanXiang4,"单选项加")
		   	},
		    resetForm7(formName) {
		    	this.cutMultiXiang(this.MultiXiang);
	        	this.$refs[formName].resetFields();
	      	},
	      	//整体提交
	      	submitAll2() {
	      		if(this.flag === true && this.flagger === true){
	      			this.imgUrlflag = true
			   		this.addWenda({
			   			biaoti: this.MultiBiaoti2,
			   			imgurl: this.imgurlMulti2,
			   			arr: this.MultiXiang2
			   		})
			   		this.ADD_DANXUAN_ALL()
					this.ADD_JISU()
					this.cutDomain2()
					this.MultiXiangNum = 0
	      			this.$message.success('表单选项完成');
			   		this.flaggger = false
			   		this.flag = false
			   		console.log(this.danxuanAll,"+++2")

		   		}else{
		   			this.$message.error('提交失败，请检查提交信息!');
		   		}

	      	},
	      	cutDomain2() {
	      		//提交完成之后，将选项重置回2个选项，有需求的时候再进行添加
	      		if(this.MultiXiangNum === 1){
	      			this.dynamicValidateForm2.domains.splice(2, 1)
	      		}else if(this.MultiXiangNum === 2){
	      			this.dynamicValidateForm2.domains.splice(2, 2)
	      		}else if(this.MultiXiangNum === 3){
	      			this.dynamicValidateForm2.domains.splice(2, 3)
	      		}
		    },
	      	//移除选项
		    removeDomain2(item) {
		        var index = this.dynamicValidateForm2.domains.indexOf(item)
		        console.log(index);
		        if(this.dynamicValidateForm2.domains.length < 3){
					this.$message.error('至少为2个选项')
					return false
				}
		        if (index !== -1) {
		           this.dynamicValidateForm2.domains.splice(index, 1)
		        }
		        if(this.dynamicValidateForm2.domains.length === 2){
		        	this.flaggger = false
		        }

		    },
		    //添加选项
			addDomain2() {
				if(this.MultiXiangNum > 2){
					this.MultiXiangNum = 3
				}else{
					this.MultiXiangNum++
				}

				this.flaggger = true

				if(this.dynamicValidateForm2.domains.length > 4){
					this.$message.error('最多只能添加5个选项')
					return
				};
		        this.dynamicValidateForm2.domains.push({
			        value: '',
			        key: Date.now()
		        });

			},
			//页面刚刚加载完成执行的部分
			_beforeFn() {
				this.$refs.Multiselect.style.width = this.right;
				this.addDomain2();
				this.flaggger = false;
				this.MultiXiangNum = 0;

			},
			cutXiang() {
				if(this.playing === true){
					this.CUT_DANXUANER(this.zhi)
					this.SET_PLAYING_STATE(false)
				}
			},
			...mapMutations({
				addMultiBiaoti: 'ADD_MULTIBIAOTI',
				cutMultiBiaoti: 'CUT_MULTIBIAOTI',
				addimgurlMulti: 'ADD_IMGURLMULTI',
				cutimgurlMulti: 'CUT_IMGURLMULTI',
				addMultiXiang: 'ADD_MULTIXIANG',
				cutMultiXiang: 'CUT_MULTIXIANG',
				adddanXuan: 'ADD_DANXUAN',

				ADD_DANXUAN_ALL: 'ADD_DANXUAN_ALL',
	   		SET_PLAYING_STATE: 'SET_PLAYING_STATE',
	   		CUT_DANXUANER: 'CUT_DANXUANER',
	   		CHANGE_ADDC: 'CHANGE_ADDC',
	   		ADD_JISU: 'ADD_JISU'



			}),
			...mapActions([
				'addWenda'
			])

		},
		components: {
			Qaq

		}



	}


</script>
<style scoped lang="less">

	.border() {
		border: 1px solid red;
	}
	.titleWrapper{
		background: #f5f5f5;
		padding: 5%;
		padding-bottom: 1%;
		.border
	}

	.top{
		p{
			text-align: left;
			color: #2bb6f1;
		}
		p:nth-child(2){
			text-align: right;
			color: gray;
			margin-top: -17px;
		}
		label{
			small{
				font-size: 13px;
				color: gray;
			}
		}
		.button{
			.inputImg,.inputImgg{
				margin-top: 4%;
			}

		}
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
				.toDelete{
					color: #CBCBCB;
				}
			}
		}
	}
</style>
