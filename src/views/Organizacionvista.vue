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
import InicioDoctor from "@/components/InicioDoctor.vue";
import PerfilDoctor from "@/components/PerfilDoctor.vue";
import ActualizarDoctor from "@/components/ActualizarDoctor.vue";
import ModificarHorarioDoc from "@/components/ModificarHorarioDoc.vue";
import AgregarHorarioDoc from "@/components/AgregarHorarioDoc.vue";
import CitaPendienteDoctor from "@/components/CitaPendienteDoctor.vue";

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
    InicioDoctor,
    PerfilDoctor,
    ActualizarDoctor,
    ModificarHorarioDoc,
    AgregarHorarioDoc,
    CitaPendienteDoctor
  },

  computed: {
    ...mapState(["componenteVistaOrganizacion","usuarioOrganizacion", "idOrganizacion"]),
  },
  methods:{
    ...mapActions(['setObjOrganizacion']),
    getPaciente() {
      this.usuario = this.usuarioOrganizacion;
       let url =
        `https://sicramv1.herokuapp.com/api/organizacion/perfil/${this.idOrganizacion}`;
      this.axios
        .get(url, {
          headers: {
            Authorization: `${this.usuario}`,
          },
        })
        .then((res) => {
        
          this.datosUsuario = res.data;
          this.setObjOrganizacion(this.datosUsuario)
        })
        .catch((e) => {
          this.mensaje = e;
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
