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
            <div class="foto col-sm-3  col-md-3 mt-2 mb-2 ">
              <img src="../assets/docs.png" alt="" />
            </div>

            <div class="col-sm-7 col-md-7 col-12 titulo">
              <h3 style="color:white;">Registro de Doctor</h3>
            </div>
          </div>

          <form @submit.prevent="
              cargar({
                username: doctor.username,
                password: doctor.password,
                email: doctor.email,
                name: doctor.name,
                lastname: doctor.lastname,
                dni: doctor.dni,
                edad: doctor.edad,
                celular: doctor.celular,
                cmp: doctor.cmp,
                profesion: doctor.profesion,
                especialidad: doctor.especialidad,
              })
            ">
            <div>
              <h5 class="subTitulo">Datos personales</h5>
            </div>
            <div class="datosPersonales">
              <div class="form-row ">
                <div class="form-group col-md-6">
                  <div class="row mr-1">
                    <div class="col-4">
                      <label for="inputNombre">Usuario:</label>
                    </div>
                    <div class="col-8">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Usuario Doctor"
                        v-model="doctor.username"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-row ">
                <div class="form-group col-md-6">
                  <div class="row mr-1">
                    <div class="col-4">
                      <label for="inputNombre">Nombres:</label>
                    </div>
                    <div class="col-8">
                      <input
                        style="text-transform: uppercase;"
                        type="text"
                        class="form-control"
                        placeholder="NOMBRE Doctor"
                        v-model="doctor.name"
                      />
                    </div>
                  </div>
                </div>
                <div class="form-group col-md-6 ">
                  <div class="row mr-1">
                    <div class="col-4">
                      <label for="inputApellido">Apellidos:</label>
                    </div>
                    <div class="col-8">
                      <input
                        style="text-transform: uppercase;"
                        type="text"
                        class="form-control"
                        placeholder="APELLIDO Doctor"
                        v-model="doctor.lastname"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <div class="row mr-1">
                    <div class="col-4">
                      <label for="inputDNI">DNI:</label>
                    </div>
                    <div class="col-8">
                      <input
                        maxlength="8"
                        type="number"
                        class="form-control"
                        id="inputDNI"
                        placeholder="DNI Doctor"
                        v-model="doctor.dni"
                      />
                    </div>
                  </div>
                </div>
                <div class="form-group col-md-6">
                  <div class="row mr-1">
                    <div class="col-4">
                      <label for="inputCMP">Celular:</label>
                    </div>
                    <div class="col-8">
                      <input
                        type="number"
                        class="form-control"
                        id="inputCMP"
                        placeholder="Celular Doctor"
                        v-model="doctor.celular"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-row ">
                <div class="form-group col-md-6">
                  <div class="row mr-1">
                    <div class="col-4">
                      <label for="inputGenero">Correo:</label>
                    </div>
                    <div class="col-8">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Correo Doctor"
                        v-model="doctor.email"
                      />
                    </div>
                  </div>
                </div>
                <div class="form-group col-md-6">
                  <div class="row mr-1">
                    <div class="col-4">
                      <label for="inputCelular">Edad</label>
                    </div>
                    <div class="col-8">
                      <input
                        type="number"
                        class="form-control"
                        placeholder="Edad Doctor"
                        v-model="doctor.edad"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <div class="row mr-1">
                    <div class="col-4">
                      <label for="inputCMP">Contraseña:</label>
                    </div>
                    <div class="col-8">
                      <input
                        type="password"
                        class="form-control"
                        placeholder="Cotraseña Doctor"
                        v-model="doctor.password"
                      />
                    </div>
                  </div>
                </div>
                <div class="form-group col-md-6">
                  <div class="row mr-1">
                    <div class="col-4">
                      <label for="inputCMP">Repita contraseña:</label>
                    </div>
                    <div class="col-8">
                      <input
                        type="password"
                        class="form-control"
                        placeholder="Contraseña Doctor"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h5 class="subTitulo">Datos profesionales</h5>
            </div>
            <!-- DATOS PROFESIONALES-->
            <div class="datosPersonales">
              <div class="form-row ">
                <div class="form-group col-md-6">
                  <div class="row mr-1">
                    <div class="col-4">
                      <label for="inputNombre">CMP:</label>
                    </div>
                    <div class="col-8">
                      <input
                        style="text-transform: uppercase;"
                        type="text"
                        class="form-control"
                        placeholder="CMP Doctor"
                        v-model="doctor.cmp"
                      />
                    </div>
                  </div>
                </div>
                <div class="form-group col-md-6 ">
                  <div class="row mr-1">
                    <div class="col-4">
                      <label for="inputApellido">Profesión:</label>
                    </div>
                    <div class="col-8">
                      <input
                        style="text-transform: uppercase;"
                        type="text"
                        class="form-control"
                        placeholder="Profesión Doctor"
                        v-model="doctor.profesion"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <div class="row mr-1">
                    <div class="col-4">
                      <label for="inputDNI">Especialidad:</label>
                    </div>
                    <div class="col-8">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Especialidad"
                        v-model="doctor.especialidad"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="text-center boton-final">
              <a href="formPaciente.html"
                ><button class="but btn btn-lg mt-4" type="submit"
                :disabled="getCargaOrganizacion">
                  Registrar
                </button></a
              >
            </div>
          </form>
        </div>
      </div>
      <simplert :useRadius="true" :useIcon="true" ref="simplert"> </simplert>
      <br />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
