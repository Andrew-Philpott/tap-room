import React from "react";
import { Container } from "@material-ui/core";
import { useStyles } from "../components/use-styles";

export const Account = (props) => {
  const { user } = props;
  const classes = useStyles();

  if (user) {
    return (
      <>
        <Container className={classes.whiteText}>
          <h1>Welcome {user.username}</h1>
          <div className={classes.textAlignCenter}>
            <h2>Todays deals</h2>
            <h4>Growler for $15</h4>
            <h4>
              Free wings with your purchase <br />
              of $30 in food or beverages
            </h4>
          </div>
        </Container>
      </>
    );
  } else {
    return <h1>Loading</h1>;
  }
};
