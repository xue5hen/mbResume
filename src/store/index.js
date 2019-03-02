import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

let baseUrl = (process.env.NODE_ENV === 'production') ? '/xiangqin/static' : '/static'

export default new Vuex.Store({
  state: {
    // API Base URL
    baseUrl: baseUrl,
    // 用户信息
    userInfo: {
      components: ['welcome', 'userinfo', 'end'],
      welcome: {},
      userinfo: {}
    }
  },
  mutations: {
    // 用户信息设置
    userInfoSetter (state, params) {
      for (var key in params) {
        if (params[key] !== null) {
          Vue.set(state.userInfo, key, params[key])
        }
      }
    }
  }
})
