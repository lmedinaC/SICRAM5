<template>
  <div>
    <!-- Page Content  -->
    <ModVerRecetaMedica/>
    <ModVerDiagnostico/>
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
              <h3 style="color:white">Citas pasadas</h3>
            </div>
          </div>
          <div class="lista-doctor" v-if="getListaCitasPasadas != null">
            <div class="doctores">
              <ul style="list-style:none">
                <li
                  v-for="(element, index) of getListaCitasPasadas"
                  :key="index"
                >
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
                          <p>
                            <strong>Estado: </strong>
                            {{ element.estado }} 
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
                        <button class="btn btn-md  btn-editar" @click="verDiagnostico(element)">
                          <i class="fas fa-file-medical "></i> Informe
                        </button>
                      </div>
                      <div>
                        <button class="btn  btn-md  btn-ingresar" @click="verRecetaMedica(element)">
                          <i class="far fa-file-alt "></i> Receta
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="container" v-if="getListaCitasPasadas === null">
            <div
              class="mt-3"
              style="padding:50px; align-content: center; text-align: center; background:pink"
            >
              <h4>NO CUENTA CON CITAS PASADAS</h4>
            </div>
            <br />
          </div>
        </div>
      </div>
      <br />
    </div>
  </div>
</template>

<script>
import ModVerDiagnostico from "@/components/Modales/ModVerDiagnostico.vue";
import ModVerRecetaMedica from "@/components/Modales/ModVerRecetaMedica.vue";
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  name: "CitaPasadaPaciente",
  components: {
    ModVerDiagnostico,
    ModVerRecetaMedica
  },
  data() {
    return {};
  }, 
  mounted() {
    $("#sidebarCollapse").on("click", function() {
      $("#sidebar, #content").toggleClass("active");
      $(".collapse.in").toggleClass("in");
      $("a[aria-expanded=true]").attr("aria-expanded", "false");
    });
    this.listCitasPasadas(this.getUsuario);
  },
  methods: {
    ...mapActions(["setObjCita", "listCitasPasadas","verDiagnosticoCita","verRecetaCita","detalleDeCita"]),
    //ABRE EL MODAL DEL DIAGNOSTICO HECHO POR EL PACIENTE
    verDiagnostico(element){
        this.detalleDeCita(element)
        let datos = {
          paciente : this.getUsuario,
          id_cita: element._id
        }
        this.verDiagnosticoCita(datos)
        this.$modal.show('mod-ver-diagnostico')
    },
    //ABRE EL MODAL DE LA RECETA MÉDICA PARA EL PACIENTE
    verRecetaMedica(element){
      this.detalleDeCita(element)
        let datos = {
          paciente : this.getUsuario,
          id_cita: element._id
        }
        this.verRecetaCita(datos)
        this.$modal.show('mod-ver-receta-medica')
    }

  }, //
  computed: {
    ...mapGetters(["getUsuario", "getListaCitasPasadas"]),
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
  padding: 18px 0 0 0;
  text-align: center;
}
.btn-editar {
  font-size: 1.2em;
  width: 150px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  background: rgb(50, 152, 199);
  margin-bottom: 5px;
  margin-top: 5px;
  color: white;
}
.btn-editar:hover {
  background: rgb(12, 141, 201);
}

.btn-ingresar {
  width: 150px;
  font-size: 1.2em;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  background: #26af76;
  margin-top: 5px;
  margin-bottom: 5px;
  color: white;
}
.btn-ingresar:hover {
  background: #0a8f57;
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
