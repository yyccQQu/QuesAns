<template>
  <div class="quesAns" ref="quesAns" @click.stop="cutXiang">

    <Qaq></Qaq >
    <div class="titleWrapper">
			<div class="top">
				<p>{{jisu+1}}、</p>
				<p>必填</p>
				<!--问答标题部分-->
				<el-form :model="ruleForm4" :rules="rules4" ref="ruleForm4" class="demo-ruleForm">
					  <el-form-item label="编辑选项标题信息【问答】" prop="quesTit">
					    <el-input v-model="ruleForm4.quesTit" placeholder="请输入问答题标题"></el-input>
					  </el-form-item>
				 	<el-form-item>
					    <el-button type="primary" @click="submitForm4('ruleForm4')">完成</el-button>
					    <el-button @click="resetForm4('ruleForm4')">重置</el-button>
				  	</el-form-item>
				</el-form>
				<!--问答图片部分-->

				<div style="border: 1px dashed red;" class="imgAdd">
						<el-upload
						  :action="imgURL"
						  list-type="picture-card"
						  :on-preview="handlePictureCardPreview"
						  :on-remove="handleRemove"
						  :before-upload="beforeAvatarUpload"
						  :on-success="handleAvatarSuccess">
						  <i class="el-icon-plus"></i>
						</el-upload>
						<el-dialog :visible.sync="dialogVisible">
								<img width="120%" :src="dialogImageUrl" alt="">
						</el-dialog>
				</div>

				<el-button @click="submitAll3" type="primary" style="margin-top:10px;">提交</el-button>






			</div>
		</div>

  </div>
</template>

<script type="text/ecmascript-6">

	import {mapMutations,mapGetters,mapActions} from 'vuex'
	import Qaq from '@/components/Qaq/Qaq'


  export default {

  		props: {
  			right: {
					type: String
				}

  		},

			data() {
				return{

					flag: false,
					flagger: false,
					ruleForm4: {
						quesTit: ''
					},
    			rules4: {
    				quesTit: [
		            { required: true, message: '请输入标题名称', trigger: 'blur' },
		            { min: 1, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }

		        ]
    			},
    			imgURL: 'http://mockjs.com/dist/mock',
	    		imageNum: 0 ,
	    		dialogVisible: false,
	    		dynamicValidateForm: {
		          domains: [{
		            value: ''
		          }]
		      },
		      imgUrlflag: false,
					dialogImageUrl: '',
					arrK: []



				}
			},
			mounted() {
				this._neiStyle()

			},
			computed: {

				//筛选问答标题(解除双向绑定)
				wendaBiaoti2() {
					//获取单选标题，解除双向绑定
					let arr = []
					let len = this.wendaBiaoti.length
					arr = this.wendaBiaoti.splice(len-2)
					//提交完成之后清空标题
					this.wendaBiaoti.length = 0
					return arr

				},
				//筛选单选图片
				imgurlWenda2() {
					let arr =[]
					//提交之后才能激活
					if(this.imgUrlflag === true){
						let imagelen = this.imgurlWenda.length
						for(var i = 0; i<imagelen; i++) {
							arr.push(this.imgurlWenda[i])
						}
						this.imgUrlflag = false
						this.imgurlWenda.length = 0
						return arr
					}
				},






				...mapGetters([
						'wendaBiaoti',
						'imgurlWenda',
						'danxuanAll',
						'playing',
						'addC',
						'jisu',
						'zhi'


				])


			},
			methods: {
					_neiStyle(){
						this.$refs.quesAns.style.width = this.right;

					},
					//问答标题
					submitForm4(formName) {
				        this.$refs[formName].validate((valid) => {
				          if (valid) {
				           	this.$message.success('问答标题提交完成');
				            this.ADD_WENDABIAOTI(this.ruleForm4.quesTit);
				            this.flag = true;
				          } else {
				            this.$message.error('提交失败');
				            this.flag = false;
				            return false;
				          }
				        });
				    },

					resetForm4(formName) {
			        this.$refs[formName].resetFields();
			        this.CUT_WENDABIAOTI(this.ruleForm4.quesTit);
			        this.flag = false;
			        this.$message.success('重置成功');
			    },
			    /*上传图片部分*/
					//图片成功上传
					handleAvatarSuccess(res, file) {
				       this.ADD_IMGURLWENDA(file.url);
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
						this.CUT_IMGURLWENDA(file.url);
				  },
			    //图片预览
			    handlePictureCardPreview(file) {
			        this.dialogImageUrl = file.url;
			        console.log(this.dialogImageUrl,"预览模式")
			        this.dialogVisible = true;
			    },
			    submitAll3() {
			    	if(this.flag === true){
			    		this.imgUrlflag = true;
			    		this.addWenda({
			    			biaoti: this.wendaBiaoti2,
			    			imgurl: this.imgurlWenda2,
			    			arr: this.arrK
			    		})
							this.ADD_DANXUAN_ALL()
							this.ADD_JISU()
							this.flag = false


			    		this.$message.success('问答题提交成功！');
			    	}else{
			   			this.$message.error('提交失败，请检查提交信息!');
			   		}
			    },

			    cutXiang() {
						if(this.playing === true){
							this.CUT_DANXUANER(this.zhi)
							this.SET_PLAYING_STATE(false)
						}
					},



			    ...mapMutations({
			    		ADD_WENDABIAOTI: 'ADD_WENDABIAOTI',
			    	  CUT_WENDABIAOTI: 'CUT_WENDABIAOTI',
			    		ADD_IMGURLWENDA: 'ADD_IMGURLWENDA',
			    		CUT_IMGURLWENDA: 'CUT_IMGURLWENDA',
			    		ADD_JISU: 'ADD_JISU',
				   		ADD_DANXUAN_ALL: 'ADD_DANXUAN_ALL',
				   		SET_PLAYING_STATE: 'SET_PLAYING_STATE',
				   		CUT_DANXUANER: 'CUT_DANXUANER',
				   		CHANGE_ADDC: 'CHANGE_ADDC',


			    }),
			    ...mapActions([
							'addWenda'
					])



			},
			components: {
				Qaq

			}
	//重新接受值，。。。



  };

</script>


<style lang="less" scoped>
	.border() {
		border: 1px solid red;
	}
	.gray{
		color: gray;
	}
	.quesAns{
		padding-bottom: 0;
		margin-top: 15px;


		.titleWrapper{
			background: #f5f5f5;
			padding: 5%;
			padding-bottom: 0;
			.border;
			.el-button{
				display: block;
				margin-left: 10px;
				float: right;
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
		}
	}
</style>
