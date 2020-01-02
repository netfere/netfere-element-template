import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Netfere from './plugins/netfere';

/** 必须将store传入 */
Vue.use(Netfere,store);


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  mounted() {
    this.$bus && this.$bus.init()
  }
}).$mount('#app')
