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

connection.connect((err) => {
  if (err) {
    console.log("error connecting to database", err);
  } else {
    display();
  }
});

const display = () => {
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
          "update employee role",
          "exit application",
        ],
        name: "navigation",
      },
    ])
    .then((userChoice) => {
      switch (userChoice.navigation) {
        case "add department":
          addDepartment();
          break;
        case "add role":
          addRole();
          break;
        case "add employee":
          addEmployee();
          break;
        case "view all departments":
          viewDepartments();
          break;
        case "view all roles":
          viewRoles();
          break;
        case "view all employees":
          viewEmployees();
          break;
        case "update employee role":
          updateEmployee();
          break;
        default:
          connection.end();
          process.exit(0);
      }
    });
};

const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
      },
    ])
    .then((res) => {
      connection.query(
        "INSERT INTO department (name) VALUES (?);",
        [res.name],
        (err, data) => {
          if (err) {
            console.log(err);
            throw err;
          }
          console.log("department added");
          display();
        }
      );
    });
};

const addRole = () => {
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
    .then((res) => {
      connection.query(
        "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);",
        [res.title, res.salary, res.department_id],
        (err, data) => {
          if (err) {
            console.log(err);
            throw err;
          }
          console.log("role added");
          display();
        }
      );
    });
};

const addEmployee = () => {
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
    .then((res) => {
      connection.query(
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);",
        [res.first_name, res.last_name, res.role_id, res.manager_id],
        (err, data) => {
          if (err) {
            console.log(err);
            throw err;
          }
          console.log("employee added");
          display();
        }
      );
    });
};

const viewDepartments = () => {
  connection.query("SELECT * FROM department", (error, data) => {
    console.table(data);
    display();
  });
};

const viewRoles = () => {
  connection.query("SELECT * FROM role", (error, data) => {
    console.table(data);
    display();
  });
};

const viewEmployees = () => {
  connection.query("SELECT * FROM employee", (error, data) => {
    console.table(data);
    display();
  });
};

const updateEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "employee_id",
      },
      {
        type: "input",
        name: "new_role_id",
      },
    ])
    .then(function (res) {
      connection.query(
        "UPDATE employee SET role_id = ? WHERE id = ?;",
        [res.new_role_id, res.employee_id],
        (err, data) => {
          if (err) {
            console.log(err);
            throw err;
          }
          console.log("employee role updated");
          display();
        }
      );
    });
};
