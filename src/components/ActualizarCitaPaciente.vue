<template>
  <div>
    <!-- Page Content  -->
    <div id="content">
      <div class="">
        <button type="button" id="sidebarCollapse" class=" boton-menu">
          <i class="fas fa-align-left"></i>
          <span>Menú</span>
        </button>
      </div>
      <br />
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
          <table
            class="table table-striped table-hover tabla mt-4"
            style="border-style: solid; border-width: 2px; border-color: #f2f2f2; "
            v-if="datosUsuario.length!=0"
          >
            <thead class="text-center">
              <tr>
                <th scope="col">Fecha</th>
                <th scope="col">Doctor</th>
                <th scope="col">Rango hora</th>
                <th scope="col">Especialidad</th>
                <th scope="col">Acción</th>
              </tr>
            </thead>
            <tbody class="text-center">
              <tr v-for="(element, index) in datosUsuario" :key="index">
                <td>{{ element.horario.fecha }}</td>
                <td style="text-transform: uppercase;">
                  {{ element.doctor.lastname }}
                </td>
                <td>
                  {{ element.horario.hora_inicio }} -
                  {{ element.horario.hora_fin }}
                </td>
                <td style="text-transform: uppercase;">
                  {{ element.especialidad.especialidad }}
                </td>
                <td>
                  <div class="boton-group">
                    <button class="btn btn-primary btn-sm  mr-2">
                      Actualizar
                    </button>
                    <button class="btn btn-danger btn-sm mr-2">Eliminar</button>
                    <button class="btn btn-success btn-sm ">Ingresar</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="container" v-if="datosUsuario.length===0">
              <div class="mt-3" style="padding:50px; align-content: center; text-align: center; background:pink">
                  <h4>NO CUENTA CON CITAS REGISTRADAS</h4>
              </div>
              <br>
          </div>
          <br />
        </div>

        
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "ActualizarCitaPaciente",
  data() {
    return {
      mensaje: "",
      usuario: "",
      datosUsuario: {},
      diaMin: new Date(),
      diaMax: new Date(),
      fecha:"",
      
    };
  },
  mounted() {
    $("#sidebarCollapse").on("click", function() {
      $("#sidebar, #content").toggleClass("active");
      $(".collapse.in").toggleClass("in");
      $("a[aria-expanded=true]").attr("aria-expanded", "false");
    });
    this.getCita();
  },
  methods: {
     MostrarFecha(fecha)
      {
      var nombres_dias = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado")
      var nombres_meses = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre")
     

      const dia_mes = fecha.getDate() //dia del mes
      const dia_semana = fecha.getDay() //dia de la semana
      const mes = fecha.getMonth() + 1
      const anio =fecha.getFullYear()

      var fechaHora = new Date();
      var horas = fechaHora.getHours();
      var minutos = fechaHora.getMinutes();
      var segundos = fechaHora.getSeconds();
      var sufijo = "AM";

      if(horas > 12) {
      horas = horas - 12;
      sufijo = "PM";
      }

      if(horas < 10) { horas = "0" + horas; }
      if(minutos < 10) { minutos = "0" + minutos; }
      if(segundos < 10) { segundos = "0" + segundos; }

      //escribe en pagina
      return nombres_dias[dia_semana] + " " + dia_mes;
      },

      setFecha(fecha1,fecha2){
        this.fecha = this.MostrarFecha(fecha1) + " al "+ this.MostrarFecha(fecha2);
        console.log(this.fecha)
      },

    getCita() {
      this.usuario = this.usuarioPaciente;
      let url =
        `https://sicramv1.herokuapp.com/api/user/cita/listar/${this.idPaciente}`;
      this.axios
        .get(url, {
          headers: {
            Authorization: `${this.usuario}`,
          },
        })
        .then((res) => {
          this.datosUsuario = res.data;
          console.log("data:",res.data.length);
        })
        .catch((e) => {
          this.mensaje = e;
          console.log(e);
        });
    },
  },
  computed: {
    ...mapState(["usuarioPaciente","idPaciente"]),
  },
   beforeMount() {
    this.diaMax.setDate(this.diaMax.getDate() + 7);
    this.setFecha(this.diaMin,this.diaMax)
  },
};
</script>

<style>
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

@media (max-width: 425px) {
  .titulo{
    height: 300px;
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
    margin-top: 50px;
  }
}

/* Actualizar cita css */
.contenido {
  padding: 0 20px;
}

label {
  font-weight: 500;
}
</style>
