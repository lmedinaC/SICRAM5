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
              <img
                v-if="getDatosPaciente.genero == 'masculino'"
                class=""
                src="../assets/usuarioM.png"
                alt=""
              />
              <img
                v-if="getDatosPaciente.genero == 'femenino'"
                class=""
                src="../assets/usuarioH.png"
                alt=""
              />
            </div>

            <div class="col-sm-7 col-md-7 col-12 titulo">
              <h3 style="color:white; ">Actualizar datos Paciente</h3>
            </div>
          </div>

          <form
            @submit.prevent="
              actualizarPaciente({
                email: datosUsuario.email,
                discapacidad: datosUsuario.discapacidad,
                direccion: datosUsuario.direccion,
                edad: datosUsuario.edad,
                celular: datosUsuario.celular,
              })
            "
          >
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
                      id="inputNombre"
                      v-model="datosUsuario.name"
                      :disabled="true"
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
                      id="inputApellido"
                      v-model="datosUsuario.lastname"
                      :disabled="true"
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
                      type="text"
                      class="form-control"
                      id="inputDNI"
                      v-model="datosUsuario.dni"
                      :disabled="true"
                    />
                  </div>
                </div>
              </div>
              <div class="form-group col-md-6">
                <div class="row mr-1">
                  <div class="col-4">
                    <label for="inputEdad">Discapacidad</label>
                  </div>
                  <div class="col-8">
                    <input
                      type="text"
                      class="form-control"
                      v-model="datosUsuario.discapacidad"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="form-row ">
              <div class="form-group col-md-6">
                <div class="row mr-1">
                  <div class="col-4">
                    <label for="inputGenero">Correo</label>
                  </div>
                  <div class="col-8">
                    <input
                      type="text"
                      class="form-control"
                      id="Correo"
                      v-model="datosUsuario.email"
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
                      min="18"
                      type="number"
                      oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                      maxlength="3"
                      class="form-control"
                      id="inputCelular"
                      v-model="datosUsuario.edad"
                      max="120"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <div class="row mr-1">
                  <div class="col-4">
                    <label for="inputCMP">Celular</label>
                  </div>
                  <div class="col-8">
                    <input
                      oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                      maxlength="9"
                      type="number"
                      class="form-control"
                      v-model="datosUsuario.celular"
                    />
                  </div>
                </div>
              </div>
              <div class="form-group col-md-6">
                <div class="row mr-1">
                  <div class="col-4">
                    <label for="inputProfesion">Dirección</label>
                  </div>
                  <div class="col-8">
                    <input
                      type="text"
                      class="form-control"
                      id="inputProfesion"
                      v-model="datosUsuario.direccion"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="text-center boton-final">
              <a href="formPaciente.html"
                ><button
                  class="but btn btn-lg mt-4"
                  style="color:"
                  :disabled="getCarga"
                >
                  Actualizar
                </button></a
              >
            </div>
          </form>
        </div>
      </div>
      <simplert :useRadius="true" :useIcon="true" ref="simplert"> </simplert>
    </div>
  </div>
</template>

<script>
import Simplert from "@/components/Simplert.vue";
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "ActualizarPaciente",
  components: {
    Simplert,
  },
  data() {
    return {
      datosUsuario: {},
      mensajeError : null
    };
  },
  mounted() {
    $("#sidebarCollapse").on("click", function() {
      $("#sidebar, #content").toggleClass("active");
      $(".collapse.in").toggleClass("in");
      $("a[aria-expanded=true]").attr("aria-expanded", "false");
    });
    this.datosPaciente();
  },
  methods: {
    ...mapActions(["actualizarDatosPaciente"]),
    //VERIFICA CELULAR Y DNI
    camposIncorrectos(element) {
      console.log(element)
      var cel = element.celular.toString().length;
      console.log(cel)
        if (cel != 9) {
        this.mensajeError = {
          title: "CELULAR INVALIDO",
          message: "El número de celular debe tener 9 dígitos.",
          type: "warning",
        };
        return true;
      } 
    },
    //CAMPOS VACIOS
    camposVacios(element){
      for(const e in element){
        if(element[e] == "" || element[e]  == null){
          return true
        }
      }
    },
    //FUNCION PARA ACTUALIZAR AL PACIENTE
    actualizarPaciente(pacient) {
      if (this.camposVacios(pacient)) {
        this.$refs.simplert.openSimplert(this.getMensajeAdvertencia);
      }else if(this.camposIncorrectos(pacient)){
        this.$refs.simplert.openSimplert(this.mensajeError);
      }else{
          const datos = {
          paciente: this.getUsuario,
          newDatos: pacient,
        };
        //LLAMA A LA CONSULTADA ALMACENADA EN PACIENTE.JS
        this.actualizarDatosPaciente(datos).then((res) => {
          this.$refs.simplert.openSimplert(this.getMensaje);
        });
      }
    },
    datosPaciente() {
      this.datosUsuario = this.getDatosPaciente;
    },
  },
  computed: {
    ...mapGetters([
      "getDatosPaciente",
      "getUsuario",
      "getCarga",
      "getMensaje",
      "getMensajeAdvertencia",
    ]),
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
  background: white;
  border-radius: 100%;
  box-shadow: 0 0 3px 3px #62bbe4;
  object-fit: cover;
}
</style>
