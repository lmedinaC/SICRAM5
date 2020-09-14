<template>
  <modal
    name="mod-sintomas-paciente"
    transition="pop-out"
    :width="600"
    :focus-trap="true"
    :height="550"
  >
    <div class="modal-content">
      <form @submit.prevent="registrarSintomas()">
        <div class="titulo">
          <h5>DETALLE DE SINTOMAS</h5>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="row">
              <div class="col-md-4">
                <label for="">NOMBRE: </label>
              </div>
              <div class="col-md-8">
                <input
                  style="text-transform: uppercase;"
                  class="form-control"
                  type="text"
                  :disabled="true"
                  v-model="getDatosPaciente.name"
                />
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="row">
              <div class="col-md-4">
                <label for="">APELLIDO: </label>
              </div>
              <div class="col-md-8">
                <input
                  style="text-transform: uppercase;"
                  class="form-control"
                  type="text"
                  :disabled="true"
                  v-model="getDatosPaciente.lastname"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="descripcion-sintomas">
          <div class="col-md-12">
            <label class="descripcion" for="">
              Describa con el mayor detalle posible sus sintomas o molestias
              actuales.
            </label>
          </div>
          <div class="col-md-12">
            <textarea
              v-model="detalleSintomas.sintoma"
              class="form-control"
              rows="5"
              resize="false"
              placeholder="Describa sus sintomas..."
            ></textarea>
          </div>
        </div>
        <div class="descripcion-sintomas">
          <div class="row text-center">
            <div class="col-md-6">
              <label class="descripcion" for="">
                ¿Ha tenido atención médica o ha recibido algún tratamiento
                médico en las últimas 24 hrs?
              </label>
              <div class="cbox">
                <input
                  v-model="detalleSintomas.tratamiento_reciente"
                  type="radio"
                  id="descripcionSi"
                  value="true"
                />
                <label for="descripcionSi">SI</label>
                <input
                  v-model="detalleSintomas.tratamiento_reciente"
                  type="radio"
                  id="descripcionNo"
                  value="false"
                />
                <label for="descripcionNo">NO</label>
              </div>
            </div>
            <div class="col-md-6">
              <div>
                <label class="descripcion" for="">
                  ¿Sufre de alguna alergia?
                </label>
              </div>
              <div class="cbox">
                <input
                  v-model="detalleSintomas.alergia"
                  type="radio"
                  id="alergiaSi"
                  value="true"
                />
                <label for="alergiaSi">SI</label>
                <input
                  v-model="detalleSintomas.alergia"
                  type="radio"
                  id="alergiaNo"
                  value="false"
                />
                <label for="alergiaNo">NO</label>
              </div>
            </div>
          </div>
        </div>
        <div class="boton">
          <button type="submit" class="btn btn-ingresar" :disabled="getCarga">
            Ingresar Cita
          </button>
        </div>
      </form>
      <simplert :useRadius="true" :useIcon="true" ref="simplert"> </simplert>
    </div>
  </modal>
</template>

<script>
import Vue from "vue";
//Impor component mensaje
import Simplert from "@/components/Simplert.vue";
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
// Init plugin
Vue.use(Loading);
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  name: "ModSintomasPaciente",
  components: {
    Simplert,
    Loading,
  },
  data() {
    return {
      detalleSintomas: {
        sintoma: "",
        id_cita: "",
        tratamiento_reciente: null,
        alergia: null,
        loader: null,
      },
    };
  },

  methods: {
    ...mapActions(["detallarSintomasPaciente"]),
    cargar() {
      this.loader = this.$loading.show({
        // Optional parameters
        color: "#0099a1",
        container: this.fullPage ? null : this.$refs.formContainer,
        canCancel: false,
        loader: "dots",
        height: 150,
        width: 130,
      });
    }, //
    //REGISTRAMOS LOS SINTOMAS
    registrarSintomas() {
      this.detalleSintomas.id_cita = this.cita.id_cita;
      //SI LOS CAMPOS NO ESTAN LLENOS
      if (
        this.detalleSintomas.sintoma == "" ||
        this.detalleSintomas.tratamiento_reciente == null ||
        this.detalleSintomas.alergia == null
      ) {
        this.$refs.simplert.openSimplert(this.getMensajeAdvertencia);
      } else {
        this.cargar();
        let datos = {
          paciente: this.getUsuario,
          sintomas: this.detalleSintomas,
        };
        //DIRIGIR A LA CONSULTA DETALLE DE SINTOMAS EN PACIENTE.JS
        this.detallarSintomasPaciente(datos).then((res) => {
          this.loader.hide();
          window.location.assign("/pacientevista/citapaciente");
        });
      }
    },
  },
  computed: {
    ...mapGetters([
      "getUsuario",
      "getDatosPaciente",
      "getMensajeAdvertencia",
      "getCarga",
    ]),
    ...mapState(["cita"]),
  },
};
</script>

<style lang="scss" scoped>
@import "https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700";
.modal-content {
  padding: 30px 10px 20px 10px;
  background-color: #e2fcff;
  height: 100vh;
}
.titulo {
  font-family: "Poppins", sans-serif;
  text-align: center;
  padding-bottom: 5px;
}
label {
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  padding: 7px;
}

.boton {
  text-align: center;
  .btn-ingresar {
    width: 150px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    background: #407dc4;
    margin-bottom: 5px;
    color: white;
  }
  .btn-ingresar:hover {
    background: #1869c5;
  }
}
textarea {
  font-family: "Poppins", sans-serif;
  resize: none !important;
  background-color: rgba(243, 243, 243, 0.92);
}
.descripcion-sintomas {
  font-family: "Poppins", sans-serif;
  padding-top: 10px;
  padding-bottom: 10px;
}
.cbox {
  font-family: "Poppins", sans-serif;
  padding-left: 10px;
}

.pop-out-enter-active,
.pop-out-leave-active {
  transition: all 0.5s;
}

.pop-out-enter,
.pop-out-leave-active {
  opacity: 0;
  transform: translateY(24px);
}
</style>
