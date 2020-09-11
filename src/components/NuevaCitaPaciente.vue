<template>
  <div>
    <!-- Page Content  -->
    <div id="content">
      <div class="">
        <button
          type="button"
          id="sidebarCollapse"
          class=" boton-menu mb-0 pb-0"
        >
          <i class="fas fa-align-left"></i>
          <span>Menú</span>
        </button>
      </div>
      <div class="contenido">
        <div
          class="container"
          style="box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); background:white;"
        >
          <div
            class="row "
            style="background:#0099a1; height:80px; align-content: center;"
          >
            <div class="col-12 text-center">
              <h3 style="color:white">Nueva cita</h3>
            </div>
          </div>
          <form
            @submit.prevent="
              agregarCita(
                {
                  especialidad: especialidad.especialidad,
                  fecha: rango,
                  hora_inicio: horas.hora_inicio,
                  hora_fin: horas.hora_fin,
                  _iddoctor: doctorElegido,
                },
                {
                  tipopaciente: tipopaciente,
                  idFamiliar: idFamiliar,
                }
              )
            "
          >
            <div class="form-row ">
              <div class="form-group col-md-6">
                <div class="row mr-1">
                  <div class="col-4">
                    <label for="inputEspecialidad">Tipo paciente</label>
                  </div>
                  <div class="col-8">
                    <select
                      id="inputState"
                      class="form-control"
                      v-model="tipopaciente"
                      @change="getFamiliares(tipopaciente)"
                    >
                      <option disabled value="">Seleccione Paciente</option>
                      <option value="titular">Paciente titular</option>
                      <option value="familiar">Paciente familiar</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="form-group col-md-6">
                <div class="row mr-1">
                  <div class="col-4">
                    <label for="inputDoctor">Familiar</label>
                  </div>
                  <div class="col-8">
                    <select
                      style="text-transform: uppercase;"
                      id="inputDoctor"
                      class="form-control"
                      v-model="idFamiliar"
                      :disabled="tipoActive"
                    >
                      <option disabled value="">Seleccionar Familiar</option>
                      <option
                        v-for="(item, index) in getListFamiliares"
                        :key="index"
                        v-bind:value="item._id"
                      >
                        {{ item.name }} {{ item.lastname }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-row ">
              <div class="form-group col-md-6">
                <div class="row mr-1">
                  <div class="col-4">
                    <label for="inputEspecialidad">Especialidad</label>
                  </div>
                  <div class="col-8">
                    <select
                      id="inputState"
                      class="form-control"
                      @change="getDoctores(especialidad._id)"
                      v-model="especialidad"
                    >
                      <option disabled value="">Especialidad</option>
                      <option
                        v-for="(element, id) in getEspecialidades"
                        :key="id"
                        v-bind:value="element"
                        >{{ element.especialidad }}</option
                      >
                    </select>
                  </div>
                </div>
              </div>
              <div class="form-group col-md-6">
                <div class="row mr-1">
                  <div class="col-4">
                    <label for="inputDoctor">Doctor</label>
                  </div>
                  <div class="col-8">
                    <select
                      style="text-transform: uppercase;"
                      id="inputDoctor"
                      class="form-control"
                      v-model="doctorElegido"
                      @change="getHorarioDoctor(doctorElegido)"
                    >
                      <option disabled value="">Seleccionar Doctor</option>
                      <option
                        v-for="(item, index) in doctores"
                        :key="index"
                        v-bind:value="item._id"
                      >
                        {{ item.name }} {{ item.lastname }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-row ">
              <div class="form-group col-md-6">
                <div class="row mr-1">
                  <div class="col-4">
                    <label for="inputFecha">Fecha</label>
                  </div>
                  <div class="col-8">
                    <select
                      id="inputFecha"
                      class="form-control"
                      v-model="rango"
                      @change="setHorario(rango)"
                    >
                      <option disabled value="">Seleccionar fecha</option>
                      <option
                        v-for="(item, index) in dia"
                        :key="index"
                        v-bind:value="item"
                      >
                        {{ item }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="form-group col-md-6">
                <div class="row mr-1">
                  <div class="col-4">
                    <label for="inputHora">Hora</label>
                  </div>
                  <div class="col-8">
                    <select
                      id="inputFecha"
                      class="form-control"
                      v-model="horas"
                    >
                      <option disabled value="">Seleccionar Horario</option>
                      <option
                        v-for="(item, index) in horarios"
                        :key="index"
                        v-bind:value="item"
                      >
                        {{ item.hora_inicio }} - {{ item.hora_fin }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div class="text-center boton-final">
              <button class="but btn btn-lg mt-5" type="submit">
                Generar cita
              </button>
            </div>
          </form>
        </div>
        <simplert :useRadius="true" :useIcon="true" ref="simplert"> </simplert>
      </div>
    </div>
  </div>
</template>

<script>
import Simplert from "@/components/Simplert.vue";
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "NuevaCitaPaciente",
  components: {
    Simplert,
  },
  mounted() {
    $("#sidebarCollapse").on("click", function() {
      $("#sidebar, #content").toggleClass("active");
      $(".collapse.in").toggleClass("in");
      $("a[aria-expanded=true]").attr("aria-expanded", "false");
    });
    this.usuario = this.usuarioPaciente;
    this.cargarDependiente();
    this.listarEspecialidades();
  },
  data() {
    return {
      tipoActive: true, //PARA DESACTIVAR EL BOTON
      idFamiliar: "", //ID DEL FAMILIAR SELECCIONADO
      tipopaciente: "", //TIPO DE PACIENTE
      mensajeRegistro: {}, //MENSAJE DE ERROR
      hora_inicio: "", //HORA DE INICIO DE LA CITA
      hora_fin: "", //HORA FIN DE LA CITA
      usuario: "", //ID DEL PACIENTE TITULAR
      horas: {}, //OBJETO DEL RANGO DE HORA
      rango: "", //RANDO DE LA HORA
      especialidades: [], //LISTA DE ESPECIALIDADES
      doctores: [], //LISTA DE DOCTORES
      especialidad: "", //ID DE LA ESPECIALIDAD
      doctorElegido: "", //ID DEL DOCTOR ELEGIDO
      horarioDoctor: [], //LISTA DE DOCTORES
      dia: [], //FECHAS
      horarios: [], //LISTA DE HORARIOS
      agregarcitaPaciente: {}, //CITA DEL PACIENTE
      dependientes: {}, //LISTA DE DEPENDIENTES
    };
  },
  methods: {
    ...mapActions(['listarEspecialidades','listarDependientes','agregarCitaPaciente','agregarCitaDependiente']),
    open2(o) {
      let obj = {
        title: o.title,
        message: o.message,
        type: o.type,
      };

      console.log("open simplert with obj : ", obj);
      this.$refs.simplert.openSimplert(obj);
      console.log(o);

    },

    //deshabilitar seccion de familiares
    getFamiliares(tipo) {
      if (tipo == "titular") {
        this.tipoActive = true;
        this.idFamiliar = "";
      } else {
        this.tipoActive = false;
      }
    },

    //Carga los dependientes del paciente
    cargarDependiente() {
      this.listarDependientes(this.getUsuario)
    },


    //LISTAR DOCTORES POR ESPECIALIDAD
    getDoctores(especialidad) {
      console.log(especialidad);
      this.getEspecialidades.forEach((element) => {
        if (especialidad == element._id) {
          this.doctores = element.doctor; //se guardan los doctores de la especialidad seleccionada
        }
      });
      this.$log.info('DOCTORES', this.doctores)
      this.doctorElegido = "";
      this.rango = "";
      this.dia= [];
      this.horarios = [];
    },

    //LISTAR LAS FECHAS DEL DOCTOR ELEGIDO
    getHorarioDoctor(id_doctor) {
      this.dia = [];
      this.horarios = [];
      let url = `https://sicramv1.herokuapp.com/api/doctor/horarios/${id_doctor}`;
      this.axios
        .get(url)
        .then((res) => {
          this.horarioDoctor = res.data;
          console.log(res)
          this.$log.info('HORARIOS', this.horarioDoctor)
          this.horarioDoctor.forEach((element) => {
            this.dia.push(element.fecha);
          });

          this.dia = Array.from(new Set(this.dia));
        })
        .catch((e) => {
          this.mensaje = e;
          console.log(e);
        });
    },

    //Horarios del doctor
    setHorario(rango) {
      this.horarios = [];
      this.rango = rango;
      this.horarioDoctor.forEach((element) => {
        if (this.rango == element.fecha) {
          this.horarios.push(element);
        }
      });
    },

    //AGREGAR LA CITA DEL PACIENTE TITULOAR O DEPNDIENTE
    agregarCita(cita, paciente) {
      //SE GUARDAN LOS VALORES DE LA CITA
      this.agregarcitaPaciente = cita;
      //SI LOS DATOS VIENEN VACÍOS
      if (
        cita.hora_inicio == null ||
        cita.hora_fin == null ||
        cita.fecha == null ||
        cita.especialidad == null ||
        cita._iddoctor == null
      ) {
        this.mensajeRegistro = {
          title: "REGISTRO FALLIDO",
          message: "Seleccione todos los campos",
          type: "warning",
        };
        this.open2(this.mensajeRegistro);
        //SI TODOS LOS DATOS ESTAN VACÍOS
      } else {
        //CITA PAR EL TITULAR
        if (paciente.tipopaciente == "titular") {
          let datos = {
            paciente: this.getUsuario,
            cita : cita
          }
          this.agregarCitaPaciente(datos)
          .then((res)=>{
            this.$refs.simplert.openSimplert(this.getMensaje);
            this.limpiarCasillas()
          })
        } else {
          //CITA PARA EL PACIENTE DEPENDIENTE
          console.log("idpaciente", this.idPaciente);
          let datos = {
            paciente: this.getUsuario,
            cita: cita,
            idFamiliar : paciente.idFamiliar
          }
          this.agregarCitaDependiente(datos)
          .then((res)=>{
            this.$refs.simplert.openSimplert(this.getMensaje);
            this.limpiarCasillas()
          })
        }
      }
    },

    limpiarCasillas() {
      this.doctores = [];
      this.dia = [];
      this.horarios = [];
    },
  },
  computed: {
    ...mapGetters(['getEspecialidades','getListFamiliares','getUsuario','getMensaje','getCarga',""])
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
}

/* css nueva cita */
.contenido {
  padding: 0;
}
form {
  padding: 50px;
}

label {
  font-weight: 500;
}

.but {
  background: #0099a1;
  color: white;
}
.but:hover {
  background: #01c2cc;
  color: white;
}

@media (max-width: 375px) {
  .contenido {
    position: relative;
    margin-top: 50px;
  }
  #content .boton-menu {
    margin-right: 10px;
  }
  form {
    margin-top: 30px;
    padding: 0;
  }
  .btn {
    margin-bottom: 10px;
  }
}

.titulo {
  background: #0099a1;
  height: 60px;
  color: white;
  text-align: center;
  align-content: center;
}
</style>
