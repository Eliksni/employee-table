import EmployeeRowHeader from "./EmployeeRowHeader";
import EmployeeRow from "./EmployeeRow";
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

    
    function handleDeleteEmployee(employee) {
        const updatedList = employees.filter((emp) => emp.id !== employee.id);
        setEmployees(updatedList);
    }

    return (
        <>
        <h1>EMPLOYEES</h1>
        <ul>
            <EmployeeRowHeader />
            <hr />
            {
                employees.map((employee) => {
                    return <EmployeeRow key={employee.id} employee={employee} onDelete={handleDeleteEmployee}/>
                })
            }
            <EmployeeRowAdd />
        </ul>
        <hr />
        </>
    );
}
