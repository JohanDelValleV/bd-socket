import Vue from 'vue'
import './plugins/vuetify'
import App from './components/Main.vue'
// import Notifications from 'vue-notification'
import Toasted from 'vue-toasted'

Vue.config.productionTip = false

Vue.use(Toasted)

new Vue({
  render: h => h(App),
}).$mount('#app')
