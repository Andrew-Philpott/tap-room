import React from "react";
import PropTypes from "prop-types";

const ErrorDisplay = ({ error }) => {
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

ErrorDisplay.propTypes = {
  error: PropTypes.object.isRequired
}

export default ErrorDisplay;