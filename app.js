const inquirer = require("inquirer");
const mysql = require("mysql");
require("dotenv").config();
require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.DB_PASS,
  database: "employees_db",
});

connection.connect(function (err) {
  if (err) {
    console.log("error connecting to database", err);
  } else {
    display();
  }
});

function display() {
  inquirer
    .prompt([
      {
        type: "rawlist",
        choices: [
          "add role",
          "add employee",
          "add department",
          "display all departments",
          "display all roles",
          "display all employees",
          "update role",
          "update departments",
          "update employees",
          "exit application",
        ],
        name: "navigation",
      },
    ])
    .then(function (userChoice) {
      switch (userChoice.navigation) {
        case "add role":
          addRole();
          break;
        default:
          connection.end;
      }
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
      },
      {
        type: "input",
        name: "salary",
      },
      {
        type: "list",
        name: "department_id",
        choices: [1, 2, 3],
      },
    ])
    .then(function (userData) {
      connection.query(
        "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);",
        [userData.title, userData.salary, userData.department_id],
        function (err, data) {
          if (err) {
            console.log(err);
            throw err;
          }
          console.log("role updated");
          display();
        }
      );
    });
}
