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
