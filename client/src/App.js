import React, { useEffect } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { history } from "./helpers";
import { alertActions } from "./actions/alert-actions";
import { Home } from "./components/Home/Home";
import { Signin } from "./components/Signin/Signin";
import { Register } from "./components/Register/Register";
import { BeerDetail } from "./components/Beer/BeerDetail";
import { BeerList } from "./components/Beer/BeerList";
import { NewBeerForm } from "./components/Beer/NewBeerForm";
import { NavigationBar } from "./components/NavigationBar/NavigationBar";
import { EditBeerForm } from "./components/Beer/EditBeerForm";
import { NewReviewForm } from "./components/Review/NewReviewForm";
import { PrivateRoute } from "./components/PrivateRoute";
import { ToastProvider } from "react-toast-notifications";
import { About } from "./components/About/About";
import { Account } from "./components/Account/Account";
import * as c from "../src/constants/routes";
import * as r from "../src/constants/roles";

function App() {
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location, action) => {
      dispatch(alertActions.clear());
    });
  }, []);

  return (
    <div className="App">
      <ToastProvider autoDismiss={true}>
        <Router history={history}>
          <NavigationBar></NavigationBar>
          <Switch>
            <Route exact path={c.LANDING} component={Home} />
            <Route exact path={c.REGISTER} component={Register} />
            <Route exact path={c.SIGN_IN} component={Signin} />
            <Route exact path={c.BEER_DETAILS} component={BeerDetail} />
            <Route exact path={c.BEER_LIST} component={BeerList} />
            <PrivateRoute
              exact
              path={c.NEW_BEER}
              roles={[r.ADMIN]}
              component={NewBeerForm}
            />
            <Route
              exact
              path={c.EDIT_BEER}
              roles={[r.ADMIN]}
              component={EditBeerForm}
            />
            <Route exact path={c.ABOUT} component={About} />
            <PrivateRoute
              exact
              path={c.NEW_REVIEW}
              roles={[r.MEMBER, r.EMPLOYEE, r.ADMIN]}
              component={NewReviewForm}
            ></PrivateRoute>
            <PrivateRoute
              exact
              path={c.ACCOUNT}
              roles={[r.ADMIN]}
              component={Account}
            ></PrivateRoute>
            <Redirect from="*" to="/" />
          </Switch>
        </Router>
      </ToastProvider>
    </div>
  );
}

export default App;
