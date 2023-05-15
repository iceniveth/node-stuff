import express from "express";
import { number, z } from "zod";
const router = express.Router();

let todos = [
  { id: 1, task: "Eat Breakfast", checked: false },
  { id: 2, task: "Wash the Dishes", checked: false },
];

// https://zod.dev/?id=primitives
const TodoSchema = z.object({
  id: z.number(),
  task: z.string(),
  checked: z.boolean(),
});

// HTTP Methods: https://www.restapitutorial.com/lessons/httpmethods.html
router.get("/", (req, res) => {
  res.status(200).send(todos);
});

router.get("/:id", (req, res) => {
  const foundTodo = todos.find((t) => t.id === Number(req.params.id));
  return foundTodo == null
    ? res.status(404).send("Not Found")
    : res.status(200).send(foundTodo);
});

router.post("/", (req, res) => {
  const parsedResult = TodoSchema.safeParse({
    id: new Date().getTime(),
    task: req.body.task,
    checked: false,
  });
  if (!parsedResult.success) {
    return res.status(400).send(parsedResult.error);
  }

  todos = [...todos, parsedResult.data];
  res.status(201).send(parsedResult.data);
});

router.put("/:id", (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  const foundIndex = todos.findIndex((todo) => todo.id === Number(id));
  const isNotFound = foundIndex === -1;

  if (isNotFound) {
    return res.status(401).send("Not Found");
  }

  const parsedResult = TodoSchema.safeParse({
    ...todos[foundIndex],
    checked: req.body.checked,
  });

  if (!parsedResult.success) {
    return res.status(400).send(parsedResult.error);
  }

  todos[foundIndex] = parsedResult.data;

  res.status(200).send(parsedResult.data);
});

router.delete("/:id", (req, res) => {
  const foundIndex = todos.findIndex(
    (todo) => todo.id === Number(req.params.id)
  );

  if (foundIndex === -1) {
    return res.status(401).send("Not Found");
  }

  todos = todos.filter((_, index) => index !== foundIndex);
  res.status(204).send();
});

export default router;
