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
    fetch("/api/employees")
      .then((res) => res.json())
      .then((data) => setEmployees(data));
  }, []);

  function handleDeleteEmployee(employee) {
    fetch(`/api/employees/${employee.id}`, {
      method: "DELETE",
    });

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

    // Update employee
    editEmployee.firstName = formData.firstName;
    editEmployee.lastName = formData.lastName;
    editEmployee.salary = formData.salary;

    //POST to backend
    // If employee is new, POST to /employees/new
    // If employee is existing, PUT to /employees/:id
    if (editEmployee === newEmployee) {
      fetch("/api/employees/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editEmployee),
      });
      setNewEmployee(null);
    } else {
      fetch(`/api/employees/${editEmployee.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editEmployee),
      });
    }

    setEditEmployee(null);
  }

  function handleCancelEdit(employee) {
    if (employee === newEmployee) {
      const updatedList = employees.filter((emp) => emp.id !== employee.id);
      setEmployees(updatedList);
      setNewEmployee(null);
    }
    setEditEmployee(null);
  }

  function handleAddEmployee() {
    if (newEmployee !== null) {
      alert("Please finish editing the new employee first");
      return;
    }
    const tempEmployee = {
      id: employees[employees.length - 1].id + 1,
      firstName: null,
      lastName: null,
      salary: null,
    };
    setEmployees([...employees, tempEmployee]);
    setEditEmployee(tempEmployee);
    setNewEmployee(tempEmployee);
  }

  return (
    <div className="bg-gray-50/90 w-2/3 p-4 rounded-2xl border-2 border-gray-800 shadow-lg backdrop-filter backdrop-blur-lg backdrop-opacity-50">
      <h1 className="text-xl my-4 font-bold tracking-wide">EMPLOYEES</h1>
      <ul className="border border-gray-400 rounded-lg p-4">
        <EmployeeRowHeader />
        <hr className="h-px my-4 bg-gray-500 border-0" />
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
        <hr className="h-px my-4 bg-gray-500 border-0" />
        <EmployeeRowAdd handleAddEmployee={handleAddEmployee} />
      </ul>
    </div>
  );
}
