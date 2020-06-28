USE employees_db;

INSERT INTO department (name)
VALUES ("marketing");

INSERT INTO department (name)
VALUES ("finance");

INSERT INTO department (name)
VALUES ("development");

SELECT * FROM department;

INSERT INTO role (title, salary, department_id)
VALUES ("manager", 500000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("manager", 500000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("manager", 500000, 3);

SELECT * FROM role;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Meianna", "Oeser", 1, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sophia", "Plotkin", 2, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Lily", "Jones", 3, null);

SELECT * FROM employee;