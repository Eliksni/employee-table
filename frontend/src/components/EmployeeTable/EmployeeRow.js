export default function EmployeeRow({employee, onDelete}) {


    return (
        <li className="grid grid-cols-4">
            <span>{employee.firstName}</span>
            <span>{employee.lastName}</span>
            <span>{employee.salary}</span>
            <span>
                <button>Edit</button>
                <button onClick={() => onDelete(employee)}>Delete</button>
            </span>
        </li>
    );
}