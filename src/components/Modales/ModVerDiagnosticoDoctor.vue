<template>
  <modal
    name="mod-ver-diagnostico-doctor"
    transition="pop-out"
    :width="700"
    :focus-trap="true"
    :height="650"
  >
    <div class="container modal-content">
      <div class="row">
        <div class="col-md-7">
          <div class="titulo">
            <h3>
              INFORME MÉDICO
            </h3>
          </div>
        </div>
        <div class="col-md-5 sicram">
          <img
            class="imagen"
            src="../../assets/iconoDoctor.png"
            alt="DoctorIcono"
          />
          SICRAM
          <p class="sistema">
            Sistema integral de citas, atencion medica para personas
            discapacitadas https://brave-borg-f78edb.netlify.app/
          </p>
        </div>
      </div>
      <div class="datos-personales"  v-if="getInformeDoctor != null">
        <div class="row">
          <div class="col-md-5">
            <div class="row">
              <div class="col-md-3">
                <label for="">DNI: </label>
              </div>
              <div class="col-md-9">
                <input
                  class="form-control"
                  type="text"
                  :disabled="true"
                  v-model="getInformeDoctor.dni"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-5">
            <label for="">NOMBRES Y APELLIDOS: </label>
          </div>
          <div class="col-md-7">
            <input
              v-model="getInformeDoctor.nombres_apellidos"
              style="text-transform: uppercase;"
              class="form-control"
              type="text"
              :disabled="true"
            />
          </div>
        </div>
      </div>
      <div class="informe" v-if="getInformeDoctor != null">
        <div class="row">
          <div class="col-md-3">
            <label for="">Anamnesis: </label>
          </div>
          <div class="col-md-9">
            <textarea
              disabled
              class="form-control"
              rows="2"
              resize="false"
              placeholder="Describa sus la anamnesis de su paciente..."
              v-model="getInformeDoctor.anamnesis"
            ></textarea>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col-md-3">
            <label for="">Tratamiento: </label>
          </div>
          <div class="col-md-9">
            <textarea
              disabled
              class="form-control"
              rows="2"
              resize="false"
              placeholder="Describa el tratamiento o cirugia de su paciente..."
              v-model="getInformeDoctor.tratamiento"
            ></textarea>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col-md-3">
            <label for="">Diagnóstico: </label>
          </div>
          <div class="col-md-9">
            <textarea
              disabled
              class="form-control"
              rows="2"
              resize="false"
              placeholder="Mencione el diagnóstico de su paciente..."
              v-model="getInformeDoctor.diagnostico"
            ></textarea>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col-md-3">
            <label for="">Última evolución: </label>
          </div>
          <div class="col-md-9">
            <textarea
              disabled
              class="form-control"
              rows="2"
              resize="false"
              placeholder="Describa la evolución de su paciente..."
              v-model="getInformeDoctor.resultados_labo"
            ></textarea>
          </div>
        </div>
      </div>
      <div>
        <div class="container" v-if="getInformeDoctor === null">
          <div
            class="mt-3"
            style="padding:50px; align-content: center; text-align: center; background:pink"
          >
            <h4>NO CUENTA CON UN INFORME REGISTRADO EN ESTA CITA.</h4>
          </div>
        </div>
      </div>
      <div class="boton">
        <button
          type="button"
          class="btn botonSalir"
          @click="$modal.hide('mod-ver-diagnostico-doctor')"
        >
          Salir
        </button>
      </div>
    </div>
  </modal>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  name: "ModVerDiagnosticoDoctor",
  components: {},
  data() {
    return {};
  },
  methods: {},
  computed: {
    ...mapGetters(["getInformeDoctor"]),
  },
};
</script>

<style lang="scss" scoped>
.modal-content {
  height: 650px;
  width: 700px;
  padding: 20px;
  background-color: #e4f9fa;
}
.titulo {
  text-align: center;
  padding: 20px 0 0 0;
}

.sicram {
  text-align: center;
  align-content: center;
  font-family: "Poppins", sans-serif;
  font-size: 1.7em;
  font-weight: 600;
  line-height: 1.7em;
  .sistema {
    color: #000;
    font-size: 0.4em;
    font-weight: 300;
    line-height: 1.1em;
  }
}
.imagen {
  width: 70px;
  height: 85px;
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
  background-color: rgba(255, 255, 255, 0.92);
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
