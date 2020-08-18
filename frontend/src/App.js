import React from "react";
import Navbar from './components/navbar/Navbar.js';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './components/Home'
import Cart from './components/Cart'

import CreateProduct from "./components/products/CreateForm";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/product/new">
            <CreateProduct />
          </Route>
          <Route exact path="/" component={Home}/>
          <Route path="/cart" component={Cart}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
