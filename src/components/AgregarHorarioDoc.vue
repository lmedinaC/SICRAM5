<template>
  <div>
    <ModEditarHorario />
    <div id="content">
      <div class="">
        <button type="button" id="sidebarCollapse" class=" boton-menu">
          <i class="fas fa-align-left"></i>
          <span>Menú</span>
        </button>
      </div>
      <div class="contenido">
        <div class="contenido-Horario">
          <div class="agregar-Horario">
            <form
              @submit.prevent="
                agregarHorario({
                  fecha: fecha,
                  hora_inicio: hora_inicio,
                  hora_fin: hora_fin,
                })
              "
            >
              <div class="row">
                <div class="col-md-4 mt-2">
                  <h6>FECHA</h6>
                  <date-picker
                    class="calendar"
                    value-type="DD/MM/YYYY"
                    v-model="fecha"
                    :disabled-date="disabledBeforeTodayAndAfterAWeek"
                    :lang="lang"
                  ></date-picker>
                </div>
                <div class="col-md-4 mt-2">
                  <h6>HORA</h6>
                  <select
                    data-show-content="true"
                    id="inputIni"
                    class="form-control"
                    v-model="horario"
                    @change="elegirHorario(horario)"
                  >
                    <option disabled value="">Seleccione horario</option>
                    <option
                      data-content="<i class='far fa-clock'></i>"
                      v-for="(element, id) in optionsHorario"
                      :key="id"
                      v-bind:value="element.value"
                    >
                      {{ element.text }}
                    </option>
                  </select>
                </div>
                <div class="col-md-4 mt-2">
                  <button class="btn btn-lg agregar" :disabled="getCargaDoctor">
                    Agregar
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div class="horario">
            <div class="titulo">
              <h3>Lista de horarios</h3>
            </div>
            <div class="container" v-if="getListaHorariosDoctor === null">
              <div
                class="mt-3"
                style="padding:50px; align-content: center; text-align: center; background:pink"
              >
                <h4>NO CUENTA CON HORARIOS REGISTRADOS OCUPADOS</h4>
              </div>
            </div>
            <div v-if="getListaHorariosDoctor != null">
              <div class="lista-horario">
                <div class="row">
                  <div class="col-md-3">
                    <p>Fecha</p>
                  </div>
                  <div class="col-md-3 ">
                    <p>Hora inicio</p>
                  </div>
                  <div class="col-md-3 ">
                    <p>Hora fin</p>
                  </div>
                  <div class="col-md-3">
                    <p>Accion</p>
                  </div>
                </div>
              </div>
              <div
                class="lista-horas"
                v-for="(element, index) in getListaHorariosDoctor"
                :key="index"
              >
                <div class="row">
                  <div class="col-md-3">
                    <p>{{ element.fecha }}</p>
                  </div>
                  <div class="col-md-3">
                    <p>{{ element.hora_inicio }}</p>
                  </div>
                  <div class="col-md-3">
                    <p>{{ element.hora_fin }}</p>
                  </div>
                  <div class="col-md-3">
                    <div>
                      <button
                        class="btn btn-sm  btn-editar "
                        @click="abrirEdicion(element)"
                      >
                        <i class="fas fa-list fa-sm"></i> Editar
                      </button>
                    </div>
                    <div>
                      <button
                        class="btn  btn-sm btn-eliminar"
                        @click="abrirModalEliminar(element)"
                      >
                        <i class="fas fa-times fa-sm"></i> Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
    </div>
    <simplert :useRadius="true" :useIcon="true" ref="simplert"> </simplert>
  </div>
</template>

<script>
import Simplert from "@/components/Simplert.vue";
import ModEditarHorario from "@/components/Modales/ModEditarHorario.vue";
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "AgregarHorarioDoctor",
  components: {
    Simplert,
    ModEditarHorario,
  },
  data() {
    return {
      lang: {
        formatLocale: {
          firstDayOfWeek: 1,
        },
        monthBeforeYear: false,
        range: true,
      },
      mensajeRegistro: {},
      fecha: null, //FECHA (DIA)
      hora_inicio: "", //FECHA (HORA INICIO)
      hora_fin: "", //FECHA (HORA FIN)
      horario: "", //GUARDA EL VALOR DEL HORARIO ELEGIDO
      horarioModificado: null,
      optionsHorario: [
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
    };
  },

  methods: {
    ...mapActions([
      "registrarHorarioDoctor",
      "listarHorariosDoctor",
      "datosHorario",
      "eliminarHorarioDoctor",
    ]),

    disabledBeforeTodayAndAfterAWeek(date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return (
        date < today || date > new Date(today.getTime() + 7 * 24 * 3600 * 1000)
      );
    },

    vaciarCasillas() {
      this.fecha = "";
      this.horario = "";
    },

    elegirHorario(hora) {
      console.log(hora);
      this.optionsHorario.forEach((element) => {
        if (hora === element.value) {
          this.hora_inicio = element.inicio;
          this.hora_fin = element.fin;
          console.log(this.hora_inicio);
        }
      });
    },

    //AGREGAR HORARIO
    agregarHorario(horario) {
      //CASILLAS VACÍAS
      console.log(horario);
      if (horario.hora_inicio === "" || horario.fecha === "") {
        this.$log.warn("CITAS : ", "LLENE TODOS LOS CAMPOS");

        this.mensajeRegistro = {
          title: "REGISTRO FALLIDO",
          message: "Seleccione fecha y hora",
          type: "warning",
        };
        this.$refs.simplert.openSimplert(this.mensajeRegistro);
      } else {
        let datos = {
          newHorario: horario,
          doctor: this.getUsuario,
        };
        //SE ENVIA LA CONSULTA DE REGISTRAR HORARIO A DOCTOS.JS
        this.registrarHorarioDoctor(datos).then((res) => {
          this.$refs.simplert.openSimplert(this.getMensajeDoctor);
          this.listarHorariosDoctor(this.getUsuario);
        });
      }
    },

    //ABRE EL MODAL DE CONFIMACION DE ELIMINAR HORARIO
    abrirModalEliminar(horario) {
      this.horarioModificado = horario;
      this.getMensajeEliminar.onConfirm = this.eliminarHorario;
      this.$refs.simplert.openSimplert(this.getMensajeEliminar);
    },
    eliminarHorario() {
      let datos = {
        doctor: this.getUsuario,
        id_horario: this.horarioModificado._id,
      };
      //ABRE LA CONSULTA DE ELIMINAR UN HORARIO DEL DOCTOR QUE NO ESTÉ OCUPADA DE DOCTOR.JS
      this.eliminarHorarioDoctor(datos).then((res) => {
        //MUESTRA EL MENSAJE POSITIVO O NEGATIVO
        this.$refs.simplert.openSimplert(this.getMensajeDoctor);
        this.listarHorariosDoctor(this.getUsuario);
      });
    },

    //ABRE EL MODAL DE EDITAR EL HORARIO
    abrirEdicion(horario) {
      this.datosHorario(horario);
      this.$modal.show("mod-editar-horario");
    },
  },
  computed: {
    ...mapGetters([
      "getCargaDoctor",
      "getUsuario",
      "getMensajeDoctor",
      "getListaHorariosDoctor",
      "getMensajeEliminar",
    ]),
  },
  mounted() {
    $("#sidebarCollapse").on("click", function() {
      $("#sidebar, #content").toggleClass("active");
      $(".collapse.in").toggleClass("in");
      $("a[aria-expanded=true]").attr("aria-expanded", "false");
    });
    this.listarHorariosDoctor(this.getUsuario);
  },
};
</script>

