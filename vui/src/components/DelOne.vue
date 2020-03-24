<template>

  <div class="container">
    <h1>Suppréssion en cours...</h1>
    <p class="error" v-if="error">{{error}}</p>
    <p> {{text}} </p>
    <router-link to="/getall">Retour à l'afficage des données.</router-link>
  </div>
</template>

<script>


import ImportService from '../ImportService.js'
import axios from 'axios'
export default {
  name: 'DelOneVue',
  data() {
    return {
      text:''
    }
  },
  async created() {
    axios.delete(`http://localhost:6060/import/${this.$route.params.data_id}`)
    .then(response => { 
      this.text = "Votre demande à été éffectué !"
    })
    .catch(e => {
      this.errors.push(e)
    })

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.container {
  max-width: 800px;
  margin: 0 auto;
}

p.error {
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding: 10px;
  margin-bottom: 15px;
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

table {
  border: 2px solid #42b983;
  border-radius: 3px;
  background-color: #fff;
}

th {
  background-color: #42b983;
  color: rgba(255,255,255,0.66);
}

td {
  background-color: #f9f9f9;
}

th, td {
  min-width: 120px;
  padding: 10px 20px;
}


</style>