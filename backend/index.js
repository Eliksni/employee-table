const express = require("express");
const cors = require("cors");
const app = express();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

const employeesRouter = require("./routes/employees");
app.use("/api/employees", employeesRouter);

app.listen(3001, () => {
  console.log("Server listening on port 3001");
});
