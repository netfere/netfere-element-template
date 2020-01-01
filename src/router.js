/**
 * 引入经过netfere-element封装过的Router
 * 详见 https://github.com/netfere/netfere-element/blob/master/src/packages/router.js
 * Router是一个类，要通过 new Router()来使用
 * Blank是一个空白的vue组件，方便临时使用
 * BlankRouter是一个空白的带view-router的组件
 * */
import Router, { Blank, BlankRouter } from 'netfere-element/src/packages/router';

/**
 * 根据需要编写子系统路由，将在登陆后动态加载
 * 此处的配置将在login.vue中有引用，同时在本代码下 new Router()中on->ready中使用到
 */
export const adminRoutes = [
	{
		path: '/admin', name: 'index',
		redirect: { path: '/admin/home' },
		/** 关于meta说明见本文件最下方的注释 */
		meta: { moveup: true, roles: ['master'] },
		/** 此处views即相当于./src/views 在vue.config.js中定义了alias；下面admin也一样 */
		component: () => import('views/index.vue'),
		children: [
			{
				path: 'home', meta: { title: '首页' },
				component: () => import('admin/home'),
			}, 
			/** Blank 示例 */
			{
				path: 'blank', meta: { title: '一个空白页' },
				component: Blank
			}, 
			/** BlankRouter 示例 */
			{
				path: 'blankrouter', meta: { title: '空白路由' },
				component: BlankRouter,
				children: [
					{ path: 'page1', meta: { title: '页面1' }, component: Blank },
					{ path: 'page2', meta: { title: '页面2' }, component: Blank },
				]
			}
		]
	}
]
/**
 * 初始化路由并导出，将在main.js中会引用此导出
 * 一般在初始化路由时配置一些通用路由信息。在用户登陆或指向相应子系统时再动态加载相应的路由
 */
export default new Router({
	/** 是否显示页面跳转时的进度条 */
	progress: true,
	/** 配置404页面中功能按钮 */
	'404': { props: { actions: [{ text: '回首页', path: '/' }, { text: '转到登陆页', path: '/login' }] } },
	/** 配置401页面中功能按钮 */
	'401': { props: { actions: [{ text: '去登陆', path: '/login' }] } },
	/** 通用路由信息 其中meta的配置别见说明 */
	routes: [
		{
			path: '/',
			redirect: { path: '/login' },
		},
		{
			path: '/login',
			meta: { hidden: true },
			component: () => import('views/login')
		},
		{
			path: '/logout',
			meta: { title: '退出系统', index: 999, emit: 'logout' }
		}
	],
	/** 事件侦听 */
	on: {
		/** 此处主要是处理用户已登陆系统后通过F5等刷新页面时避免二次登陆，所以用到sessionStorage中的数据 */
		/** 与原生vue-router的onReady事件一致，增加路由实例作为参数 */
		ready: instance => {
			/** getSub封装路由的内置方法，获取当前网址中 #/这个值/ */
			const name = instance.getSub();
			/** 通过name判断当前子系统 */
			if (['admin'].indexOf(name) > -1) {
				/** 从sessionStorage中读取permission值，此值是在login.vue中login方法写入的 */
				const { type, roles = [], expires = 0 } = JSON.parse(sessionStorage.getItem('permission') || "{}");
				/** 如果未过期 */
				if (expires > new Date().getTime()) {
					if (type === 'admin') {
						/** 动态加载子系统路由及权限 */
						instance.loadRoutes(adminRoutes, roles);
					} else {
						/** force 是封装中扩展的强制跳转 */
						instance.force('/login')
					}
				} else {
					instance.force('/login')
				}
			}
		}
	}
});

/**
 * 路由项目中配置meta用于控制菜单导航
 * title - 菜单名称，不存在则使用name
 * hidden - 是否隐藏,为true时将不显示在导航菜单中
 * icon - 菜单的图标class
 * index - 用于排序
 * moveup - 为true时，则此项目提前一级
 * roles - 权限数组 如 role=['user','master']
 * exclude - 排除权限 一般父级有一系列权限，某子项从中排除某项权限
 * emit - 将触发emit指定事件，此时在导航菜单中将不会跳转到对应的path，需要另行侦听emit事件
 */