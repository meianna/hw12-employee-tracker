const inquirer = require("inquirer");
const mysql = require("mysql");
require("dotenv");
require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.password,
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
