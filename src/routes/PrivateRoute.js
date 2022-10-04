import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ClipLoading } from "../components/ClipLoading";
import { useUser } from "../context/UserProvider";

const PrivateRoute = () => {
  //TODO: auth with token
  const { user, userLoading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !userLoading) {
      navigate("/login");
    }
  }, [navigate, user, userLoading]);

  if (userLoading) {
    return <ClipLoading></ClipLoading>;
  }
  return <Outlet />;
};
export default PrivateRoute;
