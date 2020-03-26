<template>
  <div class="container">

    <h3>Saisir un nom pour la base</h3>

    <form action="" method="post">
      <input type="text" id="collectionName" value="">
      <br/><br/><label for="input-file">Fichier à importer</label><br>
      <input type="file" id="input-file" accept='.json'><br/><br/>
      <textarea id="content-target"></textarea><br/>
      <router-link :to="{ name: 'sendData', params: {collectionName}}"><button id='send' type='submit'>Envoyer</button></router-link>
    </form>

  </div>
</template>

<script>
import ExportService from '../ExportService.js'
import { collectionName } from '../ExportService'
import axios from 'axios'
export default {
  name: 'ExportVue',
  data () {
    return {
      collectionName: ""
    }
  },
  async created() {
    this.collectionName = collectionName
    //console.log(collectionName)
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