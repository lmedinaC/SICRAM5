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
      <br>
      <div class="contenido">
        <div class="container"
        style="box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); background:white;"> 
          <div
            class="row "
            style="background:#0099a1; height:60px; align-content: center;"
          >
            <div class="col-12 text-center">
              <h3 style="color:white">Mis Citas pendientes</h3>
            </div>
          </div>
          <table class="table table-striped table-hover mt-4"
          style="border-style: solid; border-width: 2px; border-color: #f2f2f2;"
          v-if="getListaCitasDoctor!=null">
          <thead class="text-center">
            <tr>
              <th scope="col">Fecha</th>
              <th scope="col">Rango Hora</th>
              <th scope="col">Paciente</th>
              <th scope="col">Estado</th>
              <th scope="col">Acción</th>
            </tr> 
          </thead>
          <tbody class="text-center">
            <tr v-for="(element, index) in getListaCitasDoctor" :key="index">
              <td>{{ element.horario.fecha }}</td>
              <td>{{ element.horario.hora_inicio}} - {{ element.horario.hora_fin }}</td>
              <td>{{ element.user.name }} {{ element.user.lastname }}</td>
              <td>{{ element.estado }}</td>
              <td >
                <div class="boton-group">
                  <button class="btn btn-success  mr-2"
                  @click="cargar({aulaVirtual: element.aulaVirtual, dni_paciente:element.user.dni,  name: element.user.name, lastname: element.user.lastname, doctor: getUsuario, id : element._id , id_paciente : element.user._id})">Ingresar</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="container" v-if="getListaCitasDoctor===null">
              <div class="mt-3" style="padding:50px; align-content: center; text-align: center; background:pink">
                  <h4>NO CUENTA CON CITAS PENDIENTES</h4>
              </div>
          </div>

        <br>
        </div>
        <simplert :useRadius="true" :useIcon="true" ref="simplert"> </simplert>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
//Impor component mensaje 
import Simplert from "@/components/Simplert.vue";
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
// Init plugin
Vue.use(Loading);
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  name: "CitaPendienteDoctor",
  data() {
    return {
      mensaje: "",
      usuario: "",
      datosUsuario: {},
      listaDeCitas: null,
      cita: null,
      loader: null
    };
  },
  components: {
    Simplert,
    Loading,
  },
  mounted() {
    $("#sidebarCollapse").on("click", function() {
      $("#sidebar, #content").toggleClass("active");
      $(".collapse.in").toggleClass("in");
      $("a[aria-expanded=true]").attr("aria-expanded", "false");
    });
    this.getCitas();
    console.log(this.listAtendida)
  },
  methods: {
    ...mapActions(['setObjCita','listarCitasDoctor',"ingresarCita"]),
    cargar(cita) {
      this.cita = cita
      this.ingresar()
      this.loader = this.$loading.show({
        // Optional parameters
        color: '#0099a1',
        container: this.fullPage ? null : this.$refs.formContainer,
        canCancel: false,
        loader: 'dots',
        height: 150,
        width: 130,
      });
    },
    getCitas() {
      this.listarCitasDoctor(this.getUsuario)
      console.log(this.getListaCitasDoctor)
    },

    //INGRESA A LA CITA
    ingresar(){
      this.ingresarCita(this.cita.id)
      .then((res)=>{
        this.loader.hide();
        if(res){
          this.setObjCita(this.cita)
          window.location.assign("/doctorvista/citadoctor")
        }else{
          this.$refs.simplert.openSimplert({
            title : "AVISO DE CITA",
            message: "No se encuentra en el horario de su cita.",
            type: "warning"
          });
        }
      })
      
    }

  },
  computed: {
    ...mapState(["usuarioDoctor","idDoctor"]),
    ...mapGetters(['getListaCitasDoctor','getUsuario']),
    listAtendida(){
      if(this.getListaCitasDoctor==null){
        this.listaDeCitas = null
      }else{
        this.listaDeCitas = []
        this.getListaCitasDoctor.forEach((element) => {
          if(element.estado == "pendiente"){
            this.listaDeCitas.push(element)
          }
        });
        if(this.listaDeCitas.length == 0) {
          console.log("lista vacia")
          this.listaDeCitas = null
        }
      }         
      return this.listaDeCitas
    }
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
