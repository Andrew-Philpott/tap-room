import React, { useState } from "react";
import { userService } from "../services/user-service";
import { Button, Container, TextField } from "@material-ui/core";
import { history } from "../helpers/history";
import * as routes from "../constants/routes";
import { useStyles } from "../components/use-styles";
import { useForm } from "../components/useForm";

const initialFieldValues = {
  email: "",
  password: "",
};

export const Login = (props) => {
  const { setUser } = props;
  const classes = useStyles();
  const [apiErrors, setApiErrors] = useState(null);
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("email" in fieldValues) {
      temp.email = fieldValues.email ? "" : "Field cannot be blank";
    }
    if ("password" in fieldValues) {
      temp.password = fieldValues.password ? "" : "Field cannot be blank";
    }
    setErrors({ ...temp });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const { values, errors, setErrors, handleInputChange } = useForm(
    initialFieldValues,
    validate
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setApiErrors(null);
    if (validate()) {
      userService
        .login(values.email, values.password)
        .then((response) => {
          setUser(response);
          localStorage.setItem("user", JSON.stringify(response));
          history.push(routes.BEER_LIST);
        })
        .catch(() => {
          setApiErrors("Error trying to login. Please try again later.");
        });
    }
  };

  return (
    <Container
      className={`${classes.whiteText} ${classes.marginTopTwo}`}
      maxWidth="sm"
    >
      {apiErrors && <h1>{apiErrors}</h1>}
      <h2>Log in</h2>
      <form autoComplete="off" method="post" noValidate onSubmit={handleSubmit}>
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
          <span className={classes.marginRightTen}>No Account?</span>
          <Button
            variant="contained"
            className={`${classes.buttons} ${classes.floatRight}`}
            href={routes.REGISTER}
          >
            Register
          </Button>
          <Button
            type="submit"
            variant="contained"
            className={`${classes.buttons}`}
          >
            Log in
          </Button>
        </div>
      </form>
    </Container>
  );
};
