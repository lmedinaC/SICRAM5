<template>
  <modal
    name="mod-diagnostico"
    transition="pop-out"
    :width="700"
    :focus-trap="true"
    :height="650"
    @before-open="open"
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
      <div class="datos-personales">
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
                  v-model="getPacienteAtendido.user.dni"
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
              v-model="name"
              style="text-transform: uppercase;"
              class="form-control"
              type="text"
              :disabled="true"
            />
          </div>
        </div>
      </div>
      <form
        @submit.prevent="
          preguntarRegistro({
            diagnostico: diagnosticoPaciente.diagnostico,
            resultados_labo: diagnosticoPaciente.resultados_labo,
            tratamiento: diagnosticoPaciente.tratamiento,
            id_cita: getPacienteAtendido._id,
            anamnesis: diagnosticoPaciente.anamnesis,
          })
        "
      >
        <div class="informe">
          <div class="row">
            <div class="col-md-3">
              <label for="">Anamnesis: </label>
            </div>
            <div class="col-md-9">
              <textarea
                v-model="diagnosticoPaciente.anamnesis"
                class="form-control"
                rows="2"
                resize="false"
                placeholder="Describa la anamnesis de su paciente..."
              ></textarea>
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-md-3">
              <label for="">Tratamiento: </label>
            </div>
            <div class="col-md-9">
              <textarea
                v-model="diagnosticoPaciente.tratamiento"
                class="form-control"
                rows="2"
                resize="false"
                placeholder="Describa el tratamiento o cirugia de su paciente..."
              ></textarea>
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-md-3">
              <label for="">Diagnóstico: </label>
            </div>
            <div class="col-md-9">
              <textarea
                v-model="diagnosticoPaciente.diagnostico"
                class="form-control"
                rows="2"
                resize="false"
                placeholder="Mencione el diagnóstico de su paciente..."
              ></textarea>
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-md-3">
              <label for="">Última evolución: </label>
            </div>
            <div class="col-md-9">
              <textarea
                v-model="diagnosticoPaciente.resultados_labo"
                class="form-control"
                rows="2"
                resize="false"
                placeholder="Describa la evolución de su paciente..."
              ></textarea>
            </div>
          </div>
        </div>
        <div class="boton">
          <button
            class="btn botonSalir"
            type="submit"
            :disabled="getCargaDoctor"
          >
            Registrar
          </button>
          <button
            type="button"
            class="btn botonSalir"
            @click="$modal.hide('mod-diagnostico')"
          >
            Salir
          </button>
        </div>
      </form>
      <simplert :useRadius="true" :useIcon="true" ref="simplert"> </simplert>
    </div>
  </modal>
</template>

<script>
import Simplert from "@/components/Simplert.vue";
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  name: "ModDiagnostico",
  components: {
    Simplert,
  },
  data() {
    return {
      detalleSintomas: {},
      diagnosticoPaciente: {
        diagnostico: "",
        resultados_labo: "",
        tratamiento: "",
        anamnesis: "",
        id_cita: "",
      },
    };
  },

  methods: {
    ...mapActions(["sintomasDelPaciente", "registrarDiagnosticoPaciente"]),
    //VERIFICA SI LOS DATOS ESTAN VACIOS
    camposVacios(element) {
      for (const e in element) {
        if (element[e] == "" || element[e] == null) {
          return true;
        }
      }
    },
    //CADA VEZ QUE SE ABRE EL MODAL, PREGUNTA DENUEVO POR LOS SINTOMAS DEL PACIENTE
    open() {
      let datos = {
        id_cita: this.cita.id,
      };
      this.sintomasDelPaciente(datos);
    },
    preguntarRegistro(diagnostico) {
      if (this.camposVacios(diagnostico)) {
        this.$refs.simplert.openSimplert(this.getMensajeAdvertencia);
      } else {
        this.diagnosticoPaciente = diagnostico;
        this.$refs.simplert.openSimplert({
          title: "ADVERTENCIA DE INFORME",
          message:
            "Solo puede registrar un informe por cita. ¿Está seguro que desea registrarlo?",
          type: "info",
          useConfirmBtn: true,
          onConfirm: this.registrarDiagnostico,
        });
      }
    },
    //REGISTRAR EL DIAGNOSTICO DEL PACIENTE, LA CONSULTA ESTA EN DOCTOR.JS
    registrarDiagnostico() {
      let datos = {
        doctor: this.getUsuario,
        diagnostico: this.diagnosticoPaciente,
      };
      this.registrarDiagnosticoPaciente(datos).then((res) => {
        this.$refs.simplert.openSimplert(this.getMensajeDoctor);
      });
    },
  },
  computed: {
    ...mapGetters([
      "getPacienteAtendido",
      "getUsuario",
      "getMensajeDoctor",
      "getCargaDoctor",
      "getMensajeAdvertencia",
    ]),
    ...mapState(["cita"]),
    name() {
      return (
        this.getPacienteAtendido.user.name +
        " " +
        this.getPacienteAtendido.user.lastname
      );
    },
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
