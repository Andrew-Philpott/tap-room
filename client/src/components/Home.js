import React, { useEffect } from "react";
import CardMedia from "@material-ui/core/CardMedia";
import BeerPic from "../assets/img/BeerPic.jpg";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { CSSTransition } from "react-transition-group";
import { useSelector, useDispatch } from "react-redux";
import beerActions from "../actions/beer-actions";
import { Link } from "react-router-dom";

export default () => {
  const beers = useSelector((state) => state.beers.items);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!beers) {
      dispatch(beerActions.getBeers());
    }
  }, [beers]);
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
      <CSSTransition in={true} appear={true} timeout={600} classNames="home">
        <CardMedia style={{ height: "300px", width: "100%" }} image={BeerPic} />
      </CSSTransition>
      <Grid className="white-text" container>
        <Grid item xs={1} />
        <Grid item xs={6}>
          {beers ? (
            <h1>
              <i>{beers.length} beers on tap!</i>
            </h1>
          ) : (
            <h1>Sorry, we're all out at the moment</h1>
          )}
        </Grid>
        <Grid item xs={4}>
          {highestRatedBeers && highestRatedBeers.length !== 0 && (
            <div>
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
                    {x.averageRating}/5
                  </p>
                );
              })}
            </div>
          )}
        </Grid>
        <Grid item xs={1} />
      </Grid>
    </Container>
  );
};
