import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";

import { routes } from "@/routes";

Vue.config.productionTip = false
Vue.use(VueRouter);

const router = new VueRouter({
  routes // short for `routes: routes`
})

// console.log(window.ipcRenderer)

window.ipcRenderer.on('route-change-request', (event, navigationRequest) => {
  // Get the current Vue instance (i.e. which component/route is currently active)
  // let component = router.currentRoute.matched[0].instances.default
  //
  // component.someReactiveData = 'Received message from main process
  router.push({
    name: navigationRequest.name
  });
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
