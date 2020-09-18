<template>
  <div class="citaPaciente">
    <ModRecetaDoctor />
    <ModVerSintomas />
    <ModHistorialMedico />
    <ModDiagnostico />
    <div class="container">
      <h3 class="titulo">SICRAM A TU SERVICIO</h3>
      <div class="row">
        <div class="col-md-10">
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
        <div class="col-md-2">
          <div class="menu">
            <button
              class="btn btn-block botones"
              @click="$modal.show('mod-historial-medico')"
            >
              <i class="fas fa-book-medical fa-lg"></i> Historial
            </button>
            <button
              class="btn btn-block botones"
              @click="$modal.show('mod-diagnostico')"
            >
              <i class="fas fa-file-medical fa-lg"></i> Informe
            </button>
            <button
              class="btn btn-block botones"
              @click="$modal.show('mod-detalle-sintomas-doctor')"
            >
              <i class="fas fa-file-medical-alt fa-lg"></i> Sintomas
            </button>
            <button
              class="btn btn-block botones"
              type="button"
              @click="$modal.show('mod-receta-medica')"
            >
              <i class="far fa-file-alt fa-lg"></i> Receta
            </button>
            <!-- Elements to collapse -->
          </div>
        </div>
      </div>
    </div>
    <simplert :useRadius="true" :useIcon="true" ref="simplert"> </simplert>
    <simplert :useRadius="true" :useIcon="true" ref="simplert1"> </simplert>
  </div>
</template>

<script>
import ModDiagnostico from "@/components/Modales/ModDiagnostico.vue";
import ModHistorialMedico from "@/components/Modales/ModHistorialMedico.vue";
import ModVerSintomas from "@/components/Modales/ModVerSintomas.vue";
import ModRecetaDoctor from "@/components/Modales/ModRecetaDoctor.vue";
import vueCustomScrollbar from "vue-custom-scrollbar";
import Simplert from "@/components/Simplert.vue";
import Session from "../components/Session.vue";
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  name: "citaDoctor",
  components: {
    Session,
    Simplert,
    vueCustomScrollbar,
    ModRecetaDoctor,
    ModVerSintomas,
    ModHistorialMedico,
    ModDiagnostico,
  },
  data() {
    return {
      atendido: false,
      settings: {
        maxScrollbarLength: 60,
      },
      count: [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
        { id: 7 },
      ],
    };
  },
  methods: {
    ...mapActions([
      "obtenerCita",
      "citaAtendida",
      "consultax",
      "sintomasDelPaciente",
      "verHistorialMedico"
    ]),
    //COLGAMOS LA LLAMADA Y CAMBIAMOS EL ESTADO DE LA CITA A ATENDIDO
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
    //LLAMAMOS A LA CONSULTA CITA ATENDIDA DESPUES DE COLGAR LA LLAMADA
    salir() {
      let datos = {
        doctor: this.cita.doctor,
        estado: "atendido",
        id_cita: this.cita.id,
      };
      this.citaAtendida(datos).then((res) => {
        window.location.assign("/doctorvista");
      });
    },
    //LLAMAMOS AL DETALLE DE LA CITA JUNTO CON LOS SINTOMAS DEL PACIENTE
    detalleCita() {
      const objeto = {
        doctor: this.cita.doctor,
        id_cita: this.cita.id,
      };
      console.log(objeto);
      this.verSintomas(objeto);
    },
  },
  created() {
    this.obtenerCita();
  },
  mounted(){
    console.log(this.getUsuario)
    let datos = {
        doctor: this.cita.doctor,
        id_cita: this.cita.id,
      };
      console.log(datos)
    this.sintomasDelPaciente(datos)
    this.verHistorialMedico(datos)
  },
  computed: {
    ...mapState(["cita"]),
    ...mapGetters(["getUsuario"]),
  },
};
</script>

<style lang="scss" scoped>
.citaPaciente {
  height: 100vh;
  background-color: #e4f9fa;
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
  background-color: #0099a1;
  border: 1px solid #0099a1;
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

.menu {
  box-shadow: 0 0 7px 3px rgb(105, 110, 110);
  height: 78vh;
  background: #0099a1;
  .botones {
    margin: 0px;
    padding-left: 20px;
    text-align: left;
    color: white;
    height: 55px;
    border: none;
    border-radius: 0px;
    font-weight: 500;
    &:hover {
      background: #ffffff;
      color: #27a4aa;
    }
    &:active {
      background: #36c1c9;
    }
  }
  .historial {
    border: 1px solid rgb(92, 92, 92);
    margin-bottom: 5px;
    background: white;
    height: 50px;
    &:hover {
      border: 1px solid #0099a1;
      color: #0099a1;
    }
  }
}
.scroll-area {
  position: relative;
  margin: auto;
  height: 120px;
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
