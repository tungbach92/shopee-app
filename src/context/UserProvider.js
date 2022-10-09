import React, { useCallback, useContext, useEffect } from "react";
import { auth } from "../firebase";
import useGetUserByObserver from "../hooks/useGetUserByObserver";
import axios from "../axios";
import useCheckPhotoURL from "../hooks/useCheckPhotoURL";
import { saveCartItemsToFirebase } from "../services/saveCartItemsToFirebase";
import { useNavigate } from "react-router-dom";
import { useCheckFirebaseIdTokenAuthTime } from "../hooks/useCheckFirebaseIdTokenAuthTime";

const UserContext = React.createContext();
export const useUser = () => {
  return useContext(UserContext);
};

const UserProvider = ({ children }) => {
  const { user, userLoading } = useGetUserByObserver();
  const navigate = useNavigate();

  const getCartItemsFromStorage = () => {
    let savedCartItems = localStorage.getItem("cartProduct");
    return savedCartItems ? JSON.parse(savedCartItems) : savedCartItems;
  };

  const signOut = useCallback(async () => {
    const saveCartItems = getCartItemsFromStorage();
    await saveCartItemsToFirebase(user, saveCartItems);
    localStorage.clear();
    await auth.signOut();
    navigate("/login", { replace: true });
  }, [navigate, user]);

  useCheckPhotoURL(user);
  useCheckFirebaseIdTokenAuthTime(user, signOut);

  const signIn = ({ email, password }) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const register = ({ email, password }) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const value = { user, userLoading, signIn, signOut, register };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
