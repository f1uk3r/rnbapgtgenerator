<template>
  <div id="app">
    <!--<div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>-->
    <router-view/>
  </div>
</template>

<script>
export default {
  metaInfo() {
    return {
      title: "r/nba PGT Generator: NBA Box score generator for reddit",
      meta: [
        { name: 'google-site-verification', content: 'UvVX21DKezblQnU__jtxPNwKe1cchG0tQLoiWFURkcE'},
        { name: 'description', content: 'NBA Box Score Generator: Generate complete NBA box score and post PGT on reddit with proper format' },
        { property: 'og:title', content: 'r/nba PGT generator - NBA Box score generator for Reddit' },
        { property: 'og:site-name', content: 'r/nba PGT generator' },
        { property: 'og:type', content: 'website'}
      ]
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
/*
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}*/
#atl {
  width: 40px;
  height: 40px;
  background: url(./assets/teams-logo.webp) 0 0;
}
#bos {
  width: 40px;
  height: 40px;
  background: url(./assets/teams-logo.webp) 200px 0;
}
#bkn {
  width: 40px;
  height: 40px;
  background: url(./assets/teams-logo.webp) 160px 0;
}
#cha {
  width: 40px;
  height: 40px;
  background: url(./assets/teams-logo.webp) 120px 0;
}
#chi {
  width: 40px;
  height: 40px;
  background: url(./assets/teams-logo.webp) 80px 0;
}
#sac {
  width: 40px;
  height: 40px;
  background: url(./assets/teams-logo.webp) 40px 0;
}
#cle {
  width: 40px;
  height: 40px;
  background: url(./assets/teams-logo.webp) 0 160px;
}
#dal {
  width: 40px;
  height: 40px;
  background: url(./assets/teams-logo.webp) 200px 160px;
}
#den {
  width: 40px;
  height: 40px;
  background: url(./assets/teams-logo.webp) 160px 160px;
}
#det {
  width: 40px;
  height: 40px;
  background: url(./assets/teams-logo.webp) 120px 160px;
}
#gsw {
  width: 40px;
  height: 40px;
  background: url(./assets/teams-logo.webp) 80px 160px;
}
#sas {
  width: 40px;
  height: 40px;
  background: url(./assets/teams-logo.webp) 40px 160px;
}
#hou {
  width: 40px;
  height: 40px;
  background: url(./assets/teams-logo.webp) 0 120px;
}
#ind {
  width: 40px;
  height: 40px;
  background: url(./assets/teams-logo.webp) 200px 120px;
}
#lac {
  width: 40px;
  height: 40px;
  background: url(./assets/teams-logo.webp) 160px 120px;
}
#lal {
  width: 40px;
  height: 40px;
  background: url(./assets/teams-logo.webp) 120px 120px;
}
#mem {
  width: 40px;
  height: 40px;
  background: url(./assets/teams-logo.webp) 80px 120px;
}
#tor {
  width: 40px;
  height: 40px;
  background: url(./assets/teams-logo.webp) 40px 120px;
}
#mia {
  width: 40px;
  height: 40px;
  background: url(./assets/teams-logo.webp) 0 80px;
}
#mil {
  width: 40px;
  height: 40px;
  background: url(./assets/teams-logo.webp) 200px 80px;
}
#min {
  width: 40px;
  height: 40px;
  background: url(./assets/teams-logo.webp) 160px 80px;
}
#nop {
  width: 40px;
  height: 40px;
  background: url(./assets/teams-logo.webp) 120px 80px;
}
#nyk {
  width: 40px;
  height: 40px;
  background: url(./assets/teams-logo.webp) 80px 80px;
}
#uta {
  width: 40px;
  height: 40px;
  background: url(./assets/teams-logo.webp) 40px 80px;
}
#okc {
  width: 40px;
  height: 40px;
  background: url(./assets/teams-logo.webp) 0 40px;
}
#orl {
  width: 40px;
  height: 40px;
  background: url(./assets/teams-logo.webp) 200px 40px;
}
#phi {
  width: 40px;
  height: 40px;
  background: url(./assets/teams-logo.webp) 160px 40px;
}
#phx {
  width: 40px;
  height: 40px;
  background: url(./assets/teams-logo.webp) 120px 40px;
}
#por {
  width: 40px;
  height: 40px;
  background: url(./assets/teams-logo.webp) 80px 40px;
}
#was {
  width: 40px;
  height: 40px;
  background: url(./assets/teams-logo.webp) 40px 40px;
}
</style>
