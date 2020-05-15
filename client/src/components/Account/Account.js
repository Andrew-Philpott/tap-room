import React from "react";
import { Container } from "../components/Home/node_modules/@material-ui/core";
import { useSelector } from "react-redux";
export const Account = () => {
  const user = useSelector((state) => state.authentication.user);
  if (user) {
    return (
      <>
        <h1 style={{ color: "white" }}>Welcome {user.username}</h1>
        <br />
        <Container style={{ color: "white", textAlign: "center" }}>
          <h2>Todays deals</h2>
          <h4>Growler for $15</h4>
          <h4>
            Free wings with your purchase <br></br> of $30 in food or beverages
          </h4>
        </Container>
      </>
    );
  } else {
    return <h1>Loading</h1>;
  }
};
