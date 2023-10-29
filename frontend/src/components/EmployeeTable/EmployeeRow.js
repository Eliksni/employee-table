export default function EmployeeRow({employee}) {
    return (
        <li className="grid grid-cols-4">
            <span>{employee.firstName}</span>
            <span>{employee.lastName}</span>
            <span>{employee.salary}</span>
            <span>
                <button>Edit</button>
                <button>Delete</button>
            </span>
        </li>
    );
}