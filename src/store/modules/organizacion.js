const axios = require('axios');

const namespaced= true;
 
const state = {
    datosOrganizacion : null, //DATOS DE LA ORGANIZACION
    listarDoctoresOrganizacion : null, //LISTA DE DOCTORES DE LA ORGANIZACION
    mensajeOrganizacion: null, //MENSAJE DE ACTUALIZACION
    cargaOrganizacion: false, //CARGA DE BOTONES
    datosDoctorOrganizacion: null, //DATOS DEL DOCTOR DE LA ORGANIZACION
};

const getters = {
    //CONSEGUIR DATOS DE LA ORGANIZACION
    getDatosOrganizacion(state){
        return state.datosOrganizacion 
    },
    //CONSIGUE EL MENSAJE
    getMensajeOrganizacion(state){
        return state.mensajeOrganizacion
    },
    //CONSEGUIR VALOR DE CARGA
    getCargaOrganizacion(state){
        return state.cargaOrganizacion
    },
    //CONSEGUIR LISTA DE DOCTORES
    getListaDoctoresOrganizacion(state){
        return state.listarDoctoresOrganizacion
    },
    //CONSIGUE LOS DATOS DEL DOCTOR SELECCIONADO
    getDatosDoctorOrganizacion(state){
        return state.datosDoctorOrganizacion 
    }

};

const mutations = {
    //PONE LOS DATOS DEL PERFIL DE LA ORGANIZACION
    setDatosOrganizacion(state,payload){
        state.datosOrganizacion  = payload
    },

    //PONE LA LISTA DE LOS DOCTORES DE LA ORGANIZACION
    setListaDoctoresOrganizacion(state,payload){
        state.listarDoctoresOrganizacion = payload
    },

    //PONE LOS DATOS DEL MENSAJE
    setMensajeNegativoOrganizacion(state){
        state.mensajeOrganizacion  = {
            title: "REGISTRO FALLIDO",
            message: "Ocurrio un error al realizar el registro.",
            type: "error",
        }
    },
    
    setMensajePositivoOrganizacion(state){
        state.mensajeOrganizacion  = {
            title: "REGISTRO EXITOSO",
            message: "El registro se logro realizar con exito.",
            type: "success",
        }
    },

    setMensajeActualizacionPositivaOrg(state){
        state.mensajeOrganizacion  = {
          title: "ACTUALIZACIÓN EXITOSA",
          message: "La actualización se realizó con éxito.",
          type: "success",
        }
    },
  
    setMensajeActualizacionNegativaOrg(state){
        state.mensajeOrganizacion  = {
          title: "ACTUALIZACIÓN FALLIDA",
          message: "Ocurrió un error al realizar la actualización.",
          type: "error",
        }
    },

    setEliminacionPositiva(state){
      state.mensajeOrganizacion  = {
        title: "ELIMINACIÓN EXITOSA",
        message: "Se logró realizar la eliminación con éxito.",
        type: "success",
      }
    },

    setEliminacionNegativa(state){
      state.mensajeOrganizacion  = {
        title: "ELIMINACIÓN FALLIDA",
        message: "Ocurrió un error al realizar la eliminación.",
        type: "error",
      }
    },

    setEliminaciónFallida(state){
      state.mensajeOrganizacion  = {
        title: "ELIMINACIÓN FALLIDA",
        message: "No se puede eliminar. Este Doctor cuenta con una cita pendiente.",
        type: "error",
      }
    },

    setAdvertencia(state,paylaod){
      state.mensajeOrganizacion  = {
        title: "CAMPOS NECESARIOS",
        message: paylaod,
        type: "warning",
      }
    },

    setError(state,payload){
      state.mensajeOrganizacion  = {
        title: "REGISTRO FALLIDO",
        message: payload,
        type: "error",
      }
    },

    setExito(state,payload){
      state.mensajeOrganizacion  = {
        title: "REGISTRO EXITOSO",
        message: payload,
        type: "success",
      }
    },

    //PONE VALOR DE CARGA
    setCargaOrganizacion(state, payload){
        state.cargaOrganizacion = payload
    },

    //PONE LOS DATOS DEL DOCTOR SELECCIONADO
    setDatosDoctorOrganizacion(state, payload){
        state.datosDoctorOrganizacion = payload
    }
};

