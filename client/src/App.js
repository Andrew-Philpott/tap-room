import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import NavigationBar from "./components/navigation";
import * as routes from "../src/constants/routes";
import AuthRoute from "./components/auth-route";
import Footer from "./components/footer";
import ErrorDisplay from "./components/error-display";
import ErrorBoundary from "./components/error-boundary";
import "./App.css";
const Home = React.lazy(() => import("./pages/index"));
const BeerDetail = React.lazy(() => import("./pages/beers/details"));
const BeerList = React.lazy(() => import("./pages/beers/index"));
const BeerForm = React.lazy(() => import("./pages/beers/new"));
const ReviewForm = React.lazy(() => import("./pages/reviews/new"));
const About = React.lazy(() => import("./pages/about"));
const SignIn = React.lazy(() => import("./pages/admin"));
const Account = React.lazy(() => import("./pages/account"));

const renderLoader = () => <p>Loading</p>;

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <React.Suspense fallback={renderLoader()}>
          <BrowserRouter>
            <NavigationBar />
            <Switch>
              <Route exact path={routes.BEER_DETAILS} component={BeerDetail} />
              <Route exact path={routes.ADMIN} component={SignIn} />
              <Route exact path={routes.LANDING} component={Home} />
              <Route exact path={routes.ABOUT} component={About} />
              <Route exact path={routes.BEER_LIST} component={BeerList} />
              <AuthRoute exact path={routes.ACCOUNT} component={Account} />
              <AuthRoute
                adminRequired={true}
                path={[routes.NEW_BEER, routes.BEER_EDIT]}
                component={BeerForm}
              />
              <AuthRoute
                exact
                path={[
                  routes.NEW_REVIEW,
                  routes.NEW_REVIEW_FOR_BEER,
                  routes.EDIT_REVIEW,
                ]}
                component={ReviewForm}
              />
              <Redirect to="/" from="*" />
            </Switch>
            <Footer />
          </BrowserRouter>
        </React.Suspense>
        <ErrorDisplay />
      </ErrorBoundary>
    </div>
  );
}

export default App;
