const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// To format names properly (capitalize first letter, might add to utils later)
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
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
  console.log(req.body);

  // Validate form data again
  // This must be done since the frontend can be bypassed and the request can be sent directly to the backend

  //All fields must be filled out
  if (!firstName || !lastName || !salary) {
    res.status(400).json({ error: "Please fill out all fields" });
    return;
  }
  // First and last name must be letters only
  if (!firstName.match(/^[a-zA-Z]+$/)) {
    res.status(400).json({ error: "Please enter a valid first name" });
    return;
  }
  if (!lastName.match(/^[a-zA-Z]+$/)) {
    res.status(400).json({ error: "Please enter a valid last name" });
    return;
  }
  // Salary must be a number greater than 0
  if (isNaN(salary) || salary < 0) {
    res.status(400).json({ error: "Please enter a valid salary" });
    return;
  }

  // Create employee and capitalize name
  const newEmployee = {
    firstName: capitalize(firstName),
    lastName: capitalize(lastName),
    salary: parseInt(salary),
  };

  console.log("newEmployee", newEmployee);
  // Add employee to database
  await prisma.employee.create({
    data: newEmployee,
  });
});

// PUT /employees/:id
// Update an employee in the database
router.put("/:id", (req, res) => {});

// DELETE /employees/:id
// Delete an employee from the database
router.delete("/:id", (req, res) => {});

module.exports = router;
