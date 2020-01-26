import Vue from "vue";
import App from "./App.vue";
import store from "./store";
require("xterm/css/xterm.css");

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
