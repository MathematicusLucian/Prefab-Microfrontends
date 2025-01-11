import React, { createContext, useState, useEffect } from "react";
import AuthService from "./AuthService";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(AuthService.getToken());

  useEffect(() => {
    const token = AuthService.getToken();
    if (token !== authToken) {
      setAuthToken(token);
    }
  }, [authToken]);

  const login = (username, password) => {
    AuthService.login(username, password).then(() => {
      setAuthToken(AuthService.getToken());
    });
  };

  const logout = () => {
    AuthService.logout();
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
