const axios = require('axios');

const state = {
    datosDoctor : null, //DATOS DEL PACIENTE
    listaHorariosDoctor : null, //LISTA DE HORARIOS DE ATENCION DEL DOCTOR
    listaCitasDoctor: null, //LISTA DE CITAS DEL DOCTOR
    listaCitasDoctorPasadas: null, //LISTA DE CITAS DEL DOCTOR PASADAS
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
    pacienteAtendido: null,
    informeDoctorCita: null, //DETALLAS DEL INFORME DE LA CITA
    recetaDoctorCita: null, //DETALLES DE LA RECETA DE LA CITA
    historialPaciente: null,
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
    //CONSEGUIR LISTA DE CITAS PASADAS
    getListaCitasDoctorPasadas(state){
      return state.listaCitasDoctorPasadas
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
    },
    //CONSEGUIR LOS DATOS DEL PACIENTE QUE SE ESTA ATENDIENDO
    getPacienteAtendido(state){
      return state.pacienteAtendido
    },
    //CONSEGUIR EL DETALLE DEL INFORME DE LA CITA
    getInformeDoctor(state){ 
      return state.informeDoctorCita
    },
    //CONSEGUIR LA RECETA MÉDICA DE LA CITA
    getRecetaCitaDoctor(state){
      return state.recetaDoctorCita
    },

    getHistorialPaciente(state){
      return state.historialPaciente
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
    //PONE LA LISTA DE CITAS PASADAS
    setListaCitasDoctorPasadas(state,payload){
      state.listaCitasDoctorPasadas = payload
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

    setAdvertencia(state,paylaod){
      state.mensajeDoctor  = {
        title: "CAMPOS NECESARIOS",
        message: paylaod,
        type: "warning",
      }
    },

    setError(state,payload){
      state.mensajeDoctor  = {
        title: "FALLO EN EL REGISTRO",
        message: payload,
        type: "error",
      }
    },

    setExito(state,payload){
      state.mensajeDoctor  = {
        title: "REGISTRO EXITOSO",
        message: payload,
        type: "success",
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
    },

    //PONE LOS DATOS DEL PACIENTE QUE SE ESTA ATENDIENDO
    setPacienteAtendido(state,payload){
      state.pacienteAtendido = payload
    },

    //PONE EL INFORME DE LA CITA SELECCIONADA
    setInformeDoctor(state,payload){
      state.informeDoctorCita = payload
    },
    //PONE EN EL INFORME LA RECETA DE LA CITA SELECCIONADA  
    setRecetaCitaDoctor(state,payload){ 
      state.recetaDoctorCita = payload
    },

    setHistorialPaciente(state,payload){
      state.historialPaciente = payload
    }
};

const actions = {
    //CONSULTA DEL PERFIL DOCTOR
    perfilDoctor({commit},doctor){
      console.log(doctor)
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
              commit('setExito','El horario se registró con éxito')
              return Promise.resolve(true)
            }else if(res.data.msg === "YA EXISTE ESE HORARIO PARA EL DOCTOR"){
              commit('setError',"Este horario ya se encuentra registrado.")
                return Promise.resolve(false)
            }
            else{
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
                state.dia = []
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
      let url = `https://sicramv1.herokuapp.com/api/doctor/horario/modificar/${datos.doctor.id}`;
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
              commit('setError',res.data.msg)
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
              commit('setExito',"El horario se borró con éxito")
              return Promise.resolve(true)
            
            }else if(res.data.msg === "El horario esta siendo usado en una cita, No se puede eliminar"){
              commit('setError',"El horario ya está en uso.")
              return Promise.resolve(false)
            }
            else{
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
    listarCitasDoctor({commit,state},doctor){
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
              state.listaCitasDoctor = []
              state.listaCitasDoctorPasadas = []
              res.data.forEach((element) => {
                if(element.estado == "pendiente"){
                  state.listaCitasDoctor.push(element)
                }else if(element.estado == "atendido"){
                  state.listaCitasDoctorPasadas.push(element)
                }
              });
              if(state.listaCitasDoctor.length==0) {
                commit('setListaCitasDoctor',null)
              }else if(state.listaCitasDoctorPasadas.length==0){
                commit('setListaCitasDoctorPasadas',null)
              }
            }else{
                commit('setListaCitasDoctor',null)
                commit('setListaCitasDoctorPasadas',null)
            }
        })
        .catch((e) => {
            console.log(e)
        });
    },

    //CONSULTA LISTAR CITAS ATENDIDAS
    listarCitasAtendidasDoctor({commit},doctor){
      let url =
      `https://sicramv1.herokuapp.com/api/doctor/cita/listar_atendidas/${doctor.id}`;
      axios
      .get(url, {
        headers: {
          Authorization: `${doctor.token}`,
        },
      })

      .then((res) => {
          console.log(res)
          if(res.data.length!=0){
            commit('setListaCitasDoctorPasadas',res.data)
          }else{
            commit('setListaCitasDoctorPasadas',null)
          }
      })
      .catch((e) => {
          console.log(e)
      });
  },

    //CONSULTA PARA ATENDER CITA
    citaAtendida({commit},datos){
      let url =
        `https://sicramv1.herokuapp.com/api/doctor/cita/estado/${datos.doctor.id}`;
       return axios
        .post(url,
          { estado: datos.estado, id_cita : datos.id_cita  },
          {
            headers: {
              Authorization: `${datos.doctor.token}`,
            },
          }
        )

        .then((res) => {
            console.log(res)
            if(res.data.msg == "Estado guardado"){
              commit('setMensajePositivoDoctor')
              return Promise.resolve(true)
            }else{
              commit('setMensajeNegativoDoctor')
              return Promise.resolve(true)
            }
        })
        .catch((e) => {
            console.log("ocurrio un error")
            commit('setMensajeNegativoDoctor')
            return Promise.resolve(true)
        });
    },

    //CONSULTA PARA VER EL HISTORIAL DEL PACIENTE
    sintomasDelPaciente({commit},datos){
      let url =
        `https://sicramv1.herokuapp.com/api/doctor/cita/detalle/${datos.id_cita}`;
      axios
        .get(url)
        .then((res) => {
            console.log(res)
            commit('setPacienteAtendido',res.data)
        })
        .catch((e) => {
            console.log("ocurrio un error")
        });
    },

    //CONSULTA PARA REGISTRAR UN DIAGNÓSTICO DE UN PACIENTE
    registrarDiagnosticoPaciente({commit},datos){
      commit('setCargaDoctor',true)
        let url = `https://sicramv1.herokuapp.com/api/doctor/cita/registrar_diagnostico/${datos.doctor.id}`;
         return axios
          .post(
            url,
            { ...datos.diagnostico },
            {
              headers: {
                Authorization: `${datos.doctor.token}`,
              },
            }
          )
          .then((res)=>{
            console.log(res)
            commit('setCargaDoctor',false)
            if (res.data.msg === "Nuevo diagnóstico guardado"){
              commit('setMensajePositivoDoctor')
              return Promise.resolve(true)
            }else if(res.data.msg ==="Ya existe un diagnóstico para esta cita"){
              commit('setError',"Ya ha registrado un informe para esta cita.")
              return Promise.resolve(false)
            }else{
              commit('setMensajeNegativoDoctor')
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

    //CONSULTA PARA AGREGAR LA RECETA MÉDICA DEL DOCTOR
    agregarRecetaMedica({commit},datos){
      commit('setCargaDoctor',true)
        let url = `https://sicramv1.herokuapp.com/api/doctor/receta/crear/${datos.doctor.id}`;
          return axios
          .post(
            url,
            datos.lista,
            {
              headers: {
                'Authorization': `${datos.doctor.token}`,
                'Content-Type': 'multipart/form-data'
              },
            }
          )
          .then((res)=>{
            commit('setCargaDoctor',false)
            console.log(res)
            if(res.data.msg === "Nueva receta guardada"){
              commit('setExito',"La receta se registro correctamente.")
              return Promise.resolve(true)
            }else if(res.data.msg === "Ya existe una receta para esta cita."){
              commit('setError',"Ya ha registrado una receta para esta cita.")
              return Promise.resolve(false)
            }else if(res.data.msg === "No se detectó ninguna imagen"){
              commit('setError',"Registre correctamente la firma. Este archivo debe ser 'firma.jpg'.")
              return Promise.resolve(false)
            }else{
              commit('setError',"Registre correctamente la receta médica.")
              return Promise.resolve(false)
            }
          })
          .catch((e)=>{
            console.log(e)
            commit('setCargaDoctor',false)
            commit('setError',"Registre correctamente la receta médica.")
            return Promise.resolve(false)
          })
    },

    //CONSULTA PARA VER EL DIAGNÓSTICO QUE EL DOCTOR REGISTRO
    verDiagnosticoDoctor({commit},datos){
      let url = `https://sicramv1.herokuapp.com/api/doctor/diagnostico/ver_diagnostico/${datos.doctor.id}`;
          axios
            .post(
              url,
              { id_cita: datos.id_cita },
              {
                headers: {
                  Authorization: `${datos.doctor.token}`,
                },
              }
            )
            .then((res)=>{
              console.log(res.data)
              if(res.data.msg === "No se encontró el diagnóstico de esta cita"){
                commit('setInformeDoctor',null)
              }else{
                commit('setInformeDoctor',res.data)
              }
            })
            .catch((e)=>{
              console.log(e)
        })
    },

    //CONSULTA PARA VER LA RECETA QUE EL DOCTOR REGISTRÓ
    verRecetaDoctor({commit},datos){
      let url = `https://sicramv1.herokuapp.com/api/doctor/receta/ver_receta/${datos.doctor.id}`;
          axios
            .post(
              url,
              { id_cita: datos.id_cita },
              {
                headers: {
                  Authorization: `${datos.doctor.token}`,
                },
              }
            )
            .then((res)=>{
              console.log(res.data)
              if(res.data.msg === "No se encontraron recetas para esta cita"){
                commit('setRecetaCitaDoctor',null)
              }else{
                commit('setRecetaCitaDoctor',res.data)
              }
            })
            .catch((e)=>{
              console.log(e)
        })
    },
    
    //CONSULTA PARA VER EL HISTORIAL MÉDICO DE UN PACIENTE
    verHistorialMedico({commit},datos){
      let url = `https://sicramv1.herokuapp.com/api/doctor/cita/ver_historial_de_paciente/${datos.doctor.id}`;
          axios
            .post(
              url,
              { id_cita: datos.id_cita },
              {
                headers: {
                  Authorization: `${datos.doctor.token}`,
                },
              }
            )
            .then((res)=>{
              console.log(res)
              if(res.data.msg === "No se encontraron diagnósticos para este paciente"){
                commit('setHistorialPaciente',null)
              }else if(res.data.length == 0){
                commit('setHistorialPaciente',null)
              }else{
                commit('setHistorialPaciente',res.data)
              }
            })
            .catch((e)=>{
              console.log(e)
        })
    },

    
}
  
  export default {
    state,
    getters,
    mutations,
    actions,
  }