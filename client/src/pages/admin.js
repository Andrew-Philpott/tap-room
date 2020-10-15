import React from "react";
import { useSelector } from "react-redux";
import useAuth from "../components/use-auth";

export default () => {
  const auth = useSelector((state) => state.auth);
  const { signIn, signOut } = useAuth();
  return (
    <div className="main-content text-align-center">
      <h1>Admin Sign In</h1>
      <button
        className="button"
        onClick={() => (!auth.isAuth ? signIn(true) : signOut())}
      >
        Sign in
      </button>
    </div>
  );
};
