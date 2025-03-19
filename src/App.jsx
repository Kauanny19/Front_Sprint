import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";

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
        } />
      </Routes>
    </Router>
  );
}

export default App;
