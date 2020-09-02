const axios = require('axios');

const namespaced= true;
 
const state = {
    datosDoctor : null, //DATOS DEL PACIENTE
    listaHorariosDoctor : null, //LISTA DE HORARIOS DE ATENCION DEL DOCTOR
    listaCitasDoctor: null, //LISTA DE CITAS DEL DOCTOR
    mensajeDoctor: null, //MENSAJE DE ACTUALIZACION
    cargaDoctor: false //CARGA DE BOTONES
};

const getters = {
    //CONSEGUIR DATOS DEL DOCTOR
    getDatosDoctor(state){
        return state.datosDoctor 
    },
    //CONSIGUE EL MENSAJE
    getMensajeDoctor(state){
        return state.mensajeDoctor
    },
    //CONSEGUIR VALOR DE CARGA
    getCargaDoctor(state){
        return state.cargaDoctor
    },
    //CONSEGUIR LISTA DE FAMILIARES
    getListaHorariosDoctor(state){
        return state.listaHorariosDoctor
    },
    //CONSEGUIR LA LISTA DE LAS CITAS
    getListaCitasDoctor(state){
        return state.listaCitasDoctor
    }
};

const mutations = {
    //PONE LOS DATOS DEL DOCTOR
    setDatosDoctor(state,payload){
        state.datosDoctor  = payload
        state.datosDoctor.especialidad = payload.especialidad.especialidad
    },
    //PONE LA LISTA DE LOS HORARIOS
    setListaHorariosDoctor(state,payload){
        state.listaHorariosDoctor = payload
    },
    //PONE LA LISTA DE LAS CITAS
    setListaCitasDoctor(state,payload){
        state.listaCitasDoctor = payload
    },
    //PONE LOS DATOS DEL MENSAJE
    setMensajeNegativoDoctor(state){
        state.mensajeDoctor  = {
            title: "REGISTRO FALLIDO",
            message: "Ocurrio un error al realizar el registro.",
            type: "error",
        }
    },
    
    setMensajePositivoDoctor(state){
        state.mensajeDoctor  = {
            title: "REGISTRO EXITOSO",
            message: "El registro se logro realizar con exito.",
            type: "success",
        }
    },

    //PONE VALOR DE CARGA
    setCargaDoctor(state, payload){
        state.cargaDoctor = payload
    }
};

const actions = {
    //CONSULTA DEL PERFIL DOCTOR
    perfilDoctor({commit},doctor){
        let url =
        `https://sicramv1.herokuapp.com/api/doctor/perfil/${doctor.id}`;
        axios
        .get(url, {
          headers: {
            Authorization: `${doctor.token}`,
          },
        })
        .then((res) => {
            console.log(res.data)
            commit('setDatosDoctor',res.data)
        })
        .catch((e) => {
            console.log(e)
        });
    },

    //CONSULTA DE ACTUALIZAR LOS DATOS DEL DOCTOR 
    actualizarDatosDoctor({commit},datos){
        commit('setCargaDoctor',true)
        let url = `https://sicramv1.herokuapp.com/api/doctor/perfil/update/${datos.doctor.id}`;
        return axios
          .post(
            url,
            { ...datos.newDatos },
            {
              headers: {
                Authorization: `${datos.doctor.token}`,
              },
            }
          )
          .then((res) =>{
            console.log(res.data)
            commit('setDatosDoctor',res.data)
            commit('setMensajePositivoDoctor')
            commit('setCargaDoctor',false)
            return Promise.resolve(true)
          })

          .catch((e)=>{
            console.log(e)
            commit('setCargaDoctor',false)
            commit('setMensajeNegativoDoctor')
            return Promise.resolve(false)
          })
    },

    //CONSULTA NUEVO HORARIO DE ATENCION 
    registrarHorarioDoctor({commit},datos){
        commit('setCargaDoctor',true)
        let url = `https://sicramv1.herokuapp.com/api/doctor/horario/agregar/${datos.doctor.id}`;
        return axios
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
            commit('setCargaDoctor',false)
            if (res.data.msg === "YA EXISTE ESE HORARIO PARA EL DOCTOR"){
                commit('setMensajeNegativoDoctor')
                return Promise.resolve(false)
            }else{
                commit('setMensajePositivoDoctor')
                return Promise.resolve(true)
            }
          })
          .catch((e)=>{
            console.log(e)
            commit('setCargaDoctor',false)
            commit('setMensajeNegativoDoctor')
            return Promise.resolve(false)
          })

    },

    //CONSULTA LISTAR HORARIOS DE ATENCION
    listarHorariosDoctor({commit},doctor){
        axios
        .get(`https://sicramv1.herokuapp.com/api/doctor/horarios/${doctor.id}`)

        .then((res) => {
            console.log(res)
            if(res.data.length!=0){
                commit('setListaHorariosDoctor',res.data)
            }else{
                commit('setListaHorariosDoctor',null)
            }
        })
        .catch((e) => {
            console.log(e)
        });
    },

    //CONSULTA LISTAR CITAS DE ATENCION
    listarCitasDoctor({commit},doctor){
        let url =
        `https://sicramv1.herokuapp.com/api/doctor/cita/listar/${doctor.id}`;
        axios
        .get(url, {
          headers: {
            Authorization: `${doctor.token}`,
          },
        })

        .then((res) => {
            console.log(res)
            if(res.data.length!=0){
                commit('setListaCitasDoctor',res.data)
            }else{
                commit('setListaCitasDoctor',null)
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