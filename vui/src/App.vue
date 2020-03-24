<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
  <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/getone">GetOne</router-link> |
      <router-link to="/upload">Upload</router-link> |
      <router-link to="/getall">Afficher l'ensemble des données</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
