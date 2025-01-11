import React from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const { authToken } = useAuth();

  if (!authToken) {
    return <Redirect to="/login" />;
  }

  return children;
};

export default ProtectedRoute;