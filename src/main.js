// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import '@/assets/css/reset.css'
import '@/assets/fontIcon/iconfont.css'
import '@/assets/css/index.css'

import mockC from '@/common/js/mockCommon'
import {Button,Dialog,Upload,Input,MessageBox,Message,Form,FormItem,Checkbox,CheckboxGroup,Radio,RadioGroup} from 'element-ui'
  
Vue.prototype.$ELEMENT = { size: 'small' }
Vue.use(Button)
Vue.use(Upload)
Vue.use(Dialog)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$message = Message
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Radio)
Vue.use(RadioGroup)
//Vue.use()
//import fastclick from 'fastclick'
//fastclick.attach(document.body)

// 默认设置axios请求
// axios.default.baseUrl = 'http://localhost:3000/'  //设置默认请求的前缀
axios.defaults.withCredentials = true //允许跨域
global.axios = axios //设置为全局引用

// Vue.prototype.$http = axios //在vue的原型链上添加axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
 	store,
  template: '<App/>',
  components: { App }
})
