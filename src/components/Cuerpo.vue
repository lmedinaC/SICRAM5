<style lang="scss" scoped></style>
<template>
  <div class="Cuerpo">
    <demo-login-modal />
    <Modal_Registro_Doc />
    <Modal_RegOrg />
    <div class="pad_100">
      <div class="container">
        <div class="row">
          <div class="col">
            <h2 class="center">Encuentra tu cita <strong>personalizada</strong></h2>
          </div>
        </div>
        <br />
        <div class="text-center" style="content-align:center;">
          <div>
            <img
              style="box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); "
              src="../assets/qwe.png"
              alt="paciente"
              class="rounded-circle servicio-img"

            /><br />
            <h2>Paciente</h2>
            <p>
              ¿Deseas una consulta médica personalizada?
            </p>
            <button class="but btn btn-lg" @click="$modal.show('demo-login')">
              Registrate!
            </button>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6 center mt-5">
            <img
              style="box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); "
              src="../assets/docs.png"
              alt="medico"
              class="rounded-circle servicio-img"
            /><br />
            <h2>Médico</h2>
            <p>
              ¿Deseas dar consultas médicas personalizadas?
            </p>
            <button class="but btn btn-lg" @click="$modal.show('demo-registro-doc')">
              Registrate!
            </button>
          </div>
          <!-- /.col-lg-4 -->
          <div class="col-lg-6 center mt-5">
            <img
              style="box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); "
              src="../assets/team.png"
              alt="paciente"
              class="rounded-circle servicio-img"
            /><br />
            <h2>Organización</h2>
            <p>
              ¿Deseas un espacio para formar parte?
            </p>
            <button class="but btn btn-lg" @click="$modal.show('demo-reg-org')">
              Registrate!
            </button>
          </div>
          <!-- /.col-lg-4 -->
        </div>
        <!-- /.row -->
      </div>
    </div>
  </div>
</template>

<script>
import DemoLoginModal from "@/components/Modal_Login.vue";
import Modal_Registro_Doc from "@/components/Modal_Registro_Doc.vue";
import Modal_RegOrg from "@/components/Modal-RegOrg.vue";
export default {
  name: "Cuerpo",
  components: {
    DemoLoginModal,
    Modal_Registro_Doc,
    Modal_RegOrg
  },

};
</script>

<style scoped>
a {
  margin: 0px;
  padding: 0px;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  color: #025f8ace;
}

.pad_100 {
  padding: 50px 0px;
}
.center {
  text-align: center;
  margin: 0px auto;
}


.black:hover a {
  color: #03a8f4d5;
}

.but {
  background: #60b9cf;
  color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
.but:hover {
  background: #0099a1;
  color: white;
}
</style>
