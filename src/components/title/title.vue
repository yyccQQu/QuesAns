<template>
	<div class="title" >
		<div class="titleWrapper" ref="titleWrapper">
			<h2>编辑标题</h2>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
				  <el-form-item label="编辑标题名称" prop="minchen">
				    <el-input v-model="ruleForm.minchen" placeholder="请输入标题名称"></el-input>
				  </el-form-item>
				  <el-form-item label="编辑标题内容" prop="neirong">
				    <el-input type="textarea" v-model="ruleForm.neirong" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请编辑标题内容"></el-input>
				  </el-form-item>
			 	<el-form-item>
				    <el-button type="primary" @click="submitForm('ruleForm')">完成</el-button>
				    <el-button @click="resetForm('ruleForm')">重置</el-button>
			  	</el-form-item>
			</el-form>

			<el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" class="demo-ruleForm">
				<el-form-item label="填写完成后，提示患者：" prop="tishi">
			    	<el-input type="textarea" v-model="ruleForm2.tishi" :autosize="{ minRows: 2, maxRows: 4}" placeholder="如： 感谢填写" class="textarea"></el-input>
			    </el-form-item>
			    <el-form-item>
				    <el-button type="primary" @click="submitForm2('ruleForm2')">完成</el-button>
				    <el-button @click="resetForm2('ruleForm2')">重置</el-button>
			  	</el-form-item>
			</el-form>
			<!--<div class="fixxed">
				<el-button type="primary" icon="el-icon-upload" style="width: 100%;">提交</el-button>
			</div>-->
			<div class="jianju">
				<p class="lan">已编辑标题</p>
				<p v-html="this.biaoti[0]"></p>
			</div>
			<div class="jianju">
				<p class="lan">已编辑标题内容</p>
				<p v-html="this.biaotiNeirong[0]"></p>	
			</div>
			<div class="jianju">
				<p class="lan">已编辑提示</p>
				<p v-html="this.tishi[0]"></p>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">

	import {mapMutations,mapGetters} from 'vuex'
	
	//长度为20且不允许有空格
//	let reg = /^\S[\\p{Punct}a-zA-Z0-9]|[u4e00-u9fa5]{3,20}$/
//用户名不能超过14个汉字或3个字符
// 汉字+ 字符 、字符+汉字、 汉字+字符+汉字
	  let reg = /^.{1,20}$/
	//let reg = /^[\u4e00-\u9fa5]{1,14}([\\p{Punct}a-zA-Z0-9]{0,3}[《》？：“”【】、；‘’，。、!！""]{0,3})$|^([\\p{Punct}a-zA-Z0-9]{0,3}[《》？：“”【】、；‘’，。、!！""]{0,3})[\u4e00-\u9fa5]{1,14}$|^[\u4e00-\u9fa5]{1,7}([\\p{Punct}a-zA-Z0-9]{0,3}[《》？：“”【】、；‘’，。、!！""]{0,3})([\u4e00-\u9fa5]{1,7})$/
	//长度为3至20
	let regg = /^.{3,20}$/
	
	export default {
		props: {
			right: {
				type: String
			},
			hheight: {
				type: String
			}
		},
			
		data() {
			return {
				flag: true,
				ruleForm: {
          			minchen: '',
          			neirong: ''

				},
				ruleForm2: {
					tishi: ''
				},
				rules: {
		          minchen: [
		            { required: true, message: '请输入标题名称', trigger: 'blur' },
		            //{ pattern: /^[\u4E00-\u9FA5]+$/,message: '标题只能为中文', trigger: 'blur'},
		            { min: 1, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
		          ],
		          neirong: [
		            { required: true, message: '请输入标题内容', trigger: 'blur' },
		            //{ pattern: /^[\u4E00-\u9FA5]+$/,message: '标题只能为中文', trigger: 'blur'},
		            { min: 1,  message: '长度在 3 到 5 个字符', trigger: 'blur' }
		          ]
		          
		          
		       },
		       rules2: {

		          tishi: [
		            { required: true, message: '请输入提示信息', trigger: 'blur' },
		            //{ pattern: /^[\u4E00-\u9FA5]+$/,message: '标题只能为中文', trigger: 'blur'},
		            { min: 1, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
		          ]
		       	
		       }
				
			}
			
		},
		
		computed: {
			
			...mapGetters([
				'biaoti',
				'biaotiNeirong',
				'tishi'
			])
			
			
		},
		mounted() {
			
			this.$nextTick(() => {

				this._jiZhong()

			})
			
			
		},
		
		methods: {
			
			_jiZhong() {
				this.$refs.titleWrapper.style.width = this.right;
				
			},
			//表单验证
			submitForm(formName) {
		        this.$refs[formName].validate((valid) => {
		          if (valid) {
		          	this.addBiaoti(this.ruleForm.minchen)
		          	this.addNeirong(this.ruleForm.neirong)
		            this.$message.success('提交成功');
					console.log(this.ruleForm.minchen)
		          } else {
		            this.$message.error('提交失败');
		            return false;
		          }
		        });  
		    },
		    resetForm(formName) {
		    	this.cutBiaoti(this.biaoti)
		    	this.cutNeirong(this.biaotiNeirong);
	        	this.$refs[formName].resetFields();
	      	},
		    submitForm2(formName) {
		        this.$refs[formName].validate((valid) => {
		          if (valid) {
		          	this.addTishi(this.ruleForm2.tishi)
		            this.$message.success('提交成功');
					
		          } else {
		            this.$message.error('提交失败');
		            return false;
		          }
		        });   
		    },
	      	resetForm2(formName) {
	      		this.cutTishi(this.tishi);
	        	this.$refs[formName].resetFields();
	      	},
		   
			...mapMutations({
				addBiaoti: 'ADD_BIAOTI',
				addNeirong: 'ADD_NEIRONG',
				addTishi: 'ADD_TISHI',
				cutBiaoti: 'CUT_BIAOTI',
				cutNeirong: 'CUT_NEIRONG',
				cutTishi: 'CUT_TISHI'

			})

		}
	}

</script>

<style scoped lang="less">

	.title{
		
		.titleWrapper{
			padding: 5%;
			padding-bottom: 0;
			background: #f5f5f5;
			margin-top: 15px;

			h2{
				font-size: 18px;
				color: #333;
				text-align: center;
				line-height: 60px;	
			}
			.top{
				text-align: left;

			}
	
		}
	}
	.el-button{
		display: block;
		margin-left: 10px;
		float: right;
	}
	.lan{
		color: #2bb6f1;
	}
	.jianju{
		margin-bottom: 10px;
	}
	.fixxed{
		height: 40px;
		display: block!important;
	}

</style>