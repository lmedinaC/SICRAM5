<template>
  <div class="citaPaciente">
    
    <div class="container">
      <h3 class="titulo">CONSULTA MÉDICA VIRTUAL</h3>
      <h6>Titulo de la videollamada</h6>
      <div class="sesion">
        <div class="videollamada">
          <Session></Session>
        </div>
        <div class="botonSalir">
          <button class="colgar" @click="colgarLlamada()">
            <i class="fas fa-phone-slash fa-2x"></i>
          </button>
        </div>
      </div>
    </div>
    <simplert :useRadius="true" :useIcon="true" ref="simplert"> </simplert>
    <simplert :useRadius="true" :useIcon="true" ref="simplert1"> </simplert>
  </div>
</template>

<script>
import Simplert from "@/components/Simplert.vue";
import Session from "../components/Session.vue";
import { mapActions, mapState } from "vuex";
export default {
  name: "citaDoctor",
  components: {
    Session,
    Simplert,
  },
  data() {
    return {
      atendido: false,
    };
  }, 
  methods: {
    ...mapActions(['obtenerCita']),
    colgarLlamada() {
      let obj2 = {
        title: "SALIR DE LA SESIÓN",
        message: "¿Una vez que sale de la sesión se marcará como 'Atendido.'?",
        type: "info",
        useConfirmBtn: true,
        onConfirm: this.salir,
      };
      this.$refs.simplert1.openSimplert(obj2);
    },
    salir() {
      window.location.assign("/doctorvista")
      /*let url = `https://proyectocalidad9.herokuapp.com/cita/actualizar_estado/${this.idCita}`;
      this.axios.post(url, {
        estado: "Atendido",
      })
      .then((res)=>{
        window.location.assign("/doctorvista")
      })
      .catch((e)=>{
        console.log("sucedio un error")
      })*/
      
    },
  },
  created(){
      this.obtenerCita()
  },
  computed: {
    ...mapState(["idCita"]),
  },
};
</script>

<style lang="scss" scoped>
.citaPaciente {
  height: 100vh;
  background-color: #c8def3;
  padding-left: 50px;
  padding-right: 50px;
  padding-bottom: 50px;
  padding-top: 25px;
}
.titulo {
  margin: 10px;
}
.sesion {
  box-shadow: 0 0 7px 3px rgb(105, 110, 110);
}

.videollamada {
  background-color: #000000;
  height: 65vh;
  border: 1px solid;
}

.botonSalir {
  text-align: center;
  height: 13vh;
  background-color: #f0eeee;
  border: 1px solid;
  .colgar {
    box-shadow: 0 0 5px 3px rgb(168, 179, 179);
    border-radius: 100%;
    border: none;
    transition: 0.5s ease-out;
    margin: 12px;
    color: red;
    width: 50px;
    height: 50px;
    &:hover {
      box-shadow: 0 0 5px 3px rgb(86, 90, 90);
    }
  }

  .cita {
    box-shadow: 0 0 5px 3px rgb(168, 179, 179);
    border-radius: 100%;
    border: none;
    transition: 0.5s ease-out;
    margin: 12px;
    color: rgb(0, 162, 255);
    width: 50px;
    height: 50px;
    &:hover {
      box-shadow: 0 0 5px 3px rgb(86, 90, 90);
    }
  }
}

@media (max-width: 768px) {
  .citaPaciente {
    padding-left: 10px;
    padding-right: 10px;
  }
  .titulo {
    text-align: center;
  }
}

@media (max-width: 425px) {
  .citaPaciente {
    padding-left: 3px;
    padding-right: 3px;
    padding-top: 5px;
  }
}
</style>
