import React from "react";
import Review from "../components/Review";
import AuthContext from "../components/AuthContext";
import PropTypes from "prop-types";

const Account = ({
  myReviews,
  setMyReviews,
  setError,
}) => {
  const { userId, userName, getToken } = AuthContext.useAuth();
  const handleDeleteReview = async (id) => {
    const { deleteReview } = await import("../other/review-service");
    deleteReview(getToken(), id)
      .then((res) => {
        setMyReviews([...myReviews.filter((x) => x.reviewId !== res.reviewId)]);
      })
      .catch(setError);
  };

  return (
    <div className="main-content" data-test="component-account">
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
                review={review}
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

Account.propTypes = {
  myReviews: PropTypes.array.isRequired,
  setMyReviews: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
}

export default Account;