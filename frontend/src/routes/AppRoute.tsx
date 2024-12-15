import {  Navigate, Route, Routes } from "react-router-dom";
import {  Login, Registration, Vehicles } from "../pages";
import { useEffect } from "react";
import { Loading, PageNotFound } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { InitialStateInterface } from "../types/user.types";
import { RootState } from "../store";
import AdminProtectedRoute from "./AdminProtectedRoute";
import UserProtectedRoute from "./UserProtectedRoute";
import User from "../pages/user/User";
import VehicleManagment from "../pages/dashboard/VehicleManagment";
// import React from "react";

function AppRoute() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "GET_VEHICLES" });
    dispatch({ type: "CHECK_USER" });

  }, [dispatch]);

  const { isAuthenticated, user, loading }: InitialStateInterface = useSelector(
    (state: RootState) => state.user
  );
  if (loading) {
    return <Loading />;
  }

  return (
      <Routes>
        {!isAuthenticated ? (
          <>
            <Route index path="/" element={<Vehicles />} />
            <Route path="/*" element={<Navigate to={"/"} />} />
            <Route path="dashboard/*" element={<Navigate to={"/login"} />} />
            <Route path="login" element={<Login />} />
            <Route path="registration" element={<Registration />} />
          </>
        ) : user.role === "admin" ? (
          <>
            <Route
              path="/*"
              element={
                <AdminProtectedRoute path="dashboard" element={<VehicleManagment />} />
              }
            />
          </>
        ) : (
          <>
            <Route
              path="/*"
              element={
                <UserProtectedRoute path="user" element={<User />} />
              }
            />
          </>
        )}
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
  );
}

export default AppRoute;
