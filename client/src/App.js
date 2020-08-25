import React, { useState, useEffect } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import history from "./helpers/history";
import Home from "./components/Other/Home";
import Login from "./components/Other/Login";
import Register from "./components/Other/Register";
import BeerDetail from "./components/Beer/BeerDetail";
import BeerList from "./components/Beer/BeerList";
import BeerForm from "./components/Beer/BeerForm";
import NavigationBar from "./components/Other/NavigationBar";
import ReviewForm from "./components/Review/ReviewForm";
import PrivateRoute from "./components/Other/PrivateRoute";
import About from "./components/Other/About";
import Account from "./components/Other/Account";
import * as routes from "../src/constants/routes";
import * as roles from "../src/constants/roles";
import getUserFromLs from "./helpers/get-user-from-ls";
import beerService from "./services/beer-service";
import reviewService from "./services/review-service";
import userService from "./services/user-service";
import "./App.css";

function App() {
  const [user, setUser] = React.useState(null);
  const [beers, setBeers] = useState([]);
  const [error, setError] = React.useState({ errors: {} });
  useEffect(() => {
    history.listen(() => {
      const temp = { ...error };
      temp.errors = {};
      setError(temp);
    });
  }, []);

  console.log(error);
  React.useEffect(() => {
    if (beers.length === 0) {
      beerService
        .getBeers()
        .then((response) => setBeers(response))
        .catch(() =>
          setError({
            errors: [
              "Something went wrong trying to fetch the list beers. Please try again later.",
            ],
          })
        );
    }
  }, [beers]);

  React.useEffect(() => {
    if (!user) {
      setUser(getUserFromLs());
    }
  }, [user]);

  const handleLogin = (values) => {
    userService
      .login(values)
      .then((response) => {
        setUser(response);
        localStorage.setItem("user", JSON.stringify(response));
        history.push(routes.BEER_LIST);
      })
      .catch((err) =>
        setError({
          errors: err,
        })
      );
  };

  const handleLogout = () => {
    userService.logout();
    setUser(null);
  };

  const handleBeerFormSubmit = async (id, values) => {
    values.price = 0;
    values.alcoholContent = parseInt(values.alcoholContent);
    values.pints = parseInt(values.price);
    if (id) {
      await beerService
        .updateBeer(parseInt(id), values)
        .then((response) => {
          setBeers([
            ...beers.map((x) => (x.beerId === response.beerId ? response : x)),
          ]);
          history.push(routes.BEER_LIST);
        })
        .catch((err) =>
          setError({
            errors: err,
          })
        );
    } else {
      await beerService
        .createBeer(values)
        .then((response) => {
          setBeers([...beers, response]);
          history.push(routes.BEER_LIST);
        })
        .catch((err) =>
          setError({
            errors: err,
          })
        );
    }
  };

  const handleDeleteBeer = (id) => {
    if (window.confirm("Are you sure you want to delete this beer?"))
      beerService
        .deleteBeer(parseInt(id))
        .then((beer) => {
          setBeers([...beers.filter((x) => x.beerId !== beer.beerId)]);
        })
        .catch((err) =>
          setError({
            errors: err,
          })
        );
  };

  const handleIncrementBeerPints = (id) =>
    beerService
      .incrementPints(id)
      .then((beer) => {
        setBeers([...beers.map((x) => (x.beerId === beer.beerId ? beer : x))]);
      })
      .catch((err) =>
        setError({
          errors: err,
        })
      );

  const handleDecrementBeerPints = (id) =>
    beerService
      .decrementPints(id)
      .then((beer) => {
        setBeers([...beers.map((x) => (x.beerId === beer.beerId ? beer : x))]);
      })
      .catch((err) =>
        setError({
          errors: err,
        })
      );

  const handleCreateReview = (id, values) => {
    reviewService
      .createReview(values)
      .then((res) => {
        const newState = [...beers];
        const beer = newState.find((x) => x.beerId === res.beerId);
        beer.reviews.push(res);
        newState.map((x) => (x.beerId === beer.beerId ? beer : x));
        setBeers(newState);
        history.push(`/beers/${id}`);
      })
      .catch((err) =>
        setError({
          errors: err,
        })
      );
  };

  return (
    <div className="App">
      <Router history={history}>
        <NavigationBar user={user} />

        <Switch>
          <Route exact path={routes.LANDING}>
            <Home beers={beers} />
          </Route>
          <Route exact path={routes.REGISTER} component={Register} />
          <Route exact path={routes.ABOUT} component={About} />
          <Route exact path={routes.LOG_IN}>
            <Login
              onLogin={handleLogin}
              onLogout={handleLogout}
              setUser={setUser}
            />
          </Route>
          <Route exact path={routes.BEER_LIST}>
            <BeerList
              user={user}
              beers={beers}
              onDeleteBeer={handleDeleteBeer}
              onIncrementBeerPints={handleIncrementBeerPints}
              onDecrementBeerPints={handleDecrementBeerPints}
            />
          </Route>
          <PrivateRoute
            path={routes.NEW_BEER}
            roles={[roles.ADMIN]}
            component={() => (
              <BeerForm beers={beers} onBeerFormSubmit={handleBeerFormSubmit} />
            )}
          />
          <PrivateRoute
            exact
            path={routes.EDIT_BEER}
            roles={[roles.ADMIN]}
            component={() => (
              <BeerForm beers={beers} onBeerFormSubmit={handleBeerFormSubmit} />
            )}
          />
          <Route exact path={routes.BEER_DETAILS}>
            <BeerDetail user={user} beers={beers} />
          </Route>
          <PrivateRoute
            exact
            path={routes.NEW_REVIEW}
            roles={[roles.MEMBER, roles.EMPLOYEE, roles.ADMIN]}
          >
            <ReviewForm beers={beers} onCreateReview={handleCreateReview} />
          </PrivateRoute>
          <PrivateRoute
            exact
            path={routes.ACCOUNT}
            roles={[roles.ADMIN]}
            component={Account}
          />
          <Redirect from="*" to="/" />
        </Switch>
        <React.Fragment>
          {error &&
            error.errors &&
            Object.values(error.errors).map((element, index) => {
              return (
                <p key={index} className="white-text text-align-center">
                  {element}
                </p>
              );
            })}
        </React.Fragment>
      </Router>
    </div>
  );
}

export default App;
