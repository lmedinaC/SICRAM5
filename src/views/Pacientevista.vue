<template>
  <div>
    <MenuPaciente></MenuPaciente>

    <component v-bind:is="this.componenteVista"> </component>
  </div>
</template>

<style type="scss">
@import "../css/pacientevista.css";
</style>
<script>
import MenuPaciente from "@/components/MenuPaciente.vue";
import InicioPaciente from "@/components/InicioPaciente.vue";
import PerfilPaciente from "@/components/PerfilPaciente.vue";
import ActualizarPaciente from "@/components/ActualizarPaciente.vue";
import ActualizarCitaPaciente from "@/components/ActualizarCitaPaciente.vue";
import NuevaCitaPaciente from "@/components/NuevaCitaPaciente.vue";
import CitaPendientePaciente from "@/components/CitaPendientePaciente.vue";
import RegistrarDependiente from "@/components/RegistrarDependiente.vue";
import ListaDependientes from "@/components/ListaDependientes.vue";
import { mapActions, mapState } from "vuex";

export default {
  name: "Pacientevista",
  data(){
    return{
      usuario: '',
      datosUsuario:{}
    }
  },
  components: {
    MenuPaciente,
    InicioPaciente,
    PerfilPaciente,
    ActualizarPaciente,
    ActualizarCitaPaciente,
    NuevaCitaPaciente,
    CitaPendientePaciente,
    RegistrarDependiente,
    ListaDependientes
  },

  computed: {
    ...mapState(["componenteVista","usuarioPaciente","idPaciente"]),
  },
  methods: {
    ...mapActions(['setObjPaciente']),
    getPaciente() {
      this.usuario = this.usuarioPaciente;
       let url =
        `https://sicramv1.herokuapp.com/api/user/perfil/${this.idPaciente}`;
      this.axios
        .get(url, {
          headers: {
            Authorization: `${this.usuario}`,
          },
        })
        .then((res) => {
          this.datosUsuario = res.data;
          this.setObjPaciente(this.datosUsuario)
        })
        .catch((e) => {
          this.mensaje = e.response;
          console.log(e);
        });
    },
  },
  beforeMount(){
    this.getPaciente()
  }
};
</script>

<style></style>
