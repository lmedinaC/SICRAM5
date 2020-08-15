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
export default {
    name: 'VistaPrueba',
    components: {
    Cabecera,
    Footer,
    Cuerpo
  },
}
</script>

<style>

</style>