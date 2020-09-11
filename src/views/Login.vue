<template>
  <div class="row">
    <demo-login-modal />
    <div id="back">
      <div class="backLeft"></div>
    </div>

    <div id="slideBox">
      <div class="topLayer">
        <div class="right">
          <div
            class="mr-3 mt-3"
            style="font-weight: bold; color=#03A9F4; float:right;"
          >
            <router-link to="/"
              ><a style="color:#0099a1;"> <i class="fas fa-home fa-3x"></i> </a
            ></router-link>
          </div>
          <div class="content">
            <h2>INICIAR SESIÓN</h2>
            <hr />
            <form
              @submit.prevent="
                cargar({
                  email: $v.usuario.email.$model,
                  password: $v.usuario.password.$model,
                })
              "
            >
              <div class="form-group">
                <label for="username" class="form-label">Correo:</label>
                <input
                  class="ml-5"
                  type="text"
                  placeholder="ejemplo@ejemplo.com"
                  v-model.lazy="$v.usuario.email.$model"
                /><br />

                <small
                  class="text-danger"
                  style="font-weight: bold;"
                  v-if="!$v.usuario.email.required"
                  >Campo Requerido</small
                >
                <small
                  class="text-danger"
                  style="font-weight: bold;"
                  v-if="!$v.usuario.email.email"
                  >Digite un correo válido</small
                ><br />

                <label for="username" class="form-label mr-3"
                  >Contraseña:</label
                >
                <input
                  type="password"
                  placeholder=" contraseña"
                  v-model="$v.usuario.password.$model"
                /><br />

                <small
                  class="text-danger"
                  style="font-weight: bold;"
                  v-if="!$v.usuario.password.minLength"
                  >Contraseña mayor a 6 carácteres</small
                >

                <small
                  class="text-danger"
                  style="font-weight: bold;"
                  v-if="!$v.usuario.password.required"
                  >Campo Requerido</small
                ><br />
              </div>
              <hr />
              <button id="login" type="submit" :disabled="$v.$invalid || carga">
                Ingresar
              </button>

              <div
                class="alert alert-danger"
                role="alert"
                v-if="acceso === false"
              >
                {{ mensaje }}
              </div>
            </form>
            <div>
              Si aún no formas parte de nosotros,
              <a href="#Registro" @click="$modal.show('demo-login')"
                >Registrate</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--Inspiration from: http://ertekinn.com/loginsignup/-->
  </div>
</template>

<script>
import Vue from "vue";
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
// Init plugin
Vue.use(Loading);

import DemoLoginModal from "@/components/Modal_Login.vue";
// @ is an alias to /src
import { mapActions, mapState, mapGetters } from "vuex";

import { required, minLength, email } from "vuelidate/lib/validators";
export default {
  name: "Login",
  components: {
    DemoLoginModal,
  },
  data() {
    return {
      fullPage: false,
      usuario: {
        email: "",
        password: "",
      },
      mensaje: "",
      carga: false,
      acceso: null,
      canBeShown: false,
      loader: null,
    };
  },
  validations: {
    usuario: {
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(6),
      },
    },
  },

  computed: {
    ...mapGetters(["getUsuario", "getTipoUsuario"]),
  },

  methods: {
    ...mapActions(["loginPaciente", "loginDoctor", "loginOrganizacion"]),
    //INICIALIZA EL ESPINER
    cargar(user) {
      this.loader = this.$loading.show({
        // Optional parameters
        container: this.fullPage ? null : this.$refs.formContainer,
        color: "#0099a1",
        loader: "dots",
        height: 150,
        width: 130,
      });
      this.iniciarUsuario(user);
    },
    //INICIAR SESION COMO PACIENTE, DOCTOR U ORGANIZACION
    iniciarUsuario(user) {
      this.acceso = true;
      //INCIAR SESION COMO PACIENTE
      this.loginPaciente(user).then((res) => {
        if (res) {
          this.loader.hide();
          this.$router.push("/pacientevista");
        } else {
          //INICIAR SESION COMO DOCTOR
          this.loginDoctor(user).then((res) => {
            if (res) {
              this.loader.hide();
              this.$router.push("/doctorvista");
            } else {
              //INICIAR SESION COMO ORGANIZACION
              this.loginOrganizacion(user).then((res) => {
                if (res) {
                  this.loader.hide();
                  this.$router.push("/organizacionvista");
                } else {
                  this.loader.hide();
                  this.acceso = false;
                  this.mensaje = "Usuario o contraseñas incorrectos.";
                }
              });
            }
          });
        }
      });
    },
    //PREGUNTA SI EL USUARIO ESTA LOGEADO
    usuarioLogeado() {
      if (this.getUsuario != null) {
        console.log(this.getUsuario);
        console.log(this.getTipoUsuario);
        switch (this.getTipoUsuario) {
          case "paciente":
            this.$router.push("/pacientevista");
            break;
          case "doctor":
            this.$router.push("/doctorvista");
            break;
          case "organizacion":
            this.$router.push("/organizacionvista");
            break;
        }
      } else {
        console.log("Inicio");
      }
    },
  },

  created() {
    this.usuarioLogeado();
  },
};
</script>

<style scoped>
.backLeft {
  position: absolute;
  left: 0;
  width: 55%;
  height: 100%;
  background: #0099a1 url(../assets/teamMedicos.jpg);
  background-size: cover;
  background-position: 70% 50%;
}

#back {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -999;
}

#slideBox {
  width: 50%;
  max-height: 100%;
  height: 100%;
  overflow: hidden;
  margin-left: 50%;
  position: absolute;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}
.topLayer {
  width: 200%;
  height: 100%;
  position: relative;
  left: 0;
  left: -100%;
}

.left {
  width: 50%;
  height: 100%;
  background: #2c3034;
  left: 0;
  position: absolute;
}

.right {
  width: 50%;
  height: 100%;
  background: #f9f9f9;
  right: 0;
  position: absolute;
}

.content {
  margin: 0 auto;
  top: 23%;
  position: absolute;
  left: 50%;
  margin-left: -125px;
}

.content h2 {
  color: #0099a1;
  font-weight: 300;
  font-size: 35px;
}

button {
  background: #0099a1;
  padding: 10px 16px;
  width: auto;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 14px;
  color: #fff;
  line-height: 16px;
  letter-spacing: 0.5px;
  border-radius: 2px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.1);
  border: 0;
  outline: 0;
  margin: 15px 15px 15px 0;
  transition: all 0.25s;
}

button:hover {
  background: #4daac2;
  box-shadow: 0 4px 7px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.1);
}
.off {
  background: none;
  color: #0099a1;
  box-shadow: none;
}

.right .off:hover {
  background: #eee;
  color: #0099a1;
  box-shadow: none;
}
.left .off:hover {
  box-shadow: none;
  color: #0099a1;
  background: #363a3d;
}
input {
  background: transparent;
  border: 0;
  outline: 0;
  border-bottom: 1px solid #45494c;
  font-size: 14px;
  color: #959595;
  padding: 8px 0;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .backLeft {
    background-position: 60% 50%;
  }
}

@media (max-width: 425px) {
  #slideBox {
    margin-left: 0%;
    width: 425px;
    height: 100%;
  }
  .backLeft {
    width: 0%;
  }
}
</style>
