import React from "react";
import Rating from "./Rating";
import Trash from "../assets/trash.svg";
import Pencil from "../assets/pencil-alt.svg";
import { useHistory } from "react-router-dom";
import AuthContext from "./AuthContext";
import ThumbsUp from "./ThumbsUp";
import PropTypes from "prop-types";

const Review = ({ review, onLikeReview, onDeleteReview, isAccount }) => {
  const [isLiked, setIsLiked] = React.useState(false);
  const history = useHistory();
  const { userId } = AuthContext.useAuth();

  React.useEffect(() => {
    const likedResult =
      review.likes.find((x) => x.userId === userId) !== undefined ? true : false;
    setIsLiked(likedResult);
  }, [onLikeReview]);

  const likeEnabled =
    userId === 0 ? false : review.userId !== userId ? true : false;

  return (
    <div className="review" data-test="component-review">
      <h2>{isAccount ? review.beer.name : review.name}</h2>
      <p>{review.dateCreated}</p>
      <Rating rating={review.rating} max={5} />
      <h3>{review.headline}</h3>
      <p>{review.description}</p>
      <p>
        {review.likes.length > 0 && (
          <React.Fragment>
            {review.likes.length}
            {review.likes.length === 1 ? " like" : " likes"}
          </React.Fragment>
        )}
      </p>
      <hr />
      <div>
        <React.Fragment>
          {!isAccount && likeEnabled && (
            <React.Fragment>
              <ThumbsUp review={review} isLiked={isLiked} onLikeReview={onLikeReview}/>
              <span>Like</span>
            </React.Fragment>
          )}
          {isAccount && (
            <React.Fragment>
              <img
                src={Trash}
                onClick={() => onDeleteReview(review.reviewId)}
                className="pointer"
                alt=""
              />
              <img
                onClick={() => history.push(`/reviews/edit/${review.reviewId}`)}
                src={Pencil}
                className="pointer"
                alt=""
              />
            </React.Fragment>
          )}
        </React.Fragment>
      </div>
    </div>
  );
};

Review.propTypes = {
  review: PropTypes.object.isRequired,
  onLikeReview: PropTypes.func.isRequired,
  onDeleteReview: PropTypes.func.isRequired,
  isAccount: PropTypes.bool.isRequired
}

export default Review;