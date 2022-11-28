import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ErrorPage from './ErrorPage.jsx';
import ChatPage from '../routes/chat.jsx';
import LoginPage from '../routes/login.jsx';
import SignupPage from '../routes/signup.jsx';
import AuthContext from '../contexts/index.jsx';
import { Provider as StoreProvider } from 'react-redux';
import store from '../slices/index.js';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const [user, setUser] = useState(() => {
    const username = localStorage.getItem('username');
    if (username) {
      const token = localStorage.getItem('token');
      return { username, token };
    }
    else {
      return {}
    }
  });

  const setUserIn = ({ username, token }) => {
    localStorage.setItem('username', username);
    localStorage.setItem('token', token);
    return setUser(username, token);
  }

  const logIn = () => setLoggedIn(true);

  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    return <Navigate to="login" />
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut, user, setUserIn }}>
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
        <Routes>
          <Route
            path='/'
            element={(
              <PrivateRoute>
                <ChatPage />
              </PrivateRoute>
            )}
          />
          <Route path='login' element={<LoginPage />} />
          <Route path='signup' element={<SignupPage />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider >
  </StoreProvider>
);

export default App;
