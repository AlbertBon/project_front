// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css
import '@/styles/bon.css' // global css

import * as filters from './filters' // global filters
Object.keys(filters).forEach(key => {// register global utility filters.
  Vue.filter(key, filters[key])
})

import App from './App'
import router from './router'
import store from './store'
import './permission' // permission control

import {getRequest,uploadFileRequest,postRequest} from './utils/api'
Vue.prototype.postRequest = postRequest;
Vue.prototype.getRequest = getRequest;
Vue.prototype.uploadRequest = uploadFileRequest;

import 'font-awesome/css/font-awesome.css'//导入字体图标

Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
