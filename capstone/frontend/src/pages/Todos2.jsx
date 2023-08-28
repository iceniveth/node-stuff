import { useLoaderData } from "react-router-dom";

export const loader = async () => {
  const response = await fetch("/api/todos");
  const todos = await response.json();
  return { todos };
};

export default function Todos2() {
  const data = useLoaderData();
  const todos = data.todos;

  return (
    <>
      <h2>Todos2</h2>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.task}</li>
      ))}
    </>
  );
}
