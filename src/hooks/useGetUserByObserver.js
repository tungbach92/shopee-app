import { useEffect, useState } from "react";
import { auth } from "../firebase";

const useGetUserByObserver = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeUserObserver = auth.onIdTokenChanged(
      (authUser) => {
        if (authUser) {
          //user will log in or logged in
          setUser(authUser);
          // cartItems = this.getCartItemsFromFirebase(authUser);
        } else {
          //user logged out
          setUser(null);
        }
        setLoading(false);
      },
      (error) => {
        alert("Lỗi check user:" + error);
        setLoading(false);
      }
    );
    return unsubscribeUserObserver;
  }, []);

  return { user, userLoading: loading };
};
export default useGetUserByObserver;
