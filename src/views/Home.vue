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
    name: 'Home',
    components: {
    Cabecera,
    Footer,
    Cuerpo
  },
}
</script>
<style lang="scss" scoped>
.home{
  background-color: #ffffff;
}
</style>