<template>
  <div>
      <div class="container-fluid ">
        <div class="row">
            <div class="col-md-9 pantalla">
                <Session></Session>
                <div class="botones-pantalla">
                    
                    <button class="colgar"><i class="fas fa-phone-slash"></i></button>
                    
                </div>
            </div>
            <div class="col-md-3 detalles">
                <div class="cabecera">
                    <span class="font-weight-bold">Detalles</span>
                </div>
            </div>    
        </div>
        
    </div>
  </div>
</template>

<script>
import Session from '../components/Session.vue'
export default {
    name:"CitaPaciente",
    components:{
        Session,
    }
}
</script>

<style scoped>
.pantalla{
    height: 100vh;
    width: 100wh;
    padding: 0;
    margin: 0;
    position: relative;
    background-color: rgb(26, 26, 26);
}

.detalles{
    border: 1px solid rgb(31, 31, 31);
    height: 100vh;
    width: 100wh;
    padding: 0;
    position: relative;
}


.detalles .cabecera{
    border-bottom: 1px solid rgb(31, 31, 31);
    width: 100wh;
    padding: 10px;
}


.botones{
    display: flex;
    flex-direction: column;
    
}

.botones button{
    background: rgb(27, 150, 172);
    border: none;
    margin-left: 5px;
    margin-right: 5px;
    margin-top: 5px;
    border-radius: 5px;

}

.botones button:hover{
    background: rgb(41, 187, 151);
    border: none;
    
}

.pantalla .botones-pantalla{
    width: 100%;
    height: 70px;
    border-top: 2px solid rgb(48, 140, 177);
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
}

.pantalla .botones-pantalla button{
    width: 50px;
    height: 50px;
}

.pantalla .botones-pantalla .colgar{
    
    border-radius: 100%;
    margin-left: 12px;
    margin-right: 12px;
    color: red;
    border: none;
    transition: 0.5s ease-out;

}

.pantalla .botones-pantalla .colgar:hover{
    box-shadow: 0 0 5px 3px rgb(184, 192, 192);

}
</style>

