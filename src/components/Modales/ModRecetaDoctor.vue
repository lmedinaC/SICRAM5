<template>
  <modal
    name="mod-receta-medica"
    transition="pop-out"
    :width="1020"
    :focus-trap="true"
    :height="600"
  >
    <div class="modal-contenido">
      <ModFirma />
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
                  <input
                    class="form-control"
                    type="text"
                    :disabled="true"
                    v-model="getPacienteAtendido.user.dni"
                  />
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
                v-model="name"
                style="text-transform: uppercase;"
                class="form-control"
                type="text"
                :disabled="true"
              />
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
                  <div class="col-md-3" style="border-right: 1px solid;">
                    <label for="">MEDICAMENTO</label>
                  </div>
                  <div class="col-md-2" style="border-right: 1px solid;">
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
              <div class="lista-medica" v-if="contador != 0">
                <div
                  class="row"
                  style="padding-bottom: 5px;"
                  v-for="(element, id) of lista.medicamentos"
                  :key="id"
                >
                  <div class="col-md-3">
                    <input
                      v-model="element.medicamento"
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
                  <div class="col-md-2" style="border-left: 1px solid #777777;">
                    <input
                      v-model="element.dosis_frecuencia"
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
                    :min="dia"
                    :max="dia"
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
                    v-model="lista.valida_hasta"
                    :min="dia"
                  ></b-form-datepicker>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div>
                <input
                  type="file"
                  name="image"
                  @change="getImage"
                  accept="image/*"
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
            <button
              type="button"
              class="btn boton"
              @click="$modal.show('mod-firma')"
            >
              Firmar
            </button>
            <button type="submit" class="btn boton" :disabled="getCargaDoctor">
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
import ModFirma from "@/components/Modales/ModFirma.vue";
import Simplert from "@/components/Simplert.vue";
import vueCustomScrollbar from "vue-custom-scrollbar";
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  name: "ModRecetaDoctor",
  components: {
    vueCustomScrollbar,
    ModFirma,
    Simplert,
  },
  data() {
    return {
      bool: false, //PARA VER SI TODOS LOS CAMPOS ESTAN VACÍOS
      dia: new Date(), // DIA MINIMO DEL CALENDARIO
      contador: 0, //CONTADOR DE ELEMENTOS DE LA LISTA
      lista: {
        //LISTA DE MEDICAMENTOS
        medicamentos: [],
        fecha_expedicion: "",
        valida_hasta: "",
        id_cita: "",
      },
      firma_imagen: null, //IMAGEN DE LA FIRMA
      settings: {
        maxScrollbarLength: 400,
      },
    };
  },
  methods: {
    ...mapActions(["agregarRecetaMedica"]),
    //PARA LA FIRMA
    getImage(event) {
      //Asignamos la imagen a  nuestra data
      this.firma_imagen = event.target.files[0];
    },
    //AGREGA UN ELEMENTO A LA LISTA
    agregar() {
      if (this.contador == 6) {
        console.log("Llego al máximo.");
      } else {
        let medicamentos = {
          medicamento: "",
          concentracion: "",
          dosis_frecuencia: "",
          duracion: "",
          cantidad: "",
        };
        this.contador = 1 + this.contador;
        this.lista.medicamentos.push(medicamentos);
        console.log(this.doctor);
      }
    },
    //ELIMINAR UN MEDICAMENTO DE LA LISTA
    eliminar(item) {
      this.contador = this.contador - 1;
      var i = this.lista.medicamentos.indexOf(item);
      if (i !== -1) {
        this.lista.medicamentos.splice(i, 1);
      }
    },
    //VERIFICA SI LOS IMPUTS ESTÁN VACION
    camposVacios() {
      this.bool = false;
      if (this.lista.fecha_expedicion == "" || this.lista.valida_hasta == "") {
        this.bool = true;
      } else {
        if (this.contador > 0) {
          this.lista.medicamentos.forEach((element) => {
            for (const e in element) {
              if (element[e] == "" || element[e] == null) {
                console.log("vacia");
                this.bool = true;
              }
            }
          });
        } else {
          this.bool = false;
        }
      }
    },
    //LLAMA A LA CONSULTA AGREGAR MEDICAMENTOS
    agregarMedicamentos(lista) {
      var data = new FormData();
      this.lista.id_cita = this.cita.id;
      this.camposVacios();
      console.log(this.lista);
      if (this.contador == 0 || this.bool) {
        this.$refs.simplert.openSimplert({
          title: "RELLENE LOS CAMPOS CORRECTAMENTE.",
          message: "Registre todos los campos de la receta médica.",
          type: "warning",
        });
      } else if (this.firma_imagen == null) {
        this.$refs.simplert.openSimplert({
          title: "RELLENE LOS CAMPOS CORRECTAMENTE.",
          message: "Seleccione una firma 'firma.jpg'.",
          type: "warning",
        });
      } else {
        this.$refs.simplert.openSimplert({
          title: "ADVERTENCIA DE REGISTRO",
          message:
            "Solo puede registrar una receta médica por cita. ¿Está seguro que desea registrarla?",
          type: "info",
          useConfirmBtn: true,
          onConfirm: this.registrarMedicamentos,
        });
      }
    },
    registrarMedicamentos() {
      var data = new FormData();
      data.append("firma_imagen", this.firma_imagen);
      data.append("id_cita", this.lista.id_cita);
      data.append("fecha_expedicion", this.lista.fecha_expedicion);
      data.append("valida_hasta", this.lista.valida_hasta);
      for (let i = 0; i < this.contador; i++) {
        data.append(
          "medicamentos[" + i + "][medicamento]",
          this.lista.medicamentos[i].medicamento
        );
        data.append(
          "medicamentos[" + i + "][concentracion]",
          this.lista.medicamentos[i].concentracion
        );
        data.append(
          "medicamentos[" + i + "][dosis_frecuencia]",
          this.lista.medicamentos[i].dosis_frecuencia
        );
        data.append(
          "medicamentos[" + i + "][duracion]",
          this.lista.medicamentos[i].duracion
        );
        data.append(
          "medicamentos[" + i + "][cantidad]",
          this.lista.medicamentos[i].cantidad
        );
      }
      let datos = {
        doctor: this.getUsuario,
        lista: data,
      };
      console.log(datos);
      this.agregarRecetaMedica(datos).then((res) => {
        this.$refs.simplert.openSimplert(this.getMensajeDoctor);
      });
    },
  },
  computed: {
    ...mapGetters([
      "getPacienteAtendido",
      "getUsuario",
      "getCargaDoctor",
      "getMensajeDoctor",
    ]),
    ...mapState(["cita"]),
    name() {
      return (
        this.getPacienteAtendido.user.name +
        " " +
        this.getPacienteAtendido.user.lastname
      );
    },
  },
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
