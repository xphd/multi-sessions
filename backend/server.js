"use strict";
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const serverSocket = socketIO(server, { origins: "*:*" });

const PORT = 9090;
server.listen(PORT);
console.log("Server listening " + PORT);

const grpcClientWrapper = require("./Wrapper/Wrapper.js");
const TA2PORT = "localhost:50054";

// let datasets_path = "./static/local_testing_data";
// let datasets = fs.readdirSync(datasets_path);

serverSocket.on("connection", socket => {
  let promise = null;
  console.log("Server: connected!");

  socket.on("getSelected", selected => {
    let sessions = grpcClientWrapper.props.sessions;
    if (sessions) {
      let solutions = sessions.get(selected).solutions;
      let solutions_id = Array.from(solutions.keys());
      console.log(solutions_id);
      socket.emit("solutions_id", solutions_id);
    }
  });

  socket.on("getAllSessions", () => {
    let sessions = grpcClientWrapper.props.sessions;
    if (sessions) {
      let search_ids = Array.from(sessions.keys());
      console.log(sessions);
      socket.emit("allSessions", search_ids);
    }
  });

  socket.on("getCurSession", () => {
    let sessionVar = grpcClientWrapper.props.sessionVar;
    console.log(sessionVar);
    socket.emit("curSession", sessionVar);
  });

  socket.on("search", () => {
    if (promise) {
      console.log("search");
      promise.then(grpcClientWrapper.searchSolutions);
    }
  });

  socket.on("helloLoop", () => {
    console.log("helloLoop");
    promise = grpcClientWrapper.helloLoop();
    // .then(grpcClientWrapper.searchSolutions);
  });

  socket.on("connect_ta2", () => {
    console.log("connect_ta2!");
    grpcClientWrapper.connect(TA2PORT);
  });
});
