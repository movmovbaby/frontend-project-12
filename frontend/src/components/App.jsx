import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import ErrorPage from './ErrorPage.jsx';
import Chat from './Chat.jsx';
import LoginPage from './LoginPage.jsx';
import SignupPage from './SignupPage.jsx';
import { ApiContext } from './index.jsx';
import AuthProvider from '../contexts/AuthProvider.jsx';
import ApiProvider from '../contexts/ApiProvider.jsx';
import { useAuth } from '../hooks/index.jsx';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();

  return (
    auth.loggedIn ? children : <Navigate to="/login" />
  );
};

const App = ({ socket }) => (
  <AuthProvider>
    <ApiContext.Provider
      value={ApiProvider}
      socket={socket}
    >
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={(
              <PrivateRoute>
                <Chat socket={socket} />
              </PrivateRoute>
            )}
          />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </ApiContext.Provider>
  </AuthProvider>
);

export default App;
