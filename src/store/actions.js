import * as types from './mutation-types'

//添加到danxuan
export const addWenda = function({commit,state},{biaoti,imgurl,arr}) {
	commit(types.ADD_DANXUAN,biaoti)
	commit(types.ADD_DANXUAN,imgurl)
	commit(types.ADD_DANXUAN,arr)
}

//编辑替换
export const spl3 = function({commit,state},{index,arrX,arrImg,arrBiao,flag}) {
	commit(types.SPL_XIANG2,flag)
	commit(types.SPL_XIANG3,arrX)
	commit(types.SPL_IMG,arrImg)
	commit(types.SPL_BIAO,arrBiao)
	commit(types.SPL_XIANG,index)
}

//选项精确赋值
export const fu_xiang2 = function({state},{num,idx,zhi}){
	if(idx===''){
		state.danxuan[num][0] = zhi
	}else{
		state.danxuan[num][0][idx] = zhi
	}

}
