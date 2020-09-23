<template>
  <modal
    name="mod-editar-cita"
    transition="pop-out"
    :width="750"
    :focus-trap="true"
    :height="370" 
  >
    <div class="editar" v-if="getListaHorariosDoctor !=null">
      <div class="titulo">
        <h3>Editar Cita pendiente</h3>
      </div>
      <div class="datos">
        <form
          @submit.prevent="
            abrirEditarCita({
              especialidad: getDatosCita.especialidad.especialidad,
              fecha: rango,
              hora_inicio: horas.hora_inicio,
              hora_fin: horas.hora_fin,
              _iddoctor: getDatosCita.doctor._id,
              id_cita: getDatosCita._id,
            })
          "
        >
          <div class="form-row ">
            <div class="form-group col-md-6">
              <div class="row mr-1">
                <div class="col-4">
                  <label for="inputEspecialidad">Tipo paciente</label>
                </div>
                <div class="col-8">
                  <select
                    id="inputState"
                    class="form-control"
                    v-model="tipopaciente"
                    disabled
                  >
                    <option disabled value="">Seleccione Paciente</option>
                    <option value="titular">Paciente titular</option>
                    <option value="familiar">Paciente familiar</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="form-group col-md-6">
              <div class="row mr-1">
                <div class="col-4">
                  <label for="inputDoctor">Familiar</label>
                </div>
                <div class="col-8">
                  <select
                    style="text-transform: uppercase;"
                    id="inputDoctor"
                    class="form-control"
                    v-model="idFamiliar"
                    :disabled="tipopaciente != 'familiar'"
                  >
                    <option disabled value="">Seleccionar Familiar</option>
                    <option
                      v-for="(item, index) in getListFamiliares"
                      :key="index"
                      v-bind:value="item._id"
                    >
                      {{ item.name }} {{ item.lastname }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="form-row ">
            <div class="form-group col-md-6">
              <div class="row mr-1">
                <div class="col-4">
                  <label for="inputEspecialidad">Doctor</label>
                </div>
                <div class="col-8">
                  <input
                    type="text"
                    class="form-control"
                    disabled
                    v-model="getDatosCita.doctor.lastname"
                  />
                </div>
              </div>
            </div>
            <div class="form-group col-md-6">
              <div class="row mr-1">
                <div class="col-4">
                  <label for="inputDoctor">Especialidad</label>
                </div>
                <div class="col-8">
                  <input
                    type="text"
                    class="form-control"
                    disabled
                    v-model="getDatosCita.especialidad.especialidad"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="form-row ">
            <div class="form-group col-md-6">
              <div class="row mr-1">
                <div class="col-4">
                  <label for="inputFecha">Fecha</label>
                </div>
                <div class="col-8">
                  <select
                    id="inputFecha"
                    class="form-control"
                    v-model="rango"
                    @change="setHorario(rango)"
                  >
                    <option disabled value="">Seleccionar fecha</option>
                    <option
                      v-for="(item, index) in getDia"
                      :key="index"
                      v-bind:value="item"
                    >
                      {{ item }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div class="form-group col-md-6">
              <div class="row mr-1">
                <div class="col-4">
                  <label for="inputHora">Hora</label>
                </div>
                <div class="col-8">
                  <select id="inputFecha" class="form-control" v-model="horas">
                    <option disabled value="">Seleccionar Horario</option>
                    <option
                      v-for="(item, index) in horarios"
                      :key="index"
                      v-bind:value="item"
                    >
                      {{ item.hora_inicio }} - {{ item.hora_fin }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div class="botones">
            <button class="btn btn-md boton-editar">Editar</button>
            <button
              class="btn btn-md boton-cerrar"
              type="button"
              @click="$modal.hide('mod-editar-cita')"
            >
              Salir
            </button>
          </div>
        </form>
      </div>
      <simplert :useRadius="true" :useIcon="true" ref="simplert"> </simplert>
    </div>
  </modal>
</template>

<script>
import Simplert from "@/components/Simplert.vue";
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "ModEditarCita",
  components: {
    Simplert,
  },
  data() {
    return {
      cita: null,
      tipopaciente: "titular",
      idFamiliar: "",
      horarios: [],
      rango: "",
      horas: {},
    };
  },
  methods: {
    ...mapActions(["actualizarCitaPaciente","listCitas","listarHorariosDoctor"]),
    //VERIFICA SI LOS DATOS ESTAN VACIOS
    camposVacios(element) {
      for (const e in element) {
        if (element[e] == "" || element[e] == null) {
          return true;
        }
      }
    },
    //MOSTRAR LAS FECHAS
    setHorario(rango) {
      console.log(rango);
      this.horarios = [];
      this.rango = rango;
      this.getListaHorariosDoctor.forEach((element) => {
        if (this.rango == element.fecha) {
          this.horarios.push(element);
        }
      });
    },
    //MODAL PARA EDITAR LA CITA
    abrirEditarCita(element) {
      if(this.camposVacios(element)){
        this.$refs.simplert.openSimplert(this.getMensajeAdvertencia);
      }else{
        this.cita = element;
        this.getMensajeEditar.onConfirm = this.editarCita;
        this.$refs.simplert.openSimplert(this.getMensajeEditar);
      }
    },
    //LLAMA A EDITAR CITA DE PACIENTE.JS
    editarCita() {
      let datos = {
        paciente: this.getUsuario,
        cita: this.cita,
      };
      console.log("cita", this.cita);
      console.log(this.getDatosCita);
      this.actualizarCitaPaciente(datos).then((res) => {
        this.$refs.simplert.openSimplert(this.getMensaje);
        this.horarios = [];
        this.rango = ""
        this.listarHorariosDoctor({id:this.getDatosCita.doctor._id})
        this.listCitas(this.getUsuario)
      });
    },
  },
  computed: {
    ...mapGetters([
      "getListFamiliares",
      "getUsuario",
      "getMensaje",
      "getCarga",
      "getMensajeEditar",
      "getDatosCita",
      "getDia",
      "getListaHorariosDoctor",
      "getMensajeAdvertencia"
    ]),
  },
};
</script>

<style lang="scss" scoped>
.editar {
  height: 370px;
  width: 750px;
}
.titulo {
  background-color: #0099a1;
  padding: 15px 0 15px 0;
  h3 {
    color: white;
    text-align: center;
  }
}

.datos {
  padding: 25px 15px 25px 15px;
}

.botones {
  text-align: center;
  padding: 15px 0 0 0;
  .boton-editar {
    width: 100px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    color: white;
    background: rgb(75, 197, 75);
    margin: 0 5px 0 5px;
    &:hover {
      background: rgb(43, 161, 43);
    }
  }
  .boton-cerrar {
    width: 100px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    color: white;
    background: rgb(211, 65, 65);
    margin: 0 5px 0 5px;
    &:hover {
      background: rgb(199, 21, 21);
    }
  }
}
</style>
