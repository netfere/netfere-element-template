<template>
  <div>
    <nf-form style="width:450px;margin:20px auto;" v-bind="config" v-model="model"></nf-form>
  </div>
</template>

<script>
// 引入登陆系统后要加载的路由信息
import { adminRoutes } from "../router.js";
export default {
  components: {},
  data() {
    return {
      model: {},
      config: {
        title: "登陆系统",
        fields: [
          {
            label: "用户名",
            prop: "username",
            required: true,
            xtype: "input",
            value: "admin"
          },
          {
            label: "密码",
            prop: "password",
            required: true,
            xtype: "input",
            type: "password",
            value: "123456"
          }
        ],
        buttons: {
          align: "right",
          items: [
            {
              text: "登陆",
              handler: (form, btn) => {
                this.login(form, btn);
              }
            },
            { text: "注册", handler: () => {} }
          ]
        }
      }
    };
  },
  mounted() {
      
  },
  methods: {
    // 登陆验证逻辑，此处一般与服务端交互，用户验证完成后按要求处理数据
    login(form, btn) {
      // 用户权限数据
      // 在router.js->on->ready中将按此数据格式处理，请与之配合，或二者一起修改
      const permission = {
        type: "admin", // 用户类型
        roles: ["master"],// 用户权限标识
        token: "", // 令牌
        expires: $.date().addHours(1).getTime() //token值过期时间
      };
      // 将登陆信息记录在 sessionStorage 中 
      sessionStorage.setItem("permission", JSON.stringify(permission));
      // 引导登陆系统后的路由信息 
      // 此处的this.$router是经过封装的，支持loadRoutes方法进行动态路由加载；
      // 封装代码详见 https://github.com/netfere/netfere-element/blob/master/src/packages/router.js
      this.$router.loadRoutes(adminRoutes, permission.roles);
      // 页面转向
      this.$router.push({ path: "/admin" });
    }
  }
};
</script>