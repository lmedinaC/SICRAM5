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
              <img src="../assets/hospital2.jpg" alt="" />
            </div>

            <div class="col-sm-7 col-md-7 col-12 titulo">
              <h3 style="color:white;">Actualizar datos</h3>
            </div>
          </div>

          <form
            @submit.prevent="
              actualizar({
                email: getDatosOrganizacion.email,
                nameOrg: getDatosOrganizacion.nameOrg,
                direccion: getDatosOrganizacion.direccion,
              })
            "
          >
            <div>
              <h5 class="subTitulo">Datos de la empresa</h5>
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
                        placeholder="Usuario organizacion"
                        v-model="getDatosOrganizacion.username"
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div class="form-group col-md-6 ">
                  <div class="row mr-1">
                    <div class="col-4">
                      <label for="inputApellido">Nombre:</label>
                    </div>
                    <div class="col-8">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Nombre Organización"
                        v-model="getDatosOrganizacion.nameOrg"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <div class="row mr-1">
                    <div class="col-4">
                      <label for="inputDNI">Direccion:</label>
                    </div>
                    <div class="col-8">
                      <input
                        placeholder="Direccion organización"
                        type="text"
                        class="form-control"
                        v-model="getDatosOrganizacion.direccion"
                      />
                    </div>
                  </div>
                </div>
                <div class="form-group col-md-6">
                  <div class="row mr-1">
                    <div class="col-4">
                      <label for="inputCMP">RUC</label>
                    </div>
                    <div class="col-8">
                      <input
                        type="number"
                        class="form-control"
                        id="inputCMP"
                        placeholder="Ruc organizacion"
                        v-model="getDatosOrganizacion.ruc"
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
                      <label for="inputGenero">Correo:</label>
                    </div>
                    <div class="col-8">
                      <input
                        type="email"
                        class="form-control"
                        placeholder="Correo organización"
                        v-model="getDatosOrganizacion.email"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="text-center boton-final">
              <a href="formPaciente.html"
                ><button class="but btn btn-lg mt-4" style="color:">
                  Actualizar
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
import Simplert from "@/components/Simplert.vue";
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  name: "ActualizarOrganizacion",
  components: {
    Simplert,
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(["actualizarOrganizacion"]),
    //LLAMA A ACTUALIZAR DATOS DE ORG EN ORGANIZACION.JS
    actualizar(org) {
      if (org.email == "" || org.nameOrg == "" || org.direccion == "") {
        this.$refs.simplert.openSimplert(this.getMensajeAdvertencia);
      } else {
        let datos = {
          organizacion: this.getUsuario,
          newOrganizacion: org,
        };
        //LLAMA A LA CONSULTA DE ACTUALIZAR
        this.actualizarOrganizacion(datos).then((res) => {
          //MUESTRA EL MENSAJE DE POSITIVO O NEGATIVO
          this.$refs.simplert.openSimplert(this.getMensajeOrganizacion);
        });
      }
    },
  },
  computed: { 
    ...mapGetters([
      "getDatosOrganizacion",
      "getUsuario",
      "getMensajeOrganizacion",
      "getMensajeAdvertencia",
    ]),
  },
  mounted() {
    $("#sidebarCollapse").on("click", function() {
      $("#sidebar, #content").toggleClass("active");
      $(".collapse.in").toggleClass("in");
      $("a[aria-expanded=true]").attr("aria-expanded", "false");
    });
    console.log(this.getDatosOrganizacion);
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
  background: white;
  box-shadow: 0 0 3px 3px #62bbe4;
  object-fit: cover;
}
</style>
