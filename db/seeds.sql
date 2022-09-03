INSERT INTO departments (name)
VALUES 
    ('Accounting'),
    ('Sales'),
    ('Marketing');

INSERT INTO roles (title, salary, department_id)
VALUES
    ('Bookkeeper', 70000, 1),
    ('Budgeting', 75000, 1),
    ('Salesperson', 90000, 2),
    ('Sales Manager', 100000, 2),
    ('Maketing Analyst', 92000, 3),
    ('Social Media Manager', 80000, 3),
    ('Marketing Manager', 100000, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
    ('Jenny', 'Jenkins', 4, NULL),
    ('Susan', 'Smith', 7, NULL),
    ('Sally', 'Miller', 1, 1),
    ('Alana', 'Gold', 6, 2),
    ('Patrick', 'Star', 3, 1),
    ('Joe', 'Hall', 5, 2),
    ('Andrew', 'Cho', 3, 1),
    ('Greg', 'Newman', 2, 1),
    ('Sue', 'Williams', 3, 1);