<template>
  <modal
    name="mod-receta-medica"
    transition="pop-out"
    :width="1020"
    :focus-trap="true"
    :height="600"
  >
    <div class="modal-contenido">
      <vue-custom-scrollbar class="scroll-area" :settings="settings">
        <div class="row">
          <div class="col-md-7">
            <div class="titulo">
              <h3>
                RECETA MÉDICA
              </h3>
            </div>
          </div>
          <div class="col-md-5 sicram">
            <img
              class="imagen"
              src="../../assets/iconoDoctor.png"
              alt="DoctorIcono"
            />
            SICRAM
            <p class="sistema">
              Sistema integral de citas, atencion medica para personas
              discapacitadas https://brave-borg-f78edb.netlify.app/
            </p>
          </div>
        </div>
        <form @submit.prevent="agregarMedicamentos(lista)">
          <div class="row">
            <div class="col-md-5">
              <div class="row">
                <div class="col-md-3">
                  <label for="">DNI: </label>
                </div>
                <div class="col-md-9">
                  <input class="form-control" type="text" :disabled="true" />
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-5">
              <label for="">NOMBRES Y APELLIDOS: </label>
            </div>
            <div class="col-md-7">
              <input
                style="text-transform: uppercase;"
                class="form-control"
                type="text"
                :disabled="true"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <div class="row">
                <div class="col-md-5">
                  <label for="">ACTO MEDICO: </label>
                </div>
                <div class="col-md-7">
                  <input
                    v-model="lista.acto_medico"
                    class="form-control"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="titulo-receta mt-1 mb-1">
            <label for="">Agregue Medicamentos</label>
            <button type="button" class="btn agrega" @click="agregar">+</button>
          </div>
          <div class="receta">
            <div class="tabla">
              <div class="encabezado">
                <div class="row">
                  <div class="col-md-2" style="border-right: 1px solid;">
                    <label for="">MEDICAMENTO</label>
                  </div>
                  <div class="col-md-2" style="border-right: 1px solid;">
                    <label for="">CONCENTRACIÓN</label>
                  </div>
                  <div class="col-md-1" style="border-right: 1px solid;">
                    <label for="">F.F</label>
                  </div>
                  <div class="col-md-2" style="border-right: 1px solid;">
                    <label for="">DÓSIS Y FRECUENCIA</label>
                  </div>
                  <div class="col-md-2" style="border-right: 1px solid;">
                    <label for="">DURACIÓN</label>
                  </div>
                  <div class="col-md-2">
                    <label for="">CANTIDAD</label>
                  </div>
                </div>
              </div>
              <div class="lista-medica" v-if="lista.contador != 0">
                <div
                  class="row"
                  style="padding-bottom: 5px;"
                  v-for="(element, id) of lista.receta"
                  :key="id"
                >
                  <div class="col-md-2">
                    <input
                      v-model="element.medicicamento"
                      type="text"
                      class="form-control"
                    />
                  </div>
                  <div class="col-md-2" style="border-left: 1px solid #777777;">
                    <input
                      v-model="element.concentracion"
                      type="text"
                      class="form-control"
                    />
                  </div>
                  <div class="col-md-1" style="border-left: 1px solid #777777;">
                    <input
                      v-model="element.ff"
                      type="text"
                      class="form-control"
                    />
                  </div>
                  <div class="col-md-2" style="border-left: 1px solid #777777;">
                    <input
                      v-model="element.dosis"
                      type="text"
                      class="form-control"
                    />
                  </div>
                  <div class="col-md-2" style="border-left: 1px solid #777777;">
                    <input
                      v-model="element.duracion"
                      type="text"
                      class="form-control"
                    />
                  </div>
                  <div class="col-md-2" style="border-left: 1px solid #777777;">
                    <input
                      v-model="element.cantidad"
                      type="text"
                      class="form-control"
                    />
                  </div>
                  <div class="col-md-1" style="border-left: 1px solid #777777;">
                    <button
                      type="button"
                      @click="eliminar(element)"
                      class="btn boton-eliminar"
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-5 mb-1">
            <div class="col-md-4">
              <div class="row">
                <div class="col-md-5">
                  <label for="">FECHA DE EXPEDICIÓN: </label>
                </div>
                <div class="col-md-7">
                  <b-form-datepicker
                    size="sm"
                    local="es"
                    v-model="lista.fecha_expedicion"
                    disabled
                  ></b-form-datepicker>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="row">
                <div class="col-md-5">
                  <label for="">VÁLIDA HASTA: </label>
                </div>
                <div class="col-md-7">
                  <b-form-datepicker
                    size="sm"
                    local="es"
                    v-model="lista.fecha_expiracion"
                    :min="dia"
                  ></b-form-datepicker>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div>
                <input
                  type="file"
                  multiple
                  id="file"
                  ref="file"
                  v-on:change="handleFileUpload()"
                />
              </div>
              <div
                class=" mt-1"
                style="text-align: center; border-top:  1px solid #777777;"
              >
                <label for="">FIRMA </label>
              </div>
            </div>
          </div>
          <div class="botones">
            <button type="button" class="btn boton">
              Firmar
            </button>
            <button type="submit" class="btn boton">
              Registrar
            </button>
            <button
              @click="$modal.hide('mod-receta-medica')"
              type="button"
              class="btn boton"
            >
              Salir
            </button>
          </div>
          <simplert :useRadius="true" :useIcon="true" ref="simplert">
          </simplert>
        </form>
      </vue-custom-scrollbar>
    </div>
  </modal>
