export default function EmployeeRow({
  employee,
  handleDeleteEmployee,
  handleEditEmployee,
}) {
  return (
    <li className="grid grid-cols-4">
      <span>{employee.firstName}</span>
      <span>{employee.lastName}</span>
      <span>{employee.salary}</span>
      <span>
        <button onClick={() => handleEditEmployee(employee)}>Edit</button>
        <button onClick={() => handleDeleteEmployee(employee)}>Delete</button>
      </span>
    </li>
  );
}
