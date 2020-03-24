<template>

  <div class="container">
    <h1>Contents:</h1>
    <p class="error" v-if="error">{{error}}</p>

    <table>
      <thead>
        <tr>
          <th v-for="(data, index) in keys"
              v-bind:item="data"
              v-bind:index="index"
              v-bind:key="data.id">{{ data }}</th>
        </tr>
      </thead>
      <tbody>
          <tr>
            <td v-for="(data, index) in values"
              v-bind:item="data"
              v-bind:index="index"
              v-bind:key="data.id">{{ data }}</td>
          </tr>
      </tbody>
    </table>
    
  </div>
</template>

<script>


import ImportService from '../ImportService.js'
import axios from 'axios'
export default {
  name: 'ImportVue',
  data() {
    return {
      keys: [],
      values: [],
      error: '',
      text:''
    }
  },
  async created() {
    axios.get("http://localhost:6060/import/5e77a0440c34e7418d99d175")
    .then(response => { 
      this.keys = Object.keys(response.data.json_to_object)
      this.values = Object.values(response.data.json_to_object)
      console.log(this.keys)
      console.log(this.values)
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