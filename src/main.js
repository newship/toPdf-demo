import Vue from 'vue'
import { Upload, Message } from 'element-ui';
import App from './App.vue'

Vue.use(Upload)
Vue.prototype.$message = Message;

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
