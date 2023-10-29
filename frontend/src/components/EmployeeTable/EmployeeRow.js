export default function EmployeeRow({
  employee,
  handleDeleteEmployee,
  handleEditEmployee,
}) {
  function formatSalary(salary) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(salary);
  }

  return (
    <li className="grid grid-cols-4">
      <span>{employee.firstName}</span>
      <span>{employee.lastName}</span>
      <span>{formatSalary(employee.salary)}</span>
      <span>
        <button onClick={() => handleEditEmployee(employee)}>Edit</button>
        <button onClick={() => handleDeleteEmployee(employee)}>Delete</button>
      </span>
    </li>
  );
}
