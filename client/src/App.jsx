import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import NavigationBar from "./components/Navigation";
import * as routes from "./other/routes";
import withAuth from "./components/WithAuth";
import AuthRoute from "./components/AuthRoute";
import Footer from "./components/Footer";
import ErrorDisplay from "./components/ErrorDisplay";
import { getBeers } from "./other/beer-service";
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
    getBeers().then((r)=>setBeers(r)).catch(setError);
  }, []);

  React.useEffect(() => {
    if (isAuth === true) {
      (async () => {
        const { getMyReviews } = await import("./other/review-service");
        getMyReviews(getToken())
          .then((res) => {
            setMyReviews(res);
          })
          .catch(setError);
      })();
    }
  }, []);

  return (
    <div className="App" data-test="component-app">
      <ErrorBoundary>
        <React.Suspense fallback={renderLoader()}>
          <BrowserRouter>
            <NavigationBar/>
            <Switch>
              <Route exact path={routes.ADMIN} component={SignIn}/>
              <Route exact path={routes.LANDING}>
                <Home beers={beers} />
              </Route>
              <Route exact path={routes.ABOUT} component={About} />
              <Route exact path={routes.BEER_LIST}>
                <BeerList
                  beers={beers}
                  setBeers={setBeers}
                  setError={setError}
                />
              </Route>
              <AuthRoute
                path={[routes.BEER_EDIT, routes.NEW_BEER]}
              >
                <BeerForm
                  beers={beers}
                  setBeers={setBeers}
                  setError={setError}
                />
              </AuthRoute>
              <AuthRoute
                exact
                path={[
                  routes.NEW_REVIEW,
                  routes.NEW_REVIEW_FOR_BEER,
                  routes.EDIT_REVIEW,
                ]}
                component={<ReviewForm beers={beers} myReviews={myReviews} />}
              />
              <AuthRoute exact path={routes.ACCOUNT} component={<Account
                  setError={setError}
                  myReviews={myReviews}
                  setMyReviews={setMyReviews}
                />}/>
              <Route exact path={routes.BEER_DETAILS}>
                <BeerDetail
                  setError={setError}
                  myReviews={myReviews}
                />
              </Route>
              <Redirect to="/" from="*" />
            </Switch>
            <Footer />
          </BrowserRouter>
        </React.Suspense>
        <ErrorDisplay error={error} />
      </ErrorBoundary>
    </div>
  );
}

export default App;
