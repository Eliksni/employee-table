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
    <li className="grid items-center font-normal grid-cols-4 ">
      <span>{employee.firstName}</span>
      <span>{employee.lastName}</span>
      <span>{formatSalary(employee.salary)}</span>
      <span className="flex flex-grow">
        <button
          className="w-full font-bold bg-orange-600 hover:bg-orange-800 p-1 px-6 my-1 mr-2 rounded-lg text-gray-100"
          onClick={() => handleEditEmployee(employee)}
        >
          Edit
        </button>
        <button
          className="w-full font-bold bg-red-600 hover:bg-red-800 p-1 px-6 my-1 ml-2 rounded-lg text-gray-100"
          onClick={() => handleDeleteEmployee(employee)}
        >
          Delete
        </button>
      </span>
    </li>
  );
}
