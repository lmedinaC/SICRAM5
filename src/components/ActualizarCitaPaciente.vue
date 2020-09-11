<template>
  <div>
    <!-- Page Content  -->
    <ModEditarCita/>
    <div id="content">
      <div class="">
        <button type="button" id="sidebarCollapse" class=" boton-menu">
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
            class="row titulo"
            style="background:#0099a1; height:60px; align-content: center;"
          >
            <div class="col-12 text-center">
              <h3 style="color:white">Citas pendientes del {{ fecha }}</h3>
            </div>
          </div>
          <div class="lista-doctor" v-if="getListaCitas != null">
            <div class="doctores">
              <ul style="list-style:none">
                <li v-for="(element, index) of getListaCitas" :key="index">
                  <div class="row doctor">
                    <div class="col-md-8">
                      <div class="row">
                        <div class="col-md-12">
                          <p class="mayusculas">
                            <strong>Especialidad:</strong>
                            {{ element.especialidad.especialidad }}
                          </p>
                          <p>
                            <strong>Fecha: </strong> {{ element.horario.fecha }}
                          </p>
                          <p>
                            <strong>Hora: </strong>
                            {{ element.horario.hora_inicio }} -
                            {{ element.horario.hora_fin }}
                          </p>
                          <p class="mayusculas">
                            <strong>Doctor: </strong>
                            {{ element.doctor.lastname }}
                            {{ element.doctor.name }}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-4 botones">
                      <div>
                        <button
                          class="btn btn-md  btn-ingresar "
                          @click="
                            cargar({
                              aulaVirtual: element.aulaVirtual,
                              name: element.doctor.name,
                              lastname: element.doctor.lastname,
                            })
                          "
                        >
                         <i class="fas fa-video fa-sm"></i> Ingresar
                        </button>
                      </div>
                      <div>
                        <button
                          class="btn btn-md  btn-editar "
                          @click="abrirEdicion(element)"
                        >
                          <i class="fas fa-list fa-sm"></i> Editar
                        </button>
                      </div>
                      <div>
                        <button
                          class="btn  btn-md  btn-eliminar"
                          @click="abrirEliminación(element)"
                        >
                          <i class="fas fa-times"></i> Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="container" v-if="getListaCitas === null">
            <div
              class="mt-3"
              style="padding:50px; align-content: center; text-align: center; background:pink"
            >
              <h4>NO CUENTA CON CITAS REGISTRADAS</h4>
            </div>
            <br />
          </div>
        </div>
      </div>
      <br />
    </div>
    <simplert :useRadius="true" :useIcon="true" ref="simplert"> </simplert>
  </div>
</template>

