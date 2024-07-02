import React from 'react'

const Navbar = () => {
  return (
    <div>
      <nav className='flex flex-col sm:flex-row items-center sm:justify-between bg-green-500'>
        <div src='http://localhost:5173' className="logo flex gap-2 font-bold p-3 cursor-pointer text-lg"> ToDo App
          <img src="icons/logo.svg" alt="logo" /> </div>
        <ul className='flex gap-5'>
          <li className='p-1 sm:p-5 cursor-pointer hover:font-bold'>Home</li>
          <li className='p-1 sm:p-5 cursor-pointer hover:font-bold'>Your Tasks</li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
