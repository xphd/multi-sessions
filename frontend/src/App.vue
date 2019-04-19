<template>
  <div id="app">
    <multi-sessions/>
  </div>
</template>

<script>
import MultiSessions from "./components/MultiSessions.vue";

export default {
  name: "app",
  components: {
    MultiSessions
  },
  sockets: {
    connect() {
      console.log("Client: connecting.");
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
