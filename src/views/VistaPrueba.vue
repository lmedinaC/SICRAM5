<template>
  <div>
    <div id="menuPaciente">
      <nav id="sidebar">
        <vue-custom-scrollbar class="scroll-area" :settings="settings">
          <div class="sidebar-header text-center">
            <a href="/" style="color:white;">
              <i class="fas fa-user-md fa-2x "></i>
              <p class="font-weight-bold">SICRAM</p>
            </a>
          </div>

          <ul class="list-unstyled components">
            <p class="m-0 ml-1">Paciente :</p>
            <p class="mb-1 ml-1 " style="text-transform: uppercase;">
              {{ getDatosPaciente.name }} {{ getDatosPaciente.lastname }}
            </p>

            <li class="active">
              <a
                href="#"
                v-b-toggle.collapse-1
                variant="info"
                @click="cambiarComponente('InicioPaciente')"
                ><i class="fa fa-home icono" aria-hidden="true"></i>Inicio</a
              >
            </li>

            <li class="">
              <a href="#PerfilSubmenu" v-b-toggle.collapse-2 variant="info"
                ><i class="fas fa-user fa-sm" style=" margin-right: 10px;"></i
                >Perfil</a
              >
              <b-collapse
                id="collapse-2"
                accordion="my-accordion"
                role="tabpanel"
              >
                <ul class="list-unstyled" id="PerfilSubmenu">
                  <li>
                    <a href="#" @click="cambiarComponente('PerfilPaciente')"
                      >Tu perfil</a
                    >
                  </li>
                  <li>
                    <a href="#" @click="cambiarComponente('ActualizarPaciente')"
                      >Actualizar datos</a
                    >
                  </li>
                </ul>
              </b-collapse>
            </li>

            <li class="">
              <a href="#dependienteSubmenu" v-b-toggle.collapse-3 variant="info"
                ><i class="fas fa-users fa-sm" style=" margin-right: 5px;"></i
                >Familiar</a
              >
              <b-collapse
                id="collapse-3"
                accordion="my-accordion"
                role="tabpanel"
              >
                <ul class="list-unstyled" id="dependienteSubmenu">
                  <li>
                    <a
                      href="#"
                      @click="cambiarComponente('RegistrarDependiente')"
                      >Registrar familiar</a
                    >
                  </li>
                  <li>
                    <a href="#" @click="cambiarComponente('ListaDependientes')"
                      >Listar familiar</a
                    >
                  </li>
                </ul>
              </b-collapse>
            </li>

            <li class="">
              <a href="#citasSubmenu" v-b-toggle.collapse-4 variant="info"
                ><i class="fa fa-calendar icono" aria-hidden="true"></i>Citas</a
              >
              <b-collapse
                id="collapse-4"
                accordion="my-accordion"
                role="tabpanel"
              >
                <ul class=" list-unstyled" id="citasSubmenu">
                  <li>
                    <a href="#" @click="cambiarComponente('NuevaCitaPaciente')"
                      >Nueva cita</a
                    >
                  </li>
                  <li>
                    <a
                      href="#"
                      @click="cambiarComponente('ActualizarCitaPaciente')"
                      >Citas Pendientes</a
                    >
                  </li>
                </ul>
              </b-collapse>
            </li>
            <li class="">
              <a href="#BuzonSubmenu" v-b-toggle.collapse-5 variant="info">
                <i class="fa fa-file icono" aria-hidden="true"></i>Buzón</a
              >
              <b-collapse
                id="collapse-5"
                accordion="my-accordion"
                role="tabpanel"
              >
                <ul class=" list-unstyled" id="BuzonSubmenu">
                  <li>
                    <a
                      href="#"
                      @click="cambiarComponente('CitaPendientePaciente')"
                      >Historial</a
                    >
                  </li>
                  <li>
                    <a href="#">---</a>
                  </li>
                </ul>
              </b-collapse>
            </li>

            <li>
              <a href="#" @click="cerrarSesion()"
                ><i class="fa fa-arrow-left icono" aria-hidden="true"></i>
                Salir</a
              >
            </li>
          </ul>
        </vue-custom-scrollbar>
      </nav>
    </div>
    <component v-bind:is="this.componenteVista"> </component>
  </div>
