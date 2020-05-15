import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../actions/user-actions";
import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  mainContent: {
    height: "100%",
    backgroundColor: "black",
    color: "white",
  },
  input: {
    borderBottom: "white",
    color: "white",
  },
});

export const Signin = () => {
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
    <div className="col-lg-8 offset-lg-2">
      <br></br>
      <h2>Signin</h2>
      <br></br>
      <form name="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
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
          <label>Password</label>
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
          <span style={{ fontSize: "large", marginRight: "10" }}>
            No Account?
          </span>
          <Button
            style={{
              backgroundColor: "white",
              color: "black",
              marginLeft: "20px",
            }}
            href="/register"
            className="btn btn-link"
          >
            Register
          </Button>
          <Button
            style={{
              backgroundColor: "white",
              color: "black",
              float: "right",
            }}
            type="submit"
            className="btn btn-primary"
          >
            {loggingIn && (
              <span className="spinner-border spinner-border-sm mr-1"></span>
            )}
            Signin
          </Button>
        </div>
      </form>
    </div>
  );
};
