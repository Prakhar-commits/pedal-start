import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

export type Todo = {
  title: String;
  description: String;
  date: Date;
  _id: String | null;
};

interface TodoCardProps {
  title: String;
  description: String;
  date: Date;
  _id: String | null;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export default function TodoCard({
  title,
  description,
  date,
  _id,
  setTodos,
}: TodoCardProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedDate, setEditedDate] = useState<Date | undefined>(date);

  const apiUrl = process.env.API_URL;
  const formattedDate = new Date(date).toLocaleDateString();

  const handleEditOpen = () => {
    setEditedTitle(title);
    setEditedDescription(description);
    setEditedDate(date);
    setEditOpen(true);
  };

  const handleDelete = async () => {
    const response = await axios.delete(`${apiUrl}/api/todos/${_id}`);
    console.log(response.data.todos);
    setTodos(response.data.todos);
    setDeleteOpen(false);
  };

  const handleSaveChanges = async () => {
    const updatedFields: Partial<Todo> = {};

    if (editedTitle !== title) {
      updatedFields.title = editedTitle;
    }
    if (editedDescription !== description) {
      updatedFields.description = editedDescription;
    }
    if (editedDate !== date) {
      updatedFields.date = editedDate;
    }

    const updatedTodo = {
      ...updatedFields,
      id: _id,
    };

    const response = await axios.put(`${apiUrl}/api/todos/${_id}`, updatedTodo);
    console.log(response.data);
    setEditOpen(false);
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2">{description}</Typography>
        <Typography variant="body2">Date: {formattedDate}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleEditOpen}>
          Edit
        </Button>
        <Button size="small" onClick={() => setDeleteOpen(true)}>
          Delete
        </Button>
      </CardActions>

      <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
        <DialogTitle>Edit Todo</DialogTitle>
        <DialogContent>
          <DialogContentText>Modify your todo item here.</DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            fullWidth
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            fullWidth
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date"
              value={dayjs(editedDate)}
              onChange={(newValue: Dayjs | null) => {
                setEditedDate(newValue ? newValue.toDate() : undefined);
              }}
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveChanges}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this todo?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
