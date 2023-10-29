const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// GET /employees
// Retrieve all employees from the database
router.get("/", async (req, res) => {
  const employees = await prisma.employee.findMany();
  res.json(employees);
});

// POST /employees/new
// Create a new employee in the database
router.post("/new", (req, res) => {});

// PUT /employees/:id
// Update an employee in the database
router.put("/:id", (req, res) => {});

// DELETE /employees/:id
// Delete an employee from the database
router.delete("/:id", (req, res) => {});

module.exports = router;
