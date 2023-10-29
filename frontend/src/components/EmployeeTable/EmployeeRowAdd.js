export default function EmployeeRowAdd({ handleAddEmployee }) {
  return (
    <li className="grid grid-cols-4">
      <span className="col-start-4">
        <button
          className="font-bold bg-green-600 hover:bg-green-800 p-2 px-6 mr-2 rounded-lg text-gray-100 w-full"
          onClick={() => handleAddEmployee()}
        >
          Add Employee
        </button>
      </span>
    </li>
  );
}
