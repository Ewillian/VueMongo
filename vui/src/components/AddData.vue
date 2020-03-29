<template>
  <div class="container">
    <input id="collectionName" value='d' style="display: none">
    <h1>{{collectionName}}</h1>

    <form action="" method="post">
      <br/><br/><label for="input-file">Fichier à importer :</label><br>
      <input type="file" id="input-file" accept='.json'><br/><br/>
      <textarea id="content-target" @input="handleJsonFile($event.target.value)"></textarea><br/>

            <span>Le message multiligne est :</span>
      <p style="white-space: pre-line;">{{ fileContent }}</p><br>

      <router-link :to="{ name: 'sendData', params: {collectionName, fileContent}}"><button id='send' type='submit'>Envoyer</button></router-link>
    </form>

  </div>
</template>

<script>
import ExportService from '../ExportService.js'
import axios from 'axios'
export default {
  name: 'ExportVue',
  data: function() {
    return {
      collectionName: this.$route.params.collection_name,
      fileContent: ""
    };
  },

  methods: {
    handleCollection(value) {
      this.collectionName = value;
    },
    handleJsonFile(value) {
        this.fileContent = value;
        console.log(value)
    }
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