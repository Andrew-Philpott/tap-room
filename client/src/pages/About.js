import React from "react";
import CardMedia from "@material-ui/core/CardMedia";
import { Grid } from "@material-ui/core";
import { useStyles } from "../components/use-styles";

export const About = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.whiteText}>
      <Grid item xs={12}>
        <CardMedia
          style={{ height: "400px" }}
          image={`https://images.unsplash.com/photo-1564038057908-cae089c15d45?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80`}
          alt="Brewing equipment"
        />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <img
          style={{ height: "300px", float: "left", marginRight: "10px" }}
          src={`https://images.unsplash.com/photo-1532634733-cae1395e440f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80`}
          alt="Two men observing the quality of beers around brewing equipment."
        />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis. Duis aute irure dolor in reprehenderit in
          voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia
          deserunt mollit anim id est laborum.
        </p>
      </Grid>
    </Grid>
  );
};
