import { Box, Button, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";
import { Dayjs } from "dayjs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const apiUrl = process.env.REACT_APP_API_URL;

export default function CreateTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Dayjs | null>(null);
  const navigate = useNavigate();

  const handlesaveTodo = async () => {
    await axios.post(`${apiUrl}/api/todos`, {
      title: title,
      description: description,
      date: date ? date.toISOString() : null,
    });
    alert("todo has been added");
    setTitle("");
    setDescription("");
    setDate(null);
    navigate("/");
  };
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      flexDirection={"column"}
      gap={2}
    >
      <Box display={"flex"} gap={2}>
        <TextField
          variant="outlined"
          label="title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          variant="outlined"
          label="description"
          multiline
          onChange={(e) => setDescription(e.target.value)}
        />
      </Box>

      <Box>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Due Date"
            value={date}
            onChange={(newValue) => setDate(newValue)}
          />
        </LocalizationProvider>
      </Box>

      <Button onClick={handlesaveTodo}>Save</Button>
    </Box>
  );
}
