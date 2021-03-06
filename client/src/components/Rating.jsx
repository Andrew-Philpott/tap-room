import React from "react";
import Star from "../assets/star.svg";
import StarHalf from "../assets/star-half-alt.svg";
import StarRegular from "../assets/star-regular.svg";
import PropTypes from "prop-types";

const Rating = ({ rating, max }) => {
  const remaining = rating % 1;
  const star =
    remaining === 0 ? null : remaining > 0.75 ? (
      <img src={Star} alt="" />
    ) : remaining < 0.25 ? (
      <img src={StarRegular} alt="" />
    ) : (
      <img src={StarHalf} alt="" />
    );

  const fullStars = [];
  const emptyStars = [];
  for (let i = 0; i < Math.floor(rating); i++) {
    fullStars.push(<img src={Star} key={i} alt="" />);
  }
  for (let j = 0; j < Math.floor(max - rating); j++) {
    emptyStars.push(<img src={StarRegular} key={j} alt="" />);
  }
  return (
    <div className="rating" data-test="component-rating">
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



export default Rating;