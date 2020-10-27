import React from "react";

export default ({ error }) => {
  return (
    <React.Fragment>
      {error && (error.status || error.validationErrors) && (
        <div data-test="component-error-display">
          {error.status && <p data-test="error-status">{error.status}</p>}
          {error.validationErrors && (
            <div className="text-align-center" data-test="error-validation-errors">
              {Object.values(error.validationErrors).map((element, index) => {
                return <p key={index}>{element}</p>;
              })}
            </div>
          )}
        </div>
      )}
    </React.Fragment>
  );
};
