import express from "express";
import { Todo } from "../db/index.js";
import cors from "cors";

const router = express.Router();

router.get("/todos/:id", async (req, res) => {
  const todoId = req.params.id;
  const todo = await Todo.findById(todoId);
  if (todo) {
    res.status(200).json({ todo: todo });
  } else {
    res.status(400).json({ msg: "Todo doesn't exist" });
  }
});

router.get("/todos", async (req, res) => {
  const Todos = await Todo.find();

  res.status(200).json({ todos: Todos });
});

router.post("/todos", async (req, res) => {
  const todo = new Todo(req.body);
  await todo.save();
  res
    .status(200)
    .json({ message: "Todo created successfully", todoid: todo._id });
});

router.put("/todos/:id", async (req, res) => {
  const todoId = req.params.id;
  const todo = await Todo.findByIdAndUpdate(todoId, req.body, {
    new: true,
  });
  if (todo) {
    res.status(200).json({ msg: "Course updated successfully", todo });
  } else {
    res.status(400).json({ msg: "Course not updated" });
  }
});

router.delete("/todos/:id", async (req, res) => {
  const todoId = req.params.id;
  await Todo.findOneAndDelete(todoId);
  const updatedTodos = await Todo.find();

  res.status(200).json({ todos: updatedTodos });
});

export default router;
