import React from "react";
import { useSelector } from "react-redux";

export default () => {
  const reviewErrors = useSelector((state) => state.reviews.error);
  const beerErrors = useSelector((state) => state.beers.error);
  React.useEffect(() => {}, [reviewErrors, beerErrors]);
  return (
    <div className="text-align-center">
      {reviewErrors && reviewErrors.status && <p>{reviewErrors.status}</p>}
      {reviewErrors && reviewErrors.validationErrors && (
        <>
          {Object.values(reviewErrors.validationErrors).map(
            (element, index) => {
              return <p key={index}>{element}</p>;
            }
          )}
        </>
      )}
      {beerErrors && beerErrors.status && <p>{beerErrors.status}</p>}
      {beerErrors && beerErrors.validationErrors && (
        <>
          {Object.values(beerErrors.validationErrors).map((element, index) => {
            return <p key={index}>{element}</p>;
          })}
        </>
      )}
    </div>
  );
};
