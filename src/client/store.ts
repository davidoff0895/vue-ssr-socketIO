import Vue from 'vue'
import Vuex from 'vuex'

const SOCKET_UPDATE_DATA = 'SOCKET_UPDATE_DATA'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    connect: false,
    message: null
  },
  getters: {
    connect: (state => state.connect),
    message: (state => state.message)
  },
  actions: {
    otherAction: (context: any, type: any) => {
      return true;
    },
    socket_userMessage: (context: any, message: any) => {
      context.dispatch('newMessage', message);
      context.commit('NEW_MESSAGE_RECEIVED', message);
      if (message.is_important) {
        context.dispatch('alertImportantMessage', message);
      }
    }
  },
  mutations:{
    SOCKET_CONNECT: ({state}: any,  status: any) => {
      state.connect = true;
    },
    SOCKET_USER_MESSAGE: (state,  message) => {
      state.message = message;
    }
  },
  strict: debug,
});
