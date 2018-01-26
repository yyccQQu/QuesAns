<template>
	<div class="single" ref="single" @click.stop="cutXiang">

		<Qaq ></Qaq>
		<div class="titleWrapper">
			<div class="top">
				<p v-if="editFlag === true">{{Serial_num+1}}、</p>
				<p v-else>{{jisu+1}}、</p>

				<p v-if="editFlag === true">编辑</p>
				<p v-else>必填</p>
				<!--单选标题部分-->
				<el-form :model="ruleForm3" :rules="rules3" ref="ruleForm3" class="demo-ruleForm">
					<el-form-item label="编辑选项标题信息【单】" prop="singleTit">
					    <el-input v-model="ruleForm3.singleTit" placeholder="请输入选项标题信息"></el-input>
					</el-form-item>
				 	<el-form-item>
					    <el-button type="primary" @click="submitForm3('ruleForm3')">完成</el-button>
					    <el-button @click="resetForm3('ruleForm3')">重置</el-button>
				  	</el-form-item>
				</el-form>

				<p style="margin:10px 0 5px;">添加图片 <small style="font-size:13px;color:gray;">[选填]</small></p>
				<!--添加图片上传功能-->
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

				<!--编辑选项内容部分-->

				<!--单选框表单部分-->
				<el-form :model="dynamicValidateForm" ref="dynamicValidateForm" class="demo-dynamic">
					  <el-form-item
					    v-for="(domain, index) in dynamicValidateForm.domains"
					    :label="'编辑选项内容' + `${index+1}`"
					    :key="domain.key"
					    :prop="'domains.' + index + '.value'"
					    :rules="[
				            { required: true, message: '请输入提示信息', trigger: 'blur' },
				            { min: 1, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				          ]"
					  >
					    <el-input v-model="domain.value" placeholder="请输入选项内容"></el-input>
							<el-button v-if="editFlag" @click.native="conxiang(index)">编辑</el-button>
							<!-- <el-button v-if="editFlag" @click.native="chong(index)">重置</el-button> -->
					    <div class="imgIcon" style="float: right; margin-bottom: -16px;">
					    	<div class="to-delete">
									<i class="iconfont toDelete" @click.prevent="removeDomain(domain)">&#xe602;</i>
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

					  <div class="bboo" style="margin-top: 30px;">
						  <el-form-item>
							 	<el-button v-if="editFlag===false" @click="submitForm6('dynamicValidateForm')" type="primary">完成</el-button>
								<el-button v-if="editFlag===true" @click="submitForm7('dynamicValidateForm')" type="primary">完成</el-button>

							 	<el-button @click="addDomain" type="primary">新增选项</el-button>
					    	<el-button @click="submitAll" type="primary" style="margin-top:10px;" v-if="editFlag===false">提交</el-button>
					    	<el-button @click="resetForm6('dynamicValidateForm')" style="margin-top:10px;">重置单选</el-button>
						  </el-form-item>
					  </div>

				</el-form>

				<!--{{danxuanXiang}}-->



				{{danxuanXiang2}}
			</div>
		</div>

		<span style="font-size:13px;">当患者填写完成后，提示患者：</span>

		<p class="gray">{{this.tishi[0]}}</p>

		<div class="button" style="text-align:right;">
			<router-link to="/Head/title">
				<el-button type="primary" @click="back">编辑</el-button>
			</router-link>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">

	//import '@/common/js/mockCommon'
	import {mapMutations,mapGetters,mapActions} from 'vuex'
	import Qaq from '@/components/Qaq/Qaq'


	let reg = /^.{1,20}$/



	export default {

		props: {
			right: {
				type: String
			}

		},
		data() {
			return{

				danxuanXianglen: '',
				flag: false,
				flagger: false,
				flaggger: false,
				imgUrlflag: false,
				imgUrlflag2: false,

				serial_sp: 0,	//存储重新编辑的题型对应的index
				biaof: false, //存储重新编辑的标题标志位
				xiangf: false, //存储选项标志位
				fln: 0,

				biaoCun: '',	//存储重新编辑的标题
				biaoArr: [], //存储重新编辑的选项

				dialogImageUrl: '',
    		dialogVisible: false,
    		imgURL: 'http://mockjs.com/dist/mock',
    		imageNum: 0 ,
    		dynamicValidateForm: {
          domains: [{
            value: ''
          }]
        },
    		ruleForm3: {
					singleTit: ''

				},
        		rules3: {
        			singleTit: [
			            { required: true, message: '请输入标题名称', trigger: 'blur' },
			            { min: 1, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }

			        ]
        		}
			}

		},
		computed: {

			//筛选单选标题(解除双向绑定)
			danxuanBiaoti2() {
				//获取单选标题，解除双向绑定
				let arr = []
				let len = this.danxuanBiaoti.length
				for(var i = 0; i<len; i++) {
					if(i>len-2){
						arr.push(this.danxuanBiaoti[i])
					}
				}
				//提交完成之后清空单选标题
				this.danxuanBiaoti.length = 0
				return arr

			},
			//筛选单选选项
			danxuanXiang2() {
				//判断输入框个数，进而分别保存输入框的值，解除双向绑定
				let arr =[]
				if(this.danxuanXiang.length>3){
					for(var i = 0; i<this.danxuanXiang.length; i++){
						if(this.flaggger === false){
							if(i>this.danxuanXianglen-3){
								arr.push(this.danxuanXiang[i])
							}
						}
						if(this.flaggger === true){
							if(i>this.danxuanXianglen-4){
								arr.push(this.danxuanXiang[i])
							}
						}
					}
					return arr;
				}else{
					for(var i = 0; i<this.danxuanXiang.length; i++){
						arr.push(this.danxuanXiang[i])
					}
					return arr
				};
			},
			danxuanXiang3() {
				//将数组换为纯数字格式方便下一个方法(danxuanXiang4)，添加属性
				let arr = []
				let arr2 = []
				let len = this.danxuanXiang2.length
				for(var i=0;i<len;i++) {
					let num = ''
					num = Number(this.danxuanXiang2[i])
					arr.push(num)
				}
				arr2.push(arr)
				this.danxuanXiang.length = 0;
				return arr2
			},
			danxuanXiang4() { //为了适配elementUI radio
				return this.danxuanXiang3.map(function(n, i) { let o ={}; o["radio"+i]=n[0];o["data"]=n;return o;})
			},

			//筛选单选图片
			imgurlDan2() {
				let arr =[]
				//提交之后才能激活
				if(this.imgUrlflag === true || this.imgUrlflag2 === true){
					let imagelen = this.imgurlDan.length
					for(var i = 0; i<imagelen; i++) {
						arr.push(this.imgurlDan[i])
					}
					this.imgUrlflag = false
					this.imgurlDan.length = 0
					return arr
				}


			},

			...mapGetters([
				'biaoti',
				'biaotiNeirong',
				'tishi',
				'danxuan',
				'danxuanBiaoti',
				'danxuanXiang',
				'imgurlDan',
				'danxuanAll',
				'playing',
				'addC',
				'jisu',
				'zhi',
				'editFlag',
				'Serial_num'





			])

		},
		mounted() {
			this.$nextTick(() => {
				this._neiStyle();
			})

		},
		methods: {

			/*上传图片部分*/
			//图片成功上传
				handleAvatarSuccess(res, file) {
					if(this.imgUrlflag2===false) {
						this.addimgurlDan(file.url);
						this.$message.success('图片上传成功');
					}else{

					}
		       console.log(this.imgurlDan,"1");
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
				this.cutimgurlDan(file.url);
				console.log(this.imgurlDan,"2");
		    },
		    //图片预览
		    handlePictureCardPreview(file) {
		        this.dialogImageUrl = file.url;
		        console.log(this.dialogImageUrl,"预览模式")
		        this.dialogVisible = true;
		    },

			//页面刚刚加载完成执行的部分
			_neiStyle(){
				this.$refs.single.style.width = this.right;
				this.addDomain();
				this.flaggger = false;


			},

			conxiang(index){
				if(this.biaof === true){
					var a = this.dynamicValidateForm.domains[index].value
					//将a 赋值给 state里面对应的数据,因为state的数据不会轻易的改变。
					//var serial_sp = this.serial_sp this.danxuan[serial_sp+2][0]
					this.xiangf = true
					//这里改变的时候需要加一个中间件来保存所需值。如果最后正则未通过，则还原之前的值。
					var reg = /^.{1,5}$/
					//如果正则验证正确的话
					if(reg.test(a)===true){
							//这里面的index是	循环的danxuan[2]里面对应的index,找到循环的index进行 对应赋值
							var serial_xiang = (this.Serial_num+1)*3-1
							//012	345	678
							var indexx = this.danxuan[serial_xiang][0]//对应的选项集合
							var zzhi = indexx[index]//对应项集合的精确值
							//模拟 a = indexx，故要用state的mapMutationg方法异步处理的actiong方法
							this.fu_xiang2({
								num: serial_xiang,
								idx: index,
								zhi: a
							})
							console.log(zzhi,"+chaozhao+")

					}

					//改变了之后再起一个另外的正则验证。如果验证通过，则真正添加。

					//提交完成之后，给子级Qaq传值 子级用：props就收参数
					// 父级直接进行点击事件处理
					console.log(a,this.biaoArr,"++24+")

				}


			},

			cutXiang() {
        console.log("AAAAAAAAAAAAAAAAA")
				if(this.playing === true){

					this.CUT_DANXUANER(this.zhi)

					//QAQ删除多少项，这边也要删除多少项
//					for(var i=0;i<this.addC;i++){
//						console.log(this.zhi['zhi'+this.addC])
//					}
					//this.CHANGE_ADDC(0)
					this.SET_PLAYING_STATE(false)
				}
				if(this.editFlag === true){

					console.log('state.editFlag',this.editFlag,this.Serial_num);
					//设定图片上传标志位。
					var serial_sp = this.serial_sp
					this.imgUrlflag2 = true

					if(this.Serial_num === 0){
						serial_sp = this.Serial_num
					}else{
						serial_sp = this.Serial_num*3
					}
					//编辑第一步即为重新赋值
					//标题
					this.ruleForm3.singleTit = this.danxuan[serial_sp][0]
					console.log(this.danxuan[serial_sp+2][0],'+danxuan+')
					//选项的
					var len2 = this.danxuan[serial_sp+2][0].length
					let domains = this.dynamicValidateForm.domains
					//console.log()

					//添加选项框
					if(len2>2 && this.fln===0){
						for(let i=0;i<len2-2;i++){
							this.addDomain()
						}
						this.fln++
					}
					//遍历赋值给单选

					for(let b=0;b<len2;b++){
						domains[b].value = this.danxuan[serial_sp+2][0][b]
						console.log(domains[b].value,'---')

					}

					//重新赋值后，不可以再编辑页编辑赋值,所以

					//给每个单选选项添加事件


					// 图片的重新赋值
					// if(this.danxuan[this.Serial_num+1].length>=1){
					// 	for(let i=0;i<this.danxuan[this.Serial_num+1].length;i++){
					// 		this.handleAvatarSuccess(this.danxuan[this.Serial_num+1][i])
					// 	}
					// }

					if(this.biaof === true){
						this.ruleForm3.singleTit = this.biaoCun
						console.log(this.dynamicValidateForm.domains,"+1+")

					}





					//进行重新编辑，重新提交
					// 每次点击都会触发的事件，故添加一次之后便可以结束

					//父级向子级传值，进而改变子级状态。父级组件之间的通信即 父传子




					//this.CHANGE_EDIT(false)
					//debugger
					console.log(this.danxuanAll)
				}




			},


			back() {
				this.$router.push('/Head/title');

			},

			chooseImg() {

				axios.get('http://mockjs.com/dist/mock').then((res) => {
		        	console.log(res)
		        })

			},

			//单选标题
			submitForm3(formName) {
	        this.$refs[formName].validate((valid) => {
	          if (valid) {

							if(this.editFlag === true){
								//this.ruleForm3.singleTit = this.ruleForm3.singleTit;
								this.biaof = true
								this.biaoCun = this.ruleForm3.singleTit
								var abc = this.ruleForm3.singleTit
								this.fu_xiang2({
									num: this.Serial_num,
									idx: '',
									zhi: abc
								})

							}

	            console.log(this.ruleForm3.singleTit,"单选标题");
	            this.adddanxuanBiaoti(this.ruleForm3.singleTit);
						  //this.$store.commit('ADD_DANXUANBIAOTI',this.ruleForm3.singleTit)
	            //flag: 判断标题是否提交
	            this.flag = true;
							this.$message.success('表单选项完成');

	          } else {
	            this.$message.error('提交失败');
	            this.flag = false;
	            return false;
	          }
	        });

		  },

			resetForm3(formName) {
				this.flag = false;
				this.cutdanxuanBiaoti(this.ruleForm3.singleTit);
      	this.$refs[formName].resetFields();
      	this.$message.success('标题重置成功');

	     },

			 //重新赋值重置
			 chong(index) {

				 let domains = this.dynamicValidateForm.domains
				 domains[index].value = '1'

			 },

    	//单选选项部分
    	submitForm6(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
						if(this.xiangf === true){
							for(let c=0;c<this.dynamicValidateForm.domains.length;c++){
								this.biaoArr[c] = this.dynamicValidateForm.domains[c].value
							}
							console.log(this.dynamicValidateForm.domains.length)
							console.log(this.dynamicValidateForm.domains,"++value+")
						}

            this.$message.success('完成表单选项');
            this.addSucesess();
            this.flagger = true;
          } else {
            this.$message.error('请检查所填选项是否符合要求');
            this.flagger = false;
            //return false;
          }
        });
		    },
		    addSucesess() {
		   		let index = this.dynamicValidateForm.domains.length
		   		let domains = this.dynamicValidateForm.domains
		   		for(index in domains){
		   			//console.log(domains[index].value)
		   			this.adddanxuanXiang(domains[index].value)
		   		}
		   		this.danxuanXianglen = this.danxuanXiang.length
//
//		   		console.log(this.danxuanAll,"全部单选")
//
//		   		console.log(this.danxuanXiang2,"单选项")
//
//		   		console.log(this.danxuanXiang4,"单选项加")

		   	},

