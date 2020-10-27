import React from "react";
export default (initialFieldValues, validate) => {
  const [values, setValues] = React.useState(initialFieldValues);
  const [formErrors, setFormErrors] = React.useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const fieldValue = { [name]: value };
    setValues({
      ...values,
      ...fieldValue,
    });
    validate && validate(fieldValue);
  };
  return {
    values,
    setValues,
    formErrors,
    setFormErrors,
    handleInputChange,
  };
};
