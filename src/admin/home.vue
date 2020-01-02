<style scoped>
.lineHeight{
    line-height:25px;
}
</style>

<template>
    <div>
        <h2>快速上手</h2>
        <div class="lineHeight">
            克隆模板<br />
            git clone https://github.com/netfere/netfere-element-template.git <br />
            安装依赖<br />
            npm install 或 cnpm install <br />
            初始化配置<br />
            1、在src/views/login.vue中编辑登陆界面及账户验证；<br>
            2、在src/views/index.vue配置站点名称、界面右上角的姓名和头像，以及鼠标滑过头像处的菜单及响应；<br>
            3、在router.js中配置路由信息，配置的路由将会显示为本界面左侧的导航菜单；<br>
            4、另外main.js和src/plugins/netfere.js文件很重要，请打开来看一下，可以根据自己的需要修改<br>
            <span style="color:red;">上述配置说明均在相应的文件中</span>
        </div>
        <h2>关于NetfereElementTemplate</h2>
        <div class="lineHeight">
            NetfereElementTemplate是对vue、vuex、vue-router、element-ui进行集成封装的模板，一般适用于后台管理系统是内容管理系统Content Manage System（简称CMS）。<br />
            特色功能主要有：
            <ul>
                <li>
                    非侵入的改写了ElementUi中的大部分组件，支持以javascript直接配置或调用，减少在vue文件中编写大量的html代码；
                </li>
                <li>内置了界面布局组件，适用于后台管理界面的开发。同时将路由配置与导航菜单组合，菜单将根据路由信息变化；</li>
                <li>内置了常用的工具库，方便配合vue开发；</li>
            </ul>
            更多的功能及帮助请移步<a href="https://github.com/netfere/netfere-element" target="_blank">https://github.com/netfere/netfere-element</a>
        </div>
    </div>
</template>

<script>
export default {
    components:{},
    data(){
        return {}
    },
    created(){},
    mounted(){},
    computed:{},
    methods:{}
}
</script>