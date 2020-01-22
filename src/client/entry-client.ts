import Vue from 'vue'

import app from './app.vue'
import router from './router'

const vue = new Vue({
  el: '#app',
  render: (h) => h(app),
  router
})
