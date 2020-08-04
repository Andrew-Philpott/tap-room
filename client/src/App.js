import React, { useState, useEffect } from "react";
import "./App.css";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { history } from "./helpers";
import getUserFromLs from "./helpers/get-user-from-ls";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { BeerDetail } from "./pages/Beer/BeerDetail";
import { BeerList } from "./pages/Beer/BeerList";
import { BeerForm } from "./pages/Beer/BeerForm";
import { NavigationBar } from "./components/NavigationBar";
import { ReviewForm } from "./pages/Review/ReviewForm";
import { PrivateRoute } from "./components/PrivateRoute";
import { About } from "./pages/About";
import { Account } from "./pages/Account";
import * as routes from "../src/constants/routes";
import * as roles from "../src/constants/roles";

function App() {
  const [user, setUser] = useState(null);
  const [selectedBeer, setSelectedBeer] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!user && !loaded) {
      setUser(getUserFromLs());
      setLoaded(true);
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
          {loaded && (
            <Route
              exact
              path={routes.BEER_LIST}
              component={() => <BeerList user={user} />}
            />
          )}
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
