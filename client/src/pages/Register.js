import React, { useEffect } from "react";
import { Button, Container, FormGroup, TextField } from "@material-ui/core";
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
  const { values, errors, setErrors, handleInputChange } = useForm(
    initialFieldValues
  );

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
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
    //Standard REGEX, local email check
    const mailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
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
        .catch((error) => {
          let temp = { ...errors };
          temp.internal = error;
          setErrors({ ...temp });
        });
    }
  }

  return (
    <Container
      className={`${classes.whiteText} ${classes.marginTopTwo}`}
      maxWidth="sm"
    >
      <h2>Register</h2>
      <form name="form" onSubmit={handleSubmit}>
        <FormGroup>
          <TextField
            type="text"
            name="firstName"
            InputProps={{
              classes: { notchedOutline: classes.whiteTextField },
              className: classes.whiteText,
            }}
            placeholder="First Name"
            value={values.firstName}
            onChange={handleInputChange}
            variant="outlined"
          />
        </FormGroup>
        <FormGroup className={classes.marginTopTwo}>
          <TextField
            type="text"
            name="lastName"
            InputProps={{
              classes: { notchedOutline: classes.whiteTextField },
              className: classes.whiteText,
            }}
            placeholder="Last Name"
            value={values.lastName}
            onChange={handleInputChange}
            variant="outlined"
          />
        </FormGroup>

        <FormGroup className={classes.marginTopTwo}>
          <TextField
            type="text"
            name="email"
            InputProps={{
              classes: { notchedOutline: classes.whiteTextField },
              className: classes.whiteText,
            }}
            placeholder="Email"
            value={values.email}
            onChange={handleInputChange}
            variant="outlined"
          />
        </FormGroup>
        <FormGroup className={classes.marginTopTwo}>
          <TextField
            type="password"
            name="password"
            InputProps={{
              classes: { notchedOutline: classes.whiteTextField },
              className: classes.whiteText,
            }}
            placeholder="Password"
            value={values.password}
            onChange={handleInputChange}
            variant="outlined"
          />
        </FormGroup>
        <div className={classes.marginTopOne}>
          <Button className={classes.buttons} href={routes.LANDING}>
            Cancel
          </Button>
          <Button className={classes.floatRightButton}>Register</Button>
        </div>

        {errors && errors.internal && <h1>{errors.internal}</h1>}
      </form>
    </Container>
  );
};
