DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;
USE employees_db;

CREATE TABLE department(
	id INT AUTO_INCREMENT, 
    name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE role(
	id INT AUTO_INCREMENT, 
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT references department(id),
    PRIMARY KEY (id)
);

CREATE TABLE employee(
	id INT AUTO_INCREMENT, 
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT references role(id),
    manager_id INT, 
    PRIMARY KEY (id)
);

