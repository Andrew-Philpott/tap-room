export default (values, errors, setErrors) => {
  const fieldValues = values;
  let temp = { ...errors };
  if ("email" in fieldValues)
    temp.email = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
      fieldValues.email
    )
      ? ""
      : "Email format is invalid.";
  if ("password" in fieldValues)
    temp.password = fieldValues.password ? "" : "Field cannot be blank";

  setErrors({ ...temp });

  if (fieldValues === values) return Object.values(temp).every((x) => x === "");
};
