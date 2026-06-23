CREATE DATABASE student_db;

USE student_db;

CREATE TABLE students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  enrollment_number VARCHAR(50),
  email VARCHAR(100),
  mobile VARCHAR(15),
  branch VARCHAR(50)
);
