/** 引入封装库 */
import NetfereElement from '../../../netfere-element';

// import VueSocketio, { sockets } from 'netfere-element/src/packages/websocket';
/**
 * NetfereElement内置Axios作用为互服务端交互的http请求库
 * 配置后可以通过global指示的变量名来调用query(),get(),post()等方法进行http请求
 */
const axios = {
    /** 
     * 全局配置配置项目，允许值可参考Axios说明 
     * 可参考 https://segmentfault.com/a/1190000015786188 请求配置
     */
    defaults: {
        /** 对于固定的后端请求时，可以这样配置，然后正常请求时url写相对地址 */
        baseURL: 'http://127.0.0.1:8360'
    },
    /**
     * 是否启用拦截器，默认为true，
     * 如果配置为false时，则request和response配置无效。此时返回数据为Axios原始数据格式
     * 包括{data,config,status,statusText,headers}数据,其中data为服务器返回数据
     * 配置为true时，request和response有配置有生效，此时返回数据仅data项目
    */
    interceptor: true,
    /**
     * Axios请求拦截器配置
     *  request.config(options) 可以在请求前修改传入的请求数据，必须返回最终的配置结果
     *  request.error(err) 在请求前出错的处理，必须返回出错数据。一般可不配置
     */
    request: {
        /** 这里示例表示每次请求时都附加固定值 */
        config(options) {
            /**
             * 在headers中添加令牌
             * 这里的window.token可能在login.vue->login方法中或router.js->on->ready中赋值
            */
            options['headers']['x-access-token'] = window.token || "";
            /**每将都添加当前时间 */
            if (!options.params) {
                options.params = {}
            }
            options.params['_t'] = new Date().getTime();
            /**必须返回，必须返回 */
            return options;
        }
    },
    /**
     * 请求后响应拦截器配置
     *  response.result(res) 这里的res为返回数据，可以统一进行处理，以供前端使用，必须返回处理后的数据
     *  response.error(err) 请求时发生的错误，必须返回err或处理后的err数据。一般可不配置
     */
    response: {
        result(res) {
            if(res.data.success){
                return res.data;
            }else{
                return Promise.reject(res.data);
            }
        },
        error(error){
            return {success:false,msg:error.message}
        }
    }
}

const initNetfereElement = (Vue, store) => {
    /** 应用NetfereElement库 */
    Vue.use(NetfereElement, {
        /**
         * global用于配置全局使用库中内置的netfere-ts方法，不使用则不需要配置
         * 关于 netfere-ts 可查看 https://github.com/netfere/netfere-ts
         * global的值，即全局可能使用的变量。如设置为 $，则在编写代码时直接使用 $.方法
         */
        global: '$',
        /** 实例化的vuex对象，才能支持根据路由配置直接生成导航菜单 */
        store,
        /** 
         * 如果要启用库内优化配置的Axios,需要配置 
         * 这里直接为{},则启用Axios，并使用默认的内置配置
         * 如果要自行配置，可参考上方axios示例
         */
        axios
    });
}

const initWebSocket = (Vue) => {
    Vue.use(VueSocketio, {
        debug: false,
        connection: "http://localhost:8360",
        options: { path: '/socket.io', autoConnect: false }
    });
}

export default function install(Vue, store) {
    if (!store) {
        console.error('使用NetfereElement时，必须传入vuex实例后的store')
    }

    initNetfereElement(Vue, store);

    /** 需要启用websocket时，请去掉下行注释 */
    // initWebSocket(Vue);
}
/**需要启用websocket时，请去掉下行注释 */
//export { sockets }

/**
 * 关于启用WebSocket统一说明
 * 请注意以下步骤
 * 1、去掉本文件上方引入VueSocketio的注释;
 * 2、在install方法中去掉 initWebSocket(Vue) 前的注释
 * 3、去掉 export { sockets } 前的注释
 * 4、将 main.js 文件中 import Netfere from './plugins/netfere' 改为 import Netfere, {sockets} from './plugins/netfere';
 * 5、在 main.js 文件中 new Vue({})代码中配置内容中添加 sockets 项目
 */