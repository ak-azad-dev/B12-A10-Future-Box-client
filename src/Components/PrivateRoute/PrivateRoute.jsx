// src/components/PrivateRoute.jsx
import React from "react";
import { useAuth } from "../../hooks/useAuth";
import Logo from "../../assets/logo.png";
import { useLocation, Navigate } from "react-router";

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading)
    return (
      <div className="flex justify-center text-3xl text-black font-bold mt-5">
        <img
          src={Logo}
          alt="Loading Image"
          className="animate-spin"
          height={45}
          width={45}
        />
      </div>
    );

  if (!user)
    return <Navigate state={location.pathname} to="/sign-in" replace />;

  return children;
}
