import EmployeeRowHeader from "./EmployeeRowHeader";
import EmployeeRow from "./EmployeeRow";
import EmployeeRowEdit from "./EmployeeRowEdit";
import EmployeeRowAdd from "./EmployeeRowAdd";
import { useState, useEffect } from "react";

export default function EmployeeTable() {
  const [employees, setEmployees] = useState([]);
  const [editEmployee, setEditEmployee] = useState(null);
  const [newEmployee, setNewEmployee] = useState(null); // Used to track new employee in case of cancel (deletes and doesn't save to DB)

  // Fetch employees from database
  useEffect(() => {
    fetch("http://localhost:3001/api/employees")
      .then((res) => res.json())
      .then((data) => setEmployees(data));
  }, []);

  // To format names properly (capitalize first letter, might add to utils later)
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function handleDeleteEmployee(employee) {
    const updatedList = employees.filter((emp) => emp.id !== employee.id);
    setEmployees(updatedList);
  }

  function handleEditEmployee(employee) {
    setEditEmployee(employee);
  }

  function handleSubmitEdit(employee, formData) {
    const { firstName, lastName, salary } = formData;

    // Validate form data
    //All fields must be filled out
    if (!firstName || !lastName || !salary) {
      alert("Please fill out all fields");
      return;
    }
    // First and last name must be letters only
    if (!firstName.match(/^[a-zA-Z]+$/)) {
      alert("Please enter a valid first name");
      return;
    }
    if (!lastName.match(/^[a-zA-Z]+$/)) {
      alert("Please enter a valid last name");
      return;
    }
    // Salary must be a number greater than 0
    if (isNaN(salary) || salary < 0) {
      alert("Please enter a valid salary");
      return;
    }

    // Update employee and capitalize name
    editEmployee.firstName = capitalize(formData.firstName);
    editEmployee.lastName = capitalize(formData.lastName);
    editEmployee.salary = formData.salary;
    setEditEmployee(null);
  }

  function handleCancelEdit(employee) {
    if (employee === newEmployee) {
      const updatedList = employees.filter((emp) => emp.id !== employee.id);
      setEmployees(updatedList);
    }
    setEditEmployee(null);
  }

  function handleAddEmployee() {
    const newEmployee = {
      id: employees.length + 1,
      firstName: null,
      lastName: null,
      salary: null,
    };
    setEmployees([...employees, newEmployee]);
    setEditEmployee(newEmployee);
    setNewEmployee(newEmployee);
  }

  return (
    <>
      <h1>EMPLOYEES</h1>
      <ul>
        <EmployeeRowHeader />
        <hr />
        {employees.map((employee) => {
          if (employee === editEmployee) {
            return (
              <EmployeeRowEdit
                key={employee.id}
                employee={employee}
                handleSubmitEdit={handleSubmitEdit}
                handleCancelEdit={handleCancelEdit}
              />
            );
          } else {
            return (
              <EmployeeRow
                key={employee.id}
                employee={employee}
                handleDeleteEmployee={handleDeleteEmployee}
                handleEditEmployee={handleEditEmployee}
              />
            );
          }
        })}
        <EmployeeRowAdd handleAddEmployee={handleAddEmployee} />
      </ul>
      <hr />
    </>
  );
}
