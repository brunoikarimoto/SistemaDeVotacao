import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Home from "./pages/Home/Home";
import Enquete from "./pages/Enquete/Enquete";
import Opcoes from "./pages/Opcoes/Opcoes";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/enquete/:id" element={<Enquete />} />
          <Route path="/opcoes/add/:id" element={<Opcoes />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
