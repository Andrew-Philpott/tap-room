import React from "react";
import Container from "@material-ui/core/Container";

export default ({ ...props }) => {
  const { user } = props;
  return (
    <Container>
      <h1>Welcome {user.userName}</h1>
      <div className="white-text text-align-center">
        <h2>Todays deals</h2>
        <h4>Growler for $15</h4>
        <h4>
          Free wings with your purchase <br />
          of $30 in food or beverages
        </h4>
      </div>
    </Container>
  );
};
