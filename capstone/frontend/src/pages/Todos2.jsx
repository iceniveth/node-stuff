import { Form, redirect, useFetcher, useLoaderData } from "react-router-dom";

export const loader = async () => {
  const response = await fetch("/api/todos");
  const todos = await response.json();
  return { todos };
};

export const action = async ({ request }) => {
  const formData = await request.formData();

  if (request.method === "PUT") {
    const todoId = formData.get("id");
    await fetch(`/api/todos/${todoId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task: formData.get("task"),
        isCompleted: JSON.parse(formData.get("isCompleted")),
      }),
    });
    return redirect("/todos2");
  }

  if (formData.get("intent") === "delete" || request.method === "DELETE") {
    const id = formData.get("id");
    await fetch(`/api/todos/${id}`, {
      method: "DELETE",
    });
    return redirect("/todos2");
  }

  await fetch("/api/todos", {
    method: request.method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      task: formData.get("task"),
      isCompleted: false,
    }),
  });
  return redirect("/todos2");
};

export default function Todos2() {
  const data = useLoaderData();
  const todos = data.todos;
  const updateTodoFetcher = useFetcher();

  const onIsCompletedChange = (todoId) => async (event) => {
    const isCompleted = event.target.checked;
    const foundTodo = todos.find((todo) => todo.id === todoId);
    updateTodoFetcher.submit(
      {
        id: todoId,
        task: foundTodo.task,
        isCompleted,
      },
      {
        method: "PUT",
      }
    );
  };

  return (
    <>
      <h2>Todos (using react router way)</h2>
      {todos.map((todo) => (
        <Form key={todo.id} method="DELETE">
          <li>
            <input
              type="checkbox"
              defaultChecked={todo.isCompleted}
              onChange={onIsCompletedChange(todo.id)}
            />
            <input type="hidden" name="id" value={todo.id} />
            {todo.task}{" "}
            <button type="submit" name="intent" value="delete">
              x
            </button>
          </li>
        </Form>
      ))}
      <Form method="POST">
        <input type="text" name="task" />
        <button type="submit">Add Todo</button>
      </Form>
    </>
  );
}
