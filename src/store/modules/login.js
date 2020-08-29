import axios from 'axios';

const namespaced= true;

const state = {
    especialidades : null, //ESPECIALIDADES DEL DOCTOR
    userDoctor: null, //USUARIO DEL DOCTOR
    userPaciente: null, //USUARIO DEL PACIENTE
    userOrganizacion: null, //USUARIO DE LA ORGRANIZACION
    ingreso: false,
    
};

const getters = {
    //CONSEGUIR DOCTOR
    getDoctor(state){
        return state.userDoctor
    },
    //CONSEGUIR PACIENTE
    getPaciente(state){
        return state.userPaciente
    },
    //CONSEGUIR ORGANIZACION
    getOrganizacion(state){
        return state.userOrganizacion
    },
    //CONSEGUIR ESPECIALIDADES
    getEspecialidades(state){
        return state.especialidades
    }
};

const mutations = {
    //PONER DOCTOR
    setDoctor(state,payload){
        state.userDoctor = payload
    },
    //PONER PACIENTE
    setPaciente(state,payload){
        state.userPaciente = payload
    },
    //PONER ORGANIZACION
    setOrganizacion(state,payload){
        state.userOrganizacion = payload
    },
    //PONER ESPECIALIDADES 
    setEspecialidades(state,payload){
        state.especialidades = payload
    }
};

const actions = {
    //INICIAR SESION DOCTOR 
    loginDoctor({commit,dispatch },doctor){
        return axios
        .post("https://sicramv1.herokuapp.com/api/signindoctor",{
          ...doctor
        })
        .then((res)=>{
            console.log("DOCTOR: ",res.data)
            commit('setDoctor',res.data)
            dispatch('perfilDoctor', res.data , { root: true })
            return Promise.resolve(true)
        })

        .catch((e)=>{
            console.log(e)
            return Promise.resolve(false)
        })
    },
    //INICIAR SESION ORGANIZACION
    loginOrganizacion({commit,dispatch },organizacion){
        
        return axios
        .post("https://sicramv1.herokuapp.com/api/signinorganizacion",{
          ...organizacion
        })
        .then((res)=>{
            console.log("ORGANIZACION : ",res.data)
            commit('setOrganizacion',res.data)
            dispatch('perfilOrganizacion', res.data , { root: true })
            return Promise.resolve(true)
        })

        .catch((e)=>{
            console.log(e)
            return Promise.resolve(false)
        })
       
    },
    //INICIAR SESION PACIENTE
    loginPaciente({commit,dispatch },paciente){
       
        return axios
        .post("https://sicramv1.herokuapp.com/api/signinuser",{
          ...paciente
        })
        .then((res)=>{
            console.log("PACIENTE : ",res.data)
            commit('setPaciente',res.data)
            dispatch('getPerfilPaciente', res.data , { root: true })
            return Promise.resolve(true)
        })

        .catch((e)=>{
            console.log(e)
            return Promise.resolve(false)
        })
    },
    //CONSULTA DE LAS ESPECIALIDADES DEL SISTEMA
    listarEspecialidades({commit}){
        let url = `https://sicramv1.herokuapp.com/api/especialidad`;
        return axios
        .get(url) 
        .then((res) => {
            console.log(res.data)
            commit('setEspecialidades', res.data)
        })
        .catch((e) => {
          console.log(e);
        });
    },

    //CONSULTA PARA LA PRUEBA
    especialidadesPrueba(){
        return axios
        .get("https://sicramv1.herokuapp.com/api/especialidad") 
        .then(res=> 
            res.data
        )
        .catch((e) => {
          console.log(e);
          
        });
    }
}
   
  export default {
    state,
    getters,
    mutations,
    actions,
    
  }