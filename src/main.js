import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

console.log(window.ipcRenderer)

window.ipcRenderer.on('hello', (event, arg) => {
  // Get the current Vue instance (i.e. which component/route is currently active)
  // let component = router.currentRoute.matched[0].instances.default
  //
  // component.someReactiveData = 'Received message from main process
  console.log(event, arg);
})

new Vue({
  render: h => h(App),
}).$mount('#app')
