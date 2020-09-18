<template>
  <modal
    name="mod-historial-medico"
    transition="pop-out"
    :width="750"
    :focus-trap="true"
    :height="650"
  >
    <div class="titulo">
      <h5>HISTORIAL MÉDICO</h5>
    </div>
    <div class="modal-content">
      <div class="fecha">
        <div class="row">
          <div class="col-md-4">
            <date-picker
              class="calendar"
              value-type="DD/MM/YYYY"
              v-model="fechaInicio"
              @change="deshabilitarDia(fechaInicio)"
            ></date-picker>
          </div>
          <div class="col-md-4">
            <date-picker
              class="calendar"
              value-type="DD/MM/YYYY"
              v-model="fechaFin"
              :default-value="new Date()"
              :disabled-date="diaMin"
            ></date-picker>
          </div>
          <div class="col-md-4">
            <button class="btn botonBuscar" @click="buscarHistorial">
              Buscar
            </button>
          </div>
        </div>
      </div>
      <div class="boton">
        <button
          type="submit"
          class="btn botonSalir"
          @click="$modal.hide('mod-historial-medico')"
        >
          Salir
        </button>
      </div>
    </div>
  </modal>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "ModHistorialMedico",
  data() {
    return {
      fechaInicio: "",
      fechaFin: "",
      fechaMin: new Date(),
    };
  },
  methods: {
    deshabilitarDia(date) {
      this.fechaFin=""
      let pattern = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
      let arrayDate = date.match(pattern);
      let dt = new Date(arrayDate[3], arrayDate[2] - 1, arrayDate[1]);
      this.fechaMin  = dt;
      console.log(dt)
    },

    diaMin(date){
         return date < this.fechaMin;
    },

    buscarHistorial(){
        console.log(this.fechaInicio,this.fechaFin)
    }
  },
};
</script>

<style lang="scss" scoped>
.modal-content {
  height: 590px;
  width: 750px;
  padding: 30px;
  background-color: #e4f9fa;
  box-shadow: 0 0 10px 0px rgb(39, 39, 39);
}
.titulo {
  text-align: center;
  height: 60px;
  padding: 20px;
  background: #0099a1;
  color: white;
}
.fecha {
  padding-top: 20px;
  padding-left: 10px;
  text-align: center;
  box-shadow: 0 0 10px 0px rgb(39, 39, 39);
  height: 80px;
  width: 100%;
  background: #01c0ca;
  .botonBuscar {
    box-shadow: 0 0 7px 0px rgb(105, 110, 110);
    color: #000;
    background-color: #54c7c7;
    width: 130px;
    font-weight: bold;
    &:hover {
      background-color: #2aafaf;
    }
  }
}

label {
  font-weight: 500;
  padding: 7px;
}

.boton {
  bottom: 30px;
  position: absolute;
  right: 30px;
  .botonSalir {
    box-shadow: 0 0 7px 0px rgb(105, 110, 110);
    margin: 5px;
    color: #000;
    background-color: #54c7c7;
    width: 130px;
    font-weight: bold;
    &:hover {
      background-color: #2aafaf;
    }
  }
}

textarea {
  resize: none !important;
  background-color: rgba(243, 243, 243, 0.92);
}

.pop-out-enter-active,
.pop-out-leave-active {
  transition: all 0.5s;
}

.pop-out-enter,
.pop-out-leave-active {
  opacity: 0;
  transform: translateY(24px);
}
</style>
