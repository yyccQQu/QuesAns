import * as types from './mutation-types'
//const storage = window.sessionStorage

//重置单选只能一个一个重置。且提交之后不能重置。

const mutations = {

	[types.ADD_BIAOTI](state, biaotier) {
		state.biaoti.push(biaotier)
	},
	[types.ADD_NEIRONG](state, neironger) {
		state.biaotiNeirong.push(neironger)
	},
	[types.ADD_TISHI](state, tishier) {
		state.tishi.push(tishier)
	},
	[types.CUT_BIAOTI](state) {
		state.biaoti.shift()
	},
	[types.CUT_NEIRONG](state) {
		state.biaotiNeirong.shift()
	},
	[types.CUT_TISHI](state) {
		state.tishi.shift()
	},


	[types.ADD_DANXUAN](state, danxuaner) {
		state.danxuan.push(danxuaner)
	},
	[types.ADD_DANXUANBIAOTI](state, danxuanBiaoti) {
		state.danxuanBiaoti.push(danxuanBiaoti)
	},
	[types.ADD_DANXUANXIANG](state, danxuanXiang) {
		state.danxuanXiang.push(danxuanXiang)
	},
	[types.ADD_IMGURLDAN](state, url) {
		state.imgurlDan.push(url)
	},


	//重置、和删除意思

	[types.CUT_DANXUANBIAOTI](state) {
		state.danxuanBiaoti.shift()
	},
	[types.CUT_DANXUANXIANG](state) {
		state.danxuanXiang.shift()
	},
	[types.CUT_IMGURLDAN](state, url) {
		let len = state.imgurlDan.length
		for(var i=0;i<len;i++){
			//当url地址和所属数组某一项相同时，就删除该数组内的项
			if(url === state.imgurlDan[i]){
				state.imgurlDan.splice(i, 1);
				return state.imgurlDan
			}
		}
	},

	[types.ADD_MULTI](state, multier) {
		state.Multi.push(multier)
	},
	[types.CUT_MULTI](state) {
		state.Multi.shift()
	},

	[types.ADD_MULTIBIAOTI](state, multibiaotier) {
		state.MultiBiaoti.push(multibiaotier)
	},
	[types.CUT_MULTIBIAOTI](state) {
		state.MultiBiaoti.shift()
	},

	[types.ADD_IMGURLMULTI](state, url) {
		state.imgurlMulti.push(url)
	},
	[types.CUT_IMGURLMULTI](state, url) {
		let len = state.imgurlMulti.length
		for(var i=0;i<len;i++){
			//当url地址和所属数组某一项相同时，就删除该数组内的项
			if(url === state.imgurlMulti[i]){
				state.imgurlMulti.splice(i, 1);
				return state.imgurlMulti
			}
		}
	},

	[types.ADD_MULTIXIANG](state, xianger) {
		state.MultiXiang.push(xianger)
	},
	[types.CUT_MULTIXIANG](state) {
		state.MultiXiang.shift()
	},


	[types.ADD_DANXUAN_ALL](state) {

		let arr = [];
		let len = state.danxuan.length
		for(var i=0; i<len; i++){
			arr.push(state.danxuan[i])
		}
		var arr1 = [],length=arr.length;
	        for(var i=0;i<length;i+=3){
	            var letarr = []
	            if(length-i<3){//当数组不够等分的情况下
	                for(var j=0;j<length-i;j++){
	                    letarr.push(arr[i+j])
	                }
	            }else{
	                for(var j=0;j<3;j++){
	                    letarr.push(arr[i+j]);
	                }
	            }
	            arr1.push(letarr)
	        }
		state.danxuanAll = arr1
//		state.danxuan = arr1

		return state.danxuanAll
	},

	//删除指定3个项，吱吱
	[types.CUT_DANXUANER](state, index) {
			//zhi 是 danxuanall 里面的值，
			//012 345 678
		if(index === 0){
			state.danxuan.splice(index,3)
		}else{
			state.danxuan.splice((index*3),3)
		}
		console.log(state.danxuan)
	},


	[types.CUT_DANXUAN_ALL](state, index) {
		state.danxuanAll.splice(index,1)
	},

	//最先进入这个函数
	//用action函数进行异步操作
	[types.SPL_XIANG](state, index) {
		console.log(index,"indesss")
		//var n = state.danxuanAll[index][2]
		console.log(state.danxuan[index])
		if(state.splflag){
			console.log(state.danxuan)

			//先赋值，后解绑
			var arr2 = state.splarr
			var arr1 = state.splimg
			var arr0 = state.splbiao

			let n2 = []
			let	n1 = []
			let	n0 = []
			for(let i=0;i<arr2.length;i++){
				n2[i] = arr2[i]
			}
			for(let i=0;i<arr1.length;i++){
				n1[i] = arr1[i]
			}
			for(let i=0;i<arr0.length;i++){
				n0[i] = arr0[i]
			}

			//找到所要替换的选项对应的index
			if(index === 0){
				state.danxuan[index+2].splice(0,3,n2)
				state.danxuan[index+1].splice(0,3,n1)
				state.danxuan[index].splice(0,3,n0)
			}else{
				state.danxuan[index*3+2].splice(0,3,n2)
				state.danxuan[index*3+1].splice(0,3,n1)
				state.danxuan[index*3].splice(0,3,n0)
			}
		}else{
			console.log('1234')
			return
		}
		console.log(state.splarr)
		state.splarr=[]
		state.splimg=[]
		state.splbiao =[]
	},

	[types.SPL_XIANG2](state, flag) {
		state.splflag = flag
	},
	[types.SPL_XIANG3](state, arr) {
		state.splarr = arr
	},
	[types.SPL_IMG](state, arr) {
		state.splimg = arr
	},
	[types.SPL_BIAO](state, arr) {
		state.splbiao = arr
	},


	[types.SET_PLAYING_STATE](state, flag) {
	    state.playing = flag
	},
	[types.CHANGE_ZHI](state, zhi) {
		state.addC++
		let a = state.addC
	    state.zhi["zhi"+a] = zhi
	    //操作多个zhi
	    //o["radio"+i]=n[0]
	},
	[types.CHANGE_EDIT](state, flag) {
	    state.editFlag = flag
	},
	[types.CHANGE_SERIAL](state, num) {
	    state.Serial_num = num
	},
	[types.CHANGE_EDITSUC](state, flag) {
	    state.editSuc = flag
	},

	[types.CHANGE_ADDC](state, addc) {
		state.addC = addc
	},

	[types.ADD_JISU](state, addc) {
		state.jisu++
	},
	[types.CUT_JISU](state, addc) {
		state.jisu--
	},



//	[types.ADD_WENDA](state, wenda) {
//		state.wenda = wenda
//	}, === adddanxuan

	[types.ADD_IMGURLWENDA](state, url) {
		state.imgurlWenda.push(url)
	},
	[types.CUT_IMGURLWENDA](state, url) {
		let len = state.imgurlWenda.length
		for(var i=0;i<len;i++){
			//当url地址和所属数组某一项相同时，就删除该数组内的项
			if(url === state.imgurlWenda[i]){
				state.imgurlWenda.splice(i, 1);
				return state.imgurlWenda
			}
		}
	},
	[types.ADD_WENDABIAOTI](state, biaoti) {
		state.wendaBiaoti.push(biaoti)
	},
	[types.CUT_WENDABIAOTI](state, danxuanBiaoti) {
		state.wendaBiaoti.shift()
	},




	[types.SET_CURRENT_INDEX](state, index) {
		state.currentIndex = index
	},
	[types.SET_CURRENT_INDEX_DUO](state, index) {
		state.currentIndexDuo = index
	}

}

export default mutations
