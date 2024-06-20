import { useEffect, useState } from "react";
import TodoCard, { Todo } from "./TodoCard";
import axios from "axios";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;
  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    const response = await axios.get(`${apiUrl}/api/todos`);
    console.log(response.data.todos);
    setTodos(response.data.todos);
  };
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        style={{ marginBottom: "20px" }}
        onClick={() => {
          navigate("/createTodo");
        }}
      >
        Create Todo
      </Button>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        {todos.map((todo) => (
          <TodoCard
            _id={todo._id}
            title={todo.title}
            description={todo.description}
            date={todo.date}
          />
        ))}
      </div>
    </div>
  );
}
