<template>
  <div >
      
    <b-carousel

        id="carousel-fade"
        white_bg
        fade
        indicators
        img-width="1024"
        img-height="480"    
        
    >
      
      <b-carousel-slide>
        <div class="d-flex h-100 align-items-left justify-content-center">
          <div >
            <h3 class="white_bg">"Somos el enlace hacia tu salud."</h3>    
          </div>
        </div>
        <template v-slot:img>
          <b-img 
            class="d-block img-fluid w-100"
          :src="require('../assets/fond2.jpg')"></b-img>
        </template>
      </b-carousel-slide>
      <b-carousel-slide>
      
        <div class="d-flex h-100 align-items-left justify-content-center ">
          <div >
            <h3 class="white_bg">Si deseas un enlace con los mejores doctores a tu servicio. Ingresa!</h3>
           <router-link to="/loginpaciente" tag="button" class="black">Paciente</router-link>
          </div>
        </div>
        <template v-slot:img>
          <img
          
            class="d-block img-fluid w-100"
            width="1024"
            height="480"
            src="../assets/fond3.jpg"
            alt="image slot"
          >
        </template>
      </b-carousel-slide>
      <b-carousel-slide>
        <div class="d-flex h-100 align-items-left justify-content-center ">
          <div >
            <h3 class="white_bg">Si eres un profesional de la salud y deseas dar consulta. Ingresa!</h3>
            <router-link to="/logindoctor" tag="button" class="black">Médico</router-link>
          </div>
        </div>
        
      
        <template v-slot:img>
          <img
            class="d-block img-fluid w-100"
            width="1024"
            height="480"
            src="../assets/imagen8.jpg"
            alt="image slot"
          >
        </template>
      </b-carousel-slide>
    </b-carousel>
    
    <div class="pad" id="nosotros">
   <div class="container">
      <div class="row">
            <div class="col-xl-8">
                  <h3><strong>"No hay mejor medicina que tener pensamientos alegres"</strong><br><span>Autor de la frase</span></h3>
            </div>
            <div class="col-xl-4">
                <router-link to="/loginpaciente" tag="button">Reservar tu Cita</router-link>
            </div>
         
      </div>
   </div>
</div>
  </div>
</template>

<script>
  export default {
      name:  'Slider',
    data() {
      return {
        slide: 0,
        sliding: null
      }
    },
    methods: {
      onSlideStart() {
        this.sliding = true
      },
      onSlideEnd() {
        this.sliding = false
      },
      login(){
            this.$router.push('/login')
        },
    }
  }
</script>

<style scoped>
    .carousel-item img {
        height:100vh!important ;
    }

    

    .white_bg{
        color: #025f8ace ;
        background-color: rgba(255, 255, 255, 0.664);
        padding: 5px 10px;
       
    }
    
a {
    margin: 0px;
    padding: 0px;
    
}

h1, h2,  h4, h5, h6{
    color: #025f8ace ;
    
}

h3{
  font-family: 'PT Sans';
  color: #025f8ace ;
  font-style: italic;
}


.pad_100{
    padding: 50px 0px;
}
.center {
    text-align: center;
    margin: 0px auto;
}

button {
    background-color: transparent;
    text-transform: uppercase;
    border: 1px solid #025f8ace ;
    padding: 10px 20px;
    margin: 5px 0px;
    color: #025f8ace ;
    font-size: 14px;
    letter-spacing: 1px;
    cursor: pointer;
    opacity: 0.7;
    font-weight: bold;
}
button:hover {
    opacity: 1;
    background-color: #03a8f4d5 ;
    color: white; 
}
.black {
    background-color: #03a8f4d5 ;
    opacity: 1;
    color: white; 
}
.black a {
    color : white; 
}
.black:hover {
    background-color: #FFFFFF;
    border: 1px solid #FFFFFF; 
    color: #03a8f4d5 ;
}

.black:hover a {
    color: #03a8f4d5 ;
}
</style>

