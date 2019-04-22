<template>
  <div>
    <p>MultiSessions</p>

    <button @click="init">init</button>
    <button @click="search">search</button>
    <button @click="getCurSession">getCurSession</button>
    <button @click="getOldSessions">getOldSessions</button>

    <div>
      <h1>Current Session</h1>
      {{curSession}}
    </div>

    <div>
      <h1>Old Sessions</h1>
      <ul v-for="search_id in search_ids " :key="search_id">
        <input type="radio" :value="search_id" v-model="selected">
        {{search_id}}
      </ul>
    </div>

    <!-- <div>
      <h1>List</h1>
      <ul>
        <li v-for="item in items " :key="item">
          <input type="radio" :value="item" v-model="selected_item">
          {{item}}
        </li>
      </ul>
    </div>-->
  </div>
</template>

<script>
export default {
  name: "multi-sessions",
  data() {
    return {
      curSession: null,
      search_ids: null, // []
      selected: null

      // items: ["a", "b", "c"],
      // selected_item: null
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
    oldSessions(search_ids) {
      // console.log(old_sessions);
      this.search_ids = search_ids;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>