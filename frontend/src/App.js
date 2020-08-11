import React from "react";
import Navbar from './components/navbar/navbar.js';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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
        </Switch>
      </div>
    </Router>
  );
}

export default App;
