<template>
  <div>
    <div id="content">
      <div class="">
        <button type="button" id="sidebarCollapse" class=" boton-menu">
          <i class="fas fa-align-left"></i>
          <span>Menú</span>
        </button>
      </div>
      <div class="contenido">
        <div class="container">
          <div class="row">
            <div class="col-lg-3">
              <form
                class="formularioElegir"
                @submit.prevent="
                  agregarHorario({
                    fecha: fecha,
                    hora_inicio: hora_inicio,
                    hora_fin: hora_fin,
                  })
                "
              >
                <div class="form-group">
                  <label for="exampleImputFecha">Fecha</label>
                  <input
                    disabled
                    v-model="fecha"
                    type="text"
                    class="form-control"
                    id="exampleImputFecha"
                    placeholder="MM-DD-AAAA"
                  />
                </div>
                <div class="form-group ">
                  <label for="inputIni">Rango de Horarios</label>
                  <select
                    id="inputIni"
                    class="form-control"
                    v-model="horario"
                    @change="elegirHorario(horario)"
                  >
                    <option
                      v-for="(element, id) in optionsHorario"
                      :key="id"
                      v-bind:value="element.value"
                    >
                      {{ element.text }}
                    </option>
                  </select>
                </div>

                <div class="text-center">
                  <button type="submit" class="btn btn-primary">Submit</button>
                </div>
              </form>
            </div>
            <div class="col-lg-8">
              <div>
                <b-calendar
                  v-model="value"
                  :min="diaMin"
                  :max="diaMax"
                  @context="onContext"
                  locale="es"
                ></b-calendar>
              </div>

              <simplert :useRadius="true" :useIcon="true" ref="simplert">
              </simplert>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MensajeExitoso from "@/components/MensajeExitoso.vue";
import Simplert from "@/components/Simplert.vue";
import { mapState } from "vuex";
export default {
  name: "AgregarHorarioDoctor",
  components: {
    MensajeExitoso,
    Simplert,
  },
  data() {
    return {
      mensajeRegistro: {},
      diaMin: new Date(), //DIA MINIMO DEL CALENDARIO
      diaMax: new Date(), //DIA MAXIMO DEL CALENDAIO
      nuevoHorario: {  //OBJETO DE HORARIO NUEVO
        dia: "",
        hora_inicio: "",
        hora_fin: "",
        doctor_id: "",
      },
      value: "",
      context: null, //CONTEXTO DEL CALENDARIO
      mensaje: "", //MENSAJE 
      usuario: "", //ID DOCTOR 

      fecha: "",  //FECHA (DIA)
      hora_inicio: "", //FECHA (HORA INICIO)
      hora_fin: "",//FECHA (HORA FIN)
      horario: "",//GUARDA EL VALOR DEL HORARIO ELEGIDO
      optionsHorario: [ //LISTA DE HORARIOS PARA EL DOCTOR
        { text: "8:00-9:00", value: 1, inicio: "08:00", fin: "09:00" },
        { text: "9:00-10:00", value: 2, inicio: "09:00", fin: "10:00" },
        { text: "10:00-11:00", value: 3, inicio: "10:00", fin: "11:00" },
        { text: "11:00-12:00", value: 4, inicio: "11:00", fin: "12:00" },
        { text: "15:00-16:00", value: 5, inicio: "16:00", fin: "17:00" },
        { text: "16:00-17:00", value: 6, inicio: "16:00", fin: "17:00" },
        { text: "17:00-18:00", value: 7, inicio: "17:00", fin: "18:00" },
        { text: "18:00-19:00", value: 8, inicio: "18:00", fin: "19:00" },
        { text: "19:00-20:00", value: 9, inicio: "19:00", fin: "20:00" },
      ],
    };
  },
  
  methods: {
    //MODAL DE MENSAJE DE REGISTRO
    open2(o) {
      let obj = {
        title: o.title,
        message: o.message,
        type: o.type,
      };

      this.$refs.simplert.openSimplert(obj);
      console.log(o);
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
      if (horario.hora_inicio === "" || horario.fecha === "") {
        this.$log.warn('CITAS : ', "LLENE TODOS LOS CAMPOS" )
        this.mensajeRegistro = {
          title: "REGISTRO FALLIDO",
          message: "Seleccione fecha y hora",
          type: "warning",
        };
        this.open2(this.mensajeRegistro);
        
      } else { 
        console.log(horario);
        this.nuevoHorario = horario;
        console.log(horario.fecha);
        let url = `https://sicramv1.herokuapp.com/api/doctor/horario/agregar/${this.idDoctor}`;
        this.axios
          .post(
            url,
            { ...this.nuevoHorario },
            {
              headers: {
                Authorization: `${this.usuario}`,
              },
            }
          )

          .then((res) => {
            //YA CUENTA CON ESTE MISMO HORARIO 
            if (res.data.msg === "YA EXISTE ESE HORARIO PARA EL DOCTOR") {
              this.$log.error('NUEVOHORARIO : ', res.data.msg)
              this.mensaje = "Horario agregado anteriormente";
              this.mensajeRegistro = {
                title: "REGISTRO FALLIDO",
                message: this.mensaje,
                type: "error",
              };
              this.open2(this.mensajeRegistro);
            } else {
              //SE GUARDA CON EXITO EL HORARIO
              this.$log.debug('NUEVOHORARIO : ', res.data.msg)
              this.vaciarCasillas();
              this.mensaje = "Horario agregado";
              this.mensajeRegistro = {
                title: "REGISTRO EXITOSO",
                message: this.mensaje,
                type: "success",
              };
              this.open2(this.mensajeRegistro);
            }
          })
          .catch((e) => {
            //POR SI EXISTE UN ERROR AL GUARDAR
            this.$log.fatal('NUEVOHORARIO : ', e)
            this.mensaje = "Error en el registro";
            this.mensajeRegistro = {
              title: "REGISTRO FALLIDO",
              message: this.mensaje,
              type: "error",
            };
            this.open2(this.mensajeRegistro);
          });
      }
    },
    //FECHA SELECCIONADA
    onContext(ctx) {
      const fechaCalendario = this.value.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, "$3/$2/$1");
      this.fecha = fechaCalendario;
    },
  },
  computed: {
    ...mapState(["usuarioDoctor", "idDoctor"]),
  },
  mounted() {
    $("#sidebarCollapse").on("click", function() {
      $("#sidebar, #content").toggleClass("active");
      $(".collapse.in").toggleClass("in");
      $("a[aria-expanded=true]").attr("aria-expanded", "false");
    });
    this.usuario = this.usuarioDoctor;
  },
  beforeMount() {
    this.diaMax.setDate(this.diaMax.getDate() + 7);
  },
};
</script>

<style scoped>
/*HORARIO CSS */
.formularioElegir {
  padding: 10px 20px;
  border: 2px solid #f4f4f4;
  background: #f4f4f4;
  margin-left: 20px;
  margin-bottom: 10px;
}

.calendar {
  border: 5px solid black;
  width: 100%;
  height: 580px;
  margin-bottom: 20px;
}
/*content */

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
</style>
