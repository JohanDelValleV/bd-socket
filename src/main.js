import Vue from 'vue'
import './plugins/vuetify'
import App from './components/Main.vue'
// import Notifications from 'vue-notification'
import VueNoty from 'vuejs-noty'

Vue.config.productionTip = false

Vue.use(VueNoty)

new Vue({
  render: h => h(App),
}).$mount('#app')
