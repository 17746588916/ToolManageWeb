import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  userInfo: window.sessionStorage.getItem('YUFP-SESSION-USER'),
  token: window.sessionStorage.getItem('UFP-Authorization'),
  listName:'全部',
  searchParams:{
    mark: 'none',//控制是否为模糊查询，obscure为模糊查询，none为精准查询
    toolName: null, //工具或课程名
    sort: 'time',//排序
    status: null,//工具状态
    spare1: null,//一级分类
    toolType: null//二级分类
  },
  productName:'',
  loginPop:false
};

const mutations = {
  // 状态变更
  SET_TOKEN: (state, data) => {
    state.token = data;
    window.sessionStorage.setItem('UFP-Authorization', data);
  },
  SET_USER_INFO: (state, data) => {
    state.userInfo = data;
    window.sessionStorage.setItem('YUFP-SESSION-USER', data);
  },
  REMOVE_TOKEN: (state) => {
    state.token = null;
    window.sessionStorage.removeItem('UFP-Authorization');
  },
  REMOVE_USER_INFO: (state) => {
    state.userInfo = null;
    window.sessionStorage.removeItem('YUFP-SESSION-USER');
  },
  SET_LoginPop: (state, data) => {
    state.loginPop = data;
  },
  SET_listName: (state, data) => {
    state.listName = data;
  },
  SET_productName: (state, data) => {
    state.productName = data;
  },
  SET_SearchParams: (state, data) => {
    state.searchParams =Object.assign(state.searchParams, data);
  }

};
  
const getters = {
  GET_USER_INFO: state => {
    return state.userInfo
  },
  GET_LoginPop: state => {
    return state.loginPop
  },
  GET_listName: state => {
    return state.listName
  },
  GET_productName: state => {
    return state.productName
  },
  GET_SearchParams: state => {
    return state.searchParams
  }
}

const actions = {

};

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})
