<template>
  <modal
    name="demo-registro-doc"
    transition="pop-out"
    :width="modalWidth"
    :focus-trap="true"
    :height="600"
  >
    <div class="box ">
      <!-- area de Formulario de Medico -->
      <div>
        <div class="text-center mt-2">
          <h2>REGISTRO DEL MÉDICO</h2>
          <hr />
        </div>
        <form
          class="p-3 form"
          @submit.prevent="
            registrarDoctor({
              username: $v.doctor.username.$model,
              password: $v.doctor.password.$model,
              email: $v.doctor.email.$model,
              name: $v.doctor.name.$model,
              lastname: $v.doctor.lastname.$model,
              dni: $v.doctor.dni.$model,
              edad: $v.doctor.edad.$model,
              celular: $v.doctor.celular.$model,
              cmp: $v.doctor.cmp.$model,
              profesion: 'Doctor',
              especialidad: $v.doctor.especialidad.$model,
              genero: $v.doctor.genero.$model,
            })
          "
        >
          <div class="form-row">
            <div class="form-group col-md-6">
              <div class=" text-center">
                <h5 style="color: #025f8ace;">DATOS PERSONALES</h5>
              </div>
              <div class="mr-2">
                <div class="form-row">
                  <div class="form-group col-md-6 mt-4">
                    <input
                      type="text"
                      class="form-control"
                      id="inputUsuario"
                      placeholder="Usuario"
                      v-model="$v.doctor.username.$model"
                    />
                  </div>
                  <div class="form-group col-md-6 mt-4">
                    <input
                      type="email"
                      class="form-control"
                      id="inputEmail4"
                      v-model="$v.doctor.email.$model"
                      placeholder="Correo"
                    />
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <input
                      type="password"
                      class="form-control"
                      id="inputPassword4"
                      v-model="$v.doctor.password.$model"
                      placeholder="Contraseña"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <input
                      type="password"
                      class="form-control"
                      id="inputNewPassword4"
                      placeholder="Repita Contraseña"
                    />
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <input
                      style="text-transform:uppercase;"
                      type="text"
                      class="form-control"
                      id="inputName"
                      v-model="$v.doctor.name.$model"
                      placeholder="Nombres"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <input
                      style="text-transform:uppercase;"
                      type="text"
                      class="form-control"
                      id="inputLastName"
                      v-model="$v.doctor.lastname.$model"
                      placeholder="Apellidos"
                    />
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <input
                      type="number"
                      oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                      maxlength="8"
                      class="form-control"
                      id="inputDni"
                      v-model="$v.doctor.dni.$model"
                      placeholder="DNI"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <input
                      type="number"
                      oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                      maxlength="9"
                      class="form-control"
                      id="inputtelefono"
                      v-model="$v.doctor.celular.$model"
                      placeholder="Número Telefónico"
                    />
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <input
                      type="number"
                      class="form-control"
                      id="inputEdad"
                      min="18"
                      v-model="$v.doctor.edad.$model"
                      placeholder="Edad"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <select
                      id="inputState"
                      class="form-control"
                      v-model="$v.doctor.genero.$model"
                    >
                      <option disabled value="">Sexo</option>
                      <option value="femenino">FEMENINO</option>
                      <option value="masculino">MASCULINO</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="form-group col-md-6 "
              style="border-left: 2px solid #c6c6c6; height: 340px; "
            >
              <div class=" text-center">
                <h5 style="color: #025f8ace;">DATOS PROFESIONALES</h5>
              </div>
              <div class="ml-2">
                <div class="form-row">
                  <div class="form-group col-md-12 mt-4">
                    <input
                      type="text"
                      class="form-control"
                      id="inputCmp"
                      v-model="$v.doctor.cmp.$model"
                      placeholder="CMP"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <select
                    id="inputState"
                    class="form-control"
                    v-model="$v.doctor.especialidad.$model"
                  >
                    <option disabled value="">Especialidad</option>
                    <option
                      v-for="(element, id) in getEspecialidades"
                      :key="id"
                      v-bind:value="element.especialidad"
                      >{{ element.especialidad }}</option
                    >
                  </select>
                </div>
                <div class="label" style="font-weight: bold;">
                  Muy Importante:
                </div>
                <div class="label">
                  <dir>
                    - Al ingresar la información se debe considerar la
                    originalidad de la misma.
                  </dir>
                  <dir>
                    - Además, considerar que los datos son confidenciales.
                  </dir>
                </div>
              </div>
              <br />
              <small
                class="text-danger"
                style="font-weight: bold;"
                v-if="$v.mensaje != ''"
                >{{ mensaje }}</small
              >
            </div>
          </div>
          <br />
          <hr />
          <div class="row justify-content-center">
            <div class="col-12 col-sm-10 col-xl-6 text-center">
              <input
                type="submit"
                class="butn"
                value="REGISTRAR"
                :disabled="carga2"
              />
            </div>
          </div>
        </form>
      </div>
      <simplert :useRadius="true" :useIcon="true" ref="simplert"> </simplert>
      <!--ends -->
    </div>
  </modal>
