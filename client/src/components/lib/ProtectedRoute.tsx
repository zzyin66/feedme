import React from "react";
import { Navigate } from "react-router-dom";

interface ProtecedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtecedRouteProps) => {
  if (!localStorage.getItem("access_token")) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
