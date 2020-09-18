<template>
  <modal
    name="mod-ver-receta-medica"
    transition="pop-out"
    :width="1020"
    :focus-trap="true"
    :height="600"
  >
    <div class="modal-contenido">
      <vue-custom-scrollbar class="scroll-area" :settings="settings">
        <div id="inprime">
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
          <div class="row">
            <div class="col-md-5">
              <div class="row">
                <div class="col-md-3">
                  <label for="">DNI: </label>
                </div>
                <div class="col-md-9">
                  <label for="">{{getDatosPaciente.dni}}</label>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-5">
              <label for="">NOMBRES Y APELLIDOS: </label>
            </div>
            <div class="col-md-7">
              <label class="mayuscula">{{name}}</label>
            </div>
          </div>
          <div class="receta" v-if="getRecetaCita!=null">
            <div class="tabla">
              <div class="encabezado">
                <div class="row">
                  <div class="col-md-3" style="border-right: 1px solid;">
                    <label for="">MEDICAMENTO</label>
                  </div>
                  <div class="col-md-3" style="border-right: 1px solid;">
                    <label for="">CONCENTRACIÓN</label>
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
              <div class="lista-medica">
                <div
                  class="row"
                  style="padding-bottom: 5px;"
                  v-for="(element, id) of getRecetaCita.medicamentos"
                  :key="id"
                >
                  <div class="col-md-3">
                    <label >{{element.medicamento}}</label>
                  </div>
                  <div class="col-md-3" style="border-left: 1px solid #777777;">
                    <label >{{element.concentracion}}</label>
                  </div>
                  <div class="col-md-2" style="border-left: 1px solid #777777;">
                    <label >{{element.dosis_frecuencia}}</label>
                  </div>
                  <div class="col-md-2" style="border-left: 1px solid #777777;">
                    <label >{{element.duracion}}</label>
                  </div>
                  <div class="col-md-2" style="border-left: 1px solid #777777;">
                    <label >{{element.cantidad}}</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-3 mb-1" v-if="getRecetaCita!=null">
            <div class="col-md-4">
              <div class="row">
                <div class="col-md-5">
                  <label for="">FECHA DE EXPEDICIÓN: </label>
                </div>
                <div class="col-md-7">
                  <label >{{getRecetaCita.fecha_expedicion}}</label>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="row">
                <div class="col-md-5">
                  <label for="">VÁLIDA HASTA: </label>
                </div>
                <div class="col-md-7">
                  <label >{{getRecetaCita.valida_hasta}}</label>
                </div>
              </div>
            </div>
            <div class="col-md-4" style="text-align: center;" >
              <div>
                <img class="firma" :src="getRecetaCita.firma" alt="">
              </div>
              <div
                class=" mt-1"
                style="text-align: center; border-top:  1px solid #777777;"
              >
                <label for="">DOCTOR: {{nameDoctor}} </label>
              </div>
            </div>
          </div>
          <div>
          <div class="container" v-if="getRecetaCita === null">
            <div
              class="mensaje"
              style="padding:50px; align-content: center; text-align: center; background:pink"
            >
              <h4>NO CUENTA CON MEDICAMENTOS REGISTRADOS EN ESTA CITA.</h4>
            </div>
          </div>
        </div>
        </div>
        <div class="botones">
          <button @click="imprimeEsta" type="button" class="btn boton">
            Inprimir
          </button>
          <button
            @click="$modal.hide('mod-ver-receta-medica')"
            type="button"
            class="btn boton"
          >
            Salir
          </button>
        </div>
      </vue-custom-scrollbar>
    </div>
  </modal>
</template>

<script>
import vueCustomScrollbar from "vue-custom-scrollbar";
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  name: "ModVerRecetaMedica",
  components: {
    vueCustomScrollbar,
  },
  data() {
    return {
      settings: {
        maxScrollbarLength: 400,
      },
      lista: [{ as: "asd" }, { as: "asd" }, { as: "asd" }],
    };
  },
  methods: {
    ...mapActions(["imprimirDom"]),
    imprimeEsta() {
      this.imprimirDom('inprime');
    },
  },
  computed: {
    ...mapGetters(["getDatosPaciente", "getRecetaCita","getDetalleCita"]),
    name() {
      return this.getDatosPaciente.name + " " + this.getDatosPaciente.lastname;
    },
    nameDoctor(){
        return this.getDetalleCita.doctor.name + " " + this.getDetalleCita.doctor.lastname
      }
  },
};
</script>

<style lang="scss" scoped>
@media print {
  @page {
    size: landscape
  }
}
@import "https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700";
.modal-contenido {
  padding: 15px 50px 15px 50px;
  background-color: #e4f9fa;
  height: 100%;
}
.mayuscula{
  text-transform: uppercase;
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
.mensaje{
  margin: 60px 0 60px 0;
}

.firma{
  height: 80px;
  width: 190px;
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
