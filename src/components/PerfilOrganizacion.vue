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
      <div class="contenido" style="float:center">
        <div class="perfil">
          <div class="row">
            <div class="col-md-4 col-sm-12">
              <div class="foto-perfil">
                <img
                  class="foto-org"
                  src="../assets/hospital2.jpg"
                  alt=""
                />
              </div>
            </div>
            <div class="col-md-8 col-sm-12">
              <div class="contenido-perfil">
                <h3 class="titulo">DATOS DE LA ORGANIZACIÓN</h3>

                <div class="row mt-3">
                  <div class="col-md-4">
                    Nombre: 
                  </div>
                  <div class="col-md-8">
                    {{getDatosOrganizacion.nameOrg}}
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-md-4">
                    Correo Org:
                  </div>
                  <div class="col-md-8">
                    {{getDatosOrganizacion.email}}
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-md-4">
                    Dirección:
                  </div>
                  <div class="col-md-8">
                    {{getDatosOrganizacion.direccion}}
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-md-4">
                    RUC:
                  </div>
                  <div class="col-md-8">
                    {{getDatosOrganizacion.ruc}}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
    </div>
  </div>
</template>

<script>
import {  mapGetters } from "vuex";
export default {
  name: "PerfilOrganizacion",
  
  mounted() {
    $("#sidebarCollapse").on("click", function() {
      $("#sidebar, #content").toggleClass("active");
      $(".collapse.in").toggleClass("in");
      $("a[aria-expanded=true]").attr("aria-expanded", "false");
      
    });
  },
  computed: {
    ...mapGetters(['getDatosOrganizacion'])
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
  margin-top: 10px;
  margin-bottom: 30px;
}

.perfil {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  background: #f2f2f2;
  padding: 30px;
  padding-left: 10%;
  margin-top: 70px;
  margin-right: 100px;
  margin-left: 100px;
}

.contenido-perfil {

  margin-left: 50px;
   
}

.foto-perfil {
  height: 200px;
  width: 100%;
  border-style: solid;
  border-color: #75bec2;
  background: #ffffff;
}
.foto-org{
  width: 100%;
  height: 100%;
}

.boton-perfil {
  margin-top: 15px;
  width: 100%;
  background: #02c2cc;
  border-radius: 0px;
  color: white;
}

.boton-perfil:hover {
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

}
@media (max-width: 425px) {
  .foto img {
    display: none;
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
