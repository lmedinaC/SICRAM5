const axios = require('axios');

const namespaced= true;
  
const state = {
    datosPaciente : null, //DATOS DEL PACIENTE
    listFamiliares : null, //LISTA DE FAMILIARES DEL PACIENTE
    listaCitas: null, //LISTA DE CITAS DEL PACIENTE
    mensaje: null, //MENSAJE DE ACTUALIZACION
    carga: false //CARGA DE BOTONES
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

    //PONE VALOR DE CARGA
    setCarga(state, payload){
        state.carga = payload
    }
};

const actions = {
    //CONSULTA DEL PERFIL PACIENTE
    getPerfilPaciente({commit},paciente){
        console.log(paciente)
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
    }
}
  
  export default {
    state,
    getters,
    mutations,
    actions,
  }