import React, { useState, useMemo } from 'react';
import AuthContext from './index.jsx';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(() => {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  });

  const [userData, setUserData] = useState(() => {
    const username = localStorage.getItem('username');
    if (username) {
      const token = localStorage.getItem('token');
      return { username, token };
    }
    return {};
  });

  const setUserIn = ({ username, token }) => {
    localStorage.setItem('username', username);
    localStorage.setItem('token', token);
    return setUserData({ username, token });
  };

  const logIn = () => setLoggedIn(true);

  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  };
  const auth = useMemo(() => ({
    loggedIn,
    logIn,
    logOut,
    userData,
    setUserIn,
  }), [loggedIn, userData]);

  return (
    <AuthContext.Provider
      value={auth}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
