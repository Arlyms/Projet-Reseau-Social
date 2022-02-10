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
    userDatas:[],
    posts:[],
    comments: [],
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
    SET_POSTS: function (state, posts){
      state.posts = posts;
    },
    SET_COMMENTS: function (state, comments){
      state.comments = comments;
    }
  },
  actions: {
    createAccount: ({commit}, userDatas) => {
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) => {
        instance.post('/auth/signup', userDatas) 
        .then(function (response) {
          console.log(userDatas);
          commit('setStatus', 'created');
          resolve(response);
        })
        .catch(function (error) {
          console.log();
          commit('setStatus', 'error_create');
          reject(error);
        })
      });  
    },
    login: ({commit}, userDatas) => {
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) => {
        instance.post('/auth/login', userDatas) 
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
      instance.get('/posts/') 
      .then(function (response) {
        console.log(response.data)
        commit('SET_POSTS', response.data);
      })
      .catch(function () { 
      })
    },
    getComments: ({commit}) =>{
      instance.get('/posts/comments') 
      .then(function (response) {
        console.log(response.data)
        commit('SET_COMMENTS', response.data);
      })
      .catch(function () { 
      })
    }

  }, 
  modules: {
    
  }
})
