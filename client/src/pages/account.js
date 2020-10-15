import React, { useState } from "react";
import Review from "../components/review";
import { deleteReview, getReviews } from "../actions/review";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../components/use-auth";

export default () => {
  const auth = useSelector((state) => state.auth);
  const { getToken } = useAuth();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const reviews = useSelector((state) => state.reviews.reviews);
  const handleDeleteReview = async (id) => {
    getToken().then((token) => dispatch(deleteReview(token, id)));
  };
  React.useEffect(() => {
    (async () => {
      if (reviews.length === 0 && loading === true) {
        setLoading(false);
        getToken().then((token) => dispatch(getReviews(token)));
      }
    })();
  }, [reviews, loading]);
  return (
    <div className="main-content">
      <p>
        Welcome, <b>{auth.userName}</b>
      </p>
      <div className="text-align-center">
        <h2>Today's deals</h2>
        <h4>Any beer - growler for $15</h4>
        <h4>
          Free 16pc wings with your purchase <br />
          of $70 in food or beverages
        </h4>
      </div>
      {reviews.length > 0 ? (
        <React.Fragment>
          <h2>My reviews</h2>
          {reviews.map((review, index) => {
            return (
              <Review
                review={review}
                userId={auth.userId}
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
