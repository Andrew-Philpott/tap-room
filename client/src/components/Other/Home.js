import React from "react";
import CardMedia from "@material-ui/core/CardMedia";
import BeerPic from "../../assets/img/BeerPic.jpg";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";

export default ({ ...props }) => {
  const { beers } = props;
  const average = (array) => array.reduce((a, b) => a + b) / array.length;
  const highestRatedBeers =
    beers &&
    beers
      .filter((x) => x.reviews.length !== 0)
      .map((x) => {
        return {
          beer: x,
          averageRating: average(x.reviews.map((r) => r.rating)),
        };
      })
      .sort((a, b) => (a.rating > b.rating ? 1 : -1))
      .slice(0, 3);

  return (
    <Container>
      <CardMedia style={{ height: "300px", width: "100%" }} image={BeerPic} />
      <Grid className="white-text" container>
        <Grid item xs={1} />
        <Grid item xs={6}>
          {beers.length !== 0 && (
            <React.Fragment>
              <h1>
                <i>{beers.length} beers on tap!</i>
              </h1>
              <ul>
                {beers.map((x) => {
                  return <li>{x.name}</li>;
                })}
              </ul>
            </React.Fragment>
          )}
        </Grid>
        <Grid item xs={4}>
          {highestRatedBeers.length !== 0 && (
            <React.Fragment>
              <h1>
                <i>Local favorites:</i>
              </h1>
              {highestRatedBeers.map((x, index) => {
                return (
                  <p key={index}>
                    {index + 1}.{" "}
                    <Link to={`/beers/${parseInt(x.beer.beerId)}`}>
                      <i>{x.beer.name}</i>
                    </Link>
                    &nbsp;&nbsp;
                    {x.averageRating.toFixed(2)}/5
                  </p>
                );
              })}
            </React.Fragment>
          )}
        </Grid>
        <Grid item xs={1} />
      </Grid>
    </Container>
  );
};
