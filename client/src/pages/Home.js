import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import BeerBar from "../assets/img/BeerBar.jpg";
import FlightOfBeers from "../assets/img/FlightOfBeers.jpg";
import FriendsBeers from "../assets/img/FriendsBeers.jpg";

export default ({ beers }) => {
  const average = (array) => array.reduce((a, b) => a + b) / array.length;
  return (
    <Container className="main-content home" maxWidth="lg">
      <Grid item xs={12}>
        <Carousel interval={8000} indicators={false} startAt={0}>
          <img key={1} src={BeerBar} alt="Glass of a light beer on the bar" />
          <img
            key={2}
            src={FlightOfBeers}
            alt="A flight of assorted craft beers"
          />
          <img
            key={3}
            src={FriendsBeers}
            alt="Friends enjoying beers together"
          />
        </Carousel>
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={2} />
          <Grid item xs={5}>
            {beers.length !== 0 && (
              <React.Fragment>
                <h2>Beers on tap</h2>
                <ul>
                  {beers.map(
                    (x, index) =>
                      index < 10 && (
                        <li key={index}>
                          <Link to={`/beers/details/${x.beerId}`}>
                            {x.name}
                          </Link>
                        </li>
                      )
                  )}
                </ul>
                {beers.length >= 10 && <p>Plus several more!</p>}
              </React.Fragment>
            )}
          </Grid>
          <Grid item xs={4}>
            {beers.length >= 5 && (
              <React.Fragment>
                <h2>Top 5</h2>
                {beers &&
                  beers
                    .filter((x) => x.reviews && x.reviews.length !== 0)
                    .map((x) => {
                      return {
                        beer: x,
                        averageRating: average(x.reviews.map((r) => r.rating)),
                      };
                    })
                    .sort((a, b) =>
                      a.averageRating < b.averageRating ? 1 : -1
                    )
                    .slice(0, 5)
                    .map((x, index) => {
                      return (
                        <p key={index}>
                          {index + 1}
                          {". "}
                          <Link to={`/beers/details/${x.beer.beerId}`}>
                            {x.beer.name}
                          </Link>
                        </p>
                      );
                    })}
              </React.Fragment>
            )}
          </Grid>
          <Grid item xs={1} />
        </Grid>
      </Grid>
    </Container>
  );
};
