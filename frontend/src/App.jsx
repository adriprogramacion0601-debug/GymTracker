import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Routines from './pages/Routines';
import RoutineForm from './pages/RoutineForm';
import RoutineDetail from './pages/RoutineDetail';
import Profile from './pages/Profile';

import Register from './pages/Register';

// Protected Route Component
const ProtectedRoute = ({ children }) => {

  const token = localStorage.getItem('access_token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />


        <Route path="/" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route index element={<Home />} />
          <Route path="routines" element={<Routines />} />
          <Route path="routines/new" element={<RoutineForm />} />
          <Route path="routines/:id" element={<RoutineDetail />} />
          <Route path="profile" element={<Profile />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default App;
