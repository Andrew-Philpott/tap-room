import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import history from "./helpers/history";
import Home from "./components/Other/Home";
import Login from "./components/Other/Login";
import Register from "./components/Other/Register";
import BeerDetail from "./components/Beer/BeerDetail";
import BeerList from "./components/Beer/BeerList";
import BeerForm from "./components/Beer/BeerForm";
import NavigationBar from "./components/Other/NavigationBar";
import ReviewForm from "./components/Review/ReviewForm";
import PrivateRoute from "./components/Other/PrivateRoute";
import About from "./components/Other/About";
import Account from "./components/Other/Account";
import * as routes from "../src/constants/routes";
import * as roles from "../src/constants/roles";
import { useSelector, useDispatch } from "react-redux";
import errorActions from "./actions/error-actions";
import "./App.css";

function App() {
  const error = useSelector((state) => state.error);
  const dispatch = useDispatch();
  React.useEffect(() => {
    history.listen((location, action) => {
      dispatch(errorActions.clear());
    });
  }, [error]);
  return (
    <div className="App">
      <Router history={history}>
        <NavigationBar />
        {error &&
          error.message &&
          Object.values(error.message).map((x, index) => {
            return (
              <p key={index} className="white-text text-align-center">
                {x}
              </p>
            );
          })}
        <Switch>
          <Route exact path={routes.LANDING} component={Home} />
          <Route exact path={routes.ABOUT} component={About} />
          <Route exact path={routes.REGISTER} component={Register} />
          <Route exact path={routes.LOG_IN} component={Login} />
          <Route exact path={routes.BEER_LIST} component={BeerList} />
          <PrivateRoute
            exact
            path={routes.NEW_BEER}
            roles={[roles.ADMIN]}
            component={BeerForm}
          />
          <Route exact path={routes.BEER_DETAILS} component={BeerDetail} />
          <PrivateRoute
            exact
            path={routes.EDIT_BEER}
            roles={[roles.ADMIN]}
            component={BeerForm}
          />
          <PrivateRoute
            exact
            path={routes.NEW_REVIEW}
            roles={[roles.MEMBER, roles.EMPLOYEE, roles.ADMIN]}
            component={ReviewForm}
          />
          <PrivateRoute
            exact
            path={routes.ACCOUNT}
            roles={[roles.ADMIN]}
            component={Account}
          />
          <Redirect from="*" to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
