import React from "react";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarHalfIcon from "@material-ui/icons/StarHalf";
import "./index.css";

export default ({ rating, max }) => {
  const remaining = rating % 1;
  const star =
    remaining === 0 ? null : remaining > 0.75 ? (
      <StarIcon />
    ) : remaining < 0.25 ? (
      <StarBorderIcon />
    ) : (
      <StarHalfIcon />
    );

  const fullStars = [];
  const emptyStars = [];
  for (let i = 0; i < Math.floor(rating); i++) {
    fullStars.push(<StarIcon key={i} />);
  }
  for (let j = 0; j < Math.floor(max - rating); j++) {
    emptyStars.push(<StarBorderIcon key={j} />);
  }
  return (
    <React.Fragment>
      {fullStars.map((x) => {
        return x;
      })}
      {star}
      {emptyStars.map((x) => {
        return x;
      })}
    </React.Fragment>
  );
};
