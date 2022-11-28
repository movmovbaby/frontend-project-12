import React, { useState } from 'react';
import AuthContext from './index.jsx';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(() => {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  });

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
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut, user, setUserIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
