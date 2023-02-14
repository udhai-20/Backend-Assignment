const express = require("express");
const exphandler = require("express-handlebars");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql");
require("dotenv").config();
const port = 8012;

app.use(express.json());
var connection = mysql.createConnection({
host: "localhost",
user: "root",
password: "123456",
database: "testdb",
});
connection.connect(function (err) {
if (err) throw err;
console.log("connected");
// multiple insertion
// var sql = "insert into marks(student_id,student_grade) values ?";
// var values = [
// [2, "A"],
// [2, "C"],
// [2, "D"],
// [5, "C"],
// [5, "A"],
// [5, "A"],
// [6, "D"],
// [6, "E"],
// [6, "F"],
// ];
//for getting students details fronm the table
const sql = "select \* from students";
connection.query(sql, function (err, results) {
if (err) throw err;
console.log("value inserted successfully", results);
});

const sql1 = "select \* from marks where student_grade=`F`";
connection.query(sql1, function (err, results) {
if (err) throw err;
console.log("value inserted successfully", results);
});
});

// app.listen(port, () => {
// console.log("listening on port" + port);
// });