//为了更好的明确功能，我将编辑选项和重新赋值选项分成了两个提交方法。
				submitForm7(formName){
//验证通过后，重新精确赋值。
					this.$refs[formName].validate((valid) => {
	          if (valid) {
							alert(formName)
							if(this.xiangf === true){
								// for(let c=0;c<this.dynamicValidateForm.domains.length;c++){
								// 	//this.biaoArr[c] = this.dynamicValidateForm.domains[c].value
								// }
								this.CHANGE_EDITSUC(true)
								console.log(this.dynamicValidateForm.domains.length)
								console.log(this.dynamicValidateForm.domains,"++value+")
							}
						}

					})

							// if(this.xiangf === true){
							// 	for(let c=0;c<this.dynamicValidateForm.domains.length;c++){
							// 		//this.biaoArr[c] = this.dynamicValidateForm.domains[c].value
							// 	}
							// 	console.log(this.dynamicValidateForm.domains.length)
							// 	console.log(this.dynamicValidateForm.domains,"++value+")
							// }

				},

		    resetForm6(formName) {
		    	this.cutdanxuanXiang(this.danxuanXiang);
		    	this.flagger = false;
	        	this.$refs[formName].resetFields();
	      	},
	      	//整体提交
	      	submitAll() {
	      		if(this.flag === true && this.flagger === true){
	      			this.imgUrlflag = true

				   		this.addWenda({
				   			biaoti: this.danxuanBiaoti2,
				   			imgurl: this.imgurlDan2,
				   			arr: this.danxuanXiang3
				   		})
							this.ADD_DANXUAN_ALL()
							this.ADD_JISU()

	      			this.$message.success('表单选项完成');
	      			//提交完成之后，将选项重置回2个选项，有需求的时候再进行添加
				   		if(this.dynamicValidateForm.domains.length>2){
								this.dynamicValidateForm.domains.splice(2, 1)
							};
				   		this.flaggger = false
				   		console.log(this.danxuanAll,"+++1")
				   		//类似danxuanAll能保存，但是不受state限制,保存了就保存了,不双向绑定,需要中间有一个介质，保存要保存的值，去除该去除的值,//清空
				   		//第一次直接添加数组，第二次需要清空数组，再次添加
							//console.log(this.danxuanXiang2,"danxuan")
				   		//let str={}
				   		//str = JSON.stringify(this.danxuanAll)
							//
							//console.log(str)

			   		}else{
			   			this.$message.error('提交失败，请检查提交信息!');
			   		}
			   		//console.log(this.dynamicValidateForm.domains)
	      	},
	      	//移除选项
		    removeDomain(item) {
		        var index = this.dynamicValidateForm.domains.indexOf(item)
		        console.log(index);
		        if(this.dynamicValidateForm.domains.length<3){
							this.$message.error('至少为2个选项')
							return false
						}
		        if (index !== -1) {
		           this.dynamicValidateForm.domains.splice(index, 1)
		        }
		        if(this.dynamicValidateForm.domains.length===2){
		        	this.flaggger = false
		        }

		    },
		    //添加选项
			addDomain() {
						if(this.dynamicValidateForm.domains.length>2){
							this.$message.error('单选最多只能添加3个选项')
							return
						};
		        this.dynamicValidateForm.domains.push({
		          value: '',
		          key: Date.now()
		        });
		        this.flaggger = true;
			},


		   	...mapMutations({
		   		adddanXuan: 'ADD_DANXUAN',
		   		adddanxuanBiaoti: 'ADD_DANXUANBIAOTI',
		   		adddanxuanXiang: 'ADD_DANXUANXIANG',
		   		addimgurlDan: 'ADD_IMGURLDAN',
		   		cutdanxuanBiaoti: 'CUT_DANXUANBIAOTI',
		   		cutdanxuanXiang: 'CUT_DANXUANXIANG',
		   		cutimgurlDan: 'CUT_IMGURLDAN',
		   		ADD_JISU: 'ADD_JISU',
		   		ADD_DANXUAN_ALL: 'ADD_DANXUAN_ALL',
		   		SET_PLAYING_STATE: 'SET_PLAYING_STATE',
		   		CUT_DANXUANER: 'CUT_DANXUANER',
		   		CHANGE_ADDC: 'CHANGE_ADDC',
					CHANGE_XIANG: 'CHANGE_XIANG',
					CHANGE_EDITSUC: 'CHANGE_EDITSUC',
					CHANGE_EDIT: 'CHANGE_EDIT'




		   	}),
		   	...mapActions([
					'addWenda',
					'spl3',
					'fu_xiang2'
				])





		},
		components: {
			Qaq

		}



	}


</script>

<style lang="less" scoped>
	.border() {
		border: 1px solid red;
	}
	.gray{
		color: gray;
	}
	.single{
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
