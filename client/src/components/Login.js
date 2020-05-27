import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../actions/user-actions";
import { Button, Container } from "@material-ui/core";
import { useStyles } from "../components/use-styles";

export const Login = () => {
  const classes = useStyles();
  const [Inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const { username, password } = Inputs;
  const loggingIn = useSelector((state) => state.authentication.loggingIn);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.logout());
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((Inputs) => ({ ...Inputs, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    setSubmitted(true);
    if (username && password) {
      dispatch(userActions.login(username, password));
    }
  }

  return (
    <Container maxWidth="sm">
      <h2 className={classes.white}>Log in</h2>
      <form name="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className={classes.white}>Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
            className={
              "form-control" + (submitted && !username ? " is-invalid" : "")
            }
          />
          {submitted && !username && (
            <div className="invalid-feedback">Username is required</div>
          )}
        </div>
        <div className="form-group">
          <label className={classes.white}>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            className={
              "form-control" + (submitted && !password ? " is-invalid" : "")
            }
          />
          {submitted && !password && (
            <div className="invalid-feedback">Password is required</div>
          )}
        </div>

        <div className="form-group">
          <span className={classes.white}>No Account?</span>
          <Button
            style={{
              marginLeft: "20px",
            }}
            className={classes.buttons}
            href="/register"
          >
            Register
          </Button>
          <Button className={classes.floatRightButton} type="submit">
            {loggingIn && (
              <span className="spinner-border spinner-border-sm mr-1"></span>
            )}
            Log in
          </Button>
        </div>
      </form>
    </Container>
  );
};
