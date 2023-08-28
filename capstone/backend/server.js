import express from "express";
import morgan from "morgan";
import todosRouter from "./routes/todo.js";

const app = express();

const server = app.listen(8081, function () {
  const host = server.address().address;
  const post = server.address().port;

  console.log(`App is listening at http://${host}:${post}`);
});

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/todos", todosRouter);

app.get("/", (req, res) => {
  res.send("Hello world");
});
