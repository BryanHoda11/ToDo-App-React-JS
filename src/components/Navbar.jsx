import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <div>
      <nav className='flex flex-col sm:flex-row items-center sm:justify-between bg-green-500'>
        <Link to='/'>
          <div className="logo flex gap-2 font-bold p-3 cursor-pointer text-lg"> ToDo App <img src="/icons/logo.svg" alt="logo" /></div>
        </Link>
        <ul className='flex gap-5'>
          <li className='p-1 sm:p-5 cursor-pointer hover:font-bold'>Home</li>
          <li className='p-1 sm:p-5 cursor-pointer hover:font-bold'>Your Tasks</li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
