<template>
  <div>
    <header>
      <nav id="menu-principal">
        <router-link to="/login"><a class="boton-primario">Ingresar</a></router-link>
      </nav>

      <div class="icono-menu">
        <i class="fas fa-bars"></i>
      </div>

      <nav id="menu-lateral">
        <div class="enlaces-header" id="enlaces"> 
          <ul class="list-unstyled text-left">
            <li>
              <a href="/">Inicio</a>
            </li>
            <li class="dropdown">
              <a
                href="#PerfilSubmenu"
              v-b-toggle.collapse-1
              data-toggle="collapse"
              aria-expanded="false"
              class="dropdown-toggle"
                >Registrarse</a
              >
              <b-collapse id="collapse-1">
              <ul class="list-unstyled" id="PerfilSubmenu">
                <li>
                  <a href="#"
                    >Médico</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    
                    >Paciente</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    
                    >Organización</a
                  >
                </li>
              </ul>
            </b-collapse>
            </li>

            <li>
              <a href="loginDoctor.html">Ingresar</a>
            </li>
          </ul>
        </div>
      </nav>

      <section class="textos-header">
        <h1 style="color:white;text-shadow: 2px 2px 8px black; ">Atención médica</h1>
        <h2 style="color:black;"><strong>En la comodidad de tu hogar</strong></h2>
      </section>
      <div class="wave" style="height: 150px; overflow: hidden;">
        <svg
          viewBox="0 0 500 150"
          preserveAspectRatio="none"
          style="height: 100%; width: 100%;"
        >
          <path
            d="M0.00,49.98 C150.00,150.00 349.20,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
            style="stroke: none; fill: #fff;"
          ></path>
        </svg>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: "Cabecera",
  mounted() {
    let menu = document.getElementById("enlaces");
    let hamburguesa = document.getElementsByClassName("icono-menu")[0];

    hamburguesa.addEventListener("click", function() {
      menu.classList.toggle("extra-clase");
    })(
      /* scroll custom */
      function($) {
        $(window).on("load", function() {
          $(".hola").mCustomScrollbar({
            theme: "rounded",
          });
        });
      }
    )(jQuery);
  },
};
</script>

<style scoped>
.icono-menu {
  cursor: pointer;
  position: fixed;
  color: black;
  font-size: 25px;
  top: 20px;
  left: 20px;
  background: #fff;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
  transform: scale(1);
  z-index: 10;
  transition: transform 0.5s;
}
.icono-menu:active {
  transform: scale(0.8);
}

#posicion {
  z-index: 5;
}

.enlaces-header {
  position: fixed;
  top: 80px;
  width: 180px;
  height: 100vh;
  display: flex;
  background: #0099a1;
  z-index: 5;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  clip-path: circle(0% at 0% 0%);
  transition: clip-path 0.6s;
  border-top-right-radius: 10px;
}
.extra-clase {
  clip-path: circle(150% at 0% 0%);
}
/*menu principal */
#menu-principal a:hover {
  text-decoration: none;
  color: white;
}

#menu-principal .boton-secundario:hover {
  text-decoration: underline;
}

/*menu lateral*/

#menu-lateral ul {
  width: 100%;
}
#menu-lateral ul li {
  width: 100%;
  border-bottom: 1px solid white;
}

#menu-lateral ul li a {
  font-size: 20px;
  width: 100%;
  display: block;
  padding: 8px 5px;
  font-weight: 400;
}

#menu-lateral .ules li a {
  font-size: 17px;
}

#menu-lateral ul li a:hover {
  background: #f4f4f4;
  color: #017479;
  text-decoration: none;
}

.dropdown-toggle::after {
  display: block;
  position: absolute;
  margin-top: 14px;
  right: 20px;
}

.contenedor {
  padding: 60px 0;
  width: 90%;
  max-width: 1000px;
  margin: auto;
  overflow: hidden;
}

.titulo {
  font-size: 30px;
  text-align: center;
  margin-bottom: 60px;
}

/* Header */

header {
  width: 100%;
  height: 620px;

  /* fallback for old browsers */
  background: url(../assets/teamMedicos.jpg);
  /* Chrome 10-25, Safari 5.1-6 */
  background: url(../assets/teamMedicos.jpg);
  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background-size: cover;
  background-attachment: fixed;
  position: relative;
  background-position: 100% 45%;
  background-repeat: no-repeat;
}

nav {
  padding: 20px 50px 0 0;
  height: 60px;
  width: 100%;
  text-align: right;
}

nav a {
  color: black;
  font-weight: 500;
  text-decoration: none;
  margin-right: 10px;
  padding: 5px 1px;
  font-size: 20px;
}

.boton-primario {
  background: rgba(0, 0, 0, 0.1);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
  padding: 5px 7px;
  border-radius: 10px;
  color: white;
}
.boton-primario:hover {
  background: #017479;
}

header .textos-header {
  display: flex;
  height: 430px;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.textos-header h1 {
  font-size: 70px;
  color: #fff;
}

.textos-header h2 {
  font-size: 30px;
  font-weight: 300;
  color: #fff;
}

.wave {
  position: absolute;
  bottom: 0;
  width: 100%;
}

/*QUERYS*/

@media (max-width: 900px) {
  header {
    background-position: center;
  }
}

@media (max-width: 700px) {
  .enlaces-header {
    width: 80%;
    font-size: 30px;
    text-align: left;
  }

  #menu-principal {
    display: none;
  }
}

@media (max-width: 454px) {
  .enlaces-header {
    width: 100%;
    font-size: 30px;
    text-align: center;
    background: hsl(209, 75%, 62%);
  }
  h1 {
    text-align: center;
    margin: 0 50px;
  }
  h2 {
    text-align: center;
  }
  #menu-lateral ul li a {
    text-align: center;
  }
}

/*formulario*/
.modal-title {
  text-align: center !important;
  font-weight: bold;
  display: inline-block;
  margin-left: auto;
  font-size: 25px;
  color: #025f8ace;
}
</style>
