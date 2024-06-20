import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateTodo from "./components/CreateTodo";
import Landing from "./components/Landing";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/createTodo" element={<CreateTodo />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
