import React from "react";
import "./App.css";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { history } from "./helpers";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { BeerDetail } from "./pages/Beer/BeerDetail";
import { BeerList } from "./pages/Beer/BeerList";
import { NewBeerForm } from "./pages/Beer/NewBeerForm";
import { NavigationBar } from "./components/NavigationBar";
import { EditBeerForm } from "./pages/Beer/EditBeerForm";
import { NewReviewForm } from "./pages/Review/NewReviewForm";
import { PrivateRoute } from "./components/PrivateRoute";
import { About } from "./pages/About";
import { Account } from "./pages/Account";
import * as c from "../src/constants/routes";
import * as r from "../src/constants/roles";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="App">
      <Router history={history}>
        <NavigationBar user={user} />
        <Switch>
          <Route exact path={c.LANDING} component={Home} />
          <Route exact path={c.ABOUT} component={About} />
          <Route exact path={c.REGISTER} component={Register} />
          <Route exact path={c.LOG_IN} component={Login} />
          <Route
            exact
            path={c.BEER_LIST}
            component={() => <BeerList user={user} />}
          />
          <PrivateRoute
            exact
            path={c.NEW_BEER}
            roles={[r.ADMIN]}
            component={NewBeerForm}
          />
          <Route exact path={c.BEER_DETAILS} component={BeerDetail} />
          <PrivateRoute
            exact
            path={c.EDIT_BEER}
            roles={[r.ADMIN]}
            component={EditBeerForm}
          />

          <PrivateRoute
            exact
            path={c.NEW_REVIEW}
            roles={[r.MEMBER, r.EMPLOYEE, r.ADMIN]}
            component={NewReviewForm}
          />
          <PrivateRoute
            exact
            path={c.ACCOUNT}
            roles={[r.ADMIN]}
            component={Account}
          />
          <Redirect from="*" to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
