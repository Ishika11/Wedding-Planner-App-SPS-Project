import React from "react";
import Navbar from './components/navbar/Navbar.js';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CreateForm from "./components/products/CreateForm.jsx";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/product/new">
            <CreateForm />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
