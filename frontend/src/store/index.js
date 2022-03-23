import { createStore } from 'vuex';
const axios = require('axios'); 

const instance = axios.create({
  baseURL: 'http://localhost:3000/api/'
});

export default createStore({
  state: {
    status: '',
    user:{
      id_user: -1,
    },
    userDatas:[],
    comments: [],
  },
  mutations: {
    setStatus: function (state, status) {
      state.status = status;
    },
    logUser : function (state, user) {
      instance.defaults.headers.common['Authorization'] = 'bearer ' + user.token;
      state.user = user;
    },
    userDatas: function (state, userDatas){
      state.userDatas = userDatas;
    },
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
    createPost: ({commit}, postInfos) => { 
        commit;
        return instance.post('/posts/', postInfos)
    },
    createComment: ({commit}, commentInfos) => { 
      commit;
      return instance.post('/posts/comments', commentInfos)
    },
    deletePost:({commit}, id) => { 
      commit;
      return instance.delete('/posts/' + id)
    },
    deleteComment:({commit}, id) => { 
      commit;
      return instance.delete('/posts/comments' + id)
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
      instance.get('/auth/') 
      .then(function (response) {
        commit('userDatas', response.data);
      })
      .catch(function () {
      })
    },
    getPosts: () =>{
      return instance.get('/posts/'); 
    },
    getComments: (_,id) =>{
      return instance.get('/posts/'+ id +'/comments') 
    }, 
  },
})
