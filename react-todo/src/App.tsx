import {  useState } from 'react'
import Todo from './components/Todo'

function App() {
  const [newTask, setNewTask] = useState('')
  const [limit, setLimit] = useState<Date>(new Date(''))
  const [todos, setTodos] = useState<TypeOfTodo[]>([])

  const hundleSubmit = ()=>{

    const newTodo: TypeOfTodo = {
      task: newTask,
      createdAt: new Date(Date.now()),
      limit: limit,
      isComplete: false,
      isEdittable: false,
      id: new Date().getTime()
    }

    setTodos([...todos, newTodo])
    setNewTask('')
  }

  function hundleTodo<K extends keyof TypeOfTodo, V extends TypeOfTodo[K]>(id: number, key: K, val: V):void {
    setTodos((todos) => {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, [key]: val};
        }
        return todo;
      });

      return newTodos;
    });
  };

  function hundleDelete(id: number): void {
    setTodos((todos) => {
      const newTodos = todos.filter((todo) => (todo.id !== id));
      return newTodos;
    });
  }

  return (
    <>
      <form onSubmit={(e) => {
        e.preventDefault()
        if (!newTask) return
        if (!(/[0-9]{4}-[0-9]{2}-[0-9]{2}/).test(limit.toLocaleDateString('sv-SE'))) return
        hundleSubmit()
      }}>
        <input 
          type="text"
          name="newTask"
          id="newTask"
          placeholder='タスクを入力してください'
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)} />
        <input 
          type="date"
          name="limit"
          id="limit"
          value={limit.toLocaleDateString('sv-SE')}
          onChange={(e) => setLimit(new Date(e.target.value))} />
        <input type="submit" value="追加"/>
      </form>
      <Todo todos={todos} onTodo={hundleTodo} onDelete={hundleDelete}/>
    </>
  )
}

export default App
