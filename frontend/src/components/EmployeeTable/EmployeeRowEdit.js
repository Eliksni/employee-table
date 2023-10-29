import { useRef } from 'react';

export default function EmployeeRowEdit({employee, handleSubmitEdit, handleCancelEdit}) {

    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const salaryRef = useRef(null);

    function getFormData(event) {
        const firstName = firstNameRef.current.value;
        const lastName = lastNameRef.current.value;
        const salary = salaryRef.current.value;
        return {firstName, lastName, salary};
    }

    return (
        <li className="grid grid-cols-4">
                <input type="text" placeholder="First Name" defaultValue={employee.firstName} ref={firstNameRef}/>
                <input type="text" placeholder="Last Name" defaultValue={employee.lastName} ref={lastNameRef}/>
                <input type="number" placeholder="Salary" defaultValue={employee.salary} ref={salaryRef}/>
            <span>
                <button onClick={() => handleSubmitEdit(employee, getFormData())}>Submit</button>
                <button onClick={() => handleCancelEdit(employee)}>Cancel</button>
            </span>
        </li>   
        
    )
}