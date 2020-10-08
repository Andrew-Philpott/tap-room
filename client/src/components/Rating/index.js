import React from "react";
import Star from "../../assets/svg/star.svg";
import StarHalf from "../../assets/svg/star-half-alt.svg";

export default ({ rating, max }) => {
  const remaining = rating % 1;
  const star =
    remaining === 0 ? null : remaining > 0.75 ? (
      <Star />
    ) : remaining < 0.25 ? (
      <Star />
    ) : (
      <StarHalf />
    );

  const fullStars = [];
  const emptyStars = [];
  for (let i = 0; i < Math.floor(rating); i++) {
    fullStars.push(<Star key={i} />);
  }
  for (let j = 0; j < Math.floor(max - rating); j++) {
    emptyStars.push(<Star key={j} />);
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
