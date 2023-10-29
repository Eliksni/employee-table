import EmployeeRowHeader from "./EmployeeRowHeader";
import EmployeeRow from "./EmployeeRow";
import EmployeeRowEdit from "./EmployeeRowEdit";
import EmployeeRowAdd from "./EmployeeRowAdd";
import { useState } from "react";

export default function EmployeeTable() {
    const [employees, setEmployees] = useState([
        {
            "id": 1,
            "firstName": "John",
            "lastName": "Doe",
            "salary": 55000
        },
        {
            "id": 2,
            "firstName": "Jane",
            "lastName": "Smith",
            "salary": 70000
        }
    ]);
    const [editEmployee, setEditEmployee] = useState(null);

    function handleDeleteEmployee(employee) {
        const updatedList = employees.filter((emp) => emp.id !== employee.id);
        setEmployees(updatedList);
    }

    function handleEditEmployee(employee) {
        setEditEmployee(employee);
    }

    function handleSubmitEdit(employee, formData) {
        console.log(formData) 
        editEmployee.firstName = formData.firstName;
        editEmployee.lastName = formData.lastName;
        editEmployee.salary = formData.salary;
        setEditEmployee(null)
    }

    function handleCancelEdit(employee) {
        setEditEmployee(null);
    }

    function handleAddEmployee() {
        const newEmployee = {
            "id": employees.length + 1,
            "firstName": "",
            "lastName": "",
            "salary": null
        }
        setEmployees([...employees, newEmployee]);
        setEditEmployee(newEmployee)
    }

    return (
        <>
        <h1>EMPLOYEES</h1>
        <ul>
            <EmployeeRowHeader />
            <hr />
            {
                employees.map((employee) => {
                    if(employee === editEmployee) {
                        return <EmployeeRowEdit key={employee.id} employee={employee} 
                        handleSubmitEdit={handleSubmitEdit}
                        handleCancelEdit={handleCancelEdit}/>
                    }
                    else {
                        return <EmployeeRow key={employee.id} employee={employee} 
                        handleDeleteEmployee={handleDeleteEmployee}
                        handleEditEmployee={handleEditEmployee}/>
                    }
                })
            }
            <EmployeeRowAdd handleAddEmployee={handleAddEmployee}/>
        </ul>
        <hr />
        </>
    );
}
