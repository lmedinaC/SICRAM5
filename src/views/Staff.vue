<template>
  <div class="Staff">
    <Navbar></Navbar>
    
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
export default {
    name: 'Admin',
    components: {
    Navbar,
  },
}
</script>

<style lang="scss" scoped>
.Staff{
  background-color: #ffffff;
}
</style>