import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: String,
});

const Todo = mongoose.model("todos", TodoSchema);

export { Todo };