</template>
<script>
import Simplert from "@/components/Simplert.vue";
import vueCustomScrollbar from "vue-custom-scrollbar";
import { required, minLength, email } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
const MODAL_WIDTH = 800;

export default {
  name: "Modal_Registro_Doc",
  components: {
    vueCustomScrollbar,
    Simplert,
  },
  data() {
    return {
      especialidades: [],
      settings: {
        maxScrollbarLength: 10,
      },
      modalWidth: MODAL_WIDTH,
      doctor: {
        username: "",
        password: "",
        email: "",
        name: "",
        lastname: "",
        dni: "",
        edad: "",
        celular: "",
        cmp: "",
        especialidad: "",
        genero: "",
      },
      mensaje: null,
      carga2: false,
    };
  },
  created() {
    this.modalWidth =
      window.innerWidth < MODAL_WIDTH ? MODAL_WIDTH / 2 : MODAL_WIDTH;
  },
  validations: {
    doctor: {
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(4),
      },
      username: { required },
      name: { required },
      lastname: { required },
      dni: { required,minLength: minLength(8)},
      edad: { required },
      celular: { required ,minLength: minLength(9)},
      cmp: { required },
      especialidad: { required },
      genero: { required },
    },
  },

  methods: {
    cerrar() {
      this.$modal.hide("demo-registro-doc");
    },
    //VALIDAR LA CONTRASEÑA 
    validarContraseña(str) {
       if (str.length < 6) {
           return true
       } else if (str.length > 50) {
           return true
       } else if (str.search(/\d/) == -1) {
           return true
       } else if (str.search(/[a-zA-Z]/) == -1) {
           return true
       } else if (str.search(/[^a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\_\+]/) != -1) {
           return true
       }
       return false
    },

    registrarDoctor(doctor) {
      this.carga2 = true;
      if (this.$v.doctor.celular.minLength == false) {
        this.$refs.simplert.openSimplert({
          title: "REGISTRO FALLIDO",
          message: "Digíte un número de celular válido.",
          type: "warning",
        });
        this.carga2 = false;
      } else if (this.$v.doctor.dni.minLength == false) {
        this.$refs.simplert.openSimplert({
          title: "REGISTRO FALLIDO",
          message: "Digíte un número de DNI válido.",
          type: "warning",
        });
        this.carga2 = false;
      } else if (this.$v.$invalid == true) {
        this.$refs.simplert.openSimplert({
          title: "REGISTRO FALLIDO",
          message: "Relleno todos los campos correctamente.",
          type: "warning",
        });
        this.carga2 = false;
      }else if (this.validarContraseña(this.$v.doctor.password.$model)) {
        this.$refs.simplert.openSimplert({
          title: "REGISTRO FALLIDO",
          message: "La contraseña debe ser mayor a 5 y menor a 60 carácteres y contar con por lo menos: un número, una letra y carácter especial.",
          type: "warning",
        });
        this.carga2 = false;
      } else {
        this.axios
          .post("https://sicramv1.herokuapp.com/api/signupdoctor", {
            ...doctor,
          }) //elemento spreat
          //agrega al obejto json al contenido que agregamos, seria como un solo json de todos los parámetros

          .then((res) => {
            if (res.data.msg === "Username ya existe.") {
              this.carga2 = false;
              this.$refs.simplert.openSimplert({
                title: "REGISTRO FALLIDO",
                message: "Este doctor ya se encuentra registrado",
                type: "error",
              });
            } else if (
              res.data.msg ==
              "LLene los nombres y apellidos, completos y CORRECTOS del doctor"
            ) {
              this.$refs.simplert.openSimplert({
                title: "REGISTRO FALLIDO",
                message:
                  "LLene los nombres y apellidos, completos y CORRECTOS del doctor",
                type: "error",
              });
              this.carga2 = false;
            } else {
              this.carga2 = false;
              this.$refs.simplert.openSimplert({
                title: "REGISTRO EXITOSO",
                message: "Doctor registrado con éxito",
                type: "success",
                onClose: this.cerrar,
              });
            }
          })
          .catch((e) => {
            this.carga2 = false;
            this.$refs.simplert.openSimplert({
              title: "REGISTRO FALLIDO",
              message: "Ocurrió un error al registrar al Doctor.",
              type: "error",
            });
          });
      }
    },
  },
  computed: {
    ...mapGetters(["getEspecialidades"]),
  },
};
</script>
<style lang="scss" scoped>
$background_color: #404142;
$github_color: #dba226;
$facebook_color: #3880ff;

