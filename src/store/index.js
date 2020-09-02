import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login.js'
import paciente from './modules/paciente.js'
import doctor from './modules/doctor.js'
import organizacion from './modules/organizacion.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    componenteVista: 'InicioPaciente',
    componenteVistaDoctor: 'InicioDoctor',
    componenteVistaOrganizacion: 'InicioOrg',
    cita:null,
  },
  mutations: {
    setComponente(state,payload){
      state.componenteVista=payload;
      console.log("COMPONENTE: ", payload)
    },
    setComponenteDoctor(state,payload){
      state.componenteVistaDoctor=payload;
      console.log("COMPONENTE: ", payload)
    },
    setComponenteOrganizacion(state,payload){
      state.componenteVistaOrganizacion=payload;
      console.log("COMPONENTE: ", payload)
    },
    setCita(state,payload){
      state.cita = payload
    },

  },
  actions: {

    cambiarComponente({commit},comp){
      commit('setComponente',comp)
    },
    cambiarComponenteDoctor({commit},comp){
      commit('setComponenteDoctor',comp)
    },
    cambiarComponenteOrganizacion({commit},comp){
      commit('setComponenteOrganizacion',comp)    
    },
    setObjCita({commit},cita){
      commit('setCita',cita)
    },

  },
  modules: {
    viewLogin: login,
    viewPaciente: paciente,
    viewDoctor: doctor,
    viewOrganizacion: organizacion,
  }
})
