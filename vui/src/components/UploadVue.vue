<template>
  <div class="container">

    <h3>Saisir un nom pour la base</h3>

      <input id="collectionName" @input="handleCollection($event.target.value)">
      <br/><br/><label for="input-file">Fichier à importer (<u>1 seule donnée</u>) :</label><br><br>
    <input type="file" id="files" name="file" /><br /><br>
    <button id="readBytesButtons" @click="readButton()">Valider (double clic)</button><br><br>
    <div id="byte_range"></div>
    <div id="byte_content"></div>

      <router-link :to="{ name: 'sendData', params: {collectionName, fileContent}}"><button id='send' type='submit' @click="handleJsonFile()">Envoyer</button></router-link>




  </div>
</template>

<script>
import ExportService from '../ExportService.js'
import axios from 'axios'
export default {
  name: 'ExportVue',
  data: function() {
    return {
      collectionName: "",
      fileContent: ""
    };
  },

  methods: {
    handleCollection(value) {
      this.collectionName = value;
    },
    handleJsonFile() {
        this.fileContent = document.getElementById('byte_content').textContent
    },
    readButton() {
      document.getElementById('readBytesButtons').addEventListener('click', function(evt) {
        if (evt.target.tagName.toLowerCase() == 'button') {
          var startByte = evt.target.getAttribute('data-startbyte')
          var endByte = evt.target.getAttribute('data-endbyte')

          function readBlob(opt_startByte, opt_stopByte) {
            var files = document.getElementById('files').files;
            if (!files.length) {
              alert('Veuillez sélectionner un fichier')
              return
            }

            var file = files[0];
            var start = parseInt(opt_startByte) || 0;
            var stop = parseInt(opt_stopByte) || file.size - 1;
            var reader = new FileReader()

            reader.onloadend = function(evt) {
              if (evt.target.readyState == FileReader.DONE) { 
                document.getElementById('byte_content').textContent = evt.target.result
              }
            }
            var blob = file.slice(start, stop + 1);
            reader.readAsBinaryString(blob);
          }
          readBlob(startByte, endByte);
        }
      }, false);
    },
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.container {
  max-width: 800px;
  margin: 0 auto;
}

div.data {
  position: relative;
  border: 1px solid #5bd658;
  background-color: #bcffb8;
  padding: 10px 10px 30px 10px;
  margin-bottom: 15px;
}

div.created-at {
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15px 5px 15px;
  background-color: darkgreen;
  color: white;
  font-size: 13px;
}

p.text {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}
</style>