import { useEffect, useRef, useState } from "react";

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

  const taskRef = useRef();

  async function onAddTodoClick() {
    const response = await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task: taskRef.current?.value,
        isCompleted: false,
      }),
    });
    const data = await response.json();
    setTodos((todos) => todos.concat(data));
    if (taskRef.current == null) return;
    taskRef.current.value = "";
  }

  const onDeleteTodoClick = (todoId) => async () => {
    await fetch(`/api/todos/${todoId}`, {
      method: "DELETE",
    });
    setTodos((todos) => {
      return todos.filter((todo) => todo.id !== todoId);
    });
  };

  return (
    <>
      <h2>Todos</h2>
      {todos.map((todo) => (
        <li key={todo.id}>
          {todo.task}{" "}
          <button type="button" onClick={onDeleteTodoClick(todo.id)}>
            x
          </button>
        </li>
      ))}
      <input type="text" ref={taskRef} name="task" />
      <button type="button" onClick={onAddTodoClick}>
        Add Todo
      </button>
    </>
  );
}
