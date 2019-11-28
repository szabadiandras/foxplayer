"use strict";

const mysql = require("mysql");
const express = require("express");
const path = require("path");
const PORT = 5000;
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

let conn = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "greenfox",
  database: "foxplayer"
});

conn.connect(function(err) {
  if (err) {
    console.log("Error connecting to Db");
    // console.log(err);
    return;
  }
  console.log("Connection to database established\n");
});

let app = express();
app.use(express.json());
app.use("/assets", express.static("assets"));
//app.use(express.static("./views"));
app.use(bodyParser.urlencoded({ extended: false }));

// END OF REQs & CONNs

// GET MAIN PAGE

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./views/index.html"));
});

// GET PLAYLIST-TRACKS

app.get("/playlist-tracks", (req, res) => {
  const query = "SELECT * FROM tracks";
  conn.query(query, (err, posts) => {
    res.setHeader("Content-type", "application/json");
    res.status(200);
    res.send(JSON.stringify(posts));
    console.log('Client request: "Get Playlist-Tracks".');
  });
});

// GET PLAYLISTS

app.get("/playlists", function(req, res) {
  //const query = "SELECT * FROM playlists;";
  const query = "SELECT * FROM playlists;"; //LEFT JOIN tracks ON playlists.id=tracks.playlist_id;";
  conn.query(query, (err, data) => {
    res.setHeader("Content-type", "application/json");
    res.status(200);
    res.send(JSON.stringify(data));
    console.log('Client request: "Get Playlists database".');
  });
});

// POST TO PLAYLIST

app.post("/playlists", jsonParser, function(req, res) {
  let newTitle = req.body.playlist;
  console.log(req.body);
  let query = `INSERT INTO playlists (playlist) VALUES (?);`;
  conn.query(query, [newTitle], (err, data) => {
    console.log(data);
    query = `SELECT * FROM playlists WHERE id=(SELECT MAX(id) FROM playlists);`;
    conn.query(query, (err, data) => {
      res.status(200);
      res.send(JSON.stringify(data));
    });
  });
});

// DELETE PLAYLIST

app.delete("/playlists/:id/remove", function(req, res) {
  const query = `DELETE FROM foxplayer.playlists WHERE id = ${req.params.id}`;
  conn.query(query, (err, del) => {
    console.log("Checking for errors: " + err);
    const query = `SELECT * FROM playlists WHERE id=${req.params.id}`;
    conn.query(query, (err, del) => {
      res.setHeader("Content-type", "application/json");
      res.status(200);
      res.send(JSON.stringify(del));
      console.log(
        `Client request: "Delete playlist with id: '${req.params.id}' from database".`
      );
    });
  });
});

// PORT

app.listen(PORT, () => {
  console.log(`\nServer is running\nListening on port ${PORT}`);
});
