import Vue from "vue";
// Import component
import Loading from "vue-loading-overlay"
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";

// Init plugin
Vue.use(Loading);



function cargar (){
    console.log("asdasdsd")
    let loader = Loading.show({
        // Optional parameters
        color: "#0099a1",
        container: false ,
        canCancel: false,
        loader: "dots",
        height: 150,
        width: 130,
      });
      // simulate AJAX
      setTimeout(() => {
        loader.hide();
      }, 3000);
};

export default cargar