import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Login } from "./routes/Login";

import { NewsFeed } from "./routes/NewsFeed";
import { Register } from "./routes/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NewsFeed />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
