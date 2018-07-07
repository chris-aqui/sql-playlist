const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "kghost",
  database: "playlistDB"
});

connection.connect(function(err) {
  try {
    if (err) throw err;
  } catch (err) {
    console.log('some err')
  }
  console.log("connected as id " + connection.threadId);
  queryAllSongs();
  queryDanceSongs();
  connection.end();
});

function queryAllSongs() {
  console.log("|----------------All Songs-------------------|");
  connection.query("SELECT * FROM songs", function(err, res) {
    for (var i = 0; i < res.length; i++) {

      console.log(res[i].id + " | " + res[i].title + " | " + res[i].artist + " | " + res[i].genre);
    }
    console.log("|-----------------------------------|");
  });
}

function queryDanceSongs() {
  let query = connection.query("SELECT * FROM songs WHERE genre=?", ["Dance"], function(err, res) {
    console.log("|----------------Where my dance songs-------------------|");
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].id + " | " + res[i].title + " | " + res[i].artist + " | " + res[i].genre);
    }
  });
  // logs the actual query being run
  console.log(query.sql);
  console.log("|-----------------------------------|");
}