import EmployeeRowHeader from "./EmployeeRowHeader";
import EmployeeRow from "./EmployeeRow";
import EmployeeRowAdd from "./EmployeeRowAdd";

export default function EmployeeTable() {
    const employees =[
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
    ]

    return (
        <>
        <h1>EMPLOYEES</h1>
        <ul>
            <EmployeeRowHeader />
            <hr />
            {
                employees.map((employee) => {
                    return <EmployeeRow employee={employee} />
                })
            }
            <EmployeeRowAdd />
        </ul>
        <hr />
        </>
    );
}
