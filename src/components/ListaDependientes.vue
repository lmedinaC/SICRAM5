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
            <div class="titulo">
              <h3 style="color:white;">Lista de Familiares</h3>
            </div>
          </div>
          <div class="container" v-if="datosUsuario.length!=0">
            <div class="row mt-4  ml-2 mr-2" 
            v-for="(element, index) in datosUsuario" 
            :key="index"
            style="border-style: solid; align-content: center; border: 1px solid #c3c3c3; padding-top: 15px; "
            > 
              <div class="col-lg-4">
                <div class="form-group barra" >
                  <div class="row">
                    <div class="col-5" >
                      <label for="inputNombre" >Nombres:</label>
                    </div>
                    <div class="col-7" style="text-transform: uppercase;">
                      {{element.name}}
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-5">
                      <label for="inputNombre">Apellidos:</label>
                    </div>
                    <div class="col-7" style="text-transform: uppercase;">
                      {{element.lastname}}
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="form-group barra" >
                  <div class="row">
                    <div class="col-5">
                      <label for="inputNombre">Edad:</label>
                    </div>
                    <div class="col-7">
                      {{element.edad}}
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-5">
                      <label for="inputNombre">DNI:</label>
                    </div>
                    <div class="col-7">
                      {{element.dni}}
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="form-group">
                  <div class="row">
                    <div class="col-5">
                      <label for="inputNombre">Discapacidad:</label>
                    </div>
                    <div class="col-7">
                      {{element.discapacidad}}
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-5">
                      <label for="inputNombre">Celular:</label>
                    </div>
                    <div class="col-7">
                      {{element.celular}}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br>
          </div>
          <div class="container" v-if="datosUsuario.length===0">
              <div class="mt-3" style="padding:50px; align-content: center; text-align: center; background:pink">
                  <h4>NO CUENTA CON FAMILIARES REGISTRADOS</h4>
              </div>
              <br>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Simplert from "@/components/Simplert.vue";
import { mapState } from "vuex";
export default {
  name: "ListaDependientes",
  components: {
    Simplert,
  },
  data() {
    return {
      mensajeRegistro: {},
      mensaje: "",
      usuario: "",
      datosUsuario: {},
    };
  },
  mounted() {
    $("#sidebarCollapse").on("click", function() {
      $("#sidebar, #content").toggleClass("active");
      $(".collapse.in").toggleClass("in");
      $("a[aria-expanded=true]").attr("aria-expanded", "false");
    });
    this.usuario = this.usuarioPaciente;
    this.cargarDependiente();
  },
  methods: {
    cargarDependiente() {
        let url = `https://sicramv1.herokuapp.com/api/user/dependiente/listar/${this.idPaciente}`;
        this.axios
          .get(
            url,
            {
              headers: {
                Authorization: `${this.usuario}`,
              },
            }
          )
          .then((res) => {  
              this.datosUsuario=res.data
          })
          .catch((e) => {
             console.log(e)
          });
      
    },
  },
  computed: {
    ...mapState(["usuarioPaciente", "idPaciente"]),
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
.barra{
    border-right: 1px solid #c3c3c3;
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
.barra{
    border-right: none;
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
