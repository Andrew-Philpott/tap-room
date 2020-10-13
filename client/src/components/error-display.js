import React from "react";

export default ({ error }) => {
  return (
    <React.Fragment>
      {error && error.status && <p>{error.status}</p>}
      {error && error.validationErrors && (
        <div className="text-align-center">
          {Object.values(error.validationErrors).map((element, index) => {
            return <p key={index}>{element}</p>;
          })}
        </div>
      )}
    </React.Fragment>
  );
};
