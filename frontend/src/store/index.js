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
    updateUser: function (state, pictureProfile){
      state.user.pictureProfile = pictureProfile;
    },
  },
  actions: {
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
    createAccount: ({commit}, userDatas) => {
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) => {
        instance.post('/auth/signup', userDatas) 
        .then(function (response) {
          commit('setStatus', 'created');
          resolve(response);
        })
        .catch(function (error) {
          commit('setStatus', 'error_create');
          reject(error);
        })
      });  
    },
    createPost: ({commit}, postInfos) => { 
        commit;
        return instance.post('/posts/', postInfos
        )
    },
    createComment: ({commit}, commentInfos) => { 
      commit;
      return instance.post('/posts/comments', commentInfos)
    },
    addPp: ({commit}, ppInfos) => { 
      commit;
      return instance.post('/auth/', ppInfos)
    },
    deletePost:({commit}, id) => { 
      commit;
      return instance.delete('/posts/' + id)
    },
    deleteComment:({commit}, idComment) => { 
      commit;
      return instance.delete('/posts/comments/' + idComment)
    },
    deleteUser:({commit}, id_user) => { 
      commit;
      return instance.delete('/auth/' + id_user)
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
