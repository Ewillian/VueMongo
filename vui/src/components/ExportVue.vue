<template>

  <div class="container">
    <h1>Contents:</h1>
    <h3>Saisir un nom pour la base</h3>
    <input type="text" id="CollectionName" value="">
    <br/><br/><label for="input-file">Fichier à importer</label><br>
    <input type="file" id="input-file" accept='.json'><br/><br/>
    <textarea id="content-target"></textarea><br/>
    <button id='send' type='submit'>Envoyer</button>
  </div>
</template>

<script>


import ExportService from '../ExportService.js'
import axios from 'axios'
export default {
  name: 'ExportVue'
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