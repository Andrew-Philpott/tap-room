import React from "react";
import { useAuth } from "../components/AuthContext";

export default () => {
  const { signInSignOut } = useAuth();
  return (
    <div className="main-content text-align-center" data-test="component-sign-in">
      <h1>Admin Sign In</h1>
      <button className="button" onClick={() => signInSignOut(true)}>
        Sign in
      </button>
    </div>
  );
};
