<template>
  <modal
    name="mod-editar-doctor"
    transition="pop-out"
    :width="600"
    :focus-trap="true"
    :height="400"
  >
    <div class="editar">
      <div class="titulo">
        <h3>Editar datos Doctor</h3>
      </div>
      <div class="datos">
        <form @submit.prevent="abrirEditarDoctor()">
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
                  <input type="text" class="form-control" disabled />
                </div>
              </div>
            </div>
            <div class="form-group col-md-6 ">
              <div class="row mr-1">
                <div class="col-4">
                  <label for="inputEdad">Edad</label>
                </div>
                <div class="col-8">
                  <input type="text" class="form-control" />
                </div>
              </div>
            </div>
          </div>

          <div class="form-row ">
            <div class="form-group col-md-6">
              <div class="row mr-1">
                <div class="col-4">
                  <label for="inputGenero">Correo</label>
                </div>
                <div class="col-8">
                  <input type="text" class="form-control" />
                </div>
              </div>
            </div>
            <div class="form-group col-md-6 ">
              <div class="row mr-1">
                <div class="col-4">
                  <label for="inputEspecialidad">Celular</label>
                </div>
                <div class="col-8">
                  <input type="text" class="form-control" />
                </div>
              </div>
            </div>
          </div>

          <div class="form-row ">
            <div class="form-group col-md-6">
              <div class="row mr-1">
                <div class="col-4">
                  <label for="inputCMP">Cmp</label>
                </div>
                <div class="col-8">
                  <input type="text" class="form-control" disabled />
                </div>
              </div>
            </div>
            <div class="form-group col-md-6 ">
              <div class="row mr-1">
                <div class="col-4">
                  <label for="inputEspecialidad">Especialidad</label>
                </div>
                <div class="col-8">
                  <input type="text" class="form-control" disabled />
                </div>
              </div>
            </div>
          </div>
          <div class="botones">
            <button class="btn btn-md boton-editar">Editar</button>
            <button
              class="btn btn-md boton-cerrar"
              type="button"
              @click="$modal.hide('mod-editar-doctor')"
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
  name: "ModEditarDoctor",
  components:{
      Simplert
  },
  methods: {
    //MODAL PARA EDITAR DOCTOR
    abrirEditarDoctor() {
        this.getMensajeEditar.onConfirm = this.editarDoctor
        this.$refs.simplert.openSimplert(this.getMensajeEditar)
    },
    //LLAMA A EDITAR DOCTOR DE ORGANIZACION EN ORGANIZACION.JS
    editarDoctor(){
        console.log('DOCTOR')
    }
  },
  computed: {
    ...mapGetters([
      "getUsuario",
      "getMensaje",
      "getCarga",
      "getMensajeEditar"
    ]),
  },
};
</script>

<style lang="scss" scoped>
.editar {
  height: 400px;
  width: 600px;
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
