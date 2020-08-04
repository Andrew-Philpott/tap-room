import React from "react";
import CardMedia from "@material-ui/core/CardMedia";
import BeerPic from "../assets/img/BeerPic.jpg";
import { Grid, Container } from "@material-ui/core";
import { CSSTransition } from "react-transition-group";
export const Home = () => {
  return (
    <Container>
      <Grid container>
        <CSSTransition in={true} appear={true} timeout={600} classNames="home">
          <CardMedia
            style={{ height: "400px", width: "100%" }}
            image={BeerPic}
          />
        </CSSTransition>
      </Grid>
    </Container>
  );
};
