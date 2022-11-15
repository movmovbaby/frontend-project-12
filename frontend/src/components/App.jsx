import React, { useState } from 'react';
import { BrowserRouter, Link, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Navbar } from 'react-bootstrap';
import ErrorPage from './error-page.jsx';
import Root from '../routes/root.jsx';
import LoginPage from '../routes/login.jsx';
import AuthContext from '../contexts/index.jsx';
import useAuth from '../hooks/index.jsx';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);

  return (
    <AuthContext.Provider value={{ loggedIn, logIn }}>
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRoute = ({ children }) => {
  const auth = useAuth();


  return (
    auth.loggedIn ? children : <Navigate to="/login" />
  );
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>
      </Navbar>
      <Routes>
        <Route
          path='/'
          element={(
            <PrivateRoute>
              <Root />
            </PrivateRoute>
          )}
        />
        <Route path='login' element={<LoginPage />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider >
);

export default App;
