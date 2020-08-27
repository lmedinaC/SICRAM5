const axios = require('axios');

const namespaced= true;
 
const state = {
    datosOrganizacion : null, //DATOS DEL PACIENTE
    listarDoctoresOrganizacion : null, //LISTA DE HORARIOS DE ATENCION DEL DOCTOR
    mensajeOrganizacion: null, //MENSAJE DE ACTUALIZACION
    cargaOrganizacion: false //CARGA DE BOTONES
};

const getters = {
    //CONSEGUIR DATOS DEL DOCTOR
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
    //CONSEGUIR LISTA DE FAMILIARES
    getListaDoctoresOrganizacion(state){
        return state.listarDoctoresOrganizacion
    },

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

    //PONE VALOR DE CARGA
    setCargaOrganizacion(state, payload){
        state.cargaOrganizacion = payload
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
            console.log(res)
            commit('setDatosOrganizacion',res.data)
        })
        .catch((e) => {
            console.log(e)
        });
    },

    //CONSULTA ACTUALIZAR DATOS DE LA ORGANIZACION
    actualizarOrganizacion({commit},datos){

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
            } else {
                commit('setMensajeNegativoOrganizacion')
                return Promise.resolve(false)
            }
        })
        .catch((e) => {
            console.log(e)
            commit('setCargaOrganizacion',false)
            commit('setMensajeNegativoOrganizacion')
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
    }

}
  
  export default {
    state,
    getters,
    mutations,
    actions,
  }