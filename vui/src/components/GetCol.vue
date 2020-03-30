<template>

  <div class="container">
    <p class="error" v-if="error">{{error}}</p>
    <h1>Vos Collections:</h1>
    <div v-for="(data, index) in collection_objects"
              v-bind:item="data"
              v-bind:index="index"
              v-bind:key="data.id"> 
      <h2> {{data.name}} </h2>

      <table>
        <thead>
          <tr>
            <th v-for="(label, index) in data.keys"
                v-bind:item="label"
                v-bind:index="index"
                v-bind:key="label.id">{{ label }}</th>
            <th> Actions </th>
        </tr>
        </thead>
        <tbody>
          <tr>
            <td v-for="(value, index) in data.content"
                v-bind:item="value"
                v-bind:index="index"
                v-bind:key="value.id">{{ value }}</td>
            <router-link :to="{ name: 'GetAll', params: { collection_name: data.name}}">📄</router-link>
            <router-link :to="{ name: 'DelCol', params: { collection_name: data.name}}">🗑️</router-link>
          </tr>
        </tbody>
      </table>

      <br>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'GetCollectionsVue',
  data() {
    return {
      keys: [],
      values: [],
      collection_objects: [],
      error: '',
      text:''
    }
  },
  async created() {
    let i = 0
    axios.get("http://localhost:6060/import/collections")
    .then(response => { 
      this.keys.push("Collection Name")
      Object.values(response.data.collections_names).forEach(element => {
        let Object_Collection = {}
        Object_Collection.name = element.name
        i++
        axios.get(`http://localhost:6060/import/all/${element.name}`)
        .then(response => {
          let values_array = response.data.json_to_object[0]
          delete values_array["__v"]
          Object_Collection.content = Object.values(values_array)
          Object_Collection.keys = Object.keys(values_array)
          this.collection_objects.push(Object_Collection)
        }).catch(e => {
          this.errors = e
        })
      })
    }).catch(e => {
      this.errors = e
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