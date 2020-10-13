import React from "react";
import Star from "../svg/star.svg";
import StarHalf from "../svg/star-half-alt.svg";
import "../css/rating.css";

export default ({ rating, max }) => {
  const remaining = rating % 1;
  const star =
    remaining === 0 ? null : remaining > 0.75 ? (
      <img src={Star} alt="" />
    ) : remaining < 0.25 ? (
      <img src={Star} alt="" />
    ) : (
      <img src={StarHalf} alt="" />
    );

  const fullStars = [];
  const emptyStars = [];
  for (let i = 0; i < Math.floor(rating); i++) {
    fullStars.push(<img src={Star} key={i} />);
  }
  for (let j = 0; j < Math.floor(max - rating); j++) {
    emptyStars.push(<img src={Star} key={j} />);
  }
  return (
    <div className="rating">
      {fullStars.map((x) => {
        return x;
      })}
      {star}
      {emptyStars.map((x) => {
        return x;
      })}
    </div>
  );
};
