
export default function App() {
  return (
    <main>
      <h1>
        EMPLOYEES
      </h1>
      <ul>
        <li className="grid grid-cols-4">
          <span>
            First Name
          </span>
          <span>
            Last Name
          </span>
          <span className="row-span-2">
            Salary
          </span>
        </li>
        <hr />
        <li className="grid grid-cols-4">
          <span>
            John
          </span>
          <span>
            Doe
          </span>
          <span>
            $55,000
          </span>
          <span>
            <button>Edit</button>
            <button>Delete</button>
          </span>
        </li>
        <li className="grid grid-cols-4">
          <span>
            Jane
          </span>
          <span>
            Smith
          </span>
          <span>
            $70,000
          </span>
          <span>
            <button>Edit</button>
            <button>Delete</button>
          </span>
        </li>
        <li className="grid grid-cols-4">
          <span className="col-start-4">
            <button>
              Add Employee
            </button>
          </span>
        </li>
      </ul>
      <hr />
    </main>
  )
}

