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
      title: "RELLENE LOS CAMPOS",
      message: "!Todos los campos son necesarios!",
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
    //PONE EL OBJETO CITA EN LOCAL STORAGE
    setObjCita({commit},cita){
      localStorage.setItem('cita',JSON.stringify(cita))
      commit('setCita',cita)
    },
    //OBITNE EL OBJETO CITA 
    obtenerCita({commit}){
      const cita = JSON.parse(localStorage.getItem('cita'))
      commit('setCita',cita)
    },
    consultax({commit},datos){
      console.log(datos)
      console.log("asdasdasd")
    },
    //IMPIME LA RECETA MEDICA
    imprimirDom(dato){
      const prtHtml = document.getElementById('inprime').innerHTML;

      // Get all stylesheets HTML
      let stylesHtml = "";
      for (const node of [
        ...document.querySelectorAll('link[rel="stylesheet"], style'),
      ]) {
        stylesHtml += node.outerHTML;
      }

      // Open the print window
      const WinPrint = window.open(
        "",
        "",
        "left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0"
      );

      WinPrint.document.write(`<!DOCTYPE html>
      <html>
        <head>
          ${stylesHtml}
        </head>
        <body>
          ${prtHtml}
        </body>
      </html>`);

      setTimeout(() => {
        WinPrint.document.close();
        WinPrint.focus();
        WinPrint.print();
        WinPrint.close();
      }, 1000);
    },
  },
  modules: {
    viewLogin: login,
    viewPaciente: paciente,
    viewDoctor: doctor,
    viewOrganizacion: organizacion,
  }
})
