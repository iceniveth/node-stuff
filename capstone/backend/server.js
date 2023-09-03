import express from "express";
import morgan from "morgan";
import cors from "cors";
import todosRouter from "./routes/todo.js";
import uploadsRouter from "./routes/uploads.js";

const app = express();

const server = app.listen(8081, function () {
  const host = server.address().address;
  const post = server.address().port;

  console.log(`App is listening at http://${host}:${post}`);
});

app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);
app.use(morgan("dev"));
app.use(express.json());

// https://expressjs.com/en/starter/static-files.html
app.use("/static", express.static("static"));

app.use("/", uploadsRouter);
app.use("/api/todos", todosRouter);

app.get("/", (req, res) => {
  res.send("Hello world");
});
