<template>
  <div class="citaPaciente">
    <div class="container">
      <h3 class="titulo">CONSULTA MÉDICA VIRTUAL</h3>
      <h6>Titulo de la videollamada</h6>
      <div class="sesion">
        <div class="videollamada">
            <Session></Session>
        </div>
        <div class="botonSalir">
          <button class="colgar">
            <i class="fas fa-phone-slash fa-2x"
              @click="colgarLlamada()"  
            ></i>
          </button>
        </div>
      </div>
    </div>
    <simplert :useRadius="true" :useIcon="true" ref="simplert"> </simplert>
    <simplert :useRadius="true" :useIcon="true" ref="simplert1"> </simplert>
  </div>
</template>

<script>
import Simplert from "@/components/Simplert.vue";
import Session from '../components/Session.vue'
import { mapActions } from 'vuex';
export default {
  name: "citaPaciente",
    components:{
        Session,
        Simplert
    },
    methods:{
      ...mapActions(['obtenerCita']),
      colgarLlamada(){
        let obj2 = {
            title: 'SALIR DE LA SESIÓN',
            message: '¿Seguro que desea salir de la sesión?',
            type: 'info',
            useConfirmBtn: true,
            onConfirm: this.salir
        }
        this.$refs.simplert1.openSimplert(obj2)
      },
      salir(){
      window.location.assign("/pacientevista")
      }
    },
    created(){
      this.obtenerCita()
    }
};
</script>

<style lang="scss" scoped>
.citaPaciente {
  height: 100vh;
  background-color: #c8def3;
  padding-left: 50px;
  padding-right: 50px;
  padding-bottom: 50px;
  padding-top: 25px;
}
.titulo {
  margin: 10px;
}
.sesion{
    box-shadow: 0 0 7px 3px rgb(105, 110, 110);
}

.videollamada {
  background-color: #000000;
  height: 65vh;
  border: 1px solid;
}

.botonSalir {
  
  text-align: center;
  height: 13vh;
  background-color: #f0eeee;
  border: 1px solid;
  .colgar {
    box-shadow: 0 0 5px 3px rgb(168, 179, 179);
    border-radius: 100%;
    border: none;
    transition: 0.5s ease-out;
    margin: 12px;
    color: red;
    width: 50px;
    height: 50px;
    &:hover {
      box-shadow: 0 0 5px 3px rgb(106, 110, 110);
    }
  }

}

@media (max-width: 768px) {
  .citaPaciente {
    padding-left: 10px;
    padding-right: 10px;
  }
  .titulo {
    text-align: center;
  }
}

@media (max-width: 425px) {
  .citaPaciente {
    padding-left: 3px;
    padding-right: 3px;
    padding-top: 5px;
  }
}
</style>
