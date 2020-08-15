<template>
  <div class="row">
    <Modal_Registro_Doc />
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
            <a href="/" class="logo" style="color:#03A9F4;">
              <i style="width:40px; " class="fas fa-user-md fa-2x"></i>
              SICRAM
            </a>
          </div>
          <div class="content">
            <h2>INICIAR SESIÓN</h2>
            <hr />
            <form
              @submit.prevent="
                iniciarUsuario({
                  password: $v.usuario.password.$model,
                  correo: $v.usuario.correo.$model,
                })
              "
            >
              <div class="form-group">
                <label for="username" class="form-label">Correo:</label>
                <input
                  class="ml-5"
                  type="text"
                  placeholder="ejemplo@ejemplo.com"
                  v-model.lazy="$v.usuario.correo.$model"
                /><br />

                <small
                  class="text-danger"
                  style="font-weight: bold;"
                  v-if="!$v.usuario.correo.required"
                  >Campo Requerido</small
                >
                <small
                  class="text-danger"
                  style="font-weight: bold;"
                  v-if="!$v.usuario.correo.email"
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
              Si aún no formas para de nosotros,
              <a href="#Registro" @click="$modal.show('demo-registro-doc')"
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
import Navbar from "@/components/Navbar.vue";
import Modal_Registro_Doc from "@/components/Modal_Registro_Doc.vue";
// @ is an alias to /src
import { mapActions, mapState } from "vuex";

import { required, minLength, email } from "vuelidate/lib/validators";
export default {
  name: "LoginDoctor",
  components: {
    Navbar,
    Modal_Registro_Doc,
  },
  data() {
    return {
      usuario: {
        password: "",
        correo: "",
      },
      mensaje: "",
      carga: false,
      acceso: null,
      canBeShown: false,
    };
  },
  validations: {
    usuario: {
      password: {
        required,
        minLength: minLength(4),
      },
      correo: {
        required,
        email,
      },
    },
  },
  created() {
    setInterval(() => {
      this.canBeShown = !this.canBeShown;
    }, 5000);
  },

  methods: {
    ...mapActions(["setUserDoctor"]),

    iniciarUsuario(user) {
      this.carga = true;
      this.usuario = user;
      this.acceso = true;
      this.axios
        .post("https://proyectocalidad9.herokuapp.com/login", this.usuario)

        .then((res) => {
          console.log(res.data.user._id);
          this.setUserDoctor(res.data.user._id);
          this.carga = false;
          this.$router.push("/doctorvista");
        })
        .catch((e) => {
          this.carga = false;
          this.acceso = false;
          this.mensaje = e.response.data.message;
        });
    },
  },
};
</script>

<style scoped>
.backLeft {
  position: absolute;
  left: 0;
  width: 50%;
  height: 100%;
  background: #03a9f4 url(../assets/fondo3.jpg);
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
  width: 250px;
  margin: 0 auto;
  top: 23%;
  position: absolute;
  left: 50%;
  margin-left: -125px;
}

.content h2 {
  color: #03a9f4;
  font-weight: 300;
  font-size: 35px;
}

button {
  background: #03a9f4;
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
  background: #0288d1;
  box-shadow: 0 4px 7px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.1);
}
.off {
  background: none;
  color: #03a9f4;
  box-shadow: none;
}

.right .off:hover {
  background: #eee;
  color: #03a9f4;
  box-shadow: none;
}
.left .off:hover {
  box-shadow: none;
  color: #03a9f4;
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
  }
  .backLeft {
    width: 0%;
  }
}
</style>
