import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectCurrentUser } from "../redux/features/authSlice";

const RoleBasedRoute = ({ allowedRoles = [], children }) => {
  const user = useSelector(selectCurrentUser);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles.length && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children ? children : <Outlet />;
};

export default RoleBasedRoute;
