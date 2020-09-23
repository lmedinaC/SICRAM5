<template>
  <modal
    name="demo-reg-org"
    transition="pop-out"
    :width="700"
    :focus-trap="true"
    :height="500"
  >
    <div class="box ">
      <div class="text-center mt-5">
        <h3>REGISTRO DE ORGANIZACIÓN</h3>
      </div>
      <form
        @submit.prevent="
          registrarOrganizacion({
            username: $v.organizacion.username.$model,
            password: $v.organizacion.password.$model,
            email: $v.organizacion.email.$model,
            nameOrg: $v.organizacion.nameOrg.$model,
            direccion: $v.organizacion.direccion.$model,
            ruc: $v.organizacion.ruc.$model,
          })
        "
      >
        <div
          class="my-2 ml-5 mr-5"
          style="padding: 0px 12px 0px 10px; background-color: white; "
        >
          <hr />
          <div class="form-row">
            <div class="form-group col-md-6 mt-4">
              <input
                type="text"
                class="form-control"
                placeholder="Usuario organización"
                v-model="$v.organizacion.username.$model"
                id="inputUsuario"
              />
            </div>
            <div class="form-group col-md-6 mt-4">
              <input
                type="email"
                class="form-control"
                id="inputEmail4"
                v-model="$v.organizacion.email.$model"
                placeholder="Correo organización"
              />
            </div>
          </div>
          <div class="form-row ">
            <div class="form-group col-md-6 ">
              <input
                type="password"
                class="form-control"
                id="inputPassword4"
                v-model="$v.organizacion.password.$model"
                placeholder="Contraseña"
              />
            </div>
            <div class="form-group col-md-6">
              <input
                type="password"
                class="form-control"
                id="inputNewPassword4"
                placeholder="Repita contraseña"
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <input
                type="text"
                class="form-control"
                id="inputName"
                v-model="$v.organizacion.nameOrg.$model"
                placeholder="Nombre de organización"
              />
            </div>
            <div class="form-group col-md-6">
              <input
                type="text"
                class="form-control"
                id="inputLastName"
                v-model="$v.organizacion.direccion.$model"
                placeholder="Dirección"
              />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group col-md-6">
              <input
                type="number"
                oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                maxlength="11"
                class="form-control"
                id="inputRUC"
                v-model="$v.organizacion.ruc.$model"
                placeholder="RUC"
              />
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
        </div>
        <br />
      </form>
      <simplert :useRadius="true" :useIcon="true" ref="simplert"> </simplert>
    </div>
  </modal>
</template>
<script>
import Simplert from "@/components/Simplert.vue";
import { required, minLength, email } from "vuelidate/lib/validators";
const MODAL_WIDTH = 700;

export default {
  name: "Modal_RegOrg",
  components: {
    Simplert,
  },
  data() {
    return {
      carga2: false,
      mensaje: "",
      modalWidth: MODAL_WIDTH,
      organizacion: {
        username: "",
        password: "",
        email: "",
        nameOrg: "",
        direccion: "",
        ruc: "",
      },
    };
  },
  created() {},
  validations: {
    organizacion: {
      username: { required },
      password: {
        required,
        minLength: minLength(6),
      },
      email: {
        required,
        email,
      },
      nameOrg: { required },
      direccion: { required },
      ruc: { required, minLength: minLength(11) },
    },
  },
  methods: {
    cerrar() {
      this.$modal.hide("demo-reg-org");
    },
    //VERIFICA SI LOS CAMPOS ESTÁN VACIOS
    camposVacios(element) {
      for (const e in element) {
        if (element[e] == "" || element[e] == null) {
          return true;
        }
      }
    },
    //VALIDAR LA CONTRASEÑA
    validarContraseña(str) {
      if (str.length < 6) {
        return true;
      } else if (str.length > 50) {
        return true;
      } else if (str.search(/\d/) == -1) {
        return true;
      } else if (str.search(/[a-zA-Z]/) == -1) {
        return true;
      } else if (str.search(/[^a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\_\+]/) != -1) {
        return true;
      }
      return false;
    },

    registrarOrganizacion(org) {
      this.carga2 = true;
      this.organizacion = org;
      if (this.validarContraseña(this.organizacion.password)) {
        this.$refs.simplert.openSimplert({
          title: "REGISTRO FALLIDO",
          message:
            "La contraseña debe ser mayor a 5 y menor a 60 carácteres y contar con por lo menos: un número, una letra y carácter especial.",
          type: "warning",
        });
        this.carga2 = false;
      }else if(this.camposVacios(org)){
        this.$refs.simplert.openSimplert({
          title: "REGISTRO FALLIDO",
          message:
            "Todos los campos son necesarios.",
          type: "warning",
        });
        this.carga2 = false;
      }else if(this.organizacion.ruc.length!=11){
        this.$refs.simplert.openSimplert({
          title: "REGISTRO FALLIDO",
          message:
            "Ingrese un RUC válido",
          type: "warning",
        });
        this.carga2 = false;
      }
       else {
        this.axios
          .post("https://sicramv1.herokuapp.com/api/signuporganizacion", {
            ...this.organizacion,
          }) //elemento spreat
          //agrega al obejto json al contenido que agregamos, seria como un solo json de todos los parámetros

          .then((res) => {
            if (res.data.msg === "Username ya existe.") {
              this.$refs.simplert.openSimplert({
                title: "REGISTRO FALLIDO",
                message: "Este organización ya se encuentra registrada",
                type: "error",
              });
              this.carga2 = false;
            } else {
              this.carga2 = false;
              this.$refs.simplert.openSimplert({
                title: "REGISTRO EXITOSO",
                message: "Organización registrada con éxito",
                type: "success",
                onClose: this.cerrar,
              });
            }
          })
          .catch((e) => {
            this.carga2 = false;
            this.$refs.simplert.openSimplert({
              title: "REGISTRO FALLIDO",
              message: "Este organización ya se encuentra registrada.",
              type: "error",
            });
          });
      }
    },
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
  width: 700px;
  height: 500px;
  border-radius: 2px;
  box-sizing: border-box;
  box-shadow: 0 0 40px black;
  color: #025f8ace;
  font-size: 0;

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
    color: white;
    background: #f38181;
  }
  .label {
    width: 100%;
    height: 100%;
    font-size: 13px;
    color: #494949;
    font-weight: bold;
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
