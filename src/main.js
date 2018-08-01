import Vue from 'vue'
import { Upload } from 'element-ui';
import App from './App.vue'

Vue.use(Upload)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
