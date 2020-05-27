import React from "react";
import { Container } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useStyles } from "../components/use-styles";

export const Account = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.authentication.user);
  if (user) {
    return (
      <>
        <h1 className={classes.white}>Welcome {user.username}</h1>
        <Container style={{ color: "white", textAlign: "center" }}>
          <h2>Todays deals</h2>
          <h4>Growler for $15</h4>
          <h4>
            Free wings with your purchase <br />
            of $30 in food or beverages
          </h4>
        </Container>
      </>
    );
  } else {
    return <h1>Loading</h1>;
  }
};
