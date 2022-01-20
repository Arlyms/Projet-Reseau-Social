import { createStore } from 'vuex'
const axios = require('axios'); 

const instance = axios.create({
  baseURL: 'http://localhost:3000/api/auth/'
});

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
    createAccount: ({commit}, userData) => {
      return new Promise((resolve, reject) => {
        commit;
        instance.post('/signup', userData) 
        .then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          reject(error);
        })
      });  
    },
    login: ({commit}, userData) => {
      return new Promise((resolve, reject) => {
        commit;
        instance.post('/login', userData) 
        .then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          reject(error);
        })
      });  
    }
  }, 
  modules: {
  }
})
