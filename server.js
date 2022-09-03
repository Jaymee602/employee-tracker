const db = require('./db/connection');
const inquirer = require('inquirer');
const mysql = require("mysql2");
const cTable = require("console.table");

db.connect(err => {
    if (err) throw err;
    console.log("========")
    console.log("Welcome!")
    console.log("========")
    mainMenu();
})

const mainMenu = () => {
    return inquirer
        .prompt([
            {
                type: "list",
                name: "options",
                message: "What would you like to do?",
                choices: [
                    "View all departments",
                    "View all roles",
                    "View all employees",
                    "Add a department",
                    "Add a role",
                    "Add an employee",
                    "Update an employee",
                    "Exit"
                ]
            }
    ])
    .then(answer => {
        switch (answer.options) {
            case "View all departments":
                viewDepartments();
                break;
            case "View all roles":
                viewRoles();
                break;
            case "View all employees":
                viewEmployees();
                break;
            case "Add a department":
                addDepartment();
                break;
            case "Add a role":
                addRole();
                break;
            case "Add an employee":
                addEmployee();
                break;
            case "Update an employee":
                updateEmployee();
                break;
            case "Exit":
                db.end()
                break; 
        };
    });
};


const viewDepartments = () => {
    const sql = "SELECT * FROM departments";
    db.query(sql, function (err, res) {
        if (err) {
            console.log(err);
            return;
        };

        console.table(res);
        mainMenu();
    });
};

const viewRoles = () => {
    const sql = "SELECT * FROM roles";
    db.query(sql, function (err, res) {
        if (err) {
            console.log(err);
            return;
        };

        console.table(res);
        mainMenu();
    });
};

const viewEmployees = () => {
    const sql = `SELECT employees.id, 
                        employees.first_name, 
                        employees.last_name, 
                        roles.title, 
                        departments.name AS department, 
                        roles.salary
                        FROM employees 
                        LEFT JOIN roles 
                        ON employees.role_id = roles.id 
                        LEFT JOIN departments 
                        ON roles.department_id = departments.id`

    db.query(sql, function (err, res) {
        if (err) {
            console.log(err);
            return;
        };

        console.table(res);
        mainMenu();
    });
};

const addDepartment = () => {
    inquirer
        .prompt({
            type: "input",
            name: "newDept",
            message: "Enter the name of the new department:"
        })
        .then(function (res) {
            const newDept = res.newDept;
            const sql = `INSERT INTO departments (name) VALUES ("${newDept}")`;

            db.query(sql, function (err, res) {
                if (err) {
                    console.log(err);
                    return;
                };
        
                console.table(res);
                mainMenu();
            });
        });
};

const addRole = () => {
    inquirer
        .prompt([
            {
                type: "input",
                name: "newRole",
                message: "Enter the job title of this new role:"
            },
            {
                type: "input",
                name: "salary",
                message: "Enter the salary for this role (e.g.: 60000):"
            },
            {
                type: "input",
                name: "deptID",
                message: "Enter the department ID for this role:"
            }
        ])
        .then(function (res) {
            const newRole = res.newRole;
            const salary = res.salary;
            const deptID = res.deptID;
            const sql = `INSERT INTO roles (title, salary, department_id) VALUES ("${newRole}", "${salary}", "${deptID}")`;

            db.query(sql, function (err, res) {
                if (err) {
                    console.log(err);
                    return;
                };
        
                console.table(res);
                mainMenu();
            });
        });
};

const addEmployee = () => {

};

const updateEmployee = () => {

};
