export const biaoti = state => state.biaoti

export const biaotiNeirong = state => state.biaotiNeirong

export const tishi = state => state.tishi

export const danxuan = state => state.danxuan

export const danxuanBiaoti = state => state.danxuanBiaoti

export const danxuanXiang = state => state.danxuanXiang

export const imgurlDan = state => state.imgurlDan

export const playing = state => state.playing

export const danxuanAll = (state) => {
//由于数组关系，需要对数组进行截取，每截取3个再成一个新的数组，组成一个新的单选题
 		return state.danxuanAll
}


export const MultiBiaoti = state => state.MultiBiaoti

export const imgurlMulti = state => state.imgurlMulti

export const MultiXiang = state => state.MultiXiang

//给对应单多选index重新赋值
export const zhi = state => state.zhi
//标记对应单多选index，保证进行删除操作找到对应index
export const addC = state => state.addC
//记录标记题目序号
export const jisu = state => state.jisu


export const wenda = state => state.wenda
export const wendaBiaoti = state => state.wendaBiaoti
export const imgurlWenda = state => state.imgurlWenda
export const wendaXiang = state => state.wendaXiang

export const editFlag = state => state.editFlag
export const Serial_num = state => state.Serial_num
export const splarr = state => state.splarr
export const splbiao = state => state.splbiao
export const splimg = state => state.splimg
export const editSuc = state => state.editSuc

export const currentIndex = state => state.currentIndex

export const currentIndexDuo = state => state.currentIndexDuo

//export const currentDanxuanxiang = (state) => {
//	return state.danxuan[state.currentIndex] || {}
//}
//
//export const currentDuoxuanxiang = (state) => {
//	return state.duoxuan[state.currentIndexDuo] || {}
//}
