import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import history from "./utils/history";
import NavigationBar from "./components/navigation";
import * as routes from "../src/constants/routes";
import withAuth from "../src/components/with-auth";
import AuthRoute from "./components/auth-route";
import Footer from "./components/footer";
import ErrorDisplay from "./components/error-display";
import ErrorBoundary from "./components/error-boundary";
import { useDispatch } from "react-redux";
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
  const dispatch = useDispatch();
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

  // React.useEffect(() => {
  //   const path = history.location.pathname;
  //   if (
  //     isAuth === true &&
  //     myReviews.length === 0 &&
  //     (path === "/account" ||
  //       path.indexOf("/reviews") !== -1 ||
  //       path.indexOf("/details") !== -1)
  //   ) {
  //     (async () => {
  //       const { getMyReviews } = await import("./services/review-service");
  //       getMyReviews(getToken())
  //         .then((res) => {
  //           setMyReviews(res);
  //         })
  //         .catch(setError);
  //     })();
  //   }
  // }, []);

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
                <Home />
              </Route>
              <Route exact path={routes.ABOUT} component={About} />
              <Route exact path={routes.BEER_LIST}>
                <BeerList
                  roles={roles}
                  getToken={getToken}
                  isAdmin={isAdmin}
                  isAuth={isAuth}
                />
              </Route>
              <Route path={routes.NEW_BEER}>
                <BeerForm getToken={getToken} />
              </Route>
              <AuthRoute
                isAuth={isAuth}
                isAdmin={isAdmin}
                adminRequired={true}
                path={routes.BEER_EDIT}
              >
                <BeerForm getToken={getToken} />
              </AuthRoute>
              <AuthRoute isAuth={isAuth} exact path={routes.NEW_REVIEW}>
                <ReviewForm />
              </AuthRoute>
              <AuthRoute
                isAuth={isAuth}
                exact
                path={routes.NEW_REVIEW_FOR_BEER}
              >
                <ReviewForm />
              </AuthRoute>
              <AuthRoute isAuth={isAuth} exact path={routes.EDIT_REVIEW}>
                <ReviewForm />
              </AuthRoute>
              <AuthRoute isAuth={isAuth} exact path={routes.ACCOUNT}>
                <Account userId={userId} userName={userName} />
              </AuthRoute>
              <Route exact path={routes.BEER_DETAILS}>
                <BeerDetail
                  userId={userId}
                  getToken={getToken}
                  isAuth={isAuth}
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
