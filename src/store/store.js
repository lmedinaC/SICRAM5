import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)
const state = {
  data: {},
  horarios: {}
}
export const mutations = {
  SET_DATA (state, data) {
    state.data = data
  },
  SET_DATA_HORARIO(state,data){
      state.horarios = data
  }
}
export const actions = {
    getEspecialidades ({ commit }) { 
    return axios.get('https://sicramv1.herokuapp.com/api/especialidad')
    .then(response => {
      console.log('res', response)
      commit('SET_DATA', response.data)
    })
    .catch(err => console.log(err))
  },

  getHorarios({commit},idDoctor){
    return axios.get("https://sicramv1.herokuapp.com/api/doctor/horarios/5f483efbda91ec0017ca86b1")
    .then(response => {
      console.log('res', response)
      commit('SET_DATA_HORARIO', response.data)
    })
    .catch(err => console.log(err))
  }
}
export default new Vuex.Store({
  state,
  mutations,
  actions
})