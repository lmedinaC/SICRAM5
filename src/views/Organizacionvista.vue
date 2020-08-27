<template>
  <div>
    <MenuOrg></MenuOrg>

    <component v-bind:is="this.componenteVistaOrganizacion"> </component>
  </div>
</template>

<style type="scss">
@import "../css/pacientevista.css";
</style>
<script>
import MenuOrg from "@/components/MenuOrg.vue";
import AgregarDoctor from "@/components/AgregarDoctor.vue";
import PerfilOrganizacion from "@/components/PerfilOrganizacion.vue";
import ListaDoctores from "@/components/ListaDoctores.vue";
import ActualizarOrganizacion from "@/components/ActualizarOrganizacion.vue";
import InicioOrg from "@/components/InicioOrg.vue";
import { mapActions, mapState } from "vuex";

export default {
  name: "Organizacionvista",
  data(){
    return{
      usuario: '',
      datosUsuario:{}
    }
  },
  components: {
    MenuOrg,
    AgregarDoctor,
    PerfilOrganizacion,
    ListaDoctores,
    ActualizarOrganizacion,
    InicioOrg,
  },

  computed: {
    ...mapState(["componenteVistaOrganizacion"]),
  },
 
};
</script>

<style></style>
