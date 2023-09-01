import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import todosRouter from "./routes/todo.js";
import authRouter from "./routes/auth.js";
import authenticated from "./middlewares/autenticated.js";

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
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/api/auth", authRouter);

app.use(authenticated);
app.use("/api/todos", todosRouter);
