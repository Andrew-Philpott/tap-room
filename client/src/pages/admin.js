import React from "react";
import useAuth from "../components/use-auth";

export default () => {
  const {auth, signIn, signOut } = useAuth();
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
