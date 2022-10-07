import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ClipLoading } from "../components/ClipLoading";
import { useUser } from "../context/UserProvider";

const PrivateRoute = () => {
  //TODO: auth with token
  const { user, userLoading } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user && !userLoading && location.pathname !== "/register") {
      navigate("/login", { replace: true });
    }
    if (
      user &&
      !userLoading &&
      (location.pathname === "/login" || location.pathname === "/register")
    ) {
      navigate("/", { replace: true });
    }
  }, [location.pathname, navigate, user, userLoading]);

  if (userLoading) {
    return <ClipLoading></ClipLoading>;
  }
  return <Outlet />;
};
export default PrivateRoute;
