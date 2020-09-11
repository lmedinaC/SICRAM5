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
      <br />
      <div class="contenido">
        <div
          class="container"
          style="box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); background:white;"
        >
          <div
            class="row "
            style="background:#0099a1; height:60px; align-content: center;"
          >
            <div class="col-12 text-center">
              <h3 style="color:white">Mi historial de Horarios </h3>
            </div>
          </div>
          <table
            class="table table-striped table-hover mt-4"
            style="border-style: solid; border-width: 2px; border-color: #f2f2f2;"
            v-if="getListaHorariosDoctor != null"
          >
            <thead class="text-center">
              <tr>
                <th scope="col">Fecha</th>
                <th scope="col">Hora inicio</th>
                <th scope="col">Hora fin</th>
                <th scope="col">Estado</th>
              </tr>
            </thead>
            <tbody class="text-center">
              <tr
                v-for="(element, index) in getListaHorariosDoctor"
                :key="index"
              >
                <td>{{ element.fecha }}</td>
                <td>{{ element.hora_inicio }}</td>
                <td>{{ element.hora_fin }}</td>
                <td>Ocupado</td>
              </tr>
            </tbody>
          </table>
          <div class="container" v-if="getListaHorariosDoctor === null">
            <div
              class="mt-3"
              style="padding:50px; align-content: center; text-align: center; background:pink"
            >
              <h4>NO CUENTA CON HORARIOS REGISTRADOS OCUPADOS</h4>
            </div>
          </div>

          <br />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "ModificarHorarioDoc",
  mounted() {
    $("#sidebarCollapse").on("click", function() {
      $("#sidebar, #content").toggleClass("active");
      $(".collapse.in").toggleClass("in");
      $("a[aria-expanded=true]").attr("aria-expanded", "false");
    });
    this.listarHorarios();
  },
  methods: {
    ...mapActions(["listarHorariosOcupadosDoctor"]),
    listarHorarios() {
      this.listarHorariosOcupadosDoctor(this.getUsuario);
    },
  },
  computed: {
    ...mapGetters(["getListaHorariosDoctor", "getUsuario"]),
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

/*MODIFICAR CSS */
.contenido {
  padding: 0 20px;
}
</style>
