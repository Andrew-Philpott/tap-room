import React from "react";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import * as routes from "../../constants/routes";
import { connect } from "react-redux";
import { userActions } from "../../actions/user-actions";
import useForm from "../hooks/useForm";

const Register = ({ ...props }) => {
  const { register } = props;
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("firstName" in fieldValues)
      temp.firstName = fieldValues.firstName ? "" : "Field cannot be blank";
    if ("lastName" in fieldValues)
      temp.lastName = fieldValues.lastName ? "" : "Field cannot be blank";
    if ("password" in fieldValues)
      temp.password = fieldValues.password ? "" : "Field cannot be blank";
    if ("email" in fieldValues)
      temp.email = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
        fieldValues.email
      )
        ? ""
        : "Email is not valid.";
    setErrors({ ...temp });
    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const { values, errors, setErrors, handleInputChange } = useForm(
    {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validate
  );

  function handleSubmit(e) {
    e.preventDefault();
    if (validate()) {
      register(values);
    }
  }

  return (
    <Container className="white-text mrgn-t16" maxWidth="sm">
      <h2>Register</h2>
      <form autoComplete="off" method="post" noValidate onSubmit={handleSubmit}>
        <TextField
          type="text"
          name="firstName"
          fullWidth
          InputProps={{
            classes: { notchedOutline: "white-border" },
            className: "white-text mrgn-t16",
          }}
          placeholder="First Name"
          value={values.firstName}
          onChange={handleInputChange}
          variant="outlined"
          {...(errors.firstName && {
            error: true,
            helperText: errors.firstName,
          })}
        />
        <TextField
          type="text"
          name="lastName"
          fullWidth
          InputProps={{
            classes: { notchedOutline: "white-border" },
            className: "white-text mrgn-t16",
          }}
          placeholder="Last Name"
          value={values.lastName}
          onChange={handleInputChange}
          variant="outlined"
          {...(errors.lastName && {
            error: true,
            helperText: errors.lastName,
          })}
        />
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
          <Button className="buttons" href={routes.LANDING}>
            Cancel
          </Button>
          <Button type="submit" className="buttons float-right">
            Register
          </Button>
        </div>
      </form>
    </Container>
  );
};

const mapActionToProps = {
  register: userActions.register,
};

export default connect(null, mapActionToProps)(Register);
