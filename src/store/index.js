import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null,
    componenteVista: 'InicioPaciente',
    componenteVistaDoctor: 'InicioDoctor',
    componenteVistaOrganizacion: 'InicioOrg',
    usuarioPaciente: '',
    usuarioDoctor: '',
    usuarioOrganizacion:'',
    idPaciente:'',
    idDoctor:'',
    idOrganizacion:'',
    mensaje:'',
    paciente:null,
    organizacion:null,
    cita:null
  },
  mutations: {
    setOrganizacion(state,payload){
      state.organizacion = payload
    },
    setPaciente(state,payload){
      state.paciente = payload
    },
    setMensaje(state,payload){
      state.mensaje = payload
    },
    setError(state,payload){
      state.error = payload
    },
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
    setUsuarioPaciente(state,payload){
      state.usuarioPaciente= payload;
    },
    setUsuarioDoctor(state,payload){
      state.usuarioDoctor= payload;
    },
    setUsuarioOrganizacion(state,payload){
      state.usuarioOrganizacion= payload;
    },
    setIdPaciente(state,payload){
      state.idPaciente=payload;
    },
    setIdDoctor(state,payload){
      state.idDoctor=payload;
    },
    setIdOrganizacion(state,payload){
      state.idOrganizacion=payload;
    },
    setCita(state,payload){
      state.cita = payload
    }
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
    getUserPaciente({commit,state}){
      
      state.usuarioPaciente=id_paciente;
    },
    setUserPaciente({commit},paciente_id){
      commit('setUsuarioPaciente',paciente_id)
    },
    setUserDoctor({commit},Doctor_id){
      
      commit('setUsuarioDoctor',Doctor_id)
    },
    setUserOrganizacion({commit},Organizacion_id){
      
      commit('setUsuarioOrganizacion',Organizacion_id)
    },
    setIdPac({commit},id){
      commit('setIdPaciente',id)
    },
    setIdDoct({commit},id){
      commit('setIdDoctor',id)
    },
    setIdOrg({commit},id){
      commit('setIdOrganizacion',id)
    },

    AbrirSimplert({commit},mensaje){
      
      commit('setMensaje',mensaje)
    },

    setObjPaciente({commit},paciente){
      commit('setPaciente',paciente)
     
    },
    setObjOrganizacion({commit},organizacion){
      
      commit('setOrganizacion',organizacion)
    },

    setObjCita({commit},cita){
      commit('setCita',cita)
    }
  },
  modules: {
  }
})
