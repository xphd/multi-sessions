import Vue from "vue";
import App from "./App.vue";

import VueSocketIO from "vue-socket.io";

Vue.use(
  new VueSocketIO({
    debug: true,
    connection: "http://localhost:9090"
  })
);

Vue.config.productionTip = false;

new Vue({
  render: function(h) {
    return h(App);
  }
}).$mount("#app");
