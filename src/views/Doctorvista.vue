<template>
  <div>
    <MenuDoctor></MenuDoctor>

    <component v-bind:is="this.componenteVistaDoctor"> </component>
  </div>
</template>

<style type="scss">
@import "../css/pacientevista.css";
</style>
<script>
import MenuDoctor from "@/components/MenuDoctor.vue";
import InicioDoctor from "@/components/InicioDoctor.vue";
import PerfilDoctor from "@/components/PerfilDoctor.vue";
import ActualizarDoctor from "@/components/ActualizarDoctor.vue";
import ModificarHorarioDoc from "@/components/ModificarHorarioDoc.vue";
import AgregarHorarioDoc from "@/components/AgregarHorarioDoc.vue";
import CitaPendienteDoctor from "@/components/CitaPendienteDoctor.vue";

import { mapActions, mapState } from "vuex";

export default {
  name: "Doctorvista",
  components: {
    MenuDoctor,
    InicioDoctor,
    PerfilDoctor,
    ActualizarDoctor,
    ModificarHorarioDoc,
    AgregarHorarioDoc,
    CitaPendienteDoctor
  },

  computed: {
    ...mapState(["componenteVistaDoctor"]),
  },
};
</script>

<style></style>
