import React from "react";
import { useHistory, useParams } from "react-router-dom";
import Rating from "../../components/rating";
import DarkBeer from "../../images/DarkBeer.webp";
import Review from "../../components/review";
import { useDispatch, useSelector } from "react-redux";
import { getBeer, createLike, deleteLike } from "../../actions/beer";
import useAuth from "../../components/use-auth";
import "../../css/beer-details.css";

export default () => {
  const auth = useSelector((state) => state.auth);
  const { getToken } = useAuth();
  const history = useHistory();
  const dispatch = useDispatch();
  const beer = useSelector((state) => state.beers.beer);
  const reviews = useSelector((state) => state.reviews.reviews);
  const { id } = useParams();
  React.useEffect(() => {
    if (id) {
      dispatch(getBeer(id));
    }
  }, []);

  const handleLike = (item) => {
    const like = item.likes.find((x) => x.userId === auth.userId);
    getToken().then((token) =>
      dispatch(
        !like
          ? createLike(token, { reviewId: item.reviewId })
          : deleteLike(token, like.reviewLikeId)
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
              {auth.isAuth && !reviews.includes((x) => x.beerId === id) && (
                <button
                  style={{
                    float: "right",
                    marginTop: "8px",
                    marginRight: "6px",
                  }}
                  className="button"
                  onClick={() => history.push(`/reviews/new/${beer.beerId}`)}
                >
                  Write your own review
                </button>
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
                      userId={auth.userId}
                      isAccount={false}
                      key={index}
                    />
                  );
                })}
              </div>
            ) : (
              <h1>
                No reviews for this beer yet.{" "}
                {!auth.isAuth && <>Create an account to provide feedback!</>}
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
