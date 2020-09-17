<template>
  <modal
    name="mod-firma"
    transition="pop-out"
    :width="350"
    :focus-trap="true"
    :height="250"
  >
    <div class="modal-content">
      <div class="firma">
        <vueSignature
          ref="signature"
          :sigOption="option"
          :w="'330px'"
          :h="'150px'"
          :disabled="disabled"
        ></vueSignature>
      </div>
      <div class="botones">
        <button class="btn boton-eliminar" @click="clear">Limpiar</button>
        <button class="btn boton" @click="save">Guardar</button>
      </div>
    </div>
  </modal>
</template>

<script>
import vueSignature from "vue-signature";
export default {
  name: "ModFirma",
  components: {
    vueSignature,
  },
  data() {
    return {
      option: {
        penColor: "rgb(0, 0, 0)",
        backgroundColor: "rgb(255,255,255)",
      },
      disabled: false,
    };
  },
  methods: {
    save() {
      var _this = this;
      var png = _this.$refs.signature.save();
      this.download(png, "firma.jpg");
    },
    clear() {
      var _this = this;
      _this.$refs.signature.clear();
    },
    download(dataURL, filename) {
      if (
        navigator.userAgent.indexOf("Safari") > -1 &&
        navigator.userAgent.indexOf("Chrome") === -1
      ) {
        window.open(dataURL);
      } else {
        var blob = this.dataURLToBlob(dataURL);
        var url = window.URL.createObjectURL(blob);

        var a = document.createElement("a");
        a.style = "display: none";
        a.href = url;
        a.download = filename;

        document.body.appendChild(a);
        a.click();

        window.URL.revokeObjectURL(url);
      }
    },
    dataURLToBlob(dataURL) {
      // Code taken from https://github.com/ebidel/filer.js
      var parts = dataURL.split(";base64,");
      var contentType = parts[0].split(":")[1];
      var raw = window.atob(parts[1]);
      var rawLength = raw.length;
      var uInt8Array = new Uint8Array(rawLength);

      for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }

      return new Blob([uInt8Array], { type: contentType });
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-content {
  width: 350px;
  height: 250px;
  background-color: rgba(225, 234, 243, 0.72);
}
.firma {
  padding: 10px;
}
.botones {
  margin-top: 5px;
  text-align: center;
}
.boton {
  color: #000;
  margin: 5px;
  background-color: #54c7c7;
  width: 100px;
  font-weight: bold;
  &:hover {
    background-color: #2aafaf;
  }
}
.boton-eliminar {
  color: #000;
  background-color: #d36e6e;
  font-weight: bold;
  margin: 5px;
  width: 100px;
  &:hover {
    background-color: #ce4343;
  }
}
</style>
