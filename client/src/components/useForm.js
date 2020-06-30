import { useState } from "react";

export const useForm = (initialFieldValues) => {
  const [values, setValues] = useState(initialFieldValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const fieldValue = { [name]: value };
    setValues({
      ...values,
      ...fieldValue,
    });
  };
  return {
    values,
    setValues,
    handleInputChange,
  };
};
