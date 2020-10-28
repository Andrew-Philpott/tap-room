import React from "react";
import { Link, useParams } from "react-router-dom";
import Rating from "../components/Rating";
import DarkBeer from "../assets/DarkBeer.webp";
import Review from "../components/Review";
import { getBeer } from "../other/beer-service";
import { useAuth } from "../components/AuthContext";
import { average } from "../other/utils";

export default ({ setError, myReviews }) => {
  const { userId, isAuth, getToken } = useAuth();
  const { id } = useParams();
  const [beer, setBeer] = React.useState(null);
  React.useEffect(() => {
    if (id) {
      getBeer(id).then(setBeer).catch(setError);
    }
  }, []);

  const handleLike = async (item) => {
    const like = item.likes.find((x) => x.userId === userId);
    const { createLike, deleteLike } = await import("../other/review-service");
    const newState = { ...beer };
    !like
      ? createLike(getToken(), { reviewId: item.reviewId })
          .then((res) => {
            const review = beer.reviews.find(
              (x) => x.reviewId === item.reviewId
            );
            review.likes.push(res);
            newState.reviews = beer.reviews.map((x) =>
              x.reviewId === item.reviewId ? review : x
            );
            setBeer(newState);
          })
          .catch(setError)
      : deleteLike(getToken(), like.reviewLikeId)
          .then((res) => {
            const review = { ...item };
            review.likes = review.likes.filter(
              (x) => x.reviewLikeId !== res.reviewLikeId
            );
            newState.reviews = beer.reviews.map((x) =>
              x.reviewId === item.reviewId ? review : x
            );
            setBeer(newState);
          })
          .catch(setError);
  };
  const averageRating =
    beer &&
    beer.reviews &&
    beer.reviews.length !== 0 &&
    average(beer.reviews.map((r) => r.rating));

  return (
    <div
      id="beer-detail"
      className="main-content"
      data-test="component-beer-detail"
    >
      {beer ? (
        <React.Fragment>
          <div>
            <div>
              <h1>{beer.name}</h1>
              {averageRating && (
                <div className="rating-container">
                  <span>Rating&nbsp;/</span>
                  <span>&nbsp;</span>
                  <Rating rating={averageRating} max={5} />
                </div>
              )}
              <p>Brand: {beer.brand}</p>
              <p>Color: {beer.color}</p>
              <p>Aroma: {beer.aroma}</p>
              <p>Flavor: {beer.flavor}</p>
              <p>ABV: {beer.alcoholContent}%</p>
              <p>Price: ${beer.price}</p>
              <p>Pints Left: {beer.pints}</p>
            </div>
            <div>
              <img
                src={DarkBeer}
                className="beer-detail-img"
                alt="Glass of dark beer on a table"
              />
              {isAuth && !myReviews.includes((x) => x.beerId === id) && (
                <Link
                  style={{
                    float: "right",
                    marginTop: "8px",
                    marginRight: "6px",
                  }}
                  to={`/reviews/new/${beer.beerId}`}
                >
                  Write your own review
                </Link>
              )}
            </div>
          </div>
          <div>
            {beer.reviews && beer.reviews.length !== 0 ? (
              <div>
                <h1>Reviews</h1>
                {beer.reviews.map((review, index) => {
                  return (
                    <Review
                      review={review}
                      onLikeReview={handleLike}
                      userId={userId}
                      isAccount={false}
                      key={index}
                    />
                  );
                })}
              </div>
            ) : (
              <h1>
                No reviews for this beer yet.{" "}
                {!isAuth && <>Create an account to provide feedback!</>}
              </h1>
            )}
          </div>
        </React.Fragment>
      ) : (
        <h1>Loading</h1>
      )}
    </div>
  );
};
