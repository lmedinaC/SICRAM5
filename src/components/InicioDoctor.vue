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
        <div class="contenido-perfil ">
          <div class="perfil-label" style="text-transform: uppercase;">
            <h1>
              Bienvenido(a) a SICRAM
            </h1>
            <h2>
              {{ getDatosDoctor.name }}
              {{ getDatosDoctor.lastname }}
            </h2>
          </div>

          <div class="row justify-content-around"> 
            <div class="col-lg-12 imagen">
              <img class="" src="../assets/team.png" alt="" />
            </div>
          </div>
        </div>
        <p></p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "InicioDoctor",
  mounted() {
    $("#sidebarCollapse").on("click", function() {
      $("#sidebar, #content").toggleClass("active");
      $(".collapse.in").toggleClass("in");
      $("a[aria-expanded=true]").attr("aria-expanded", "false");
    });
  },
  computed: {
    ...mapGetters(['getDatosDoctor'])
  },
};
</script>

<style lang="scss" scoped>
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

/*INICIO */
.contenido {
  display: flex;
  justify-content: center;
  width: 100%;
  width: 100%;
}
.perfil-label {
  h1 {
  font-size: 50px;
  color: #0099a1;
  }
  text-align: center;
  margin-bottom: 50px;
}

.imagen {
  width: 600px;
  height: 320px;
  display: flex;
  flex-direction: column;
  align-items: start;
}

.imagen img {
  object-fit: cover;
  width: 600px;
  height: 320px;
}

.imagen p {
  line-height: 110%;
}

@media (max-width: 768px) {
  .perfil-label {
    h1 {
    font-size: 40px;
    }
    text-align: center;
  }
  .imagen {
    width: 100%;
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .imagen img {
    width: 300px;
    height: 300px;
  }
}

@media (max-width: 375px) {
  .contenido {
    height: 820px;
    display: flex;
    justify-content: center;
  }
  .imagen {
    height: 190px;
    width: 190px;
    font-size: 15px;
    margin-bottom: 10px;
  }
  .imagen img {
    height: 150px;
    width: 150px;
  }
}
</style>