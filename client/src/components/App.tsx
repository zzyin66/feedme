import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { Login } from './routes/Login';
import { Register } from './routes/Register';
import { ProtectedRoute } from './lib/ProtectedRoute';
import { Logout } from './routes/Logout';
import { HomePage } from './routes/HomePage';
import { Category } from './routes/Category';
import { Profile } from './routes/Profile';
import { NavBar } from './lib/Navbar';
import { UserProvider } from './lib/UserContext';
import { Bookmarks } from './routes/Bookmarks';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/home'
          element={
            <ProtectedRoute>
              <NavBar />
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path='category/:category'
          element={
            <ProtectedRoute>
              <NavBar />
              <Category />
            </ProtectedRoute>
          }
        />
        <Route path='/login' element={<Login />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/register' element={<Register />} />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <NavBar />
              <Profile />
            </ProtectedRoute>
          } 
        />
        <Route 
          path='/bookmarks' 
          element={
            <ProtectedRoute>
              <NavBar />
              <Bookmarks />
            </ProtectedRoute>
          } 
        />
        <Route path='*' element={<Navigate to='/home' replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
