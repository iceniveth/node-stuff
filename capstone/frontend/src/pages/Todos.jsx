import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const loader = async () => {
  const response = await fetch("http://localhost:8081/api/todos", {
    credentials: "include",
  });
  const todos = await response.json();
  return { todos };
};

export default function Todos() {
  const navigate = useNavigate();
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

  const onIsCompletedChange = (todoId) => async (event) => {
    const isCompleted = event.target.checked;
    const foundTodo = todos.find((todo) => todo.id === todoId);
    await fetch(`/api/todos/${todoId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task: foundTodo.task,
        isCompleted,
      }),
    });
  };

  async function onSignOutClick() {
    await axios({
      method: "post",
      url: "/api/auth/sign-out",
    });
    navigate("/");
  }

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h2 style={{ flexGrow: 1 }}>Todos</h2>
        <div>
          <button type="button" onClick={onSignOutClick}>
            Sign Out
          </button>
        </div>
      </div>
      {todos.map((todo) => (
        <li key={todo.id} style={{ padding: "2px 0" }}>
          <input
            type="checkbox"
            defaultChecked={todo.isCompleted}
            onChange={onIsCompletedChange(todo.id)}
          />
          {todo.task}{" "}
          <button type="button" onClick={onDeleteTodoClick(todo.id)}>
            x
          </button>
        </li>
      ))}
      <br />
      <input type="text" ref={taskRef} name="task" />
      <button type="button" onClick={onAddTodoClick}>
        Add Todo
      </button>
    </>
  );
}
