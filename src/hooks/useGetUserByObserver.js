import { useEffect, useState } from "react";
import { auth } from "../firebase";

const useGetUserByObserver = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState([]);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    setLoading(true);
    const unsubscribeUserObserver = auth.onIdTokenChanged((authUser) => {
      setLoading(false);
      if (authUser) {
        //user will log in or logged in
        setUser(authUser);
        setAuthorized(true);
        // cartItems = this.getCartItemsFromFirebase(authUser);
      } else {
        //user logged out
        setUser(null);
        setAuthorized(false);
      }
    });
    return unsubscribeUserObserver;
  }, []);

  return { user, userLoading: loading, authorized };
};
export default useGetUserByObserver;
