<template>

  <div class="container">
    <div id="nav">
      <router-link :to="{ name: 'GetCols'}">Retour</router-link>
    </div>
    <h1>{{collection_name}}:</h1>
    <p class="error" v-if="error">{{error}}</p>

    <table>
      <thead>
        <tr>
          <th v-for="(data, index) in keys"
              v-bind:item="data"
              v-bind:index="index"
              v-bind:key="data.id">{{ data }}</th>
          <th> Actions </th>
        </tr>
      </thead>
      <tbody>
          <tr v-for="(data, index) in values"
              v-bind:item="data"
              v-bind:index="index"
              v-bind:key="data.id">
            <td v-for="(value, index) in data"
              v-bind:item="value"
              v-bind:index="index"
              v-bind:key="value.id">{{ value }}</td>
            <router-link :to="{ name: 'GetOne', params: { data_id: data._id , collection_name: collection_name}}">📄</router-link>
            <router-link :to="{ name: 'DelOne', params: { data_id: data._id , collection_name: collection_name}}">🗑️</router-link>
            <router-link :to="{ name: 'UpOne', params: { data_id: data._id , collection_name: collection_name}}">✍🏻</router-link>
          </tr>
      </tbody>
    </table>
    
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'GetAllVue',
  data() {
    return {
      keys: [],
      values: [],
      error: '',
      text:'',
      collection_name: ''
    }
  },
  // props: ['collection_name'],
  async created() {
    axios.get(`http://localhost:6060/import/all/${this.$route.params.collection_name}`)
    .then(response => { 
      this.keys = Object.keys(response.data.json_to_object[0])
      this.values = Object.values(response.data.json_to_object)
      this.collection_name = this.$route.params.collection_name
      this.$options.collection_name = this.$route.params.collection_name
    })
    .catch(e => {
      this.errors = e
    })
  }
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