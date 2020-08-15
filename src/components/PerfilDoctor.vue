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
      <div class="contenido">
        <div class="">
          <div class="row justify-content-center">
            <div class="col-lg-3">
              <div class="foto">
                <img src="../assets/docs3.png" alt="" />
              </div>
            </div>
            <div class="col-lg-7">
              <div class="datos-personales ">
                <div class="row" style="margin-bottom:5px;"> 
                  <div class="col-5 valores font-weight-bold"> 
                    Nombres y apellidos
                  </div>
                  <div class="col-7 " style="text-transform: uppercase;">
                    {{datosUsuario.name}} {{datosUsuario.lastname}}
                  </div>
                </div>
                <div class="row" style="margin-bottom:5px;"> 
                  <div class="col-5 valores font-weight-bold"> 
                    DNI
                  </div>
                  <div class="col-7 ">
                    {{datosUsuario.dni}}
                  </div>
                </div>
                <div class="row" style="margin-bottom:5px;"> 
                  <div class="col-5 valores font-weight-bold"> 
                    Username
                  </div>
                  <div class="col-7 ">
                    {{datosUsuario.username}} 
                  </div>
                </div>
                <div class="row" > 
                  <div class="col-5 valores font-weight-bold"> 
                    Edad
                  </div>
                  <div class="col-7 ">
                    {{datosUsuario.edad}}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="contenido-sec">
          <div class="row justify-content-center">
            <div class="col-12 col-lg-10 seccion2">
              <div class="datos-profesionales h-100">
                <div class="row" style="margin-bottom:5px;"> 
                  <div class="col-5 valores font-weight-bold"> 
                    CMP
                  </div>
                  <div class="col-7 " style="text-transform: uppercase;">
                    {{datosUsuario.cmp}} 
                  </div>
                </div>
                <div class="row" style="margin-bottom:5px;"> 
                  <div class="col-5 valores font-weight-bold"> 
                    Especialidad
                  </div>
                  <div class="col-7 ">
                    {{datosUsuario.especialidad}}
                  </div>
                </div>
                <div class="row" style="margin-bottom:5px;"> 
                  <div class="col-5 valores font-weight-bold"> 
                    Profesión
                  </div>
                  <div class="col-7 ">
                    {{datosUsuario.profesion}} 
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "PerfilDoctor",
  data() {
    return {
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
    this.getDoctor();
  },
  methods: {
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
          this.datosUsuario.especialidad =this.datosUsuario.especialidad.especialidad;
        })
        .catch((e) => {
          this.mensaje = e.response.data.message;
          console.log(e);
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
  min-height: 96vh;
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

/*CSS PERFIL DOCTOR */
.foto {
  width: 100%;
  height: 100%;
  display: flex;
  margin-left: 20px;
}
.foto img {
  width: 200px;
  height: 100%;
  border-radius: 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  object-fit: cover;
}

.datos-personales {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  font-size: 18px;
  background: #f2f2f2;
  height: 180px;
  width: 100%;
  padding: 20px;
}
.datos-personales .valores {
  width: 100%;
  height: 100%;
}
.datos-personales .respuestas {
  width: 100%;
  height: 100%;
}

.datos-personales ul {
  list-style: none;
  padding-top: 25px;
}

.datos-personales ul li {
  display: block;
  margin: 4px;
}

.datos-profesionales {
  font-size: 18px;
  background: #f2f2f2;
  height: 200px;
  margin-top: 20px;
  width: 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  padding: 20px;
  padding-left: 50px ;
}

.datos-profesionales .valores {
  width: 100%;
  height: 100%;
}

.datos-profesionales .respuestas {
  width: 100%;
  height: 100%;
}
.datos-profesionales ul {
  padding-top: 20px;
}

.datos-profesionales ul li {
  display: block;
  margin: 5px;
}

@media (max-width: 768px) {
  .foto {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
  }
  .foto img {
    width: 300px;
    height: 300px;

    border-radius: 100%;
    box-shadow: 0 0 3px 3px #62bbe4;
    object-fit: cover;
    margin-bottom: 20px;
  }
  .datos-profesionales {
    
  }
}

@media (max-width: 375px) {
  .contenido {
    margin: 30px 0 30px 0;
    padding: 0;
  }
  .foto img {
    width: 100px;
    height: 100px;
  }
  .seccion1 {
    margin: 0;
    padding: 0;
  }
  .datos-personales {
    background: #f2f2f2;
    height: 180px;
    width: 380px;
  }
  .datos-personales .valores {
    width: 100%;
    height: 100%;
  }
  .datos-personales .respuestas {
    width: 100%;
    height: 100%;
  }

  .datos-personales ul {
    list-style: none;
    padding-top: 20px;
  }
  .datos-profesionales {
    width: 380px;
    height: 150px;
    
  }
  .seccion2 {
    position: relative;
    left: 16px;
  }

  .respuestas2 ul li {
    display: block;
    margin-bottom: 22px;
  }
}
</style>
