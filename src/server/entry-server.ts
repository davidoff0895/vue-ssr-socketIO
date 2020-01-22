import Vue from 'vue'

import Server from 'server/server.vue'

export default (context: any) => {
  return new Vue({
    el: '#app',
    render: (h) => h(Server)
  })
}
