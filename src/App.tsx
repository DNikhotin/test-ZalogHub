import { useState, useEffect} from 'react'
import './App.css'

type Todo = {
  id: number
  text: string
  done: boolean
}

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const data = localStorage.getItem('todos')
    return data ? JSON.parse(data) : []
  })
  const [text, setText] = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = () => {
    if (!text.trim()) {
      return
    }
    setTodos([...todos, { id: Date.now(), text: text.trim(), done: false }])
    setText('')
  }

  const filteredTodos = todos.filter((t) => {
    if (filter === 'active') return !t.done
    if (filter === 'done') return t.done
    return true
  })

  return (
    <div className="app">
      <h1>Список задач</h1>

      <div className="add">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Новая задача"
        />
        <button onClick={addTodo}>Добавить</button>
      </div>

      <div className="filters">
        <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>
          Все
        </button>
        <button className={filter === 'active' ? 'active' : ''} onClick={() => setFilter('active')}>
          Активные
        </button>
        <button className={filter === 'done' ? 'active' : ''} onClick={() => setFilter('done')}>
          Выполненные
        </button>
      </div>

      {filteredTodos.length === 0 ? (
        <p className="empty">Задач нет</p>
      ) : (
        <ul>
          {filteredTodos.map((todo) => (
            <li key={todo.id} className={todo.done ? 'done' : ''}>
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() =>
                  setTodos(
                    todos.map((t) => (t.id === todo.id ? { ...t, done: !t.done } : t))
                  )
                }
              />
              <span>{todo.text}</span>
              <button onClick={() => setTodos(todos.filter((t) => t.id !== todo.id))}>
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App
