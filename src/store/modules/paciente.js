const axios = require('axios');

const namespaced= true;
  
const state = {
    datosPaciente : null, //DATOS DEL PACIENTE
    listFamiliares : null, //LISTA DE FAMILIARES DEL PACIENTE
    listaCitas: null, //LISTA DE CITAS DEL PACIENTE
    mensaje: null, //MENSAJE DE ACTUALIZACION
    carga: false, //CARGA DE BOTONES
    datosFamiliar: null, //DATOS DEL DEPENDIENTE
    datosCita: null, //DATOS DE LA CITA
};

const getters = {
    //CONSEGUIR DATOS DEL PACIENTE
    getDatosPaciente(state){
        return state.datosPaciente 
    },
    //CONSIGUE EL MENSAJE
    getMensaje(state){
        return state.mensaje
    },
    //CONSEGUIR VALOR DE CARGA
    getCarga(state){
        return state.carga
    },
    //CONSEGUIR LISTA DE FAMILIARES
    getListFamiliares(state){
        return state.listFamiliares
    },
    //CONSEGUIR LA LISTA DE LAS CITAS
    getListaCitas(state){
        return state.listaCitas
    },
    //CONSEGUIR LOS DATOS DE LA CITA
    getDatosCita(state){
      return state.datosCita
    },
    //CONSEGUIR LOS DATOS DEL DEPENDIENTE
    getDatosFamiliar(state){
      return state.datosFamiliar
    } 
};

const mutations = {
    //PONE LOS DATOS DEL PACIENTE
    setDatosPaciente(state,payload){
        state.datosPaciente  = payload
    },
    //PONE LA LISTA DE LOS PACIENTES
    setListFamiliares(state,payload){
        state.listFamiliares = payload
    },
    //PONE LA LISTA DE LAS CITAS
    setListaCitas(state,payload){
        state.listaCitas = payload
    },
    //PONE LOS DATOS DEL MENSAJE
    setMensajeNegativo(state){
        state.mensaje  = {
            title: "REGISTRO FALLIDO",
            message: "Ocurrio un error al realizar el registro.",
            type: "error",
        }
    },
    
    setMensajePositivo(state){
        state.mensaje  = {
            title: "REGISTRO EXITOSO",
            message: "El registro se logro realizar con exito.",
            type: "success",
        }
    },

    setEliminacionPositiva(state){
      state.mensaje  = {
        title: "ELIMINACIÓN EXITOSA",
        message: "Se logró realizar la eliminación con éxito.",
        type: "success",
      }
    },

    setEliminacionNegativa(state){
      state.mensaje  = {
        title: "ELIMINACIÓN FALLIDA",
        message: "Ocurrió un error al realizar la eliminación.",
        type: "error",
      }
    },

    setMensajeActualizacionPositiva(state){
      state.mensaje  = {
        title: "ACTUALIZACIÓN EXITOSA",
        message: "La actualización se realizó con éxito.",
        type: "success",
      }
    },

    setMensajeActualizacionNegativa(state){
      state.mensaje  = {
        title: "ACTUALIZACIÓN FALLIDA",
        message: "Ocurrió un error al realizar la actualización.",
        type: "error",
      }
    },

    setEliminaciónFallida(state){
      state.mensaje  = {
        title: "ELIMINACIÓN FALLIDA",
        message: "No se puede eliminar. Este familiar cuenta con una cita pendiente.",
        type: "error",
      }
    },


    //PONE VALOR DE CARGA
    setCarga(state, payload){
        state.carga = payload
    },

    //PONE LOS DATOS DEL FAMILIAR SELECCIONADO
    setDatosCita(state, payload){
      state.datosCita = payload
    },
    //PONE LOS DATOS DE LA CITA SELECCIONADA
    setDatosFamiliar(state, payload){
      state.datosFamiliar = payload
    }
};

