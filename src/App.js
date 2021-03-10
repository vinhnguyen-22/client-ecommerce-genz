import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { getAllCategory, getInitialData, isUserLoggedIn } from "./actions";
import "./App.css";
import PrivateRoute from "./components/HOC/PrivateRoute";
import Category from "./containers/Category/Category";
import Home from "./containers/Home/Home";
import Orders from "./containers/Orders/Orders";
import Products from "./containers/Products/Products";
import Signin from "./containers/Signin/Signin";
import Signup from "./containers/Signup/Signup";

const App = () => {
  const dispatch = useDispatch((state) => state.auth);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    dispatch(getInitialData());
    dispatch(getAllCategory());
  }, []);

  return (
    <div className="App">
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <PrivateRoute path="/products" component={Products} />
        <PrivateRoute path="/orders" component={Orders} />
        <PrivateRoute path="/category" component={Category} />

        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </div>
  );
};

export default App;
