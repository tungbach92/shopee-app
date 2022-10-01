import React, { useContext, useState } from "react";
import { auth } from "../firebase";
import useGetUserByObserver from "../hooks/useGetUserByObserver";

const UserContext = React.createContext();
export const useUser = () => {
  return useContext(UserContext);
};

const UserProvider = ({ children }) => {
  const { user, userLoading, authorized } = useGetUserByObserver();

  const signOut = () => {
    return auth.signOut();
  };
  const signIn = ({ email, password }) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const register = ({ email, password }) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const value = { user, userLoading, authorized, signIn, signOut, register };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
