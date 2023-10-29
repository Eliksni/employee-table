import { useRef } from "react";

export default function EmployeeRowEdit({
  employee,
  handleSubmitEdit,
  handleCancelEdit,
}) {
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const salaryRef = useRef(null);

  function getFormData(event) {
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const salary = salaryRef.current.value;
    return { firstName, lastName, salary };
  }

  return (
    <li className="grid grid-cols-4">
      <input
        className="bg-gray-100 border border-gray-400 rounded-lg p-1 px-2 my-1 w-4/5"
        type="text"
        placeholder="First Name"
        defaultValue={employee.firstName}
        ref={firstNameRef}
      />
      <input
        className="bg-gray-100 border border-gray-400 rounded-lg p-1 px-2 my-1 w-4/5"
        type="text"
        placeholder="Last Name"
        defaultValue={employee.lastName}
        ref={lastNameRef}
      />
      <input
        className="bg-gray-100 border border-gray-400 rounded-lg p-1 px-2 my-1 w-4/5"
        type="number"
        placeholder="Salary"
        defaultValue={employee.salary}
        ref={salaryRef}
      />
      <span className="flex flex-grow">
        <button
          className="w-full font-bold bg-sky-600 hover:bg-sky-800 p-1 px-6 my-1 mr-2 rounded-lg text-gray-100"
          onClick={() => handleSubmitEdit(employee, getFormData())}
        >
          Submit
        </button>
        <button
          className="w-full font-bold bg-gray-600 hover:bg-gray-800 p-1 px-6 my-1 ml-2 rounded-lg text-gray-100"
          onClick={() => handleCancelEdit(employee)}
        >
          Cancel
        </button>
      </span>
    </li>
  );
}
