<template>
  <div class="container">
    
    <h3>{{text}}</h3>
    <router-link :to="{ name: 'GetAll', params: {collection_name}}">Retourner vers la collection</router-link>


  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'PatchConfirm',
  data() {
      return {
        text:'Données ajoutées avec succès ! :-)',
        collection_name: "",
        content: {}
      }
  },
  async created() {
    this.collection_name = this.$route.params.collection_name
    console.log(this.$route.params.content_id)
      axios({
        method: 'put',
        url: `http://localhost:6060/upload/data/${this.$route.params.content_id}`,
        headers: {'Content-Type': 'application/json'}, 
        data: {
          content: this.$route.params.content,
          collection_name: this.$route.params.collection_name
        }
      }).then(result => {
        let res_code = result.data.code
        if(res_code == 500){
          this.text = "Une erreur est survenue."
          this.link = ""
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