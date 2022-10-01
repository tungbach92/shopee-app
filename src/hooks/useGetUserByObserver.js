import { useEffect, useState } from "react";
import { auth } from "../firebase";

const useGetUserByObserver = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const unsubscribeUserObserver = auth.onIdTokenChanged((authUser) => {
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
      setLoading(false);
    });
    return unsubscribeUserObserver;
  }, []);

  return { user, userLoading: loading, authorized };
};
export default useGetUserByObserver;
