import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ErrorPage from './ErrorPage.jsx';
import NavBar from './NavBar.jsx';
import Chat from '../routes/chat.jsx';
import LoginPage from '../routes/login.jsx';
import AuthContext from '../contexts/index.jsx';
import { Provider as StoreProvider } from 'react-redux';
import store from '../slices/index.js';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const logIn = () => setLoggedIn(true);

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, }}>
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  return (
    token !== null ? children : <Navigate to="/login" />
  );
};

const App = () => (
  <StoreProvider store={store}>
    <AuthProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route
            path='/'
            element={(
              <PrivateRoute>
                <Chat />
              </PrivateRoute>
            )}
          />
          <Route path='login' element={<LoginPage />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider >
  </StoreProvider>
);

export default App;
