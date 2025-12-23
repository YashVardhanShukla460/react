import { useState } from "react";

export function App() {
  return (
    <>
      <Header />
    </>
  );
}

function Header() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  const AddTask = () => {
    if(task.trim() === "") return;
    setTodos([
      ...todos,
      {
        id: Date.now(),
        text: task.trim(),
        completed: false,
      },
    ]);
    setTask("");
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id) => {
    const newText = prompt("Edit task");
    if (!newText) return;
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  };
 
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <>
      <input
        type="text"
        placeholder="Write the task that u want to do "
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <button onClick={AddTask}>Add Task</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              onClick={() => toggleTodo(todo.id)}
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                cursor: "pointer",
              }}
            >
              {todo.text}
            </span>
            <button onClick={() => editTodo(todo.id)}>Edit</button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}
