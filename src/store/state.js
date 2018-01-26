
const state = {
	biaoti: [],
	biaotiNeirong: [],
	tishi: [],

	danxuan: [],
	danxuanBiaoti: [],
	imgurlDan: [],
	danxuanXiang: [],

	playing: false,
	danxuanAll: [],
	zhi: {},
	addC: 0,
	jisu: 0,


	Multi: [],
	MultiBiaoti: [],
	imgurlMulti: [],
	MultiXiang: [],

	wenda: [],
	wendaBiaoti: [],
	imgurlWenda: [],
	wendaXiang: [],

/*vuex 的模块化。单选进danxuan，多选进Multi，问答进wenda*/
//编辑模块
	Serial_num: '',//每一个要被编辑题目的index
	editFlag: false,
	splflag: false,
	splarr: [],
	splbiao: [],
	splimg: [],
	editSuc: false,	//未使用的编辑状态。




	currentIndex: -1,
	currentIndexDuo: -1

//	wenda:{
//		biaoti: [],
//		biaotiNeirong: [],
//		tishi: [],
//		single:{
//			singleTitle:[],
//			singleXiang:[],
//			imgurlDan:[]
//		},
//		Multiselect:{
//			MultiselectTitle:[],
//			MultiselectXiang:[],
//			imgurlDuo:[]
//		},
//
//	}
// wendaAll:[]

}

export default state
