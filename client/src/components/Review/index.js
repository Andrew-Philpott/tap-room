import React from "react";
import Rating from "../Rating";
import ThumbsUp from "../../assets/svg/thumbs-up.svg";
import Trash from "../../assets/svg/trash.svg";
import Pencil from "../../assets/svg/pencil-alt.svg";
import { Link } from "react-router-dom";
import "./index.css";

export default ({ item, onLikeReview, userId, onDeleteReview, isAccount }) => {
  const [isLiked, setIsLiked] = React.useState(false);
  const handleClick = () => {
    onLikeReview(item);
  };

  React.useEffect(() => {
    const likedResult =
      item.likes.find((x) => x.userId === userId) !== undefined ? true : false;
    setIsLiked(likedResult);
  }, [handleClick]);

  const likeEnabled =
    userId === 0 ? false : item.userId !== userId ? true : false;

  return (
    <div className="review">
      <h2>{isAccount ? item.beer.name : item.name}</h2>
      <p>{item.dateCreated}</p>
      <div>
        <Rating rating={item.rating} max={5} />
        <h3>{item.headline}</h3>
      </div>

      <p>{item.description}</p>
      <p>
        {item.likes.length > 0 && (
          <React.Fragment>
            {item.likes.length}
            {item.likes.length === 1 ? " like" : " likes"}
          </React.Fragment>
        )}
      </p>
      <hr />
      <div>
        <React.Fragment>
          {likeEnabled && (
            <React.Fragment>
              <ThumbsUp
                style={{ cursor: "pointer" }}
                onClick={() => handleClick()}
                className={isLiked === true ? "ming-c" : ""}
              />
              <span>Like</span>
            </React.Fragment>
          )}
          {isAccount && (
            <React.Fragment>
              <Trash
                onClick={() => onDeleteReview(item.reviewId)}
                className="delete"
              />
              <Link to={`/reviews/edit/${item.reviewId}`}>
                <Pencil className="edit" />
              </Link>
            </React.Fragment>
          )}
        </React.Fragment>
      </div>
    </div>
  );
};
