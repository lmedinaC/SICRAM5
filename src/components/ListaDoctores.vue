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
          style=" box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); background:white;"
        >
          <div class="row justify-content-center" style="background:#0099a1;">
            <div class="col-12 titulo">
              <h3 style="color:white;">Lista de Doctores</h3>
            </div>
          </div>
          <div class="container" v-if="getListaDoctoresOrganizacion === null">
            <div
              class="mt-3"
              style="padding:50px; align-content: center; text-align: center; background:pink"
            >
              <h4>NO CUENTA CON DOCTORES REGISTRADOS</h4>
            </div>
          </div>
          <div class="lista-doctor">
            <div class="doctores">
              <ul style="list-style:none">
                <li
                  v-for="(element, index) of getListaDoctoresOrganizacion"
                  :key="index"
                >
                  <div class="row doctor">
                    <div class="col-md-8">
                      <div class="row">
                        <div class="col-md-4">
                          <div class="foto">
                            <img
                              class="foto-img"
                              v-if="element.genero == 'masculino'"
                              src="../assets/doctor.png"
                              alt=""
                            />
                            <img
                              class="foto-img"
                              v-if="element.genero == 'femenino'"
                              src="../assets/doctora.png"
                              alt=""
                            />
                          </div>
                        </div>
                        <div class="col-md-8">
                          <p>
                            <strong>Nombre: </strong> {{ element.name }}
                            {{ element.lastname }}
                          </p>
                          <p><strong>DNI: </strong> {{ element.dni }}</p>
                          <p><strong>Correo:</strong> {{ element.email }}</p>
                          <p>
                            <strong>Celular: </strong> {{ element.celular }}
                          </p>
                          <p>
                            <strong>Especialidad: </strong>
                            {{ element.especialidad.especialidad }}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-4 botones">
                      <div>
                        <button
                          class="btn  btn-lg btn-eliminar"
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
        </div>
      </div>
      <simplert :useRadius="true" :useIcon="true" ref="simplert"> </simplert>
      <br />
    </div>
  </div>
</template>

<script>
import Simplert from "@/components/Simplert.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "ListaDoctores",
  components: {
    Simplert,
  },
  data() {
    return {
      doctoresDatos: null,
    };
  },
  methods: {
    //LLAMAMOS A LA CONSULTA DE LISTAR  DOCTORES EN ORGANIZACION JS
    ...mapActions(["listarDoctores", "eliminarDoctorOrg"]),
    //ABRE MODAL DE CONFIRAMCIÓN DE ELIMINACIÓN
    abrirEliminación(doctor) {
      this.doctoresDatos = doctor;
      this.$refs.simplert.openSimplert({
        title: "CONFIRMAR ELIMINACIÓN",
        message: "¿Seguro que desea proceder con la eliminación?",
        type: "info",
        useConfirmBtn: true,
        onConfirm: this.eliminarDoctor,
      });
    },
    //LLAMA A ELIMINAR DOCTOR DE ORGANZIACION DE ORGANIZACION.JS
    eliminarDoctor() {
      console.log(this.doctoresDatos);
      let datos = {
        doctor: this.getUsuario,
        id_doctor: this.doctoresDatos._id,
      };
      this.eliminarDoctorOrg(datos).then((res) => {
        this.$refs.simplert.openSimplert(this.getMensajeOrganizacion);
        this.listarDoctores(this.getUsuario);
      });
    },
  },
  computed: {
    //LLAMAMOS A EL ID Y TOKEN DE ORGANIZACION Y SU LISTA DE DOCTORES
    ...mapGetters([
      "getUsuario",
      "getListaDoctoresOrganizacion",
      "getMensajeOrganizacion",
    ]),
  },
  mounted() {
    $("#sidebarCollapse").on("click", function() {
      $("#sidebar, #content").toggleClass("active");
      $(".collapse.in").toggleClass("in");
      $("a[aria-expanded=true]").attr("aria-expanded", "false");
    });
    console.log(this.getUsuario);
    this.listarDoctores(this.getUsuario);
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
  margin-top: 35px;
  text-align: center;
  background: #0099a1;
}

.foto {
  text-align: center;
  background: rgb(192, 192, 192);
  height: 150px;
  border-radius: 15px;
}

.foto-img{
  width: 130px;
  height: 100%;
  object-fit: cover;
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
  margin-bottom: 10px;
  margin-top: 20px;
  color: white;
}
.btn-editar:hover {
  background: rgb(43, 161, 43);
}

.btn-eliminar {
  width: 150px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  color: white;
  background: rgb(211, 65, 65);
  margin-bottom: 10px;
  margin-top: 20px;
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
