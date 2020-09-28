import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import history from "./helpers/history";
import Home from "./pages/Home";
import BeerDetail from "./pages/BeerDetail";
import BeerList from "./pages/BeerList";
import BeerForm from "./pages/BeerForm";
import NavigationBar from "./components/NavigationBar";
import ReviewForm from "./pages/ReviewForm";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import Account from "./pages/Account";
import * as routes from "../src/constants/routes";
import withAuth from "../src/components/withAuth";
import beerService from "./services/beer-service";
import reviewService from "./services/review-service";
import AuthRoute from "./components/AuthRoute";
import Footer from "./components/Footer";
import ErrorDisplay from "./components/ErrorDisplay";
import Grid from "@material-ui/core/Grid";
import "./App.css";

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
    history.listen(() => {
      const temp = { ...error };
      temp.validationErrors = null;
      temp.status = null;
      setError(temp);
    });
  }, []);

  React.useEffect(() => {
    if (beers.length === 0) {
      (async () => {
        beerService
          .getBeers()
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
      reviewService
        .getMyReviews(getToken())
        .then((res) => {
          setMyReviews(res);
        })
        .catch(setError);
    }
  }, [history.location.pathname]);

  const handleSignInOrSignOut = (isAdmin) => {
    !isAuth ? (isAdmin ? signIn(true) : signIn(false)) : signOut();
  };

  const handleBeerFormSubmit = (id, values) => {
    id
      ? beerService
          .updateBeer(getToken(), id, values)
          .then((response) => {
            setBeers([
              ...beers.map((x) =>
                x.beerId === response.beerId ? response : x
              ),
            ]);
            history.push(routes.BEER_LIST);
          })
          .catch(setError)
      : beerService
          .createBeer(getToken(), values)
          .then((response) => {
            setBeers([...beers, response]);
            history.push(routes.BEER_LIST);
          })
          .catch(setError);
  };

  const handleDeleteBeer = (id) => {
    if (window.confirm("Are you sure you want to delete this beer?")) {
      beerService
        .deleteBeer(getToken(), id)
        .then((beer) => {
          setBeers([...beers.filter((x) => x.beerId !== beer.beerId)]);
        })
        .catch(setError);
    }
  };

  const handleIncrementBeerPints = (id) => {
    beerService
      .incrementPints(getToken(), id)
      .then((res) => {
        setBeers([...beers.map((x) => (x.beerId === res.beerId ? res : x))]);
      })
      .catch(setError);
  };

  const handleDecrementBeerPints = (id) => {
    beerService
      .decrementPints(getToken(), id)
      .then((res) => {
        setBeers([...beers.map((x) => (x.beerId === res.beerId ? res : x))]);
      })
      .catch(setError);
  };

  const handleReviewFormSubmit = (id, values) => {
    id
      ? reviewService
          .updateReview(getToken(), id, values)
          .then((response) => {
            setMyReviews([
              ...myReviews.map((x) =>
                x.reviewId === response.reviewId ? response : x
              ),
            ]);
            history.push(`/beers/details/${values.beerId}`);
          })
          .catch(setError)
      : reviewService
          .createReview(getToken(), values)
          .then((response) => {
            setMyReviews([...myReviews, response]);
            history.push(`/beers/details/${values.beerId}`);
          })
          .catch(setError);
  };

  const handleDeleteReview = async (id) => {
    reviewService
      .deleteReview(getToken(), id)
      .then((res) => {
        setMyReviews([...myReviews.filter((x) => x.reviewId !== res.reviewId)]);
      })
      .catch(setError);
  };

  return (
    <div className="App">
      <Router history={history}>
        <NavigationBar
          isAuth={isAuth}
          onSignInOrSignOut={handleSignInOrSignOut}
        />
        <Grid container>
          <Grid item xs={1} />
          <Grid item xs={10}>
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
                  beers={beers}
                  isAdmin={isAdmin}
                  isAuth={isAuth}
                  onDeleteBeer={handleDeleteBeer}
                  onIncrementBeerPints={handleIncrementBeerPints}
                  onDecrementBeerPints={handleDecrementBeerPints}
                />
              </Route>
              <AuthRoute
                isAuth={isAuth}
                isAdmin={isAdmin}
                adminRequired={true}
                path={routes.NEW_BEER}
              >
                <BeerForm
                  beers={beers}
                  onBeerFormSubmit={handleBeerFormSubmit}
                />
              </AuthRoute>
              <AuthRoute
                isAuth={isAuth}
                isAdmin={isAdmin}
                adminRequired={true}
                path={routes.BEER_EDIT}
              >
                <BeerForm
                  beers={beers}
                  onBeerFormSubmit={handleBeerFormSubmit}
                />
              </AuthRoute>
              <AuthRoute isAuth={isAuth} exact path={routes.NEW_REVIEW}>
                <ReviewForm
                  beers={beers}
                  myReviews={myReviews}
                  onReviewFormSubmit={handleReviewFormSubmit}
                />
              </AuthRoute>
              <AuthRoute
                isAuth={isAuth}
                exact
                path={routes.NEW_REVIEW_FOR_BEER}
              >
                <ReviewForm
                  beers={beers}
                  myReviews={myReviews}
                  onReviewFormSubmit={handleReviewFormSubmit}
                />
              </AuthRoute>
              <AuthRoute isAuth={isAuth} exact path={routes.EDIT_REVIEW}>
                <ReviewForm
                  beers={beers}
                  myReviews={myReviews}
                  onReviewFormSubmit={handleReviewFormSubmit}
                />
              </AuthRoute>
              <AuthRoute isAuth={isAuth} exact path={routes.ACCOUNT}>
                <Account
                  setError={setError}
                  myReviews={myReviews}
                  onDeleteReview={handleDeleteReview}
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
              <ErrorDisplay error={error} />
              <Redirect to="/" from="*" />
            </Switch>
          </Grid>
          <Grid item xs={1} />
        </Grid>
        <Footer />
      </Router>
    </div>
  );
}

export default withAuth(App);
