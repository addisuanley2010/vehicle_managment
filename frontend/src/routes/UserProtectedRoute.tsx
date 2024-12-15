import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  
  VehicleManagment,
} from "../pages/index";


interface ProtectedRouteProps {
  path: string;
  element: React.ReactNode;
}

const UserProtectedRoute: React.FC<ProtectedRouteProps> = ({
  path,
  element,
}) => {
  return (
    <>
    {/* <Header/> */}
      <Routes>
        <Route path="/*" element={<Navigate to="/user" />} />
        <Route index path={path} element={element} />
        <Route path={`${path}/skills`} element={<VehicleManagment />} />
   
      </Routes>
    </>
  );
};

export default UserProtectedRoute;
