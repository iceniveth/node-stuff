import { Form, redirect, useLoaderData } from "react-router-dom";

export const loader = async () => {
  const response = await fetch("/api/todos");
  const todos = await response.json();
  return { todos };
};

export const action = async ({ request }) => {
  const formData = await request.formData();
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

  return (
    <>
      <h2>Todos2</h2>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.task}</li>
      ))}
      <Form method="POST">
        <input type="text" name="task" />
        <button type="submit">Add Todo</button>
      </Form>
    </>
  );
}