//Impor component mensaje 
import Simplert from "@/components/Simplert.vue";
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
// Init plugin
Vue.use(Loading);
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "AgregarDoctor",
  components: {
    Simplert,
    Loading,
  },
  data() {
    return {
      //ELEMENTOS PARA CARGAR
      fullPage: false,
      //MENSAJE DE ACEPTACION
      mensaje: {},
      doctor: {
        //datos de registro del doctor
        username: "",
        password: "",
        email: "",
        name: "",
        lastname: "",
        dni: "",
        edad: "",
        celular: "",
        cmp: "",
        profesion: "",
        especialidad: "",
      },
    };
  },
  methods: {
    ...mapActions(['agregarNuevoDoctor']),
    //METODOS LOADING
    cargar(doc) {
      this.setDoctor(doc)
      let loader = this.$loading.show({
        // Optional parameters
        color: '#0099a1',
        container: this.fullPage ? null : this.$refs.formContainer,
        canCancel: false,
        loader: 'dots',
        height: 150,
        width: 130,
      });
      // simulate AJAX
      setTimeout(() => {
        loader.hide();
        this.$refs.simplert.openSimplert(this.getMensajeOrganizacion);
      }, 4000);
    },

    //vacía las casillas despues de un registro
    vaciar() {
      this.doctor = {
        //datos de registro del doctor
        username: "",
        password: "",
        email: "",
        name: "",
        lastname: "",
        dni: "",
        edad: "",
        celular: "",
        cmp: "",
        profesion: "",
        especialidad: "",
      };
    },
    //REGISTRAR UN DOCTOR
    setDoctor(doc) {
        let datos = {
            newDoctor: doc,
            organizacion : this.getUsuario
        }
        //LLAMA A LA CONSULTA AGREGAR NUEVO DOCTOR DE ORGANIZACION.JS
        this.agregarNuevoDoctor(datos)
    },
  },
  computed: {
    ...mapGetters(['getUsuario','getMensajeOrganizacion','getCargaOrganizacion'])
  },
  mounted() {
    $("#sidebarCollapse").on("click", function() {
      $("#sidebar, #content").toggleClass("active");
      $(".collapse.in").toggleClass("in");
      $("a[aria-expanded=true]").attr("aria-expanded", "false");
    });
    document.getElementById("inputCMP").addEventListener("input", function() {
      if (this.value.length > 9) this.value = this.value.slice(0, 9);
    });
    document.getElementById("inputDNI").addEventListener("input", function() {
      if (this.value.length > 8) this.value = this.value.slice(0, 8);
    });
    
  },
};
</script>

<style scoped>
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
.titulo {
  margin-top: 35px;
  text-align: left;
  background: #0099a1;
}

.subTitulo {
  margin-top: 10px;
  margin-bottom: 30px;
}

.datosPersonales {
  background: #c6eff1;
  padding: 18px;
  border-radius: 10px;
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
  .foto img {
    display: none;
  }
  .titulo {
    margin-top: 10px;
    text-align: center;
    height: 60px;
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

.foto {
  width: 100%;
  height: 100%;
  display: flex;
  margin-left: 20px;
}
.foto img {
  width: 100px;
  height: 100%;

  border-radius: 100%;
  box-shadow: 0 0 3px 3px #62bbe4;
  object-fit: cover;
}
</style>
