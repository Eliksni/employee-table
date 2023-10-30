const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

const employeesRouter = require("./routes/employees");
app.use("/api/employees", employeesRouter);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(3001, () => {
  console.log("Server listening on port 3001");
});
