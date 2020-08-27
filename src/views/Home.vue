<template>
  <div>
    <Cabecera/>
    <Cuerpo/>
    <Footer/>
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue'
import Cuerpo from '@/components/Cuerpo.vue'
import Cabecera from '@/components/Cabecera.vue'
import { mapActions } from 'vuex'
export default {
    name: 'Home',
    components: {
    Cabecera,
    Footer,
    Cuerpo
  },

  mounted(){
    this.listarEspecialidades()
  },

  methods: {
    ...mapActions(['listarEspecialidades'])
  }
}
</script>
<style lang="scss" scoped>
.home{
  background-color: #ffffff;
}
</style>