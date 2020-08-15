<template>
  <div style="text-align: right;">
    <nav id="nav">
      <div class="container-fluid">
        <div class="row">
          <!-- logotipo -->
          <div class="col-xl-2" style="font-weight: bold; color=#03a8f4d5;">
            <a href="/" class="logo" style="color:#00405ef3;">
              <i style="width:40px; " class="fas fa-user-md fa-2x"></i>
              SICRAM
            </a>
          </div>
          <!-- links de navegacion -->
          <div class="col-xl-10">
            <ul>
              <li :class="{ linked: this.$route.path === '/' }">
                <router-link to="/"
                  ><a style="color:#00405ef3; ">Inicio</a></router-link
                >
              </li>
              <li :class="{ linked: this.$route.path === '/login' }">
                <router-link to="/loginpaciente"
                  ><a style="color:#00405ef3;">INGRESAR</a></router-link
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  mounted() {
    $(document).on("scroll", function() {
      //sacamos el desplazamiento actual de la página
      var desplazamientoActual = $(document).scrollTop();
      //accedemos al control de "ir arriba"
      var controlArriba = $(".nav");
      //compruebo si debo mostrar el botón
      if (desplazamientoActual > 10) {
        var nav2 = document.getElementById("nav");

        nav2.style.cssText = "background-color: #f2f2f2;";
      }
      //controlo si debo ocultar el botón
      if (desplazamientoActual < 10) {
        var nav2 = document.getElementById("nav");

        nav2.style.cssText = "background-color: null";
      }
    });
  },
};
</script>

<style lang="scss" scoped>
@import "../css/main.css";
</style>

<style scoped>
/*Estilos de barra de navegacion*/

nav {
  width: 100%;
  background-color: transparent;
  padding: 10px 0px;
  position: fixed;
  border-bottom: 1px solid transparent;
  z-index: 100;
  transition: all 0.5s ease-in-out;
  text-align: right;
}
nav:hover {
  background: #f2f2f2;

  border-bottom: 1px solid rgba(6, 10, 15, 0.1);
  height: 65px;
}

nav:hover ul li a {
  color: rgba(73, 73, 73, 0.5);
}
nav .logo img {
  width: 100%;
  transition: all 0.5s ease-in-out;
}
nav ul {
  margin: 0px;
  margin-top: 8px;
  padding: 0px;
  text-align: right;
}
nav ul .linked a {
  color: #00405ef3 !important;
}
nav .linked a::after {
  width: 100%;
  background-color: #00405ef3;
}
nav ul li {
  display: inline-block;
  padding: 0px 10px;
}
nav ul li a {
  position: relative;
  text-decoration: none;
  font-size: 14px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.8);
  transition: all 0.5s ease-in-out;
}
nav ul li a:before {
  content: "";
  position: absolute;
  width: 100%;
  background-color: transparent;
  height: 1px;
  transition: all 0.5s ease-in-out;
}
nav ul li a:after {
  content: "";
  position: absolute;
  top: 100%;
  left: 0px;
  width: 0%;
  background-color: transparent;
  height: 1px;
  transition: all 0.5s ease-in-out;
}

nav ul li a:hover {
  text-decoration: none;
  color: #00405ef3;
}
nav ul li a:hover:before {
  width: 0%;
  background-color: #00405ef3;
}
nav ul li a:hover:after {
  width: 100%;
  background-color: #00405ef3;
}
.nav_overlay {
  background-color: white;
  border-bottom: 1px solid rgba(6, 10, 15, 0.1);
  padding: 25px 0px;
}
.nav_overlay .logo img {
  width: 80%;
}
.nav_overlay ul {
  margin-top: 8px;
}
.nav_overlay ul li a {
  color: rgba(73, 73, 73, 0.5);
}
</style>
