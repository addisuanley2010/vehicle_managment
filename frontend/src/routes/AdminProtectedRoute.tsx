import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  VehicleManagment,
} from "../pages/index";


interface ProtectedRouteProps {
  path: string;
  element: React.ReactNode;
}

const AdminProtectedRoute: React.FC<ProtectedRouteProps> = ({ path, element }) => {
  return (
    <>
      <Routes>
        <Route path="/*" element={<Navigate to="/dashboard" />} />
        <Route index path={path} element={element} />
        <Route path={`${path}/vehicles`} element={<VehicleManagment />} />
      
      </Routes>
    </>
  );
};

export default AdminProtectedRoute;
