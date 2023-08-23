import express from "express";
import { z } from "zod";

const todosRouter = express.Router();

let todos = [
  { id: 1, task: "wash dishes", isCompleted: false },
  { id: 2, task: "watch tv", isCompleted: true },
];

const TodoSchema = z.object({
  id: z.number(),
  task: z.string(),
  isCompleted: z.boolean(),
});

todosRouter.get("/", (req, res) => {
  res.status(200).send(todos);
});

todosRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  const foundTodo = todos.find((todo) => todo.id === Number(id));

  if (foundTodo) {
    res.status(200).send(foundTodo);
  } else {
    res.status(404).send("todo not found");
  }
});

todosRouter.post("/", (req, res) => {
  const newTodo = {
    ...req.body,
    id: new Date().getTime(),
  };

  const parsedResult = TodoSchema.safeParse(newTodo);

  if (!parsedResult.success) {
    return res.status(400).send(parsedResult.error);
  }

  todos.push(newTodo);
  res.status(201).send(newTodo);
});

todosRouter.put("/:id", (req, res) => {
  const { id } = req.params;
  const { task, isCompleted } = req.body;
  const foundIndex = todos.findIndex((todo) => todo.id === Number(id));

  if (foundIndex > -1) {
    const updatedTodo = {
      ...todos[foundIndex],
      task,
      isCompleted,
    };
    todos[foundIndex] = updatedTodo;
    res.status(200).send(updatedTodo);
  } else {
    res.status(404).send("todo not found");
  }
});

todosRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  const foundIndex = todos.findIndex((todo) => todo.id === Number(id));

  if (foundIndex > -1) {
    todos = todos.filter((_, index) => index !== foundIndex);
    res.status(204).send("");
  } else {
    res.status(404).send("todo not found");
  }
});

export default todosRouter;
