import React from "react";
import Review from "../components/Review";
import { deleteReview } from "../../services/review-service";
import "./index.css";

export default ({
  userId,
  userName,
  getToken,
  myReviews,
  setMyReviews,
  setError,
}) => {
  const handleDeleteReview = async (id) => {
    deleteReview(getToken(), id)
      .then((res) => {
        setMyReviews([...myReviews.filter((x) => x.reviewId !== res.reviewId)]);
      })
      .catch(setError);
  };

  return (
    <div className="main-content">
      <p>
        Welcome, <b>{userName}</b>
      </p>
      <div className="text-align-center">
        <h2>Today's deals</h2>
        <h4>Any beer - growler for $15</h4>
        <h4>
          Free 16pc wings with your purchase <br />
          of $70 in food or beverages
        </h4>
      </div>
      {myReviews.length > 0 ? (
        <React.Fragment>
          <h2>My reviews</h2>
          {myReviews.map((review, index) => {
            return (
              <Review
                item={review}
                userId={userId}
                onDeleteReview={handleDeleteReview}
                isAccount={true}
                key={index}
              />
            );
          })}
        </React.Fragment>
      ) : (
        <h1>You dont have any reviews yet!</h1>
      )}
    </div>
  );
};
