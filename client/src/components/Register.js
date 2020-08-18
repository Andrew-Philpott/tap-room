import React, { useEffect, useState } from "react";
import { Button, Container, TextField } from "@material-ui/core";
import * as routes from "../constants/routes";
import { userService } from "../services/user-service";
import { userActions } from "../actions/user-actions";
import { useStyles } from "../components/use-styles";
import { useForm } from "../components/useForm";

export const Register = () => {
  const classes = useStyles();
  const [apiErrors, setApiErrors] = useState(null);
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

  useEffect(() => {
    userService.logout();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setErrors(null);
    if (validate()) {
      userActions.register(values);
    }
  }

  return (
    <Container
      className={`${classes.whiteText} ${classes.marginTopTwo}`}
      maxWidth="sm"
    >
      {apiErrors && <h1>{apiErrors}</h1>}
      <h2>Register</h2>
      <form autoComplete="off" method="post" noValidate onSubmit={handleSubmit}>
        <TextField
          type="text"
          name="firstName"
          fullWidth
          InputProps={{
            classes: { notchedOutline: classes.whiteTextField },
            className: `${classes.whiteText} ${classes.marginTopTwo}`,
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
            classes: { notchedOutline: classes.whiteTextField },
            className: `${classes.whiteText} ${classes.marginTopTwo}`,
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
            classes: { notchedOutline: classes.whiteTextField },
            className: `${classes.whiteText} ${classes.marginTopTwo}`,
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
            classes: { notchedOutline: classes.whiteTextField },
            className: `${classes.whiteText} ${classes.marginTopTwo}`,
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
        <div className={classes.marginTopOne}>
          <Button className="buttons" href={routes.LANDING}>
            Cancel
          </Button>
          <Button type="submit" className="buttons float-right">
            Register
          </Button>
        </div>
        {errors && errors.internal && <h1>{errors.internal}</h1>}
      </form>
    </Container>
  );
};
