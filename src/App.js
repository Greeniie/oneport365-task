import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreateQuotePage from "./pages/CreateQuotePage";
import EditQuotePage from "./pages/EditQuotePage";



function App() {


  return (
  <BrowserRouter>
  <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/create" element={<CreateQuotePage />} />
  <Route path="/edit" element={<EditQuotePage />} />


  </Routes>
  </BrowserRouter>
  );
}

export default App;
