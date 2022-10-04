import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/UserProvider";

const PrivateRoute = () => {
  //TODO: auth with token
  const { user, userLoading } = useUser();
  return user && !userLoading ? <Outlet /> : <Navigate to="/login"></Navigate>;
};
export default PrivateRoute;
