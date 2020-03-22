<template>

  <div class="container">
    <h1>Contents:</h1>
    <p class="error" v-if="error">{{error}}</p>
    <div class="DataContainer">
      <div class="data"
        v-for="(data, index) in results"
        v-bind:item="data"
        v-bind:index="index"
        v-bind:key="data.id"
      >
        <p class="text">{{results}}</p>
      </div>
    </div>
  </div>
</template>

<script>


import ImportService from '../ImportService.js'
import axios from 'axios'
export default {
  name: 'ImportVue',
  data() {
    return {
      results: {},
      error: '',
      text:''
    }
  },
  async created() {
    axios.get("http://localhost:6060/import/5e77a0440c34e7418d99d175")
    .then(response => {
      // JSON responses are automatically parsed.
      this.results = response.data
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
</style>