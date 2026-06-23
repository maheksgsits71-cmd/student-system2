const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");


const app = express();



app.use(cors({
  origin: "http://127.0.0.1:5500",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));


app.use(express.json());
app.use(express.static(path.join(__dirname, "frontend")));


// MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Mahek@sql09",
  database: "student_db"
});

db.connect((err) => {
  if (err) {
    console.log("DB error ❌", err);
  } else {
    console.log("MySQL Connected 🟢");
  }
});

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Backend working 🚀");
});

// ADD STUDENT
app.post("/students", (req, res) => {
  console.log("POST HIT:", req.body);

  const sql = "INSERT INTO students SET ?";

  db.query(sql, req.body, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("DB Error");
    }
    res.send("Student added successfully");
  });
});

// GET STUDENTS
app.get("/students", (req, res) => {
  db.query("SELECT * FROM students", (err, result) => {
    if (err) {
      res.send("Error");
    } else {
      res.json(result);
    }
  });
});

app.listen(5001, () => {
  console.log("Server running on 5001");
});
