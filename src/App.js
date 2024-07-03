import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreateQuotePage from "./pages/CreateQuotePage";



function App() {


  return (
  <BrowserRouter>
  <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/create" element={<CreateQuotePage />} />

  </Routes>
  </BrowserRouter>
  );
}

export default App;
