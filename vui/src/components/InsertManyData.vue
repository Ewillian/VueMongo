<template>
  <div class="container">
    
    <h3>{{text}}</h3>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'InsertManyData',
  data() {
      return {
          text:'Données ajoutées avec succès ! :-)'
      }
  },
  async created() {
    console.log(this.$route.params.fileContent)
      axios({
        method: 'post',
        url: `http://localhost:6060/upload/insertManyData/${this.$route.params.collectionName}`,
        headers: {'Content-Type': 'application/json'}, 
        data: {
          fileContent: this.$route.params.fileContent
        }
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