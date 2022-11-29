import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ErrorPage from './ErrorPage.jsx';
import Chat from './Chat.jsx';
import LoginPage from './LoginPage.jsx';
import SignupPage from './SignupPage.jsx';
import AuthProvider from '../contexts/AuthProvider.jsx';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  return (
    token !== null ? children : <Navigate to="/login" />
  );
};

const App = ({ socket }) => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={(
            <PrivateRoute>
              <Chat socket={socket} />
            </PrivateRoute>
          )}
        />
        <Route path='login' element={<LoginPage />} />
        <Route path='signup' element={<SignupPage />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider >
);

export default App;
