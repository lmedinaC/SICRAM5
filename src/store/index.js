import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login.js'
import paciente from './modules/paciente.js'
import doctor from './modules/doctor.js'
import organizacion from './modules/organizacion.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mensajeEliminación: {
        title: "CONFIRMAR ELIMINACIÓN",
        message: "¿Seguro que desea proceder con la eliminación?",
        type: "info",
        useConfirmBtn: true,
        onConfirm: null
    },
    mensajeEdición: {
        title: "CONFIRMAR EDICIÓN",
        message: "¿Seguro que desea proceder con la edición?",
        type: "info",
        useConfirmBtn: true,
        onConfirm: null
    },
    mensajeAdevertencia: {
      title: "CAMPOS IMCOMPLETOS",
      message: "Todos los campos son necesarios!",
      type: "warning",
    },
    componenteVista: 'InicioPaciente',
    componenteVistaDoctor: 'InicioDoctor',
    componenteVistaOrganizacion: 'InicioOrg',
    cita:null,
  },
  getters:{
    //DEVUELVE EL MENSAJE DE EDITAR
    getMensajeEditar(state){
      return state.mensajeEdición
    },
    //DEVUELVE EL MENSAJE DE ELIMINAR
    getMensajeEliminar(state){
      return state.mensajeEliminación
    },
    //DEVUELVE EL MENSAJE DE ADVERTENCIA
    getMensajeAdvertencia(state){
      return state.mensajeAdevertencia
    },
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
      localStorage.setItem('cita',JSON.stringify(cita))
    },
    obtenerCita({commit}){
      const cita = JSON.parse(localStorage.getItem('cita'))
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
