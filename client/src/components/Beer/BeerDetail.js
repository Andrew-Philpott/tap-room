import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Grid, Button } from "@material-ui/core";
import { beerService } from "../../services/beer-service";
import { useStyles } from "../use-styles";
import { Link } from "react-router-dom";

export const BeerDetail = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [beer, setBeer] = useState(null);
  const [apiErrors, setApiErrors] = useState(null);

  useEffect(() => {
    if (id && !beer) {
      beerService
        .getBeer(parseInt(id))
        .then((response) => setBeer(response))
        .catch(() =>
          setApiErrors(
            "There was an error fetching the beer's details. Please try again later."
          )
        );
    }
  }, []);

  return (
    <Container className={`${classes.whiteText} ${classes.marginTopTwo}`}>
      {apiErrors && <h1>{apiErrors}</h1>}

      {beer && (
        <Grid container>
          <Grid item xs={12}>
            <Button
              component={Link}
              to={`/reviews/${id}/new`}
              className={`${classes.buttons} ${classes.floatRight}`}
            >
              Write a review
            </Button>
            <h1>{beer.name}</h1>
          </Grid>
          <Grid item xs={6}>
            <p>Brand: {beer.brand}</p>
            <p>Color: {beer.color}</p>
            <p>Aroma: {beer.aroma}</p>
            <p>Flavor: {beer.flavor}</p>
          </Grid>
          <Grid item xs={6}>
            <p>Alcohol Content: {beer.alcoholContent}</p>
            <p>Price: ${beer.price}</p>
            <p>Pints Left: {beer.pints}</p>
          </Grid>
        </Grid>
      )}
      {beer && beer.reviews ? (
        <React.Fragment>
          {beer.reviews.map((review, index) => {
            return (
              <div key={index} id={index}>
                <h1>Reviews</h1>
                <p>User: {review.reviewId}</p>
                <p>Rating: {review.rating}</p>
                <p>Description{review.description}</p>
              </div>
            );
          })}
        </React.Fragment>
      ) : (
        <h1>
          No reviews for this beer yet. Create an account to provide feedback!
        </h1>
      )}
    </Container>
  );
};

export default BeerDetail;
