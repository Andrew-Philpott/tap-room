import React from "react";

export default ({ onSignInOrSignOut }) => {
  return (
    <div className="main-content text-align-center" data-test="component-sign-in">
      <h1>Admin Sign In</h1>
      <button className="button" onClick={() => onSignInOrSignOut(true)}>
        Sign in
      </button>
    </div>
  );
};
