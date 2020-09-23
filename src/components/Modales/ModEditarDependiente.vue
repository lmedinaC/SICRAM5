<template>
  <modal
    name="mod-editar-dependiente"
    transition="pop-out"
    :width="620"
    :focus-trap="true"
    :height="400"
  >
    <div class="editar" v-if="getDatosFamiliar != null">
      <div class="titulo">
        <h3>Editar datos Dependiente</h3>
      </div>
      <div class="datos">
        <form
          @submit.prevent="
            abrirEditarDependiente({
              id_dependiente: getDatosFamiliar._id,
              edad: getDatosFamiliar.edad,
              discapacidad: getDatosFamiliar.discapacidad,
              celular: getDatosFamiliar.celular,
              direccion: getDatosFamiliar.direccion,
              email: getDatosFamiliar.email,
            })
          "
        >
          <div class="form-row ">
            <div class="form-group col-md-6">
              <div class="row mr-1">
                <div class="col-4">
                  <label for="inputNombre">Nombres</label>
                </div>
                <div class="col-8">
                  <input
                    style="text-transform: uppercase;"
                    type="text"
                    class="form-control"
                    v-model="getDatosFamiliar.name"
                    disabled
                  />
                </div>
              </div>
            </div>
            <div class="form-group col-md-6 ">
              <div class="row mr-1">
                <div class="col-4">
                  <label for="inputApellido">Apellidos</label>
                </div>
                <div class="col-8">
                  <input
                    style="text-transform: uppercase;"
                    type="text"
                    class="form-control"
                    v-model="getDatosFamiliar.lastname"
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="form-row ">
            <div class="form-group col-md-6">
              <div class="row mr-1">
                <div class="col-4">
                  <label for="inputDNI">DNI</label>
                </div>
                <div class="col-8">
                  <input
                    type="text"
                    class="form-control"
                    v-model="getDatosFamiliar.dni"
                    disabled
                  />
                </div>
              </div>
            </div>
            <div class="form-group col-md-6 ">
              <div class="row mr-1">
                <div class="col-4">
                  <label for="inputEdad">Edad</label>
                </div>
                <div class="col-8">
                  <input
                    min="1"
                    max="120"
                    type="number"
                    class="form-control"
                    v-model="getDatosFamiliar.edad"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="form-row ">
            <div class="form-group col-md-6">
              <div class="row mr-1">
                <div class="col-4">
                  <label for="inputGenero">Género</label>
                </div>
                <div class="col-8">
                  <input
                    type="text"
                    class="form-control"
                    v-model="getDatosFamiliar.genero"
                    disabled
                  />
                </div>
              </div>
            </div>
            <div class="form-group col-md-6 ">
              <div class="row mr-1">
                <div class="col-4">
                  <label for="inputEspecialidad">Celular</label>
                </div>
                <div class="col-8">
                  <input
                    type="number"
                    class="form-control"
                    v-model="getDatosFamiliar.celular"
                    oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                    maxlength="9"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="form-row ">
            <div class="form-group col-md-6">
              <div class="row mr-1">
                <div class="col-4">
                  <label for="inputCMP">Discapacidad</label>
                </div>
                <div class="col-8">
                  <input
                    type="text"
                    class="form-control"
                    v-model="getDatosFamiliar.discapacidad"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="botones">
            <button class="btn btn-md boton-editar" :disabled="getCarga">
              Editar
            </button>
            <button
              class="btn btn-md boton-cerrar"
              type="button"
              @click="$modal.hide('mod-editar-dependiente')"
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
  name: "ModEditarDependiente",
  data() {
    return {
      familiar: null,
      mensajeError: null,
    };
  },
  components: {
    Simplert,
  },
  methods: {
    ...mapActions(["actualizarFamiliar"]),
    //VERIFICA CELULAR Y DNI
    camposIncorrectos(element) {
      if (element.celular.toString().length !== 9) {
        this.mensajeError = {
          title: "CELULAR INVALIDO",
          message: "El número de celular debe tener 9 dígitos.",
          type: "warning",
        };
        return true;
      }
    },
    //VERIFICA SI LOS CAMPOS ESTÁN VACIOS
    camposVacios(element) {
      for (const e in element) {
        if (element[e] == "" || element[e] == null) {
          return true;
        }
      }
    },
    //MODAL PARA CONFIRMAR EDICION DEPENDIENTE
    abrirEditarDependiente(dependiente) {
      if (this.camposVacios(dependiente)) {
        //VERIFICAMOS SI EL OBJETO ESTÁ VACIO
        this.$refs.simplert.openSimplert(this.getMensajeAdvertencia);
      } else if (this.camposIncorrectos(dependiente)) {
        this.$refs.simplert.openSimplert(this.mensajeError);
      } else {
        this.familiar = dependiente;
        this.getMensajeEditar.onConfirm = this.editarDependiente;
        this.$refs.simplert.openSimplert(this.getMensajeEditar);
      }
    },
    //LLAMA A EDITAR DEPENDIENTE DE PACIENTE.JS
    editarDependiente() {
      let datos = {
        paciente: this.getUsuario,
        familiar: this.familiar,
      };
      //LLMAMOS A LA CONSULTA DE ACTUALIZAR DATOS
      this.actualizarFamiliar(datos).then((res) => {
        //MOSTRAMOS EL MESNAJE POSITIVO O NEGATIVO
        this.$refs.simplert.openSimplert(this.getMensaje);
      });
    },
  },
  computed: {
    ...mapGetters([
      "getUsuario",
      "getMensaje",
      "getCarga",
      "getMensajeEditar",
      "getDatosFamiliar",
      "getMensajeAdvertencia",
    ]),
  },
};
</script>

<style lang="scss" scoped>
.editar {
  height: 400px;
  width: 620px;
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
