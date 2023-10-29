export default function EmployeeRowAdd({ handleAddEmployee }) {
  return (
    <li className="grid grid-cols-4">
      <span className="col-start-4">
        <button onClick={() => handleAddEmployee()}>Add Employee</button>
      </span>
    </li>
  );
}
