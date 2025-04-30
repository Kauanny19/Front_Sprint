import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Sala from "./pages/Sala"
import DefaultLayout from "./components/DefaultLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DefaultLayout headerRender={1}><Login/></DefaultLayout>}/>
        <Route path="/cadastro" element={<DefaultLayout headerRender={1}><Cadastro/></DefaultLayout>} />
        <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path="/sala" element={<ProtectedRoute><Sala/></ProtectedRoute>} />
        <Route path="/sala/:id" element={<ProtectedRoute><Sala/></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;


