import React, { useEffect } from "react";
import { userService } from "../services/user-service";
import { Button, FormGroup, Container, TextField } from "@material-ui/core";
import { history } from "../helpers/history";
import * as routes from "../constants/routes";
import { useStyles } from "../components/use-styles";
import { useForm } from "../components/useForm";

const initialFieldValues = {
  email: "",
  password: "",
};

export const Login = () => {
  const classes = useStyles();
  const { values, errors, setErrors, handleInputChange } = useForm(
    initialFieldValues
  );

  useEffect(() => {
    userService.logout();
  }, []);

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if (!fieldValues.email) {
      temp.email = "Field cannot be blank";
    } else {
      temp.email = "";
    }
    if (!fieldValues.password) {
      temp.password = "Field cannot be blank";
    } else {
      temp.password = "";
    }

    setErrors({ ...temp });

    if (!temp.email && !temp.password) {
      return true;
    } else {
      return false;
    }
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (validate()) {
      userService
        .login({ email: values.email, password: values.password })
        .then(() => {
          history.push(routes.ACCOUNT);
        })
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
      <h2>Log in</h2>
      <form name="form" onSubmit={handleSubmit}>
        <FormGroup>
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
          <span className={classes.marginRightTen}>No Account?</span>
          <Button
            variant="contained"
            className={classes.buttons}
            href={routes.REGISTER}
          >
            Register
          </Button>
          <Button
            variant="contained"
            type="submit"
            className={`${classes.floatRightButton}`}
          >
            Log in
          </Button>
        </div>

        {errors && errors.internal && <h1>{errors.internal}</h1>}
      </form>
    </Container>
  );
};