const actions = {
    //CONSULTA DEL PERFIL PACIENTE
    getPerfilPaciente({commit},paciente){
        let url =
        `https://sicramv1.herokuapp.com/api/user/perfil/${paciente.id}`;
        axios
        .get(url, {
          headers: {
            Authorization: `${paciente.token}`,
          },
        })
        .then((res)=>{
            console.log("DATOS PACIENTE: ", res.data)
            commit('setDatosPaciente',res.data)
        })
        .catch((e)=>{
            console.log(e)
        })
    },

    //CONSULTA DE ACTUALIZAR LOS DATOS DEL PACIENTE 
    actualizarDatosPaciente({commit},datos){
        commit('setCarga',true)
        let url = `https://sicramv1.herokuapp.com/api/user/perfil/update/${datos.paciente.id}`;
        return axios
          .post(
            url,
            { ...datos.newDatos },
            {
              headers: {
                Authorization: `${datos.paciente.token}`,
              },
            }
          )
        .then((res)=>{
            console.log(res)
            commit('setDatosPaciente',res.data)
            commit('setMensajePositivo')
            commit('setCarga',false)
            return Promise.resolve(true)
        })
        .catch((e)=>{
            console.log(e)
            commit('setCarga',false)
            commit('setMensajeNegativo')
            return Promise.resolve(false)
        })
    },

    //CONSULTA NUEVO PACIENTE DEPENDIENTE
    registrarPacienteDependiente({commit},datos){
        commit('setCarga',true)
        let url = `https://sicramv1.herokuapp.com/api/user/dependiente/agregar/${datos.paciente.id}`;
        return axios
          .post(
            url,
            { ...datos.dependiente },
            {
              headers: {
                Authorization: `${datos.paciente.token}`,
              },
            }
          )
          .then((res)=>{
            console.log(res)
            commit('setCarga',false)
            if(res.data.msg === "nuevo dependiente guardado"){
                commit('setMensajePositivo')
                return Promise.resolve(true)
            }else{
                commit('setMensajeNegativo')
                return Promise.resolve(false)
            }
          })
          .catch((e)=>{
            console.log(e)
            commit('setCarga',false)
            commit('setMensajeNegativo')
            return Promise.resolve(false)
          })
    },

    //CONSULTA LISTAR DEPENDIENTES
    listarDependientes({commit},paciente){
        let url = `https://sicramv1.herokuapp.com/api/user/dependiente/listar/${paciente.id}`;
        axios
          .get(
            url,
            {
              headers: {
                Authorization: `${paciente.token}`,
              },
            }
          )
          .then((res)=>{
            console.log(res)
            if(res.data.length!=0){
                commit('setListFamiliares',res.data)
            }else{
                commit('setListFamiliares',null)
            }
            
          })
          .catch((e)=>{
              console.log(e)
          })
    },

    //CONSULTA AGREGAR CITA DEL PACIENTE TITULAR
    agregarCitaPaciente({commit},datos){
        commit('setCarga',true)
        let url = `https://sicramv1.herokuapp.com/api/user/cita/crear/${datos.paciente.id}`;
        return axios
            .post(
              url,
              { ...datos.cita },
              {
                headers: {
                  Authorization: `${datos.paciente.token}`,
                },
              }
            )
            .then((res)=>{
                console.log(res)
                commit('setCarga',false)
                if (res.data.msg == "Exito nueva cita creada.") {
                    commit('setMensajePositivo')
                    return Promise.resolve(true)
                }else{
                    commit('setMensajeNegativo')
                    return Promise.resolve(false)
                }
                
            })
            .catch((e)=>{
                commit('setCarga',false)
                commit('setMensajeNegativo')
                return Promise.resolve(false)
            })
    },

    //CONSULTA AGREGAR CITA DEL PACIENTE DEPENDIENTE
    agregarCitaDependiente({commit},datos){
        commit('setCarga',true)
        let url = `https://sicramv1.herokuapp.com/api/user/dependiente/cita/crear/${datos.idFamiliar}`;
        return axios
            .post(
              url,
              { ...datos.cita },
              {
                headers: {
                  Authorization: `${datos.paciente.token}`,
                },
              }
            )
            .then((res)=>{
                commit('setCarga',false)
                if (res.data.msg == "Exito nueva cita creada.") {
                    commit('setMensajePositivo')
                    return Promise.resolve(true)
                }else{
                    commit('setMensajeNegativo')
                    return Promise.resolve(false)
                }
                
            })
            .catch((e)=>{
                commit('setCarga',false)
                commit('setMensajeNegativo')
                return Promise.resolve(false)
            })
    },

    //CONSULTA LISTAR CITAS 
    listCitas({commit},paciente){
        let url =
        `https://sicramv1.herokuapp.com/api/user/cita/listar/${paciente.id}`;
        axios
        .get(url, {
          headers: {
            Authorization: `${paciente.token}`,
          },
        })
        .then((res) => {
            console.log(res)
            if(res.data.length!=0){
                commit('setListaCitas',res.data)
            }else{
                commit('setListaCitas',null)
            }
        })
        .catch((e) => {
           console.log(e) 
        });
    },

    //CONSULTA PARA ACTUALIZAR LOS DATOS DEL FAMILIAR
    actualizarFamiliar({commit,dispatch},datos){
      commit('setCarga',true)
        let url = `https://sicramv1.herokuapp.com/api/user/dependiente/modificar/${datos.paciente.id}`;
         return axios
            .post(
              url,
              { ...datos.familiar },
              {
                headers: {
                  Authorization: `${datos.paciente.token}`,
                },
              }
            )
            .then((res)=>{
              commit('setMensajePositivo')
              commit('setCarga',false)
              return Promise.resolve(true)  
            })
            .catch((e)=>{
              commit('setCarga',false)
              commit('setMensajeNegativo')
              return Promise.resolve(false)
            })
    },

    //CONSULTA PARA ELIMINAR ALGÚN FAMILIAR
    eliminarFamiliar({commit},datos){
      commit('setCarga',true)
        let url = `https://sicramv1.herokuapp.com/api/user/dependiente/eliminar/${datos.paciente.id}`;
         return axios
            .post(
              url,
              { id_dependiente: datos.id_dependiente },
              {
                headers: {
                  Authorization: `${datos.paciente.token}`,
                },
              }
            )
            .then((res)=>{
              console.log(res) 
              if(res.data.msg == "No se encontro dependiente"){
                commit('setCarga',false)
                commit('setMensajeNegativo')
                return Promise.resolve(false)
              }else if(res.data.msg == "No puede eliminar un dependiente con citas"){
                commit('setCarga',false)
                commit('setEliminaciónFallida')
                return Promise.resolve(false)
              }else{
                commit('setEliminacionPositiva')
                commit('setCarga',false)
                return Promise.resolve(true)   
              }
            })
            .catch((e)=>{
                commit('setCarga',false)
                commit('setMensajeNegativo')
                return Promise.resolve(false)
            })
    },

    //DATOS DEL FAMILIAR
    datosFamiliar({commit},familiar){
      commit('setDatosFamiliar',familiar)
    },

    //CONSULTA PARA ACTUALIZAR LOS DATOS DE LA CITA
    actualizarCitaPaciente({commit},datos){
      commit('setCarga',true)
        let url = `https://sicramv1.herokuapp.com/api/user/cita/actualizar/${datos.paciente.id}`;
        return axios
            .post(
              url,
              { ...datos.cita },
              {
                headers: {
                  Authorization: `${datos.paciente.token}`,
                },
              }
            )
            .then((res)=>{
                console.log(res)
                commit('setCarga',false)
                if(res.data.msg == "cita actualizada"){
                  commit('setMensajeActualizacionPositiva')
                  return Promise.resolve(true)
                }else{
                  commit('setMensajeActualizacionNegativa')
                  return Promise.resolve(true)
                }
                
                
            })
            .catch((e)=>{
                console.log(e)
                commit('setCarga',false)
                commit('setMensajeActualizacionNegativa')
                return Promise.resolve(true)
                
            })
    },

    //CONSULTA PARA ELIMINAR UNA CITA
    eliminarCitaPaciente({commit},datos){
      commit('setCarga',true)
        let url = `https://sicramv1.herokuapp.com/api/user/cita/eliminar/${datos.paciente.id}`;
          return axios
            .post(
              url,
              { id_cita : datos.id_cita },
              {
                headers: {
                  Authorization: `${datos.paciente.token}`,
                },
              }
            )
            .then((res)=>{
              console.log(res)
              if(res.data.msg == "cita eliminada"){
                commit('setCarga',false)
                commit('setEliminacionPositiva')
                return Promise.resolve(true)
              }else{
                commit('setEliminacionNegativa')
                commit('setCarga',false)
                return Promise.resolve(false)   
              }
            })
            .catch((e)=>{
              commit('setEliminacionNegativa')
              commit('setCarga',false)
              return Promise.resolve(false) 
            })
    },

    //DATOS CITA
    datosCita({commit},cita){
      commit('setDatosCita',cita)
    }

}
  
  export default {
    state,
    getters,
    mutations,
    actions,
  }