// RouteHandler.jsx
import React, { useContext, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./Login/Login.jsx";
import AuthenticatedLayout from "./AuthenticatedLayout";
import { AuthContext } from '../contexts/AuthContext.jsx';

function RouteHandler() {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && window.location.pathname === '/login') {
      navigate("/news", { replace: true });
    } else if (!isAuthenticated && window.location.pathname !== '/login') {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, navigate]);


  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {isAuthenticated ? (
        <Route path="/*" element={<AuthenticatedLayout />} />
      ) : (
        <Route path="*" element={<Navigate to="/login" replace />} />
      )}
    </Routes>
  );
}


export default RouteHandler;
