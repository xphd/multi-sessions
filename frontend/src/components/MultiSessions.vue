<template>
  <div>
    <p>MultiSessions</p>

    <button @click="init">init</button>
    <button @click="search">search</button>
    <button @click="getCurSession">getCurSession</button>
    <button @click="getOldSessions">getOldSessions</button>

    <div></div>

    <!-- <div>
<p>Old Sessions</p>
 <li v-for="session in old_sessions">

    </li>
    </div>-->
  </div>
</template>

<script>
export default {
  name: "multi-sessions",
  data() {
    return {
      curSession: null,
      old_sessions: null, // []
      selected_session: null
    };
  },
  methods: {
    getOldSessions() {
      console.log("getOldSessions");
      this.$socket.emit("getOldSessions");
    },
    getCurSession() {
      console.log("getCurSession");
      this.$socket.emit("getCurSession");
    },
    search() {
      console.log("search");
      this.$socket.emit("search");
    },
    init() {
      this.helloLoop();
      this.connect_ta2();
      console.log("init");
    },
    helloLoop() {
      // console.log("helloLoop");
      this.$socket.emit("helloLoop");
    },
    connect_ta2() {
      // console.log("connect_ta2");
      this.$socket.emit("connect_ta2");
    }
  },
  sockets: {
    // getDatasetsRes(datasets) {
    //   this.datasets = datasets;
    //   // console.log(this.datasets);
    // }
    curSession(sessionVar) {
      // console.log(sessionVar);
      this.curSession = sessionVar;
    },
    oldSessions(old_sessions) {
      // console.log(old_sessions);
      this.old_sessions = old_sessions;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>