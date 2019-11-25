"use strict";

const mysql = require("mysql");
const express = require("express");
const path = require("path");
const PORT = 5000;
const bodyParser = require("body-parser");

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
app.use(express.static("./views"));
app.use(bodyParser.urlencoded({ extended: false }));

// END OF REQs & CONNs



// GET MAIN PAGE

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./views/index.html"));
});

// PORT

app.listen(PORT, () => {
  console.log(`\nServer is running\nListening on port ${PORT}`);
});
