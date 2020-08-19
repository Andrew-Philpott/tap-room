import React from "react";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { REGISTER } from "../constants/routes";
import useForm from "./hooks/useForm";
import { useDispatch } from "react-redux";
import { userActions } from "../actions/user-actions";

export default () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(userActions.logout());
  }, []);
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("email" in fieldValues)
      temp.email = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
        fieldValues.email
      )
        ? ""
        : "Email is not valid.";
    if ("password" in fieldValues)
      temp.password = fieldValues.password ? "" : "Field cannot be blank";
    setErrors({ ...temp });
    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };
  const { values, errors, setErrors, handleInputChange } = useForm(
    {
      email: "",
      password: "",
    },
    validate
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(userActions.login(values.email, values.password));
    }
  };

  return (
    <Container className="white-text mrgn-t16" maxWidth="sm">
      <h2>Log in</h2>
      <form autoComplete="off" method="post" noValidate onSubmit={handleSubmit}>
        <TextField
          type="text"
          name="email"
          fullWidth
          InputProps={{
            classes: { notchedOutline: "white-border" },
            className: "white-text mrgn-t16",
          }}
          placeholder="Email"
          value={values.email}
          onChange={handleInputChange}
          variant="outlined"
          {...(errors.email && {
            error: true,
            helperText: errors.email,
          })}
        />
        <TextField
          type="password"
          name="password"
          fullWidth
          InputProps={{
            classes: { notchedOutline: "white-border" },
            className: "white-text mrgn-t16",
          }}
          placeholder="Password"
          value={values.password}
          onChange={handleInputChange}
          variant="outlined"
          {...(errors.password && {
            error: true,
            helperText: errors.password,
          })}
        />
        <div className="mrgn-t8">
          <span className="mrgn-r8">No Account?</span>
          <Button
            variant="contained"
            className="buttons float-right"
            href={REGISTER}
          >
            Register
          </Button>
          <Button type="submit" variant="contained" className="buttons">
            Log in
          </Button>
        </div>
      </form>
    </Container>
  );
};
