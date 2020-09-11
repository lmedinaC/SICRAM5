const axios = require('axios');

const namespaced= true;
const dia = [];
const state = {
    datosDoctor : null, //DATOS DEL PACIENTE
    listaHorariosDoctor : null, //LISTA DE HORARIOS DE ATENCION DEL DOCTOR
    listaCitasDoctor: null, //LISTA DE CITAS DEL DOCTOR
    mensajeDoctor: null, //MENSAJE DE ACTUALIZACION
    cargaDoctor: false, //CARGA DE BOTONES
    horariosDisponibles:  [
      //LISTA DE HORARIOS PARA EL DOCTOR
      { text: "8:00-9:00", value: 1, inicio: "08:00", fin: "09:00" },
      { text: "9:00-10:00", value: 2, inicio: "09:00", fin: "10:00" },
      { text: "10:00-11:00", value: 3, inicio: "10:00", fin: "11:00" },
      { text: "11:00-12:00", value: 4, inicio: "11:00", fin: "12:00" },
      { text: "15:00-16:00", value: 5, inicio: "15:00", fin: "16:00" },
      { text: "16:00-17:00", value: 6, inicio: "16:00", fin: "17:00" },
      { text: "17:00-18:00", value: 7, inicio: "17:00", fin: "18:00" },
      { text: "18:00-19:00", value: 8, inicio: "18:00", fin: "19:00" },
      { text: "19:00-20:00", value: 9, inicio: "19:00", fin: "20:00" },

    ],
    dia: [],
    datosHorario: null, //DATOS DEL HORARIO PARA MODIFICAR
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
    },
    //CONSEGUIR LA LISTA DE HORARIOS DISPONIBLES
    getHorariosDisponibles(state){
      return state.horariosDisponibles
    },
    //CONSEGUIR LOS DATOS DEL HORARIO SELECCIONADO
    getDatosHorario(state){
      return state.datosHorario
    },
    getDia(state){
      return state.dia
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
            message: "El registro se logro realizar con éxito.",
            type: "success",
        }
    },

    setMensajeActualizacionPositiva(state){
      state.mensajeDoctor  = {
        title: "ACTUALIZACIÓN EXITOSA",
        message: "La actualización se realizó con éxito.",
        type: "success",
      }
    },

    setMensajeActualizacionNegativa(state){
      state.mensajeDoctor  = {
        title: "ACTUALIZACIÓN FALLIDA",
        message: "Ocurrió un error al realizar la actualización.",
        type: "error",
      }
    },

    //PONE VALOR DE CARGA
    setCargaDoctor(state, payload){
        state.cargaDoctor = payload
    },

    //PONE LOS DATOS DEL HORARIO A MODIFICAR
    setDatosHorario(state, payload){
      state.datosHorario = payload
    },

    setDia(state,payload){
      state.dia = payload
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

            console.log(res)
            if(res.data.msg==="Doctor actualizado!"){
              commit('setDatosDoctor',res.data.doctor)
              commit('setMensajeActualizacionPositiva')
              commit('setCargaDoctor',false)
              return Promise.resolve(true)
            }else{
              commit('setCargaDoctor',false)
              commit('setMensajeActualizacionNegativa')
              return Promise.resolve(false)
            }
            
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
            if (res.data.msg === "nuevo horario guardado"){
              commit('setMensajePositivoDoctor')
              return Promise.resolve(true)
            }else{
                commit('setMensajeNegativoDoctor')
                return Promise.resolve(false)
            }
          })
          .catch((e)=>{
            console.log(e)
            commit('setCargaDoctor',false)
            commit('setMensajeNegativoDoctor')
            return Promise.resolve(false)
          })

    },

    //CONSULTA LISTAR HORARIOS DE ATENCION DESOCUPADOS
    listarHorariosDoctor({commit,state},doctor){
      
        axios
        .get(`https://sicramv1.herokuapp.com/api/doctor/horarios/${doctor.id}`)

        .then((res) => {
            console.log(res)
            if(res.data.length!=0){
                commit('setListaHorariosDoctor',res.data)
                res.data.forEach((element) => {
                  state.dia.push(element.fecha);
                });
                state.dia = Array.from(new Set(state.dia));
                
            }else{
                commit('setListaHorariosDoctor',null)
            }
        })
        .catch((e) => {
            console.log(e)
        });
    },

    //CONSULTA PARA LISTAR HORARIOS DE ATENCION OCUPADOS
    listarHorariosOcupadosDoctor({commit},doctor){
      axios
      .get(`https://sicramv1.herokuapp.com/api/doctor/horarios_ocupados/${doctor.id}`)

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

    //CONSULTA MODIFICAR HORARIO DE ATENCIÓN
    modificarHorarioDoctor({commit},datos){
      commit('setCargaDoctor',true)
      let url = `http://sicramv1.herokuapp.com/api/doctor/horario/modificar/${datos.doctor.id}`;
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
            if (res.data.msg === "Horario actualizado! "){
              commit('setMensajeActualizacionPositiva')
              return Promise.resolve(true)
            }else{
              commit('setMensajeActualizacionNegativa')
              return Promise.resolve(false)
            } 
        })
        .catch((e)=>{
          commit('setMensajeActualizacionNegativa')
          return Promise.resolve(false)
        })

    },
    
    //CONSULTA PARA ELIMINAR EL HORARIO DE ATENCIÓN
    eliminarHorarioDoctor({commit},datos){
      commit('setCargaDoctor',true)
      let url = `https://sicramv1.herokuapp.com/api/doctor/horario/eliminar/${datos.doctor.id}`;
      return axios
        .post(
          url,
          { id_horario: datos.id_horario },
          {
            headers: {
              Authorization: `${datos.doctor.token}`,
            },
          }
        )
        .then((res)=>{
          console.log(res)
            commit('setCargaDoctor',false)
            if (res.data.msg === "Se elimino el horario del doctor"){
              commit('setMensajeActualizacionPositiva')
              return Promise.resolve(true)
                
            }else{
              commit('setMensajeActualizacionNegativa')
              return Promise.resolve(false)
            } 
        })
        .catch((e)=>{
          commit('setMensajeNegativoDoctor')
          return Promise.resolve(false)
        })
    },
    //DATOS HORARIO
    datosHorario({commit},horario){
      commit('setDatosHorario',horario)
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