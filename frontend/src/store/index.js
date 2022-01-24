import { createStore } from 'vuex'
const axios = require('axios'); 

const instance = axios.create({
  baseURL: 'http://localhost:3000/api/'
});

export default createStore({
  state: {
    status: '',
    user:{
      id_user: -1,
      token: '',
    },
    userData:{
      firstName:'',
      name:'',
      login:'',
      profilePicture:'',
    },
    feedDatas:{
      content:'',
    },
  },
  mutations: {
    setStatus: function (state, status) {
      state.status = status;
    },
    logUser : function (state, user) {
      instance.defaults.headers.common['Authorization'] = user.token;
      state.user = user;
    },
    userDatas: function (state, userDatas){
      state.userDatas = userDatas;
    },
    feedDatas: function (state, feedDatas) {
      state.feedDatas = feedDatas;
    }
  },
  actions: {
    createAccount: ({commit}, userData) => {
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) => {
        instance.post('/auth/signup', userData) 
        .then(function (response) {
          commit('setStatus', 'create');
          resolve(response);
        })
        .catch(function (error) {
          commit('setStatus', 'error_create');
          reject(error);
        })
      });  
    },
    login: ({commit}, userData) => {
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) => {
        instance.post('/auth/login', userData) 
        .then(function (response) {
          commit('setStatus', '');
          commit('logUser', response.data);
          resolve(response);
        })
        .catch(function (error) {
          commit('setStatus', 'error_login');
          reject(error);
        })
      });  
    },
    getUserDatas: ({commit}) => {
      instance.get('/auth/:id') 
      .then(function (response) {
        commit('userDatas', response.data);
      })
      .catch(function () {
      })
    },
    getPosts: ({commit}) =>{
      instance.get('/posts') 
      .then(function (response) {
        commit('feedDatas', response.data);
      })
      .catch(function () {
      })
    }
  }, 
  modules: {
  }
})
