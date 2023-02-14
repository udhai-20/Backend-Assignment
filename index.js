const express = require("express");
const exphandler = require("express-handlebars");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql");
require("dotenv").config();
const port = 8012;
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "crud_contact",
});
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const sqlGet = `SELECT * FROM contact_db`;
  db.query(sqlGet, (err, result) => {
    res.send(result);
  });
});
// app.get("", (req, res) => {
//   const sql = `INSERT INTO contact_db(name,email,contact) VALUES ('roger','roger@gmail.com',32522)`;
//   db.query(sql, (err, result) => {
//     if (err) {
//       console.log("err", err);
//     }
//     console.log("result", result);
//   });
//   res.send("welcome to mysql");
// });
app.listen(port, () => {
  console.log("listening on port" + port);
});
