const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Todo = require("./models/Todo");
const path = require("path");

const app = express();

mongoose
  .connect("mongodb://localhost:27017/todo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  const todos = await Todo.find();
  res.render("index", { todos });
});

app.post("/api/todos", async (req, res) => {
  const todo = new Todo({ todo: req.body.todo });
  await todo.save();
  const todos = await Todo.find();
  res.json(todos);
});

app.put("/api/todos/:id", async (req, res) => {
  const id = req.params.id;
  const todo = await Todo.findById(id);
  todo.done = !todo.done;
  await todo.save();
  res.json(todo);
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
