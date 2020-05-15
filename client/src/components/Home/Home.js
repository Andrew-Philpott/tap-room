import React from "react";
import CardMedia from "../About/Home/node_modules/@material-ui/core/CardMedia";
import BeerPic from "../../assets/img/BeerPic.jpg";
import { Grid, Container } from "../About/Home/node_modules/@material-ui/core";
export const Home = () => {
  return (
    <Container>
      <Grid container>
        <CardMedia
          style={{ height: "400px", width: "100%" }}
          image={BeerPic}
        ></CardMedia>
      </Grid>
    </Container>
  );
};