<script>
import ModEditarCita from "@/components/Modales/ModEditarCita.vue";
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
  name: "ActualizarCitaPaciente",
  components: {
    Simplert,
    Loading,
    ModEditarCita
  },
  data() {
    return {
      mensaje: "",
      usuario: "",
      datosUsuario: {},
      diaMin: new Date(),
      diaMax: new Date(),
      fecha: "",
      cita: null,
    };
  },
  mounted() {
    $("#sidebarCollapse").on("click", function() {
      $("#sidebar, #content").toggleClass("active");
      $(".collapse.in").toggleClass("in");
      $("a[aria-expanded=true]").attr("aria-expanded", "false");
    });
  },
  methods: {
    ...mapActions(["setObjCita", "listCitas",'listarDependientes',"eliminarCitaPaciente","datosCita","listarHorariosDoctor"]),
    cargar(cita) {
      let loader = this.$loading.show({
        // Optional parameters
        color: "#0099a1",
        container: this.fullPage ? null : this.$refs.formContainer,
        canCancel: false,
        loader: "dots",
        height: 150,
        width: 130,
      });
      // simulate AJAX
      setTimeout(() => {
        loader.hide();
        this.ingresarCita(cita);
      }, 3000);
    }, //
    MostrarFecha(fecha) {
      var nombres_dias = new Array(
        "Domingo",
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado"
      );
      var nombres_meses = new Array(
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre"
      );

      const dia_mes = fecha.getDate(); //dia del mes
      const dia_semana = fecha.getDay(); //dia de la semana
      const mes = fecha.getMonth() + 1;
      const anio = fecha.getFullYear();

      var fechaHora = new Date();
      var horas = fechaHora.getHours();
      var minutos = fechaHora.getMinutes();
      var segundos = fechaHora.getSeconds();
      var sufijo = "AM";

      if (horas > 12) {
        horas = horas - 12;
        sufijo = "PM";
      }

      if (horas < 10) {
        horas = "0" + horas;
      }
      if (minutos < 10) {
        minutos = "0" + minutos;
      }
      if (segundos < 10) {
        segundos = "0" + segundos;
      }

      //escribe en pagina
      return nombres_dias[dia_semana] + " " + dia_mes;
    },

    setFecha(fecha1, fecha2) {
      this.fecha =
        this.MostrarFecha(fecha1) + " al " + this.MostrarFecha(fecha2);
      console.log(this.fecha);
    },
    //MUESTRA LAS CITAS DEL PACIENTE
    getCita() {
      //LLAMA A LA FUNCION LISTAR CISTAS DE PACIENTE.JS
      this.listCitas(this.getUsuario);
    },

    //INGRESA A LA CITA
    ingresarCita(cita) { 
      console.log(cita); 
      this.setObjCita(cita);
      window.location.assign('/pacientevista/citapaciente')
    },
  
    //ABRE MODAL DE EDICION DE CITA
    abrirEdicion(cita){
      console.log("asdasd",cita.doctor)
      let datos = {
        id : cita.doctor._id
      }
      //cita.doctor.name = cita.doctor.name + " " + cita.doctor.lastname
      this.listarHorariosDoctor(datos)
      this.datosCita(cita)
      this.$modal.show('mod-editar-cita')
    },
    //ABRE MODAL DE CONFIRAMCIÓN DE ELIMINACIÓN
    abrirEliminación(cita) {
      this.cita = cita;
      this.$refs.simplert.openSimplert({
        title: "CONFIRMAR ELIMINACIÓN",
        message: "¿Seguro que desea proceder con la eliminación?",
        type: "info",
        useConfirmBtn: true,
        onConfirm: this.eliminarCita,
      });
    },
    //LLAMA A ELIMINAR CITA DE PACIENTE EN PACIENTE.JS
    eliminarCita() {
      console.log(this.cita);
      let datos= {
        paciente: this.getUsuario,
        id_cita: this.cita._id
      }
      this.eliminarCitaPaciente(datos)
      .then((res)=>{
        this.$refs.simplert.openSimplert(this.getMensaje);
        this.listCitas(this.getUsuario);
      })
    },
  }, // 
  computed: {
    ...mapState(["usuarioPaciente", "idPaciente"]),
    ...mapGetters(['getEspecialidades','getListFamiliares',"getUsuario", "getListaCitas","getMensaje"]),
  },
  beforeMount() {
    this.diaMax.setDate(this.diaMax.getDate() + 7);
    this.setFecha(this.diaMin, this.diaMax);
    this.listarDependientes(this.getUsuario)
    this.getCita();
  },
};
</script>

<style scoped>
@import "https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700";

p {
  font-family: "Poppins", sans-serif;
  font-size: 1em;
  font-weight: 300;
  line-height: 1em;
}

.mayusculas {
  text-transform: uppercase;
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
.titulo {
  text-align: center;
  background: #0099a1;
}

.foto {
  background: gray;
  height: 150px;
  border-radius: 15px;
}
.lista-doctor {
  margin-top: 30px;
  padding-bottom: 30px;
}
.doctor {
  border-radius: 15px;
  background: #67d9df;
  margin-top: 15px;
  margin-bottom: 20px;
  margin-right: 20px;
  padding-left: 20px;
  padding-top: 15px;
  padding-bottom: 5px;
}
.botones {
  text-align: center;
}
.btn-editar {
  width: 150px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  background: rgb(75, 197, 75);
  margin-bottom: 5px;
  margin-top: 5px;
  color: white;
}
.btn-editar:hover {
  background: rgb(43, 161, 43);
}

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

.btn-eliminar {
  width: 150px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  color: white;
  background: rgb(211, 65, 65);
  margin-bottom: 5px;
  margin-top: 5px;
}

.btn-eliminar:hover {
  background: rgb(199, 21, 21);
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

  .titulo {
    margin-top: 35px;
    text-align: left;
  }
}
@media (max-width: 425px) {
  .titulo {
    margin-top: 10px;
    text-align: center;
    height: 60px;
  }
  .btn-editar {
    width: 200px;
  }
  .btn-eliminar {
    width: 200px;
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

  .titulo {
    margin-top: 0px;
    text-align: center;
    height: 80px;
  }
}
/* ACTUALIZAR DATOS CSS*/
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
</style>
