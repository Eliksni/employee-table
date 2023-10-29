const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// To format names properly (capitalize first letter, might add to utils later)
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Validate form data again
// This must be done since the frontend can be bypassed and the request can be sent directly to the backend
function validateEmployee(employee) {
  const { firstName, lastName, salary } = employee;
  //All fields must be filled out
  if (!firstName || !lastName || !salary) {
    res.status(400).json({ error: "Please fill out all fields" });
    return false;
  }
  // First and last name must be letters only
  if (!firstName.match(/^[a-zA-Z]+$/)) {
    res.status(400).json({ error: "Please enter a valid first name" });
    return false;
  }
  if (!lastName.match(/^[a-zA-Z]+$/)) {
    res.status(400).json({ error: "Please enter a valid last name" });
    return false;
  }
  // Salary must be a number greater than 0
  if (isNaN(salary) || salary < 0) {
    res.status(400).json({ error: "Please enter a valid salary" });
    return false;
  }
  return true;
}

// GET /employees
// Retrieve all employees from the database
router.get("/", async (req, res) => {
  const employees = await prisma.employee.findMany();
  res.json(employees);
});

// POST /employees/new
// Create a new employee in the database
router.post("/new", async (req, res) => {
  const { firstName, lastName, salary } = req.body;

  // Create employee and capitalize name
  const newEmployee = {
    firstName: capitalize(firstName),
    lastName: capitalize(lastName),
    salary: parseInt(salary),
  };

  if (!validateEmployee(newEmployee)) {
    return;
  }

  console.log("newEmployee", newEmployee);
  // Add employee to database
  await prisma.employee.create({
    data: newEmployee,
  });
});

// PUT /employees/:id
// Update an employee in the database
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, salary } = req.body;

  // Create employee and capitalize name
  const editEmployee = {
    id: parseInt(id),
    firstName: capitalize(firstName),
    lastName: capitalize(lastName),
    salary: parseInt(salary),
  };

  console.log("editEmployee", editEmployee);

  if (!validateEmployee(editEmployee)) {
    return;
  }

  // Update employee in database
  await prisma.employee.update({
    where: {
      id: editEmployee.id,
    },
    data: editEmployee,
  });
});

// DELETE /employees/:id
// Delete an employee from the database
router.delete("/:id", (req, res) => {});

module.exports = router;
