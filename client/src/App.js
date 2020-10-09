import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import history from "./helpers/history";
import NavigationBar from "./components/Navigation";
import * as routes from "../src/constants/routes";
import withAuth from "../src/components/withAuth";
import AuthRoute from "./components/AuthRoute";
import Footer from "./components/Footer";
import ErrorDisplay from "./components/ErrorDisplay";
import ErrorBoundary from "./components/ErrorBoundary";
import "./App.css";
const Home = React.lazy(() => import("./pages/Home"));
const BeerDetail = React.lazy(() => import("./pages/BeerDetail"));
const BeerList = React.lazy(() => import("./pages/BeerList"));
const BeerForm = React.lazy(() => import("./pages/BeerForm"));
const ReviewForm = React.lazy(() => import("./pages/ReviewForm"));
const About = React.lazy(() => import("./pages/About"));
const SignIn = React.lazy(() => import("./pages/SignIn"));
const Account = React.lazy(() => import("./pages/Account"));

const renderLoader = () => <p>Loading</p>;

function App({
  signIn,
  signOut,
  userId,
  isAuth,
  isAdmin,
  getToken,
  userName,
  roles,
}) {
  const [beers, setBeers] = React.useState([]);
  const [myReviews, setMyReviews] = React.useState([]);
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

  React.useEffect(() => {
    if (beers.length === 0) {
      (async () => {
        const { getBeers } = await import("./services/beer-service");
        getBeers()
          .then((res) => {
            setBeers(res);
          })
          .catch(setError);
      })();
    }
  }, [setBeers]);

  React.useEffect(() => {
    const path = history.location.pathname;
    if (
      isAuth === true &&
      myReviews.length === 0 &&
      (path === "/account" ||
        path.indexOf("/reviews") !== -1 ||
        path.indexOf("/details") !== -1)
    ) {
      (async () => {
        const { getMyReviews } = await import("./services/review-service");
        getMyReviews(getToken())
          .then((res) => {
            setMyReviews(res);
          })
          .catch(setError);
      })();
    }
  }, []);

  const handleSignInOrSignOut = (isAdmin) => {
    !isAuth ? (isAdmin ? signIn(true) : signIn(false)) : signOut();
  };

  return (
    <div className="App">
      <ErrorBoundary>
        <React.Suspense fallback={renderLoader()}>
          <Router history={history}>
            <NavigationBar
              isAuth={isAuth}
              onSignInOrSignOut={handleSignInOrSignOut}
            />
            <Switch>
              <Route exact path={routes.ADMIN}>
                <SignIn onSignInOrSignOut={handleSignInOrSignOut} />
              </Route>
              <Route exact path={routes.LANDING}>
                <Home beers={beers} />
              </Route>
              <Route exact path={routes.ABOUT} component={About} />
              <Route exact path={routes.BEER_LIST}>
                <BeerList
                  roles={roles}
                  getToken={getToken}
                  isAdmin={isAdmin}
                  isAuth={isAuth}
                  beers={beers}
                  setBeers={setBeers}
                  setError={setError}
                />
              </Route>
              <Route path={routes.NEW_BEER}>
                <BeerForm
                  beers={beers}
                  setBeers={setBeers}
                  setError={setError}
                  getToken={getToken}
                />
              </Route>
              <AuthRoute
                isAuth={isAuth}
                isAdmin={isAdmin}
                adminRequired={true}
                path={routes.BEER_EDIT}
              >
                <BeerForm
                  beers={beers}
                  setBeers={setBeers}
                  setError={setError}
                  getToken={getToken}
                />
              </AuthRoute>
              <AuthRoute isAuth={isAuth} exact path={routes.NEW_REVIEW}>
                <ReviewForm beers={beers} myReviews={myReviews} />
              </AuthRoute>
              <AuthRoute
                isAuth={isAuth}
                exact
                path={routes.NEW_REVIEW_FOR_BEER}
              >
                <ReviewForm beers={beers} myReviews={myReviews} />
              </AuthRoute>
              <AuthRoute isAuth={isAuth} exact path={routes.EDIT_REVIEW}>
                <ReviewForm beers={beers} myReviews={myReviews} />
              </AuthRoute>
              <AuthRoute isAuth={isAuth} exact path={routes.ACCOUNT}>
                <Account
                  setError={setError}
                  myReviews={myReviews}
                  setMyReviews={setMyReviews}
                  userId={userId}
                  userName={userName}
                />
              </AuthRoute>
              <Route exact path={routes.BEER_DETAILS}>
                <BeerDetail
                  userId={userId}
                  getToken={getToken}
                  setError={setError}
                  isAuth={isAuth}
                  myReviews={myReviews}
                />
              </Route>
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

export default withAuth(App);
