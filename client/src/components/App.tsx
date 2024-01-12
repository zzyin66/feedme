import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<>homepage</>} />
        <Route path="/login" element={<>login</>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
