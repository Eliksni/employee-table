export default function EmployeeRow() {
  return (
    <li className="font-light grid grid-cols-4">
      <span>First Name</span>
      <span>Last Name</span>
      <span className="row-span-2">Salary</span>
    </li>
  );
}
