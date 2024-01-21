import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { Login } from "./routes/Login";
import { Register } from "./routes/Register";
import { ProtectedRoute } from "./lib/ProtectedRoute";
import { Logout } from "./routes/Logout";
import { HomePage } from "./routes/HomePage";
import { Category } from "./routes/Category";
import { NavBar } from "./lib/Navbar";
import { Row } from "./lib/Row";

function App() {
  return (
    <BrowserRouter>
      <Row>
        <NavBar />
        <Routes>
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="category/:category"
            element={
              <ProtectedRoute>
                <Category />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </Row>
    </BrowserRouter>
  );
}

export default App;
