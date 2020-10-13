import React from "react";
import { Link, useParams } from "react-router-dom";
import Rating from "../../components/rating";
import DarkBeer from "../../images/DarkBeer.webp";
import Review from "../../components/review";
import { useDispatch, useSelector } from "react-redux";
import {
  getBeerAction,
  createLikeAction,
  deleteLikeAction,
} from "../../actions/beer";
import "../../css/beer-details.css";

export default ({ userId, isAuth, getToken }) => {
  const dispatch = useDispatch();
  const beer = useSelector((state) => state.beers);
  const reviews = useSelector((state) => state.reviews);
  const { id } = useParams();
  React.useEffect(() => {
    if (id) {
      dispatch(getBeerAction(id));
    }
  }, []);

  const handleLike = async (item) => {
    const like = item.likes.find((x) => x.userId === userId);
    getToken().then((token) =>
      dispatch(
        !like
          ? createLikeAction(token, { reviewId: item.reviewId })
          : deleteLikeAction(token, like.reviewLikeId)
      )
    );
  };

  const average = (array) => array.reduce((a, b) => a + b) / array.length;
  const averageRating =
    beer &&
    beer.reviews &&
    beer.reviews.length !== 0 &&
    average(beer.reviews.map((r) => r.rating));

  return (
    <div id="beer-detail" className="main-content">
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
              {isAuth && !reviews.includes((x) => x.beerId === id) && (
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
                      item={review}
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
