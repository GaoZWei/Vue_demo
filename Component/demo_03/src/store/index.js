import {
  createStore
} from 'vuex'
import axios from 'axios'
//Vuex数据管理框架
//Vuex 创建全局唯一的仓库,用来存放全局的数据
export default createStore({
  state: {
    name: 'dell'
  },
  //mutations只允许写同步代码,不允许写异步代码
  //commit 和mutation做关联
  mutations: {
    //第四步,对应的mutation被执行
    change(state, str) {
      //第五步,在mutation中修改数据
      state.name = str
    },
    changeName(state, str) {
      state.name = str
    }
  },
  //dispatch和actions做关联
  actions: {
    //第二步,store感知到你触发了一个叫change的action,执行change方法
    change(store, str) {
      //第三步,触发一个mutations,提交一个commit
      // this.commit('change')
      setTimeout(() => {
        store.commit('change', str)
      }, 2000)
    },
    getData(store) {
      axios
        .get("https://api.apiopen.top/getJoke?page=1&count=2&type=video")
        .then(response => {
          store.commit('changeName', response.data.message)
        });
    },
  },
  modules: {}
})