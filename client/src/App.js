import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import history from "./utils/history";
import NavigationBar from "./components/navigation";
import * as routes from "../src/constants/routes";
import AuthRoute from "./components/auth-route";
import Footer from "./components/footer";
import ErrorDisplay from "./components/error-display";
import ErrorBoundary from "./components/error-boundary";
import useAuth from "./components/use-auth";
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
  const { auth, getToken } = useAuth();
  const [error, setError] = React.useState((err) => {
    const validationErrors =
      err && err.validationErrors ? err.validationErrors : null;
    const status =
      typeof err === "number" && err === 500 ? "Internal server error." : null;
    return { validationErrors: validationErrors, status: status };
  });

  React.useEffect(() => {
    (async () => {
      history.listen(() => {
        const temp = { ...error };
        temp.validationErrors = null;
        temp.status = null;
        setError(temp);
      });
    })();
  }, [error, setError]);

  return (
    <div className="App">
      <ErrorBoundary>
        <React.Suspense fallback={renderLoader()}>
          <Router history={history}>
            <NavigationBar />
            <Switch>
              <Route exact path={routes.ADMIN} component={SignIn} />
              <Route exact path={routes.LANDING} component={Home} />
              <Route exact path={routes.ABOUT} component={About} />
              <Route exact path={routes.BEER_LIST} component={BeerList} />
              <AuthRoute
                isAuth={auth.isAuth}
                isAdmin={auth.isAdmin}
                adminRequired={true}
                path={routes.NEW_BEER}
              >
                <BeerForm />
              </AuthRoute>
              <AuthRoute
                isAuth={auth.isAuth}
                isAdmin={auth.isAdmin}
                adminRequired={true}
                path={routes.BEER_EDIT}
              >
                <BeerForm />
              </AuthRoute>
              <AuthRoute isAuth={auth.isAuth} exact path={routes.NEW_REVIEW}>
                <ReviewForm />
              </AuthRoute>
              <AuthRoute
                isAuth={auth.isAuth}
                exact
                path={routes.NEW_REVIEW_FOR_BEER}
              >
                <ReviewForm />
              </AuthRoute>
              <AuthRoute isAuth={auth.isAuth} exact path={routes.EDIT_REVIEW}>
                <ReviewForm />
              </AuthRoute>
              <AuthRoute isAuth={auth.isAuth} exact path={routes.ACCOUNT}>
                <Account />
              </AuthRoute>
              <Route exact path={routes.BEER_DETAILS} component={BeerDetail} />
              <Redirect to="/" from="*" />
            </Switch>
            <Footer />
          </Router>
        </React.Suspense>
        <ErrorDisplay error={error} />
      </ErrorBoundary>
    </div>
  );
}

export default App;
