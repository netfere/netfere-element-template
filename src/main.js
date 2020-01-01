import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import NetfereElement from 'netfere-element'
/**
 * 根据需要配置axios。配置说明：
 * defaults为axios全局默认配置，如超时时间等，更多同axios说明
 * 	defaults.format为扩展对象，对请求返回的数据进行统一格式化处理。单次请求如果有特殊要求，可以在每次请求时单独配置。
 * 		如果启用format，接收的数据为服务器返回数据。并且该功能只能在response配置为内置拦截器下有效
 *  defaults.returnFalseAuto 扩展字段，默认为true，在使用内置拦截器的情况下将服务器返回数据中包含{success:false}的数据直接转入reject处理
 * 	request为请求拦截器 {config:拦截config,error:拦截error}
 * 	response为响应拦截器{result:拦截response,err:拦截error}
 * 启用内置拦截器时，服务器返回数据一般为json格式，一般以{success:true|false,msg:String,data:any}返回或者在format中自行格式化
 *
 */

Vue.use(NetfereElement, {
  global: '$',
  store,
  axios: {
    defaults: {},
    request: {
      config(config) {
        config['headers']['x-access-token'] = '';
        if (!config.params) {
          config.params = {}
        }
        config.params['_t'] = new Date().getTime();
        return config;
      }
    },
    response: {}
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
