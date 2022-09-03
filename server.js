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
            const sql = `INSERT INTO roles 
                         (title, salary, department_id) 
                         VALUES ("${newRole}", "${salary}", "${deptID}")`;

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
    inquirer
    .prompt([
        {
            type: "input",
            name: "firstName",
            message: "Enter the first name of the new employee:"
        },
        {
            type: "input",
            name: "lastName",
            message: "Enter the last name of the new employee:"
        },
        {
            type: "input",
            name: "roleID",
            message: "Enter the role ID for this employee:"
        },
        {
            type: "input",
            name: "mgmtID",
            message: "Enter the ID of this employee's manager:"
        }
    ])
    .then(function (res) {
        const firstName = res.firstName;
        const lastName = res.lastName;
        const roleID = res.roleID;
        const mgmtID = res.mgmtID;
        const sql = `INSERT INTO employees
                     (first_name, last_name, role_id, manager_id)
                     VALUES ("${firstName}", "${lastName}", "${roleID}", "${mgmtID}")`;
        db.query(sql, function (err, res) {
            if (err) {
                console.log(err);
                return;
            };

            console.table(res);
            mainMenu();
        });
    })
};

const updateEmployee = () => {
    inquirer
    .prompt([
        {
            type: "input",
            name: "employeeID",
            message: "Enter the id for the employee you would like to update:"
        },
        {
            type: "input",
            name: "newRoleID",
            message: "Enter the ID of the new role this employee will be taking on:"
        }
    ])
    .then(function (res) {
        const employeeID = res.employeeID;
        const newRoleID = res.newRoleID;
        const sql = `UPDATE employees 
                     SET role_id = "${newRoleID}" 
                     WHERE id = "${employeeID}"`;

        db.query(sql, function (err, res) {
            if (err) {
                console.log(err);
                return;
            };

            console.table(res);
            mainMenu();
        });
    })
};
