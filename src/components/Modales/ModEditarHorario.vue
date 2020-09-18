<template>
  <modal
    name="mod-editar-horario"
    transition="pop-out"
    :width="700"
    :focus-trap="true"
    :height="150"
  >
    <div class="modal-contenido">
      <div class="agregar-Horario">
        <form
          @submit.prevent="
            abrirEdicion({
              fecha: fecha,
              hora_inicio: hora_inicio,
              hora_fin: hora_fin,
            })
          "
        >
          <div class="row">
            <div class="col-md-4 mt-2">
              <h6>FECHA</h6>
              <date-picker
                class="calendar"
                value-type="DD/MM/YYYY"
                v-model="fecha"
                :disabled-date="disabledBeforeTodayAndAfterAWeek"
                :lang="lang"
              ></date-picker>
            </div>
            <div class="col-md-4 mt-2">
              <h6>HORA</h6>
              <select
                class="form-control"
                v-model="horario"
                @change="elegirHorario(horario)"
              >
                <option disabled value="">Seleccione horario</option>
                <option
                  v-for="(element, id) in getHorariosDisponibles"
                  :key="id"
                  v-bind:value="element.value"
                >
                  {{ element.text }}
                </option>
              </select>
            </div>
            <div class="col-md-4 mt-2">
              <button class="btn btn-lg agregar" :disabled="getCargaDoctor">
                Editar
              </button>
              <button
                class="btn btn-lg cerrar"
                type="button"
                @click="$modal.hide('mod-editar-horario')"
              >
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
        </form>
      </div>
      <simplert :useRadius="true" :useIcon="true" ref="simplert"> </simplert>
    </div>
  </modal>
</template>

<script>
import Simplert from "@/components/Simplert.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "ModEditarHorario",
  components: {
    Simplert,
  },
  data() {
    return {
      lang: {
        formatLocale: {
          firstDayOfWeek: 1,
        },
        monthBeforeYear: false,
        range: true,
      },
      fecha: null,
      horario: "",
      hora_inicio: "",
      hora_fin: "",
      horarioModificado: null,
    };
  },
  methods: {
    ...mapActions(['modificarHorarioDoctor',"listarHorariosDoctor"]),
    //DESHABILITA LOS DIAS ANTES DE LA SEMANA PRESENTE
    disabledBeforeTodayAndAfterAWeek(date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return (
        date < new Date(today.getTime() + 1 * 24 * 3600 * 1000) || date > new Date(today.getTime() + 8 * 24 * 3600 * 1000)
      );
    },
    //ELIGE EL INICIO Y FIN DE LA HORA
    elegirHorario(hora) {
      console.log(hora);
      this.getHorariosDisponibles.forEach((element) => {
        if (hora === element.value) {
          this.hora_inicio = element.inicio;
          this.hora_fin = element.fin;
          console.log(this.hora_inicio);
        }
      });
    },
    //ABRIR MODAL DE CONFIRMACION DE EDICION 
    abrirEdicion(element) {
      if (element.fecha == null || element.hora_inicio == "") {
        this.$refs.simplert.openSimplert(this.getMensajeAdvertencia);
      } else {
        this.horarioModificado = element;
        this.getMensajeEditar.onConfirm = this.editarHorario;
        this.$refs.simplert.openSimplert(this.getMensajeEditar);
      }
    },
    editarHorario() {
      
      this.horarioModificado.horario_id = this.getDatosHorario._id
      console.log("editar", this.horarioModificado);
      let datos = {
        newHorario: this.horarioModificado,
        doctor: this.getUsuario
      }
      console.log(datos)
      this.modificarHorarioDoctor(datos)
      .then((res)=>{
        this.$refs.simplert.openSimplert(this.getMensajeDoctor);
        this.listarHorariosDoctor(this.getUsuario)
      })

    },
  },

  computed: {
    ...mapGetters([
      "getMensajeDoctor",
      "getHorariosDisponibles",
      "getCargaDoctor",
      "getMensajeEditar",
      "getMensajeAdvertencia",
      "getDatosHorario",
      "getUsuario",
    ]),
  },
};
</script>

<style lang="scss" scoped>
.modal-contenido {
  height: 300px;
  .agregar-Horario {
    border-radius: 10px;
    text-align: center;
    padding: 30px;
    background: white;
    margin: 0 0 50px 0;
    .agregar {
      color: white;
      background: rgb(75, 197, 75);
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
      margin: 10px;
      &:hover {
        background: rgb(43, 161, 43);
      }
    }
    .cerrar {
      color: white;
      background: rgb(211, 65, 65);
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
      margin: 10px;
      &:hover {
        background: rgb(199, 21, 21);
      }
    }
  }
}
</style>
