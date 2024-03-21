import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  retrieveAllTodosForUsernameApi,
  deleteTodoApi,
  getUserData
} from './api/TodoApiService'
import { useAuth } from './security/AuthContext'

function ListTodosComponent() {
  const today = new Date()

  const authContext = useAuth()

  const username = authContext.username

  const navigate = useNavigate()

  const targetDate = new Date(
    today.getFullYear() + 12,
    today.getMonth(),
    today.getDay()
  )

  

  const [todos, setTodos] = useState([])

  const [message, setMessage] = useState(null)

  const [userId, setUserId] = useState(null)

  useEffect(() => refreshTodos(), [])

  function refreshTodos() {
    console.log(authContext)
    retrieveAllTodosForUsernameApi(username)
      .then((response) => {
        console.log(response)
        setTodos(response.data)
      })
      .catch((error) => console.log(error))
      
  }

  function deleteTodo(id) {
    console.log('clicked ' + id)
    deleteTodoApi(username, id)
      .then(
        () => {
          setMessage(`Delete of todos with id = ${id} successful`)
          refreshTodos()
        }
        //1: Display message
        //2: Update Todos list
      )
      .catch((error) => console.log(error))
  }

  function updateTodo(id) {
    console.log('clicked ' + id)
    navigate(`/todo/${id}`)
  }

  function addNewTodo() {
    if(todos.length===0){
      console.log("------------- "+-1)
      navigate(`/todo/-1`)
    }
    // retrieveAllTodosForUsernameApi(username)
    //   .then((response) => {
    //     console.log(response)
    //     setTodos(response.data)
    //   })
    //   .catch((error) => console.log(error))
    console.log(todos)
    let id =  todos.slice(-1).pop().id;
  
    
    console.log("+++++++++ "+id)
    navigate(`/todo/${++id}`)
    
  }

  return (
    <div className='container'>
      <h1>Things You Want To Do!</h1>

      {message && <div className='alert alert-warning'>{message}</div>}

      <div>
        <table className='table'>
          <thead>
            <tr>
              <th>Description</th>
              <th>Is Done?</th>
              <th>Target Date</th>
              <th>Delete</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.description}</td>
                <td>{todo.done.toString()}</td>
                {/* <td>{todo.targetDate.toDateString()}</td> */}
                <td>{todo.targetDate.toString()}</td>
                <td>
                  {' '}
                  <button
                    className='btn btn-warning'
                    onClick={() => deleteTodo(todo.id)}
                  >
                    Delete
                  </button>{' '}
                </td>
                <td>
                  {' '}
                  <button
                    className='btn btn-success'
                    onClick={() => updateTodo(todo.id)}
                  >
                    Update
                  </button>{' '}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='btn btn-success m-5' onClick={addNewTodo}>
        Add New Todo
      </div>
    </div>
  )
}

export default ListTodosComponent
