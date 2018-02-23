// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import('../node_modules/vuetify/dist/vuetify.min.css')
import colors from 'vuetify/es5/util/colors'
import './firebase';
import VueFire from 'vuefire';

Vue.config.productionTip = false

Vue.use(Vuetify)
Vue.use(VueFire);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
