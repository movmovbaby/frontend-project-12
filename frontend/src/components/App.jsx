import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ErrorPage from './ErrorPage.jsx';
import ChatPage from '../routes/chat.jsx';
import LoginPage from '../routes/login.jsx';
import SignupPage from '../routes/signup.jsx';
import AuthProvider from '../contexts/AuthProvider.jsx';
import I18nProvider from '../contexts/I18nProvider.jsx';
import { Provider as StoreProvider } from 'react-redux';
import store from '../slices/index.js';


const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  return (
    token !== null ? children : <Navigate to="/login" />
  );
};

const App = () => (
  <StoreProvider store={store}>
    <AuthProvider>
      <I18nProvider>
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
      </I18nProvider>
    </AuthProvider >
  </StoreProvider>
);

export default App;
