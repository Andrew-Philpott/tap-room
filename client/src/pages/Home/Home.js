import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import BeerBar from "../../assets/img/BeerBar.jpg";
import "./index.css";

export default ({ beers }) => {
  const average = (array) => array.reduce((a, b) => a + b) / array.length;
  return (
    <Container className="main-content home">
      <Grid item xs={12}>
        <img src={BeerBar} alt="Glass of a light beer on the bar" />
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
