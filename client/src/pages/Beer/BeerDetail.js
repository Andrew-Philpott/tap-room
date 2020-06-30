import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Grid, Button } from "@material-ui/core";
import { beerService } from "../../services/beer-service";
import * as route from "../../constants/routes";
import { useStyles } from "../../components/use-styles";

export const BeerDetail = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [beer, setBeer] = useState(null);

  useEffect(() => {
    if (id) {
      beerService
        .getBeer(parseInt(id))
        .then((res) => setBeer(res))
        .catch((error) => console.log(error));
    }
  }, []);

  return (
    <Container className={`${classes.whiteText} ${classes.marginTopTwo}`}>
      {beer && (
        <Grid container>
          <Grid item xs={12}>
            <Button
              className={classes.floatRightButton}
              href={route.NEW_REVIEW}
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
        <>
          {beer.reviews.map((review, index) => {
            return (
              <div key={index} id={index}>
                <h1>Reviews</h1>
                <p>User: {review.id}</p>
                <p>Rating: {review.rating}</p>
                <p>Description{review.description}</p>
              </div>
            );
          })}
        </>
      ) : (
        <h1>
          No reviews for this beer yet. Create an account to provide feedback!
        </h1>
      )}
    </Container>
  );
};

export default BeerDetail;
