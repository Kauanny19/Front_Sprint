import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Sala from "./pages/Sala"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/cadastro" element={<Cadastro/>} />
        <Route path="/home" element={
            <ProtectedRoute>
              <Home/>
            </ProtectedRoute>
          }/>
          <Route path="/sala" element={<Sala/>} />
      </Routes>
    </Router>
  );
}

export default App;