.box {
  background: white;
  overflow: hidden;
  width: 800px;
  height: 600px;
  border-radius: 2px;
  box-sizing: border-box;
  box-shadow: 0 0 40px black;
  color: #025f8ace;
  font-size: 0;

  .label {
    width: 100%;
    height: 100%;
    font-size: 13px;
    color: #494949;
    font-weight: bold;
  }

  .box-messages {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
  }

  .box-error-message {
    position: relative;
    overflow: hidden;
    box-sizing: border-box;

    height: 0;
    line-height: 32px;
    padding: 0 12px;
    text-align: center;
    width: 100%;
    font-size: 11px;

    background: #f38181;
  }

  .butn {
    background-color: transparent;
    text-transform: uppercase;
    border: 1px solid #025f8ace;
    padding: 10px 20px;
    margin: 5px 0px;
    color: #025f8ace;
    font-size: 14px;
    letter-spacing: 1px;
    opacity: 0.7;
    font-weight: bold;
  }
  .butn:hover {
    opacity: 1;
    background-color: #03a8f4d5;
    color: white;
  }

  button {
    background: white;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 10px;
    letter-spacing: 1px;
    font-family: "Open Sans", sans-serif;
    font-weight: 400;
    min-width: 140px;
    margin-top: 8px;
    color: #8b8c8d;
    cursor: pointer;
    border: 1px solid #dddedf;
    text-transform: uppercase;
    transition: 0.1s all;
    font-size: 10px;
    &:hover {
      border-color: mix(#dddedf, black, 90%);
      color: mix(#8b8c8d, black, 80%);
    }
  }

  .large-btn {
    width: 100%;
    background: white;

    span {
      font-weight: 600;
    }
    &:hover {
      color: white !important;
    }
  }

  .button-set {
    margin-bottom: 8px;
  }

  #register-btn,
  #signin-btn {
    margin-left: 8px;
  }

  .facebook-btn {
    border-color: $facebook_color;
    color: $facebook_color;
    &:hover {
      border-color: $facebook_color;
      background: $facebook_color;
    }
  }

  .github-btn {
    border-color: $github_color;
    color: $github_color;
    &:hover {
      border-color: $github_color;
      background: $github_color;
    }
  }

  .autocomplete-fix {
    position: absolute;
    visibility: hidden;
    overflow: hidden;
    opacity: 0;
    width: 0;
    height: 0;
    left: 0;
    top: 0;
  }
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
