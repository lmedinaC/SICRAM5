<template>
  <modal
    name="mod-detalle-sintomas-doctor"
    transition="pop-out"
    :width="600"
    :focus-trap="true"
    :height="550"
    @before-open="open"
  >
    <div class="container modal-content">
      <div class="titulo">
        <h5>DETALLE DE SINTOMAS</h5>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="row">
            <div class="col-md-4">
              <label for="">NOMBRE: </label>
            </div>
            <div class="col-md-8">
              <input
                style="text-transform: uppercase;"
                
                class="form-control"
                type="text"
                :disabled="true"
              />
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="row">
            <div class="col-md-4">
              <label for="">APELLIDO: </label>
            </div>
            <div class="col-md-8">
              <input
                style="text-transform: uppercase;"
                
                class="form-control"
                type="text"
                :disabled="true"
              />
            </div>
          </div>
        </div>
      </div>
      <div v-if="detalleSintomas.sintomas != undefined">
        <div class="descripcion-sintomas">
          <div class="col-md-12">
            <label class="descripcion" for="">
              Describa con el mayor detalle posible sus sintomas o molestias
              actuales.
            </label>
          </div>
          <div class="col-md-12">
            <textarea
              class="form-control"
              rows="5"
              resize="false"
              placeholder="Describa sus sintomas..."
              :disabled="true"
            ></textarea>
          </div>
        </div>
        <div class="descripcion-sintomas">
          <div class="row">
            <div class="col-md-6">
              <label class="descripcion" for="">
                ¿Ha tenido atención médica o ha recibido algún tratamiento
                médico en las últimas 24 hrs?
              </label>
              <div class="cbox">
                <input
                  
                  type="radio"
                  id="descripcionSi"
                  value="true"
                  :disabled="true"
                />
                <label for="descripcionSi">SI</label>
                <input
                  
                  type="radio"
                  id="descripcionNo"
                  value="false"
                  :disabled="true"
                />
                <label for="descripcionNo">NO</label>
              </div>
            </div>
            <div class="col-md-6">
              <div>
                <label class="descripcion" for="">
                  ¿Sufre de alguna alergia?
                </label>
              </div>
              <div class="cbox">
                <input
                  
                  type="radio"
                  id="alergiaSi"
                  value="true"
                  :disabled="true"
                />
                <label for="alergiaSi">SI</label>
                <input
                  
                
                  type="radio"
                  id="alergiaNo"
                  value="false"
                  :disabled="true"
                />
                <label for="alergiaNo">NO</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container" v-if="detalleSintomas.sintomas === undefined">
        <div
          class="mt-3"
          style="padding:50px; align-content: center; text-align: center; background:pink"
        >
          <h4>EL PACIENTE AÚN NO REGISTRA SUS SINTOMAS.</h4>
        </div>
      </div>
      <div class="boton">
        <button
          type="button"
          class="btn botonSalir"
          @click="$modal.hide('mod-detalle-sintomas-doctor')"
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
  name: "ModVerSintomas",
  data() {
    return {
      detalleSintomas: {},
    };
  },

  methods: {
    
    open() {
      
      if (this.detalleSintomas.sintomas === undefined) {
        this.detallarSintomas();
      }
    }, 
    detallarSintomas() {
      
    },
  },
  computed: {
  },
  mounted() {
    this.detallarSintomas();
  },
};
</script>

<style lang="scss" scoped>
.modal-content {
  height: 550px;
  width: 600px;
  padding: 30px;
  background-color: #e4f9fa;
}
.titulo {
  text-align: center;
  padding-bottom: 5px;
  text-decoration: underline;
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
.descripcion-sintomas {
  padding-top: 10px;
  padding-bottom: 10px;
}
.cbox {
  padding-left: 10px;
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
