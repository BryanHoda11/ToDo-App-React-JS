import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    }
  }, [])

  const saveTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos)) 
  }

  const handleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    settodo("")
    saveTodos()
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  const handleChange = (e) => {
    settodo(e.target.value)
    saveTodos()
  }

  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id === id;
    })

    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    settodos(newTodos)
    saveTodos()
  }


  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    settodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    settodos(newTodos)
    saveTodos()
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    settodos(newTodos)
    saveTodos()

    toast('Task Deleted!', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Navbar />

      <div className="container overflow-y-scroll mx-auto mt-10 bg-green-500 h-[80vh] w-[100%] md:w-[96%] m-5 p-5 rounded-xl">
        <div className='w-[100%]'>
          <h1 className='text-lg md:text-xl pb-5'>Add your ToDo</h1>
          <div className="todo flex flex-col sm:items-center sm:flex-row">
            <input onChange={handleChange} onKeyPress={handleKeyPress} value={todo} className='w-[100%] sm:w-[70%] h-[50px] text-sm rounded-lg p-2' type="text" placeholder='Type something...' />
            <button onClick={handleAdd} disabled={todo.length<=2} className='bg-black cursor-pointer text-green-500 p-2 m-3 text-xs sm:text-sm w-[60px] rounded-lg'>Add</button>
          </div>
          <h3 className='hidden sm:block sm:opacity-50 text-center mt-5'>Note : After typing a todo, you can also press the 'Enter' key on your keyboard</h3>
        </div>

        <hr className='mb-7 mt-2 sm:m-10 h-[1px] bg-black border-none rounded-xl w-[60%] mx-auto sm:mx-auto opacity-85' />
        <div className='flex justify-between lg:mb-8'>
          <h2 className="text-sm sm:text-lg">Your ToDos :</h2>
          <div className="sort items-center flex gap-3">
            <img className='cursor-pointer h-[17px] sm:h-[20px] mx-2' src="icons/sort.svg" alt="" />
            <select className='hidden sm:block' name="select">
              <option value="">A to Z</option>
              <option value="">Z to A</option>
              <option value="">Recently Added</option>
            </select>
          </div>
        </div>

        <div className="todo-list mt-5">
          <div className="todos">
            {todos.length === 0 && <div className='text-center opacity-40'> No ToDos to show</div>}
            {todos.map(item => {  
              return <div key={item.id} className="todo my-3 rounded-xl py-2 flex items-center w-[100%] justify-between">
                <div className="flex px-3 gap-4">
                  <input onChange={handleCheckbox} checked={item.isCompleted} type="checkbox" name={item.id} />
                  <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                </div>
                <div className="buttons flex h-full">
                  <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-black text-sm md:text-lg text-green-500 px-2 md:px-5 py-2 m-1 md:mx-3 w-[30px] md:w-[60px] rounded-lg'><MdModeEdit /></button>
                  <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-black text-sm md:text-lg text-green-500 px-2 md:px-5 py-2 m-1 md:mx-3 w-[30px] md:w-[60px] rounded-lg'><MdDelete /></button>
                </div>
              </div>
            })}
          </div>


        </div>
      </div>
    </>

  )
}

export default App
