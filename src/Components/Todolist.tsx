import  { useState } from 'react'
import { BiCheckDouble, BiRefresh, BiTrash, BiReset, BiEdit, BiCheckCircle} from 'react-icons/bi'
import './todolist.css'

type Todo = {
  task: string
  completed: boolean
}

function Todolist() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [inputvalue, setInputValue] = useState('')
    const [editIndex, setEditIndex] = useState(-1)

    const addTodo =() => {
        if (inputvalue.trim() !== '') {
           if (editIndex !== -1) {
            const updatedTodos =[...todos]
            updatedTodos[editIndex] = {task: inputvalue, completed: updatedTodos[editIndex].completed}
            setTodos(updatedTodos)
            setInputValue('')
            setEditIndex(-1)
           } else {
            setTodos([...todos, {task: inputvalue, completed: false}])
            setInputValue('')
           }
        }
    }

    const startEdit =(index: number) => {
        setInputValue(todos[index].task)
        setEditIndex(index)
    }

    const cancelEdit = () => {
        setInputValue('')
        setEditIndex(-1)
    }

    const removeTodo = (index: number) => {
        const updatedTodos = todos.filter((_,i) => i !== index)
        setTodos(updatedTodos)
    }

    const toggleCompleted = (index: number) => {
        const updatedTodos = [...todos]
        updatedTodos[index].completed = !updatedTodos[index].completed
    }

    useState
  return (
    <div className="todo-container">
      <h1>to-do-listo</h1>
      <div className='input-section'>
        <input type="text" className="input-field" onChange={(e) => setInputValue(e.target.value)}
           value={inputvalue}  placeholder='Enter a new Task' />

        {editIndex !== -1 ? (

        <>
        <button onClick={addTodo} className='update-btn' >  <BiCheckDouble />  </button>
        <button onClick={cancelEdit} className='clean-btn'>  <BiRefresh />  </button>
        </>
        ) : (
        <button  onClick={addTodo} className='Add-btn'>  Add </button>
        
        )}
      </div>
      <ul className="todo-list">
        {todos.map((todo, index) => (
            <li key={index}> 
                <span className="task-text">{todo.task}</span>
                <div className="btn-group">
                    <button onClick={() => startEdit(index)} className="btn-edit"> <BiEdit /> </button>
                    <button onClick={() => removeTodo(index)} className="btn-remove"> <BiTrash /> </button>
                    <button className="btn-done" onClick={() => toggleCompleted(index)}>
                        {todo.completed ? <BiReset /> : <BiCheckCircle />}
                    </button>
                </div>
            </li>
        ))}


      </ul>
    </div>
    
  )
}

export default Todolist
