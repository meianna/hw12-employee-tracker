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
          "add department",
          "add role",
          "add employee",
          "view all departments",
          "view all roles",
          "view all employees",
          "update departments",
          "update role",
          "update employees",
          "exit application",
        ],
        name: "navigation",
      },
    ])
    .then(function (userChoice) {
      switch (userChoice.navigation) {
        case "add department":
          addDepartment();
          break;
        default:
          connection.end;
      }
      switch (userChoice.navigation) {
        case "add role":
          addRole();
          break;
        default:
          connection.end;
      }
      switch (userChoice.navigation) {
        case "add employee":
          addEmployee();
          break;
        default:
          connection.end;
      }
      switch (userChoice.navigation) {
        case "view all departments":
          viewDepartments();
          break;
        default:
          connection.end;
      }
      switch (userChoice.navigation) {
        case "view all roles":
          viewRoles();
          break;
        default:
          connection.end;
      }
      switch (userChoice.navigation) {
        case "view all employees":
          viewEmployees();
          break;
        default:
          connection.end;
      }
    });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
      },
    ])
    .then(function (res) {
      connection.query(
        "INSERT INTO department (name) VALUES (?);",
        [res.name],
        function (err, data) {
          if (err) {
            console.log(err);
            throw err;
          }
          console.log("department added");
          display();
        }
      );
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
        type: "input",
        name: "department_id",
      },
    ])
    .then(function (res) {
      connection.query(
        "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);",
        [res.title, res.salary, res.department_id],
        function (err, data) {
          if (err) {
            console.log(err);
            throw err;
          }
          console.log("role added");
          display();
        }
      );
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
      },
      {
        type: "input",
        name: "last_name",
      },
      {
        type: "input",
        name: "role_id",
      },
      {
        type: "input",
        name: "manager_id",
      },
    ])
    .then(function (res) {
      connection.query(
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);",
        [res.first_name, res.last_name, res.role_id, res.manager_id],
        function (err, data) {
          if (err) {
            console.log(err);
            throw err;
          }
          console.log("employee added");
          display();
        }
      );
    });
}