</template>

<script>
import Simplert from "@/components/Simplert.vue";
//import ModalFirma from "@/components/ModalFirma.vue";
import vueCustomScrollbar from "vue-custom-scrollbar";
import { mapState } from "vuex";
export default {
  name: "ModRecetaDoctor",
  components: {
    vueCustomScrollbar,
    //ModalFirma,
    Simplert,
  },
  data() {
    return {
      dia : new Date(),
      file: "",
      lista: {
        contador: 0,
        receta: [],
        acto_medico: "",
        h_cl: "",
        fecha_expedicion: new Date(),
        fecha_expiracion: "",
        image: null,
      },
      settings: {
        maxScrollbarLength: 400,
      },
    };
  },
  methods: {
    //PARA LA FECHA PONE UN MINIMO
    disabledBeforeTodayAndAfterAWeek(date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return (
        date < today 
      );
    },
    //PARA LA FIRMA
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
      console.log(this.file);
    },
    //AGREGA UN ELEMENTO A LA LISTA
    agregar() {
      if (this.lista.contador == 6) {
        console.log("Llego al máximo.");
      } else {
        let receta = {
          medicicamento: "",
          concentracion: "",
          ff: "",
          dosis: "",
          duracion: "",
          cantidad: "",
        };
        this.lista.contador = 1 + this.lista.contador;
        this.lista.receta.push(receta);
        console.log(this.doctor);
      }
    },
    //ELIMINAR UN MEDICAMENTO DE LA LISTA
    eliminar(item) {
      this.lista.contador = this.lista.contador - 1;
      var i = this.lista.receta.indexOf(item);
      if (i !== -1) {
        this.lista.receta.splice(i, 1);
      }
    },
    //VERIFICA SI LOS IMPUTS ESTÁN VACION
    camposVacios() {
      if (
        this.lista.acto_medico == "" ||
        this.lista.h_cl == "" ||
        this.lista.acto_medico == "" ||
        this.lista.fecha_expedicion == "" ||
        this.lista.fecha_expiracion == ""
      ) {
        return true;
      } else {
        return false;
      }
    },
    //LLAMA A LA CONSULTA AGREGAR MEDICAMENTOS
    agregarMedicamentos(lista) {
      if (lista.contador == 0 || this.camposVacios()) {
        this.$refs.simplert.openSimplert({
          title: "RELLENE LOS CAMPOS.",
          message: "Registre los medicamentos en la receta.",
          type: "warning",
        });
      } else {
        console.log(lista);
      }
    },
    pacienteMedicamentos() {},
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
@import "https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700";
.modal-contenido {
  padding: 15px 50px 15px 50px;
  background-color: #e4f9fa;
  height: 100%;
}

.titulo {
  text-transform: uppercase;
  margin-bottom: 15px;
  padding: 10% 1% 0px 0;
}
.sicram {
  text-align: center;
  align-content: center;
  font-family: "Poppins", sans-serif;
  font-size: 1.7em;
  font-weight: 600;
  line-height: 1.7em;
  .sistema {
    color: #000;
    font-size: 0.4em;
    font-weight: 300;
    line-height: 1.1em;
  }
}
.imagen {
  width: 70px;
  height: 85px;
}

.encabezado {
  background-color: #e5e5e5;
  text-align: center;
  label {
    padding: 0px;
  }
}
.agrega {
  box-shadow: 0 0 7px 0px rgb(105, 110, 110);
  color: #000;
  background-color: #54c7c7;
  font-weight: bold;
  &:hover {
    background-color: #2aafaf;
  }
}

.lista-medica {
  padding-top: 15px;
}
.lista {
  padding-bottom: 5px;
  padding-right: 30px;
}

.botones {
  right: 30px;
  position: absolute;
  margin-bottom: 30px;
}
.boton {
  box-shadow: 0 0 7px 0px rgb(105, 110, 110);
  color: #000;
  margin: 5px;
  background-color: #54c7c7;
  width: 130px;
  font-weight: bold;
  &:hover {
    background-color: #2aafaf;
  }
}
.boton-eliminar {
  box-shadow: 0 0 7px 0px rgb(105, 110, 110);
  color: #000;
  background-color: #d36e6e;
  font-weight: bold;
  &:hover {
    background-color: #ce4343;
  }
}

label {
  font-weight: 500;
  padding: 7px;
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
  height: 600px;
}
</style>
