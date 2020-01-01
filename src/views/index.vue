
<template>
  <nf-frame :title="title" :user-name="userName" :user-avatar="userAvatar" :actions="actions" @logout="logout"></nf-frame>
</template>

<script>
/** assets 即 ../assets 在 vue.config.js中配置的alias */
import avatar from "assets/user.png";
export default {
  data() {
    return {
      title: "NetfereElement", //站点标题文本
      userName: "admin", //姓名或昵称，将显示界面右上角
      userAvatar: avatar, //头像，将和name显示一起显示在界面右上角
      actions: [
        {
          text: "个人中心",
          disabled: true //禁用
        },
        {
          text: "退出系统",
          divided: true, //与上一条目之间加分隔线
          //点击项目的响应
          handler: () => {
            this.logout();
          }
        }
      ]
    };
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    //退出登录
    logout() {
      this.$.confirm({
        message: "确认退出吗？",
        btnText: "退出",
        cancel: "再留一会",
        type: "warning",
        handler: () => {
          // 如何处理退出逻辑，可自己编辑，此处示例将与login.vue中的login对应处理
          sessionStorage.clear();
          //sessionStorage.removeItem("user");
          this.$router.push("/login");
        }
      });
    }
  }
};
</script>
