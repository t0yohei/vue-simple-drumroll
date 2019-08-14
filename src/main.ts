import Vue from "vue";
import SimpleDrumroll from "./SimpleDrumroll.vue";

Vue.config.productionTip = false;

new Vue({
  render: h => h(SimpleDrumroll)
}).$mount("#app");