const actions = {
    //CONSULTA CONSEGUIR DATOS DE LA ORGANIZACION
    perfilOrganizacion({commit},organizacion){
        let url =
        `https://sicramv1.herokuapp.com/api/organizacion/perfil/${organizacion.id}`;
        axios
        .get(url, {
          headers: {
            Authorization: `${organizacion.token}`,
          },
        })
        .then((res) => {
            console.log("datos de la orga son:",res.data)
            commit('setDatosOrganizacion',res.data)
        })
        .catch((e) => {
            console.log(e)
        });
    },

    //CONSULTA ACTUALIZAR DATOS DE LA ORGANIZACION
    actualizarOrganizacion({commit},datos){
      commit('setCargaOrganizacion',true)
        let url = `https://sicramv1.herokuapp.com/api/organizacion/perfil/update/${datos.organizacion.id}`;
        return axios
        .post(
          url,
          { ...datos.newOrganizacion },
          {
            headers: {
              Authorization: `${datos.organizacion.token}`,
            },
          }
        )
        .then((res) => {
            console.log(res)
            commit('setMensajeActualizacionPositivaOrg')
            commit('setDatosOrganizacion',res.data)
            commit('setCargaOrganizacion',false)
            return Promise.resolve(true)
        })
        .catch((e) => {
            console.log(e)
            commit('setMensajeActualizacionNegativaOrg')
            commit('setCargaOrganizacion',false)
            return Promise.resolve(false)
        });
    },

    //CONSULTA AGREGAR DOCTOR A LA ORGANIZACION
    agregarNuevoDoctor({commit},datos){
        commit('setCargaOrganizacion',true)
        let url = `https://sicramv1.herokuapp.com/api/organizacion/doctor/registrar/${datos.organizacion.id}`;
        return axios
        .post(
          url,
          { ...datos.newDoctor },
          {
            headers: {
              Authorization: `${datos.organizacion.token}`,
            },
          }
        )
        .then((res) => {
            console.log(res)
            commit('setCargaOrganizacion',false)
            if (res.data.msg === "Bienvenido Doctor, es un nuevo usario.") {
              commit('setMensajePositivoOrganizacion')
              return Promise.resolve(true)
            }else if(res.data.msg === "Username ya existe" ){
              commit('setError',"El usuario ya existe")
              return Promise.resolve(false)
            }else if(res.data.msg === "LLene los nombres y apellidos, completos y CORRECTOS del doctor" ){
              commit('setError',"Debe registrar el nombres y apellidos COMPLETOS y CORRECTOS del doctor.")
              return Promise.resolve(false)
            } 
            else {
              commit('setError',"Ya existe un Doctor con este usuario o correo electrónico.")
              return Promise.resolve(false)
            }
        })
        .catch((e) => {
            console.log(e)
            commit('setCargaOrganizacion',false)
            commit('setError',"Ya existe un Doctor con este usuario o correo electrónico.")
              return Promise.resolve(false)
        });
    },

    //CONSULTA LISTAR DOCTORES DE LA ORGANIZACION
    listarDoctores({commit},organizacion){
        console.log(organizacion)
        let url = `https://sicramv1.herokuapp.com/api/organizacion/doctor/obtener/${organizacion.id}`;
            axios
            .get(
                url,
                {
                headers: {
                    Authorization: `${organizacion.token}`,
                },
                }
            )
            .then((res)=>{
                console.log(res)
                if(res.data.length!=0){
                    commit('setListaDoctoresOrganizacion',res.data)
                }else{
                    commit('setListaDoctoresOrganizacion',null)
                }
            })
            .catch((e)=>{
                console.log(e)
            })
    },

    //CONSULTA PARA ACTUALIZAR LOS DATOS DEL DOCTOR
    actualizarDoctorOrg({commit},datos){
       // commit('setCargaDoctor',true)
      let url = `http://sicramv1.herokuapp.com/api/doctor/horario/modificar/${datos.doctor.id}`;
      axios
        .post(
          url,
          { ...datos.newHorario },
          {
            headers: {
              Authorization: `${datos.doctor.token}`,
            },
          }
        )
        .then((res)=>{
          console.log(res)
            /*commit('setCargaDoctor',false)
            if (res.data.msg === "Horario actualizado! "){
              commit('setMensajeActualizacionPositiva')
              return Promise.resolve(true)
                
            }else{
              commit('setMensajeActualizacionNegativa')
              return Promise.resolve(false)
            } */
        })
        .catch((e)=>{
          /*commit('setMensajeNegativoDoctor')
          return Promise.resolve(false)*/
        })
    },
    //CONSULTA PARA ELIMINAR AL DOCTOR SELECCIONADO
    eliminarDoctorOrg({commit},datos){
      commit('setCargaDoctor',true)
      let url = `https://sicramv1.herokuapp.com/api/organizacion/doctor/eliminar/${datos.doctor.id}`;
      return axios
        .post(
          url,
          { id_doctor: datos.id_doctor },
          {
            headers: {
              Authorization: `${datos.doctor.token}`,
            },
          }
        )
        .then((res)=>{
          console.log(res)
            commit('setCargaDoctor',false)
            if (res.data.msg ===  "Doctor eliminado"){
              commit('setEliminacionPositiva')
              return Promise.resolve(true)
                
            }else{
              commit('setEliminaciónFallida')
              return Promise.resolve(false)
            } 
        })
        .catch((e)=>{
          commit('setCargaDoctor',false)
          commit('setEliminacionNegativa')
          return Promise.resolve(false)
        })
    },
    //DATOS DEL DOCTOR DE LA ORGANIZACION
    datosDoctorOrganizacion({commit},doctor){
        commit('setDatosDoctorOrganizacion',doctor)
    }

}
  
  export default {
    state,
    getters,
    mutations,
    actions,
  }