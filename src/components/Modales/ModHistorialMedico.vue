<template>
  <modal
    name="mod-historial-medico"
    transition="pop-out"
    :width="750"
    :focus-trap="true"
    :height="650"
  >
    <div class="titulo">
      <h5>HISTORIAL MÉDICO</h5>
    </div>
    <div class="modal-content">
      <div class="fecha">
        <div class="row">
          <div class="col-md-4">
            <date-picker
              class="calendar"
              value-type="DD/MM/YYYY"
              v-model="fechaInicio"
              @change="deshabilitarDia(fechaInicio)"
            ></date-picker>
          </div>
          <div class="col-md-4">
            <date-picker
              class="calendar"
              value-type="DD/MM/YYYY"
              v-model="fechaFin"
              :default-value="new Date()"
              :disabled-date="diaMin"
            ></date-picker>
          </div>
          <div class="col-md-4">
            <button class="btn botonBuscar" @click="buscarHistorial">
              Buscar
            </button>
          </div>
        </div>
      </div>
      <div class="historial"  v-if="historial!=null">
        <vue-custom-scrollbar class="scroll-area" :settings="settings">
        <div v-for="(element,index) of historial" :key="index">
          <button
            v-b-toggle="'cola_'+index"
            class="btn btn-block boton-historial"
          >
            INFORME MÉDICO DEL: {{element.fecha}}
          </button>
          <b-collapse :id="'cola_'+index" class="mostrar">
            <b-card class="mostrar-tarjeta">
              <div class="informe">
                <div class="datos-personales">
                  <div class="row">
                    <div class="col-md-3">
                      <label for="">PACIENTE: </label>
                    </div>
                    <div class="col-md-9">
                      <input
                        v-model="element.nombres_apellidos"
                        style="text-transform: uppercase;"
                        class="form-control"
                        type="text"
                        disabled
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-3">
                      <label for="">DOCTOR: </label>
                    </div>
                    <div class="col-md-9">
                      <input
                        v-model="element.nombres_medico"
                        style="text-transform: uppercase;"
                        class="form-control"
                        type="text"
                        disabled
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-3">
                      <label for="">Emitida el: </label>
                    </div>
                    <div class="col-md-9">
                      <input
                        v-model="element.fecha"
                        style="text-transform: uppercase;"
                        class="form-control"
                        type="text"
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div >
                  <div class="row">
                    <div class="col-md-3">
                      <label for="">Anamnesis: </label>
                    </div>
                    <div class="col-md-9">
                      <textarea
                        v-model="element.anamnesis"
                        disabled
                        class="form-control"
                        rows="2"
                        resize="false"
                        placeholder="Describa sus la anamnesis de su paciente..."
                       
                      ></textarea>
                    </div>
                  </div>
                  <div class="row mt-2">
                    <div class="col-md-3">
                      <label for="">Tratamiento: </label>
                    </div>
                    <div class="col-md-9">
                      <textarea
                        v-model="element.tratamiento"
                        disabled
                        class="form-control"
                        rows="2"
                        resize="false"
                        placeholder="Describa el tratamiento o cirugia de su paciente..."
                        
                      ></textarea>
                    </div>
                  </div>
                  <div class="row mt-2">
                    <div class="col-md-3">
                      <label for="">Diagnóstico: </label>
                    </div>
                    <div class="col-md-9">
                      <textarea
                        v-model="element.diagnostico"
                        disabled
                        class="form-control"
                        rows="2"
                        resize="false"
                        placeholder="Mencione el diagnóstico de su paciente..."
                        
                      ></textarea>
                    </div>
                  </div>
                  <div class="row mt-2">
                    <div class="col-md-3">
                      <label for="">Última evolución: </label>
                    </div>
                    <div class="col-md-9">
                      <textarea
                        v-model="element.resultados_labo"
                        disabled
                        class="form-control"
                        rows="2"
                        resize="false"
                        placeholder="Describa la evolución de su paciente..."
                       
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </b-card>
          </b-collapse>
        </div>
        </vue-custom-scrollbar>
      </div>
      <div class="boton">
        <button
          type="submit"
          class="btn botonSalir"
          @click="$modal.hide('mod-historial-medico')"
        >
          Salir
        </button>
      </div>
      <simplert :useRadius="true" :useIcon="true" ref="simplert"> </simplert>
    </div>
  </modal>
</template>

