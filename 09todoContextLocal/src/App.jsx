
import React from 'react'
import { useEffect, useState } from 'react'
import { TodoContextProvider } from './contexts'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

function App() {
  const [Todos,setTodos] = useState([])

  const AddTodo = (todo) => {
    setTodos((prevTodos) => [{ id : Date.now() , ...todo},...prevTodos])
  }

  const UpdateTodo = (todo,id) => {
    setTodos( (prevTodos) => prevTodos.map((oldTodo) => (oldTodo.id === id ? todo : oldTodo)))
  }

  const DeleteTodo = (id) => {
    setTodos( (prevTodos) => prevTodos.filter((oldTodo) => (oldTodo.id !== id)))
  }

  const ToggleComplete = (id) => {
    setTodos( (prevTodos) => prevTodos.map((oldTodo) => (oldTodo.id === id ? {...oldTodo , checked : !oldTodo.checked} : oldTodo)))
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("key"))
    if( todos && todos.length > 0){
      setTodos(todos)
    }
  },[])

  useEffect(() => {
    localStorage.setItem("key" , JSON.stringify(Todos))
  },[Todos])



  return (
    <TodoContextProvider value={{Todos,AddTodo,UpdateTodo,DeleteTodo,ToggleComplete}}>
      <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <TodoForm />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {Todos.map((todo) => (
                          <div key={todo.id}
                          className='w-full'
                          >
                            <TodoItem todo={todo} />
                          </div>
                        ))}
                    </div>
                </div>
            </div>
    </TodoContextProvider>
  )
}

export default App
