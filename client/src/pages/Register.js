import React, { useEffect, useState } from "react";
import { Button, Container, TextField } from "@material-ui/core";
import * as routes from "../constants/routes";
import { userService } from "../services/user-service";
import { history } from "../helpers/history";
import { useStyles } from "../components/use-styles";
import { useForm } from "../components/useForm";

const initialFieldValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

export const Register = () => {
  const classes = useStyles();
  const [apiErrors, setApiErrors] = useState(null);
  const { values, errors, setErrors, handleInputChange } = useForm(
    initialFieldValues
  );

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("firstName" in fieldValues) {
      temp.firstName = fieldValues.firstName ? "" : "Field cannot be blank";
    }
    if ("lastName" in fieldValues) {
      temp.lastName = fieldValues.lastName ? "" : "Field cannot be blank";
    }
    const mailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if ("email" in fieldValues) {
      temp.email = fieldValues.email.match(mailFormat)
        ? ""
        : "Email is not valid.";
    }
    if ("password" in fieldValues) {
      temp.password = fieldValues.password ? "" : "Field cannot be blank";
    }

    if (!fieldValues.firstName) {
      temp.firstName = "Field cannot be blank";
    } else {
      temp.firstName = "";
    }
    if (!fieldValues.lastName) {
      temp.lastName = "Field cannot be blank";
    } else {
      temp.lastName = "";
    }

    if (!fieldValues.email.match(mailFormat)) {
      temp.email = "Invalid email format";
    } else {
      temp.email = "";
    }
    if (!fieldValues.password) {
      temp.password = "Field cannot be blank";
    } else {
      temp.password = "";
    }

    setErrors({ ...temp });

    if (!temp.firstName && !temp.lastName && !temp.email && !temp.password) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    userService.logout();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setErrors(null);
    if (validate()) {
      userService
        .register({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: e.target.password.value,
        })
        .then(() => history.push(routes.LOG_IN))
        .catch(() => {
          setApiErrors("Error trying to register. Please try again later.");
        });
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
        />
        <div className={classes.marginTopOne}>
          <Button className={classes.buttons} href={routes.LANDING}>
            Cancel
          </Button>
          <Button className={`${classes.buttons} ${classes.floatRight}`}>
            Register
          </Button>
        </div>
        {errors && errors.internal && <h1>{errors.internal}</h1>}
      </form>
    </Container>
  );
};
