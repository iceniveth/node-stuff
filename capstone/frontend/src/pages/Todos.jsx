import { useEffect, useState } from "react";

export const loader = async () => {
  const response = await fetch("http://localhost:8081/api/todos");
  const todos = await response.json();
  return { todos };
};

export default function Todos() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function init() {
      const data = await loader();
      setTodos(data.todos);
    }
    init();
  }, []);

  return (
    <>
      <h2>Todos</h2>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.task}</li>
      ))}
    </>
  );
}