</template>

<script>
import vueCustomScrollbar from "vue-custom-scrollbar";
import MenuPaciente from "@/components/MenuPaciente.vue";
import InicioPaciente from "@/components/InicioPaciente.vue";
import PerfilPaciente from "@/components/PerfilPaciente.vue";
import ActualizarPaciente from "@/components/ActualizarPaciente.vue";
import ActualizarCitaPaciente from "@/components/ActualizarCitaPaciente.vue";
import NuevaCitaPaciente from "@/components/NuevaCitaPaciente.vue";
import RegistrarDependiente from "@/components/RegistrarDependiente.vue";
import ListaDependientes from "@/components/ListaDependientes.vue";
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  name: "VistaPrueba",
  data() {
    return {
      settings: {
        maxScrollbarLength: 50,
      },
      componente: "asdasdasd",
    };
  },
  components: {
    vueCustomScrollbar,
    InicioPaciente,
    PerfilPaciente,
    ActualizarPaciente,
    ActualizarCitaPaciente,
    NuevaCitaPaciente,
    RegistrarDependiente,
    ListaDependientes,
  },
  methods: {
    ...mapActions(["cambiarComponente", "cerrarSesion"]),
  },
  mounted() {
    $(document).ready(function() {
      $(document).keydown(function(tecla) {
        if (tecla.keyCode == 37) {
          if ($("#sidebar").hasClass("active") == false) {
            $("#sidebar, #content").toggleClass("active");
          }
        }
        if (tecla.keyCode == 39) {
          if ($("#sidebar").hasClass("active") == true) {
            $("#sidebar, #content").toggleClass("active");
          }
        }
      });
    });
  },
  computed: {
    ...mapState(["componenteVista"]),
    ...mapGetters(["getDatosPaciente"]),
  },
};
</script>

<style scoped>
@import "https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700";
.menuPaciente {
  display: flex;
  width: 100%;
}

p {
  font-family: "Poppins", sans-serif;
  font-size: 1.1em;
  font-weight: 300;
  line-height: 1.7em;
}
#sidebar {
  width: 150px;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 999;
  background: #0099a1;
  color: #fff;
  transition: all 0.3s;
}

#sidebar.active {
  margin-left: -150px;
}

#sidebar .sidebar-header {
  display: flex;
  flex-direction: column;
  padding: 15px 0 5px 0;
  background: #0099a1;
  align-items: center;
}

#sidebar ul.components {
  padding: 20px 0;
  border-bottom: 1px solid #0099a1;
  border-top: 1px solid #0099a1;
}

#sidebar ul p {
  color: whitesmoke;
  padding: 0 5px;
}

#sidebar ul li a {
  padding: 10px;
  font-size: 1.1em;
  display: block;
  text-decoration: none;
  color: white;
}

#sidebar ul li a:hover {
  background: #f2f2f2;
  color: #03b3bd;
}

#sidebar ul li.active > a,
a[aria-expanded="true"] {
  color: #ffffff;
  background: #028188;
}

a[data-toggle="collapse"] {
  position: relative;
}

.dropdown-toggle::after {
  display: block;
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
}

#sidebar ul ul a {
  font-size: 0.9em !important;
  padding-left: 25px !important;
  background: #01b3bd;
}

/*imagen*/
#sidebar-header img {
  width: 40px;
}

/*icono */
.icono {
  font-size: 15px;
  margin-right: 10px;
  font-weight: 300;
}

.scroll-area {
  position: relative;
  margin: auto;
  height: 600px;
}
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
    box-shadow: 0 0 6px #03a8f4d5;
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
</style>
