import Vue from 'vue'
import VueRouter from "vue-router";
import Vuex from 'vuex';

import App from './App.vue'
import { routes } from "@/routes";

Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(Vuex);

Vue.use({
  install: (Vue) => {
    Vue.prototype.$bus = new Vue();
  }
});

const router = new VueRouter({
  routes // short for `routes: routes`
})


window.ipcRenderer.on('route-change-request', (event, navigationRequest) => {
  router.push({
    name: navigationRequest.name
  });
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
