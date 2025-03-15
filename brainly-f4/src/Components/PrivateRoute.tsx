import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  // Get authentication status (Replace with actual auth logic)
  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default PrivateRoute;
