<template>
  <div>
    <p>MultiSessions</p>

    <button @click="init">init</button>
    <button @click="search">search</button>
    <button @click="getCurSession">getCurSession</button>
    <button @click="getAllSessions">getAllSessions</button>

    <div>
      <h1>Current Session</h1>
      {{curSession}}
    </div>

    <div>
      <h1>Sessions</h1>
      <ul v-for="search_id in search_ids " :key="search_id">
        <input type="radio" :value="search_id" v-model="selected">
        {{search_id}}
      </ul>
      <button @click="getSelected">getSelected</button>
    </div>

    <div>
      <h1>Solutions</h1>
      <ul v-for="solution_id in solutions_id " :key="solution_id">{{solution_id}}</ul>
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

      // search_id identifies session
      search_ids: null, // []

      selected: null,
      solutions_id: null
      // items: ["a", "b", "c"],
      // selected_item: null
    };
  },
  methods: {
    getSelected() {
      console.log("getSelected");
      if (this.selected) {
        this.$socket.emit("getSelected", this.selected);
      } else {
        console.log("selected is:", this.selected);
      }
    },
    getAllSessions() {
      console.log("getAllSessions");
      this.$socket.emit("getAllSessions");
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
    solutions_id(solutions_id) {
      this.solutions_id = solutions_id;
    },
    curSession(sessionVar) {
      // console.log(sessionVar);
      this.curSession = sessionVar;
    },
    allSessions(search_ids) {
      // console.log(sessions);
      this.search_ids = search_ids;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>