import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Container, Grid, Button } from "@material-ui/core";
import { beerActions } from "../../actions/beer-actions";
import * as route from "../../constants/routes";

export const BeerDetail = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.authentication.user);
  const beer = useSelector((state) => state.beers.item);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(beerActions.getBeer(parseInt(id)));
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "black",
        color: "white",
      }}
    >
      {beer && user && (
        <Container>
          <Grid container>
            <Grid item xs={12}>
              <Button
                style={{
                  backgroundColor: "white",
                  float: "right",
                  marginTop: "10px",
                }}
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
          {beer.reviews ? (
            <>
              {beer.reviews.map((review) => {
                return (
                  <div id={review.id}>
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
              No reviews for this beer yet. Create an account to provide
              feedback!
            </h1>
          )}
        </Container>
      )}
    </div>
  );
};

export default BeerDetail;
