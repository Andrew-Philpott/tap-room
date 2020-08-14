import React, { useState, useEffect } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { history } from "./helpers";
import getUserFromLs from "./helpers/get-user-from-ls";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { BeerDetail } from "./components/Beer/BeerDetail";
import { BeerList } from "./components/Beer/BeerList";
import { BeerForm } from "./components/Beer/BeerForm";
import { NavigationBar } from "./components/NavigationBar";
import { ReviewForm } from "./components/ReviewForm";
import { PrivateRoute } from "./components/PrivateRoute";
import { About } from "./components/About";
import { Account } from "./components/Account";
import * as routes from "../src/constants/routes";
import * as roles from "../src/constants/roles";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [selectedBeer, setSelectedBeer] = useState(null);

  useEffect(() => {
    if (!user) {
      setUser(getUserFromLs());
    }
  }, []);

  return (
    <div className="App">
      <Router history={history}>
        <NavigationBar user={user} setUser={setUser} />
        <Switch>
          <Route exact path={routes.LANDING} component={Home} />
          <Route exact path={routes.ABOUT} component={About} />
          <Route exact path={routes.REGISTER} component={Register} />
          <Route
            exact
            path={routes.LOG_IN}
            component={() => <Login setUser={setUser} />}
          />
          <Route
            exact
            path={routes.BEER_LIST}
            component={() => <BeerList user={user} />}
          />
          <PrivateRoute
            user={user}
            exact
            path={routes.NEW_BEER}
            roles={[roles.ADMIN]}
            component={BeerForm}
          />
          <Route
            exact
            path={routes.BEER_DETAILS}
            component={() => <BeerDetail setSelectedBeer={setSelectedBeer} />}
          />
          <PrivateRoute
            user={user}
            exact
            path={routes.EDIT_BEER}
            roles={[roles.ADMIN]}
            component={BeerForm}
          />
          <PrivateRoute
            user={user}
            exact
            path={routes.NEW_REVIEW}
            roles={[roles.MEMBER, roles.EMPLOYEE, roles.ADMIN]}
            component={() => (
              <ReviewForm
                selectedBeer={selectedBeer}
                setSelectedBeer={setSelectedBeer}
              />
            )}
          />
          <PrivateRoute
            user={user}
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
