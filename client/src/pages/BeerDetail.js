import React from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { Link, useParams } from "react-router-dom";
import Rating from "../components/Rating";
import DarkBeer from "../assets/img/DarkBeer.jpg";
import Review from "../components/Review";
import beerService from "../services/beer-service";
import reviewService from "../services/review-service";

export default ({ userId, isAuth, getToken, setError }) => {
  const { id } = useParams();
  const [beer, setBeer] = React.useState(null);
  React.useEffect(() => {
    if (id) {
      beerService.getBeer(id).then(setBeer).catch(setError);
    }
  }, []);

  const handleLike = (item) => {
    const like = item.likes.find((x) => x.userId === userId);
    !like
      ? reviewService
          .createLike(getToken(), { reviewId: item.reviewId })
          .then((res) => {
            const review = beer.reviews.find(
              (x) => x.reviewId === item.reviewId
            );
            review.likes.push(res);
            const newState = { ...beer };
            newState.reviews = beer.reviews.map((x) =>
              x.reviewId === item.reviewId ? review : x
            );
            setBeer(newState);
          })
          .catch((err) => setError(err))
      : reviewService
          .deleteLike(getToken(), like.reviewLikeId)
          .then((res) => {
            const review = { ...item };
            review.likes = review.likes.filter(
              (x) => x.reviewLikeId !== res.reviewLikeId
            );
            const newState = { ...beer };
            newState.reviews = beer.reviews.map((x) =>
              x.reviewId === item.reviewId ? review : x
            );
            setBeer(newState);
          })
          .catch((err) => setError(err));
  };

  const average = (array) => array.reduce((a, b) => a + b) / array.length;
  const averageRating =
    beer &&
    beer.reviews &&
    beer.reviews.length !== 0 &&
    average(beer.reviews.map((r) => r.rating));

  return (
    <Container className="main-content" maxWidth="lg">
      {beer ? (
        <Grid container>
          <Grid item xs={7} sm={6}>
            <h1>{beer.name}</h1>
            {averageRating && (
              <div className="rating-container">
                <span>Rating&nbsp;/</span>
                <span>&nbsp;</span>
                <Rating rating={averageRating} max={5} />
              </div>
            )}
            <Grid container>
              <Grid item xs={7} sm={6} md={5}>
                <p>Brand: {beer.brand}</p>
                <p>Color: {beer.color}</p>
                <p>Aroma: {beer.aroma}</p>
                <p>Flavor: {beer.flavor}</p>
              </Grid>
              <Grid item xs={5} sm={4} md={4}>
                <div>
                  <p>ABV: {beer.alcoholContent}%</p>
                  <p>Price: ${beer.price}</p>
                  <p>Pints Left: {beer.pints}</p>
                </div>
              </Grid>
              <Grid item sm={2} md={3} />
            </Grid>
          </Grid>
          <Grid item xs={5} sm={6}>
            <img
              src={DarkBeer}
              className="beer-detail-img"
              alt="Glass of dark beer on a table"
            />
            {isAuth && (
              <Button
                style={{
                  float: "right",
                  marginTop: "8px",
                  marginRight: "6px",
                }}
                component={Link}
                to={`/reviews/new/${beer.beerId}`}
                className="button"
              >
                Write your own review
              </Button>
            )}
          </Grid>
          <Grid container>
            {beer.reviews && beer.reviews.length !== 0 ? (
              <Grid item xs={12}>
                <h1>Reviews</h1>
                {beer.reviews.map((review, index) => {
                  return (
                    <Review
                      item={review}
                      onLikeReview={handleLike}
                      userId={userId}
                      crudEnabled={false}
                      key={index}
                    />
                  );
                })}
              </Grid>
            ) : (
              <h1>
                No reviews for this beer yet.{" "}
                {!isAuth && <>Create an account to provide feedback!</>}
              </h1>
            )}
          </Grid>
        </Grid>
      ) : (
        <h1>Loading</h1>
      )}
    </Container>
  );
};
