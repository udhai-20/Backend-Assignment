const express = require("express");
const exphandler = require("express-handlebars");
const cors = require("cors");
const app = express();
// const bodyParser = require("body-parser");
const mysql = require("mysql");
require("dotenv").config();

const port = 8012;
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "crud_contact",
});
app.use(cors());
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/v1/get", (req, res) => {
  const sqlGet = `SELECT * FROM contact_db`;
  db.query(sqlGet, (err, result) => {
    res.send(result);
  });
});
//post`
app.post("/api/v1/post", (req, res) => {
  try {
    const { name, email, contact } = req.body;
    const sqlInsert = `INSERT INTO contact_db(name,email,contact) VALUES (?,?,?)`;
    const values = [name, email, contact];
    db.query(sqlInsert, values, (err, result) => {
      if (err) res.send(err);
      console.log(result);
    });
  } catch (err) {
    console.log(err);
  }
});
//delete
app.delete("/api/v1/delete/:id", (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const sqlRemove = `DELETE FROM contact_db WHERE id=?`;

    db.query(sqlRemove, id, (err, result) => {
      if (err) res.send(err);
      console.log(result);
    });
  } catch (err) {
    console.log(err);
  }
});
//indvidual
app.get("/api/v1/get/:id", (req, res) => {
  const { id } = req.params;
  const sqlGet = `SELECT * FROM contact_db where id=?`;
  db.query(sqlGet, id, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});
//update
app.put("/api/v1/put/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, contact } = req.body;
  const sqlGet = `UPDATE contact_db SET name=?,email=?,contact=? WHERE id=?`;
  console.log("  sqlGet:", sqlGet);
  const value = [name, email, contact, id];
  db.query(sqlGet, value, (err, result) => {
    if (err) {
      console.log(err);
    }
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