<script>
import vueCustomScrollbar from "vue-custom-scrollbar";
import { mapState, mapActions, mapGetters } from "vuex";
import Simplert from "@/components/Simplert.vue";
export default {
  name: "ModHistorialMedico",
  components: {
    Simplert,
    vueCustomScrollbar
  },
  data() {
    return {
      fechaInicio: "",
      fechaFin: "",
      fechaMin: new Date(),
      historial: null,
      visible: false,
      settings: {
        maxScrollbarLength: 400,
      },
    };
  },
  methods: {
    //DESHABILITA LAS FECHAS ANTERIORES A LA FECHA DE INICIO
    deshabilitarDia(date) {
      this.fechaFin = "";
      let pattern = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
      let arrayDate = date.match(pattern);
      let dt = new Date(arrayDate[3], arrayDate[2] - 1, arrayDate[1]);
      this.fechaMin = dt;
      console.log(dt);
    },

    diaMin(date) {
      return date < this.fechaMin;
    },
    //BUSCA SI EL HISTORIAL ESTA VACÍO O NO
    buscarHistorial() {
      console.log(this.fechaInicio, this.fechaFin);
      if (this.fechaInicio == "" || this.fechaFin == "") {
        this.$refs.simplert.openSimplert({
          title: "CAMPOS NO SELECCIONADOS",
          message: "Seleccione una fecha de inicio y de fin.",
          type: "warning",
        });
      } else {
        if (this.getHistorialPaciente === null) {
          this.$refs.simplert.openSimplert({
            title: "HISTORIAL MÉDICO VACÍO",
            message: "El paciente no cuenta con informes registrados.",
            type: "warning",
          });
        } else {
          this.compararFecha(this.getHistorialPaciente);
        }
      }
    },
    //COMPARA LA FECHA DE LOS DIAGNOSTICOS CON LA FECHA Q SE DESEA
    compararFecha(element) {
      this.historial = [];
      var fi = this.fechaInicio.split("/");
      var fiObject = new Date(+fi[2], fi[1] - 1, +fi[0]);
      var ff = this.fechaFin.split("/");
      var ffObject = new Date(+ff[2], ff[1] - 1, +ff[0]);
      element.forEach((e) => {
        var dateParts = e.fecha.split("/");
        var dateObject = new Date(
          +dateParts[2],
          dateParts[1] - 1,
          +dateParts[0]
        );
        if (dateObject >= fiObject && dateObject <= ffObject) {
          this.historial.push(e);
        }
      });
      if (this.historial.length == 0) {
        this.$refs.simplert.openSimplert({
          title: "HISTORIAL MÉDICO VACÍO",
          message:
            "El paciente no cuenta con informes registrados en estas fechas.",
          type: "warning",
        });
        this.historial = null;
      }
    },
  },

  computed: {
    ...mapGetters(["getHistorialPaciente"]),
  },
};
</script>

<style lang="scss" scoped>
.modal-content {
  height: 590px;
  width: 750px;
  padding: 30px;
  background-color: #e4f9fa;
  box-shadow: 0 0 10px 0px rgb(39, 39, 39);
}
.titulo {
  text-align: center;
  height: 60px;
  padding: 20px;
  background: #0099a1;
  color: white;
}
.fecha {
  padding-top: 20px;
  padding-left: 10px;
  text-align: center;
  box-shadow: 0 0 10px 0px rgb(39, 39, 39);
  height: 80px;
  width: 100%;
  background: #01c0ca;
  .botonBuscar {
    box-shadow: 0 0 7px 0px rgb(105, 110, 110);
    color: #000;
    background-color: #54c7c7;
    width: 130px;
    font-weight: bold;
    &:hover {
      background-color: #2aafaf;
    }
  }
}
.historial {
  position: relative;
  margin: 30px 0 0 0;
  padding-top: 20px;
  padding-bottom: 20px;
  text-align: center;
  box-shadow: 0 0 10px 0px rgb(39, 39, 39);
  width: 100%;
  background: #01c0ca;
  .boton-historial {
    margin: 0px;
    height: 40px;
    border-radius: 0px;
    color: #000;
    border: 1px solid #005f64;
  }
  .mostrar {
    border-radius: 0px;
    .mostrar-tarjeta {
      border-radius: 0px;
    }
  }
}

label {
  font-weight: 500;
  padding: 7px;
}

.boton {
  bottom: 30px;
  position: absolute;
  right: 30px;
  .botonSalir {
    box-shadow: 0 0 7px 0px rgb(105, 110, 110);
    margin: 5px;
    color: #000;
    background-color: #54c7c7;
    width: 130px;
    font-weight: bold;
    &:hover {
      background-color: #2aafaf;
    }
  }
}

textarea {
  resize: none !important;
  background-color: rgba(243, 243, 243, 0.92);
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
.scroll-area {
  position: relative;
  margin: auto;
  min-height: 50px;
  max-height: 320px;
}
</style>