<style lang="scss" scoped>
@import "https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700";
p {
  font-family: "Poppins", sans-serif;
  font-size: 1.1em;
  font-weight: 300;
  line-height: 1.7em;
}

#sidebar ul li a,
a:hover,
a:focus {
  color: inherit;
  text-decoration: none;
  transition: all 0.3s;
}

.boton-menu {
  cursor: pointer;
  position: relative;
  background: #fff;
  height: 50px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  border-radius: 30px;
  outline: none !important;
  border: none;
  margin-bottom: 15px;
}

.line {
  width: 100%;
  height: 1px;
  border-bottom: 1px dashed black;
  margin: 40px 0;
}

/* ---------------------------------------------------
    CONTENT STYLE
----------------------------------------------------- */
#content {
  width: calc(100% - 150px);
  padding: 10px 0 0 0px;
  min-height: 100vh;
  transition: all 0.3s;
  position: absolute;
  top: 0;
  right: 0;
  background-color: #ffffff;
}

#content.active {
  width: 100%;
}

#content .contenido {
  position: relative;
  top: 10px;
}

.contenido-Horario {
  padding: 0 50px 0 50px;
  .agregar-Horario {
    border-radius: 10px;
    text-align: center;
    padding: 30px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    background: white;
    margin: 0 0 50px 0;
    .agregar {
      color: white;
      background-color: #16c8d1;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
      margin: 10px;
      &:hover {
        background-color: #0099a1;
      }
    }
  }
  .horario {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    background: white;
    padding-bottom: 10px;
    .titulo {
      padding: 10px;
      background: #0099a1;
      height: 60px;
      text-align: center;
      color: white;
    }
    .lista-horario {
      text-align: center;
      margin: 20px 30px 20px 30px;
      border: 1px solid rgb(156, 156, 156);
    }
    .lista-horas {
      align-items: center;
      text-align: center;
      margin: 5px 30px 0px 30px;
      background-color: rgb(236, 236, 236);
      p {
        padding-top: 15px;
        font-size: 1.3em;
        font-weight: 300;
      }
    }
    .btn-editar {
      margin: 5px 0 5px 0;
      width: 100px;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
      background: rgb(75, 197, 75);
      color: white;
      &:hover {
        background: rgb(43, 161, 43);
      }
    }

    .btn-eliminar {
      margin: 5px 0 5px 0;
      width: 100px;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
      color: white;
      background: rgb(211, 65, 65);
      &:hover {
        background: rgb(199, 21, 21);
      }
    }
  }
}

/* ---------------------------------------------------
    MEDIAQUERIES
----------------------------------------------------- */

@media (max-width: 768px) {
  #sidebar {
    margin-left: -150px;
  }
  #sidebar.active {
    margin-left: 0;
  }
  #content {
    width: 100%;
  }
  #content.active {
    width: calc(100% - 150px);
  }
  #sidebarCollapse span {
    display: none;
  }

  .boton-menu {
    cursor: pointer;
    background: #fff;
    height: 50px;
    width: 50px;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.5);
    border-radius: 30px;
    outline: none !important;
    border: none;
    margin-bottom: 15px;
  }
}

@media (max-width: 375px) {
  #sidebar {
    margin-left: -150px;
  }
  #sidebar.active {
    margin-left: 0;
  }
  #content {
    width: 100%;
  }
  #content.active {
    width: 99%;
  }
  #sidebarCollapse span {
    display: none;
  }

  .boton-menu {
    float: right;
    margin-right: -5px;
  }
  .contenido {
    position: relative;
    margin-top: 30px;
  }
  .contenido-Horario {
    padding: 30px 5px 0 5px;
    .horario {
    }
  }
}
</style>
