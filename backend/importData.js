// Small script to import data from data.json to the database
// Only run once on new database

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const data = require("../data.json");
console.log(data);

async function main({ employees }) {
  for (const employee of employees) {
    const { firstName, lastName, salary } = employee;
    await prisma.employee.create({
      data: {
        firstName,
        lastName,
        salary,
      },
    });
  }
}

main(data)
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
