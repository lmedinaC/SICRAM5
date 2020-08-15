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
              <img src="../assets/docs3.png" alt="" />
            </div>

            <div class="col-sm-7 col-md-7 col-12 titulo">
              <h3 style="color:white">Actualizar datos Paciente</h3>
            </div>
          </div>
          <form
            @submit.prevent="
              actualizarDoctor({
                email: datosUsuario.email,
                celular: datosUsuario.celular,
                edad: datosUsuario.edad
              })
            "
          >
            <div class="form-row ">
              <div class="form-group col-md-6">
                <div class="row mr-1">
                  <div class="col-4">
                    <label for="inputNombre">Nombres</label>
                  </div>
                  <div class="col-8">
                    <input
                      style="text-transform: uppercase;"
                      type="text"
                      class="form-control"
                      id="inputNombre"
                      v-model="datosUsuario.name"
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div class="form-group col-md-6 ">
                <div class="row mr-1">
                  <div class="col-4">
                    <label for="inputApellido">Apellidos</label>
                  </div>
                  <div class="col-8">
                    <input
                      style="text-transform: uppercase;"
                      type="text"
                      class="form-control"
                      id="inputApellido"
                      v-model="datosUsuario.lastname"
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="form-row ">
              <div class="form-group col-md-6">
                <div class="row mr-1">
                  <div class="col-4">
                    <label for="inputDNI">DNI</label>
                  </div>
                  <div class="col-8">
                    <input
                  type="text"
                  class="form-control"
                  id="inputDNI"
                  v-model="datosUsuario.dni"
                  disabled
                />
                  </div>
                </div>
              </div>
              <div class="form-group col-md-6 ">
                <div class="row mr-1">
                  <div class="col-4">
                    <label for="inputEdad">Edad</label>
                  </div>
                  <div class="col-8">
                    <input
                  type="text"
                  class="form-control"
                  id="inputEdad"
                  v-model="datosUsuario.edad"
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
                  id="inputEspecialidad"
                  v-model="datosUsuario.email"
                />
                  </div>
                </div>
              </div>
              <div class="form-group col-md-6 ">
                <div class="row mr-1">
                  <div class="col-4">
                    <label for="inputEspecialidad">Celular</label>
                  </div>
                  <div class="col-8">
                    <input
                  type="text"
                  class="form-control"
                  id="inputEspecialidad"
                  v-model="datosUsuario.celular"
                />
                  </div>
                </div>
              </div>
            </div>

            <div class="form-row ">
              <div class="form-group col-md-6">
                <div class="row mr-1">
                  <div class="col-4">
                    <label for="inputCMP">Cmp</label>
                  </div>
                  <div class="col-8">
                     <input
                  type="text"
                  class="form-control"
                  id="inputCMP"
                  v-model="datosUsuario.cmp"
                  disabled
                />
                  </div>
                </div>
              </div>
              <div class="form-group col-md-6 ">
                <div class="row mr-1">
                  <div class="col-4">
                    <label for="inputEspecialidad">Especialidad</label>
                  </div>
                  <div class="col-8">
                    <input
                  type="text"
                  class="form-control"
                  id="inputEspecialidad"
                  v-model="datosUsuario.especialidad"
                  disabled
                />
                  </div>
                </div>
              </div>
            </div>
            
            
            <div class="text-center boton-final">
              <button class="but btn  btn-lg mt-3" type="submit">
                Actualizar
              </button>
            </div>
          </form>
          <div class="row " style="background:#0099a1; height:60px; align-content: center;">
            <div class="col-12 text-center">
              <h3 style="color:white">Actualizar contraseña</h3>
            </div>
          </div>
          <form action="">
              <div class="form-row ">
              <div class="form-group col-md-6">
                <div class="row mr-1">
                  <div class="col-4">
                    <label for="inputNombre">Contraseña:</label>
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
                    <label for="inputApellido">Nueva Contraseña:</label>
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
          </form>
        </div>
      </div>
      <simplert :useRadius="true" :useIcon="true" ref="simplert"> </simplert>
    </div>
  </div>
</template>

<script>
import Simplert from "@/components/Simplert.vue";
import { mapState } from "vuex";
export default {
  name: "ActualizarDoctor",
  components: {
    Simplert,
  },
  data() {
    return {
      mensajeRegistro: {},
      mensaje: "",
      usuario: "",
      datosUsuario: {},
      actualizarUsuario:{}
    };
  },
  mounted() {
    $("#sidebarCollapse").on("click", function() {
      $("#sidebar, #content").toggleClass("active");
      $(".collapse.in").toggleClass("in");
      $("a[aria-expanded=true]").attr("aria-expanded", "false");
    });
    this.getDoctor();
  },
  methods: {
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

    actualizarDoctor(doctor) {
      this.actualizarUsuario = doctor
      let url = `https://sicramv1.herokuapp.com/api/doctor/perfil/update/${this.idDoctor}`;
        this.axios
          .post(
            url,
            { ...this.actualizarUsuario },
            {
              headers: {
                Authorization: `${this.usuario}`,
              },
            }
          )
          .then(res =>{
            this.mensajeRegistro = {
                title: "ACTUALIZACIÓN EXITOSA",
                message: "Se actualizó correctamente el perfil.",
                type: "success",
              };
            this.open2(this.mensajeRegistro);
            this.deshabilitar =false;
          })

          .catch(e=>{
            console.log(e)
            this.deshabilitar =false;
          })


    },
    getDoctor() {
      this.usuario = this.usuarioDoctor;
      let url =
        `https://sicramv1.herokuapp.com/api/doctor/perfil/${this.idDoctor}`;
      this.axios
        .get(url, {
          headers: {
            Authorization: `${this.usuario}`,
          },
        })
        .then((res) => {
          this.datosUsuario = res.data;
          this.datosUsuario.especialidad = this.datosUsuario.especialidad.especialidad;
        })
        .catch((e) => {
          this.mensaje = e.response.data.message;
        });
    },
  },
  computed: {
    ...mapState(["usuarioDoctor","idDoctor"]),
  },
};
</script>

<style scoped>
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
  min-height: 140vh;
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
  .titulo {
    margin-top: 35px;
    text-align: left;
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

/*css DOCTOR ACTUALIZAR */

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
.titulo {
  margin-top: 35px;
  text-align: left;
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
  .contenido {
    position: relative;
    margin-top: 50px;
  }
  #content .boton-menu {
    margin-right: 10px;
  }
  form {
    padding: 0;
    margin-top: 30px;
  }
  .btn {
    margin-bottom: 10px;
  }
  .titulo {
    margin-top: 0px;
    text-align: center;
    height: 80px;
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
