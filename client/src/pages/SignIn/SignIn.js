import React from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";

export default ({ onSignInOrSignOut }) => {
  return (
    <Container className="main-content text-align-center">
      <h1>Admin Sign In</h1>
      <Button className="button" onClick={() => onSignInOrSignOut(true)}>
        Sign in
      </Button>
    </Container>
  );
};
